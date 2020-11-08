import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from './';
import axios from "axios";
import { fireDb } from "../firebaseConfig";
// import firebase, { firestore, storage } from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import * as firebase from 'firebase/app';

const BASE_URL = "https://marius-cornea.website"
@Module({ generateMutationSetters: true })
class Auth extends VuexModule {

    user: any = {}
    photoURL: any = '../assets/img/face.svg'

    @Action
    checkIfLogged(user: any) {
        localStorage.setItem('user', JSON.stringify(user))
        // firebase.auth().onAuthStateChanged(user => {
        //     localStorage.setItem('user', JSON.stringify(user))
        //     console.log(user)
        //     this.user = user
        // })
    }

    @Mutation
    setUser(user: any) {
        this.user = user
    }

    @Action
    async faceBook() {
        console.log('response', BASE_URL)
        const response = await axios.get(`${BASE_URL}/shop/oauth2/authorize/facebook?redirect_uri=http://localhost:4200/oauth2/redirect`)
        console.log(response)


        // const provider = new firebase.auth.FacebookAuthProvider()
        // firebase
        //     .auth()
        //     .signInWithPopup(provider)
        //     .then(result => {
        //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //         const token = result.credential;
        //         // The signed-in user info.
        //         const user: any = result.user
        //         console.log(user)
        //         // console.log(token)
        //         const account = {
        //             UserUid: user.uid,
        //             DisplayName: user.displayName,
        //             Email: user.email
        //         }
        //         firebase.firestore().collection('accounts').doc(user.uid).set(account);
        //     })
        //     .catch((error: any) => {
        //         // Handle Errors here.
        //         const errorCode = error.code
        //         const errorMessage = error.message
        //         // The email of the user's account used.
        //         const email = error.email
        //         // The firebase.auth.AuthCredential type that was used.
        //         const credential = error.credential
        //         console.log(error)
        //     })
    }

    @Action
    signOut() {
        firebase
            .auth()
            .signOut()
            .then(success => {
                // Sign-out successful.
                // console.log("success", this.user);
            })
            .catch(function (error) {
                // An error happened.
                console.log(error);
            });
    }
}

export const AuthModule = new Auth({ store, name: "auth-module" })
