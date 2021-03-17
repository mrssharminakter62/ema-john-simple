import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFamework =() => {
  if(firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
  }  
}

export const handleGoogleSignIn = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res =>{
      const {displayName, photoURL, email}=res.user;
      const signedInUser={
        isSignedIn: true,
        name: displayName,
        email: email,
        password: '',
        photo: photoURL,
        success: true
      }
      return signedInUser;
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

 export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
     var token = result.credential.accessToken;
     var user = result.user;
     user.success = true;
     return user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage);
  });
  }

export  const handleSignOut =() => {
  return  firebase.auth().signOut()
    .then(res =>{
      const signedOutUser ={
        isSignedIn: false,
        name: '',
        email:'',
         photo:'',
         error:'',
         success:''
      }
     return signedOutUser;
    })
    .catch(error =>{
      console.log(error);
    })
   }

  export const createUserWithinEmailAndPassword =(name, email, password) =>{
  return  firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res => {
     const newUserInfo = res.user;
     newUserInfo.error = '';
     newUserInfo.success = true;
     updateUserName(name);
     return newUserInfo;
   })
   .catch((error) => {
     const newUserInfo = {};
     newUserInfo.error = error.message;
     newUserInfo.success= false;
     return newUserInfo;
   });
   }
 
export const signInWithEmailAndPassword =(email, password)=>{
  return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success= true;
      return newUserInfo;
     
  })
  .catch(error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success= false;
    return newUserInfo;
  });

}
const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
     
    }).then(function() {
    console.log('user name update successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
