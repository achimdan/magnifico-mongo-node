import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from './';
import axios from "axios";
import { fireDb } from "../firebaseConfig";
// import firebase, { firestore, storage } from "firebase/app";
import * as firebase from 'firebase/app';
import "firebase/storage";
import "firebase/auth";
import { AuthModule } from './auth-module';

const BASE_URL_MONGO: string = 'api/'

@Module({ generateMutationSetters: true })
class Main extends VuexModule {

    BASE_URL: string = 'https://marius-cornea.website/shop/'

    categories: any = []
    products: Array<Object> = []

    docId: any = ''
    modalType: string = ''
    selectedProduct: any = {}
    favorites: any = []

    @Action
    async fetchCategories() {
        const response = await axios.get(`${BASE_URL_MONGO}categories`)
        const data = response.data
        this.categories = data
    }

    @Mutation
    setModalType(payload: string) {
        this.modalType = payload
    }

    @Mutation
    setSelectedProduct(payload: any) {
        this.docId = payload.Id
        this.selectedProduct = payload
    }

    @Action
    async saveCategory(payload: any) {
        await axios
            // .post(`${this.BASE_URL}api/v1/admin/categories`, payload)
            .post(`${BASE_URL_MONGO}categories`, payload)
    }

    @Action
    async saveProduct(payload: any) {
        await axios
            .post(`${BASE_URL_MONGO}products`, payload)
            // .then((response: any) => {
            //     this.uploadImages(response.data.Id, payload.images)
            // })
    }

    @Action
    async editProduct(payload: any) {
        console.log(payload)
        const { _id } = payload
        delete payload._id
        await axios
            .patch(`${BASE_URL_MONGO}products/${_id}`, payload)
            .then((response: any) => {
                const index = this.products.findIndex((el: any) => el._id === response.data.Id)
                this.products[index] = response.data
                console.log(this.products)
                // this.products.push(response.data)
                // this.uploadImages(response.data.Id, payload.images)
            })
    }

    private uploadImages(Id: number, images: any) {
        let formData = new FormData()

        images
            .filter((file: any, index: any) => {
                console.log(index)
                console.log(file)
                formData.append('files', file)
            })

        axios.post(`${this.BASE_URL}api/v1/admin/products/${Id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((response) => {
                console.log('result', response)
                this.products.push(response.data)
            })
    }

    @Action
    async deleteImage(payload: any) {
        await axios
            .delete(`${this.BASE_URL}api/v1/admin/products/images/${payload.Id}`)
            .then((response: any) => {
                console.log(response)
            })
    }

    @Action
    async addToFavorite(payload: any) {

    }

    private pushToFavorite(payload: any, ref: any) {

    }

    private addCollection(payload: any) {

    }

    @Action
    fetchFavorites() {

    }

    @Action
    async deleteProduct(payload: any) {
        await axios
            .delete(`${BASE_URL_MONGO}products/${payload.item._id}`)
            .then(() => this.products.splice(payload.index, 1))
    }

    // @Action
    // async fetchCategories() {
    //     const response = await axios.get(`${this.BASE_URL}api/v1/categories`)
    //     const data = response.data
    //     this.categories = data
    // }

    @Action
    async fetchProducts() {
        const response = await axios.get(`${BASE_URL_MONGO}products`)
        const data = response.data
        response.data ? this.products = data : null
    }

    @Action
    signOut() {
        console.log('sign out')
    }
}

export const MainModule = new Main({ store, name: "main-module" })
