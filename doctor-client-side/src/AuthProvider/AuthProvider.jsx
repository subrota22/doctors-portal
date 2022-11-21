import React from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth" ;
import app from '../firebase.config/firebase.config';
import { useEffect } from 'react';
import { useState } from 'react';
export const AuthContext = createContext() ;
const auth = getAuth(app)
const AuthProvider = ({children}) => {
const [user , setUser] = useState({}) ;
const [loading , setLoading] = useState(true) ;
//social login providers
const googleProvider = new GoogleAuthProvider() ;
const githubProvider = new GithubAuthProvider() ;
//
const createUser = (email , password) => {
setLoading(true) ;
return createUserWithEmailAndPassword(auth , email , password) ;
}
//
const updateUserProfile = (name , profile) => {
setLoading(true) ;
return updateProfile(auth.currentUser , {
    displayName : name , 
    photoURL:profile , 
})
}
const signInUser = (email , password ) => {
setLoading(true) ;
return signInWithEmailAndPassword(auth , email , password) ;
}
//get user information //shorcur => reu  , rsc 
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth , (userInfo) => {
if(userInfo){
setLoading(false) ;
return setUser(userInfo) ;
}
})
return () => unsubscribe() ;
} , [])
//sign in with google
const signInWithGoogle = () => {
setLoading(true) ;
return signInWithPopup(auth , googleProvider) ;
}
//sign in with google
const signInWithGithub= () => {
setLoading(true) ;
return signInWithPopup(auth , githubProvider) ;
}
//sign out
const singOutUser = () => {
return auth.signOut() ;
}
//reset password
const resetPassword = (email) =>{
setLoading(true) ;
return sendPasswordResetEmail(auth , email) ;
}
//verify email 
const verifyEmail = () => {
return sendEmailVerification(auth.currentUser) ;
}
const authInfo = {
createUser , updateUserProfile , signInUser , user  , loading , verifyEmail , 
signInWithGoogle , signInWithGithub , singOutUser , setUser , resetPassword

} ;
    return (
        <React.Fragment>
          <AuthContext.Provider value={authInfo}>
                {children}
          </AuthContext.Provider>
        </React.Fragment>
    );
};

export default AuthProvider;