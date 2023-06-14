import {  useState } from "react";
import { useNavigate } from "react-router-dom";
const VideoCallHome = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const hanldeSubmit = (event) => {
        event.preventDefault();
        const roomId = Date.now().toString();
        navigate(`/videoRoom/${roomId}/${name}`);
    }
    return (
        <>
            <div className="h-screen pt-12" data-aos="zoom-in">
                <h2 className="text-center text-2xl font-bold text-primary uppercase pt-3 animate-pulse duretion-2000">
                    Welecome to the Doctors portal
                    <br /><br />
                    video streams !!</h2>
                <div className="hero h-auto mt-7">
                    <div className="hero-content h-full flex flex-col-reverse lg:flex-row ">
                        <div className="video" data-aos="fade-left">
                            <iframe style={{ width: "460px", height: "228px" }}
                                className="flex-shrink-0 rounded-md shadow-3xl border-2"
                                src="https://www.youtube.com/embed/xwuz5DZsFGA"
                                title="Use of this video streams !!"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen"
                                msallowfullscreen="msallowfullscreen"
                                oallowfullscreen="oallowfullscreen"
                                webkitallowfullscreen="webkitallowfullscreen"></iframe>
                        </div>
                        <div data-aos="fade-right" className="card flex-shrink-0 w-full max-w-lg shadow-3xl border-2">
                            <form onSubmit={hanldeSubmit}>
                                <div className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Name</span>
                                        </label>
                                        <input type="text"  placeholder="Enter your name" onChange={(event) => setName(event.target.value)} className="input input-bordered" required />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn bg-blue-400" type="submit">Create Room</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCallHome;