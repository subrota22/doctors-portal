import {  useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCallRoom = () => {
    const { roomId, name } = useParams();
    let myMeeting = async (element) => {
        // generate Kit Token
        const appID = parseInt(process.env.REACT_APP_ID);
        const serverSecret = String(process.env.REACT_APP_SERVER_SECRET);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            Date.now().toString());


        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomId,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        });


    };


    return (
        <>
           <div className="pt-3">
           {
                name && <h2 className="text-3xl text-center font-bold text-green-500 pt-3 animate-pulse dureation-2000 title"> <span className="text-info">{name}</span> created this room 
               <i className="fa-solid fa-house text-white mx-2 hover:cursor-pointer" title="Back to the home page!!" onClick={() => (window.location="/")}></i>
                </h2>
            }
            <br />
            <div
                style={{ height: "100vh", width: "100%" }}
                className="rounded-lg mb-12"
                ref={myMeeting}
            ></div>
           </div>
        </>
    );
};

export default VideoCallRoom;