require("dotenv").config();
const express = require('express');
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) ;
const cors = require('cors');
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3042;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome this is home page !! ")
})
//verify token 
function verifyJwt(req, res, next) {
    const getToken = req.headers.authorization;
    if (!getToken) {
        return res.status(401).send({ message: "unauthorize access" });
    }
    const token = getToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, function (error, decoded) {
        if (error) {
            return res.status(401).send({ message: "unauthorize access" });
        }
        req.decoded = decoded;
        next();
    })
}

//use mongodb
const runDatabase = async () => {
    try {

        const username = process.env.MONGO_DB_USERNAM;
        const password = process.env.MONGO_DB_PASSWORD;

        const uri = `mongodb+srv://${username}:${password}@cluster0.cp8h2pe.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        const usersCollection = client.db("doctorsPortal").collection("users");
        const bookingsCollection = client.db("doctorsPortal").collection("bookings");
        const appointmentOptionsCollection = client.db("doctorsPortal").collection("appointmentOptions");
        const doctorsCollection = client.db("doctorsPortal").collection("doctors");
        const paymentsCollection = client.db("doctorsPortal").collection("payments");
        // verify admin
        const verifyAdmin = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const adminCheck = await usersCollection.findOne(query);
            if (adminCheck.role !== "admin") {
                return res.status(403).send({ message: "Forbidded access " });
            }
            next();
        }
        //insert apointment data to the server 
        app.post("/bookings", async (req, res) => {
            const apointmentData = req.body;
            const query = {
                date: apointmentData.date,
                service: apointmentData.service,
                email: apointmentData.email,
            }
            const alreadyBooked = await bookingsCollection.find(query).toArray();
            if (alreadyBooked.length) {
                const message = `This is already have a booking on ${apointmentData.date}`;
                return res.send({ acknowledged: false, message });
            }
            const cursor = bookingsCollection.insertOne(apointmentData);
            const result = await cursor;
            res.send(result);
        })
        //read data from mongoDB
        app.get("/bookings/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            const decodedEmail = req.decoded.email;
            // const checkEmail = await bookingsCollection.findOne({email:decodedEmail}) ;
            if (email !== decodedEmail) {
                return res.status(403).send({ message: "unauthorize access" });
            }

            const cursor = bookingsCollection.find({ email: email }).sort({ _id: - 1 });
            const result = await cursor.toArray();
            res.send(result);

        })
        
    //get appointmentOptionsCollection with conditions

        // app.get("/appointmentOptions", async (req, res) => {
        //     const date = req.query.date;
        //     const options = await appointmentOptionsCollection.find({}).toArray();
        //     const bookingQuery = { date: date };
        //     const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();
        //     options.map(option => {
        //         const bookingData = alreadyBooked.filter(book => book.service === option.name);
        //         const bookedSlots = bookingData.map(slot => slot.bookingTime);
        //         const remainingSlots = option.slots.filter(slotData => !bookedSlots.includes(slotData));
        //         option.slots = remainingSlots;
        //     })
        //     res.send(options);

        //     /***
        //      * reciveQuery = {date:date}
        //      * booking collection => alreadyBooked => reciveQuery 
        //      * booking map => options
        //      * filter alredyBooked 
        //      * map alredy booked service name => bookedSlot
        //      * remainingSlots => option.slots.filter => slot => !bookedSlot.includes(slot) //search data by filter
        //      * option.slots = remainingSlots
        //      */

        // })



        //get apointment option by mongoDB lookup aggrigation

        app.get("/v2/appointmentOptions", async (req, res) => {
            const date = req.query.date;
            const options = await appointmentOptionsCollection.aggregate([
                {
                    $lookup: {
                        from: 'bookings',
                        localField: 'name',
                        foreignField: 'service',
                        pipeline: [

                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$date', date]
                                    }
                                }
                            }

                        ]
                        ,
                        as: 'booked'

                    }
                },
                {
                    $project: {
                        name: 1,
                        slots: 1,
                        price:1 , 
                        booked: {
                            $map: {
                                input: '$booked',
                                as: 'bookme',
                                in: '$$bookme.bookingTime'
                            }
                        }
                    }
                }
                ,
                {
                    $project: {
                        name: 1,
                        price:1 , 
                        slots: {
                            $setDifference: ['$slots', '$booked']
                        }
                    }
                }
            ]).toArray();

            res.send(options)
        })

        //create jwt token 
        app.post("/jwt", async (req, res) => {
            const email = req.body;
            const token = await jwt.sign(email, process.env.SECRET_TOKEN, { expiresIn: "2d" });
            res.send({ token });
        })

        //register users by check condition

        app.post("/users",  async (req, res) => {
            const email = req.body.email;
            const userData = req.body;
            const checkEmailQuery = { email: email };
            const alreadyExist = await usersCollection.findOne(checkEmailQuery);
            if (alreadyExist) {
                return res.status(401).send({ message: "You have already an account" });
            } else {
                const result = await usersCollection.insertOne({
                    name: userData.name,
                    email: userData.email,
                });
                res.status(201).send(result)
            }
        })
 
        //get user 
        app.get("/users", verifyJwt , verifyAdmin ,  async (req, res) => {
            const usersData = await usersCollection.find({}).toArray();
            res.status(201).send(usersData);
        })
 
            //delete sepecific user 
            app.delete("/users/:id", verifyJwt , verifyAdmin ,  async (req, res) => {
                const id = req.params.id ;
                const filter = {_id : ObjectId(id)} ;
                const usersData = await usersCollection.deleteOne(filter) ;
                res.status(201).send(usersData);
            })
            //get user by id 
            app.get("/users/:id" , verifyJwt , verifyAdmin ,  async(req , res) => {
            const id = req.params.id ;
            const filter = {_id : ObjectId(id)} ;
            const result = await usersCollection.findOne(filter) ;
            res.status(201).send(result) ; 
            })
            //update users
            app.put("/users/:id" , verifyJwt , verifyAdmin , async (req , res) =>{
            const updateUser = req.body;
            const id = req.params.id ;
            const filter = {_id : ObjectId(id)} ;
            const updatedDoc = {
                $set:{ 
                 name:updateUser.name , 
                 email:updateUser.email , 
                 role:updateUser.role , 
                }
            }
        const option = {upsert:true} ;
        const result = await usersCollection.updateOne(filter , updatedDoc , option) ;
        res.status(201).send(result) ;
            })
        //
        app.get("/users/admin/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const usersData = await usersCollection.findOne(query)
            res.status(201).send({ isAdmin: usersData?.role === "admin" });
        })

        //update user role
        app.put("/users/admin/:id", verifyJwt, verifyAdmin, async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: "admin"
                }
            }
            const option = { upsert: true };
            const result = await usersCollection.updateOne(query, updateDoc, option);
            res.status(201).send({ message: "Your are add an admin successfully !! ", result });
        })
        //get appointment speciality
        app.get("/appointmentSpeciality", async (req, res) => {
            const query = {};
            const result = await appointmentOptionsCollection.find(query).project({ name: 1 }).toArray();
            res.send(result);
        })

        //post doctor data 
        app.post("/doctors", verifyJwt, verifyAdmin, async (req, res) => {
            const doctorsData = req.body;
            const result = await doctorsCollection.insertOne(doctorsData);
            res.status(201).send(result);
        })

        //get doctors data 
        app.get("/doctors", verifyJwt, verifyAdmin, async (req, res) => {
            const query = {};
            const result = await doctorsCollection.find(query).sort({ _id: -1 }).toArray();
            res.status(201).send(result);
        })

        //delete doctors
        app.delete("/doctors/:id", verifyJwt, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await doctorsCollection.deleteOne(query);
            res.status(201).send(result);
        })

        //get specific doctor 
        app.get("/doctors/:id" , verifyJwt , verifyAdmin ,  async (req , res) => {
         const id = req.params.id ;
         const query = {_id : ObjectId(id)} ;
         const doctorsData = await doctorsCollection.findOne(query) ;
         res.status(201).send(doctorsData) ;
        })
    
        //edit doctors data
        app.put("/doctors/:id" , verifyJwt , verifyAdmin , async(req , res) => {
        const updateDoctors = req.body ;
         const id = req.params.id ;
         const query = {_id : ObjectId(id)} ;
         const updateDoc = {
            $set:{
                doctorName: updateDoctors.doctorName,
                doctorEmail: updateDoctors.doctorEmail,
                specialty: updateDoctors.specialty,
                doctorProfile: updateDoctors.doctorProfile,
            }
         }

         const options = {upsert:true} ;
         const result = await doctorsCollection.updateOne(query , updateDoc , options) ;
         res.status(201).send(result) ;
        })
        /*
        // add price in apointment option 
           app.get("/addPrice" , async(req , res) => {
           const filter = {} ;
           const updatedDoc = {
            $set:{
            price : 85 , 
            }
           }
           const options = {upsert:true} ;
           const result = await appointmentOptionsCollection.updateMany(filter , updatedDoc , options)  ;
           res.status(201).send(result) ;
           })
        */
       
          
        // get specifice bookings  give token carefully in headers than 
        // sometime api does not working so change api hit name  
        
   app.get("/bookingsInformation/:id"  , verifyJwt ,  verifyAdmin ,   async(req , res) => {
            const id = req.params.id ;
            const filter = {_id : ObjectId(id)} ;
            const bookingResult = await bookingsCollection.findOne(filter);
            res.status(201).send(bookingResult) ;
           })
//

const calculateOrderAmount = (price) => { 
    let amout = price ;  
    let parcentagePrice = (amout / 100) ;
    let discount = parcentagePrice * 20 ;
    let discountOffer = Math.abs ( (price - discount ) * 100 ) ; //convert into cent 
    return discountOffer;
  };       
  
app.post("/createPaymentIntent", async (req, res) => { 
    const  getPrice = req.body;
    const price = getPrice.price ;
    const amount =   calculateOrderAmount(price) ;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount,
      "payment_method_types" : [
        "card" 
    ] , 
      currency: "usd",   
    });
    res.send({
        clientSecret: paymentIntent.client_secret,

      });

    }) 
 //payments

app.post("/payments" , async (req , res) => {
const paymentData = req.body ;
const result = await paymentsCollection.insertOne(paymentData) ;

//update bookings information 
const bookingId = paymentData.bookingId ;
const query = {_id : ObjectId(bookingId)} ;
const updateDoc = {
    $set:{
     paid:true ,
     transactionId:paymentData.transactionId , 
    }
}
const updateResult = await bookingsCollection.updateOne(query , updateDoc ) ;
res.status(201).send(result) ;
 }) 
//

// *************** send mail ***************//

 const sendEmail = (to ,  subject , message ) => {

  const transporter = nodemailer.createTransport({
    service:'gmail' ,
    auth:{
        user:process.env.SENDING_EMAIL ,
        pass : process.env.EMAIL_PASSWORD , 
    }
  })
  //from ,  to , subject , html or text 
  const mailOptions = {
    from:process.env.SENDING_EMAIL,
    to:to ,
    subject:subject , 
    html : `
<div style="background-color:indigo; font-size:15px;  color:white;
text-align:center;  border-radius:12px; padding-top:12px; ">
<p style="font-size:17px; color:white; font:bold;"> Message: ${message} </p>
<img src="https://i.ibb.co/728wqVZ/doctor.png" alt="doctors portal"
style="width:55px; height:55px;"/>
<div style="bottom:0; background-color:black; padding:12px 5px;">
<span style="color:white;"> This email sending from doctors portal </span>  
<a href="https://doctors-portal-66a61.web.app/"   target="blank">
Visit our website 
</a>
<br><br>
<span style="color:white;"> You can join with un on zoom meeting </span>  
<a  href="https://meet.google.com/xkm-ntsb-vkj?pli=1" target="blank">
Join now 
</a>
</div>
</div>
    `, 
  } ;

 transporter.sendMail(mailOptions , function(error , info) {
    if(error){
        console.log(error);
    }else{
        console.log("Email sent :" + info.response);
    }
 })

 }

//  sendEmail('subrota45278@gmail.com' , 'Hello bolod'  , 'Tui sala bolod....') ;

app.post("/sendMail" , async (req , res) => {
const sendMessageInformations = req.body ;
const to = sendMessageInformations.to ;
const subject = sendMessageInformations.subject ;
const message = sendMessageInformations.message ;
sendEmail(to , subject , message) ;
res.status(201).send({sended:"Email sended successfully !! "}) ;
})
 
//  ***************<----end send mail---->*************** //
}catch (error) {
        console.log(error);
    }
    finally {
        //ok
    }
}
runDatabase().catch((error) => console.log(error));

//server running here
app.listen(port, (req, res) => {
    console.log(`Your server running on port number : ${port}`);
})
