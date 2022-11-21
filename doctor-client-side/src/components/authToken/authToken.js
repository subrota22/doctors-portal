
const authToken = (email) => { //only props will be destructure //
const currentUser = {
email:email , 
}
fetch(`https://use-me.vercel.app/jwt` , {
method:"POST" ,
headers:{
'content-type' : "application/json" 
},
body:JSON.stringify(currentUser)
})
.then(res => res.json())
.then(data =>  localStorage.setItem("doctors-portal" , data.token))
.catch((error) => {
console.log(error);
})
};

export default authToken;