
// Integrate the SDK
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

// The following uses the App instance as an example.

const ChatPage = () => {

    const { userId, username } = useParams();
    const {user} = useContext(AuthContext) ;
    const [state, setState] = useState(

        {
            appConfig: {
                appID: 567598253,        // The AppID you get from the ZEGOCLOUD admin console.
                serverSecret: '4ec20b346fd2aa3fbad3a8a023c84ce6' // The serverSecret you get from ZEGOCLOUD Admin Console.

            },
            // The userID and userName is a strings of 1 to 32 characters.
            // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
            userInfo: {
                // Your ID as a user.
                userID: userId,
                // Your name as a user.
                userName: username,
                // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
                userAvatarUrl: user?.photoURL ?  user?.photoURL  : "https://i.ibb.co/vjXPL0L/ba4.webp",
            },
        }

    ) ; 

    //
    React.useEffect(() => {
        const init = async () => {
            const zimKit = new ZIMKitManager();
            const token = zimKit.generateKitTokenForTest(state.appConfig.appID, state.appConfig.serverSecret, state.userInfo.userID);
            await zimKit.init(state.appConfig.appID);
            await zimKit.connectUser(state.userInfo, token);

        }
        init();
    },
    
       [
        state.appConfig.appID,
        state.userInfo,
        state.appConfig.serverSecret
       ]
    
    );
    //
    console.log(setState);

    return (
        <>
            <Helmet><title>Chat room</title></Helmet>
            <h2 className='text-center text-2xl font-bold my-2'> Congrasulation <span className='text-blue-500'>{username}</span> your user id <span className='text-blue-500'>{userId}</span> </h2>
            <Common></Common>
        </>
    );
}


export default ChatPage;