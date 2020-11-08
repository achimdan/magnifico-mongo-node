import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from '.';
import { fireDb } from "../firebaseConfig";
// import firebase, { firestore, storage } from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import * as firebase from 'firebase/app';

import { AuthModule } from './auth-module'
@Module({ generateMutationSetters: true })
class Cart extends VuexModule {

    cartProducts: any = []

    @Action
    async addToCart(payload: any) {
        this.cartProducts.push(payload)
    }

    @Action
    async fetchCart() {
        const parseCartProducts: any = localStorage.getItem('cartProducts')
        this.cartProducts = JSON.parse(parseCartProducts)
    }

    @Action
    async removeFromCart(index: number) {
        this.cartProducts.splice(index, 1)
    }

}

export const CartModule = new Cart({ store, name: "cart-module" })
