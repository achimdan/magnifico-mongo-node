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
    BASE_URL_MONGO: string = 'api/'

    categories: any = []
    products: Array<Object> = []

    docId: any = ''
    modalType: string = ''
    selectedProduct: any = {}
    favorites: any = []
    freeRoute: boolean = true

    fields: Array<{}> = [
        { key: 'Images', class: 'image' },
        { key: 'Name', sortable: false },
        { key: 'Description' },
        { key: 'Price' },
        { key: 'Stock' },
        { key: 'Actions' }
    ]

    @Mutation
    setModalType(payload: string) {
        this.modalType = payload
    }

    @Mutation
    setSelectedProduct(payload: any) {
        this.docId = payload.Id
        this.selectedProduct = payload
    }

    @Mutation
    setRouteType(payload: any) {
        this.freeRoute = payload
    }

    @Action
    async fetchCategories() {
        const response = await axios.get(`${this.BASE_URL_MONGO}categories`)
        const data = response.data
        this.categories = data
    }


    @Action
    async saveCategory(payload: any) {
        await axios
            // .post(`${this.BASE_URL}api/v1/admin/categories`, payload)
            .post(`${this.BASE_URL_MONGO}categories`, payload)
    }

    //PRODUCTS

    //Fetch products
    @Action
    async fetchProducts() {
        const response = await axios.get(`${this.BASE_URL_MONGO}products`)
        const data = response.data
        response.data ? this.products = data : null
    }

    // Save products
    @Action
    async saveProduct(payload: any) {
        let formData = new FormData()
        formData.append('Name', payload.Name);
        formData.append('Price', payload.Price);
        formData.append('Description', payload.Description);

        payload.ProductImage
            .forEach((file: any, index: any) => {
                formData.append('ProductImage[]', file)
                console.log('ProductImage[' + index + ']', file)
            })
        // formData.append('ProductImage', payload.ProductImage);
        await axios
            .post(`${this.BASE_URL_MONGO}products`, formData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    @Action
    async editProduct(payload: any) {
        console.log(payload)
        const { _id } = payload
        delete payload._id
        await axios
            .put(`${this.BASE_URL_MONGO}products/${_id}`, payload)
            .then((response: any) => {
                const index = this.products.findIndex((el: any) => el._id === response.data.Id)
                this.products[index] = response.data
                console.log(this.products)
                // this.products.push(response.data)
                this.uploadImages(response.data.Id, payload.images)
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
            .delete(`${this.BASE_URL_MONGO}products/${payload.item._id}`)
            .then(() => this.products.splice(payload.index, 1))
    }

    @Action
    async subscribeToNewsletter(payload: any) {
        console.log(payload)
    }

    // @Action
    // async fetchCategories() {
    //     const response = await axios.get(`${this.BASE_URL}api/v1/categories`)
    //     const data = response.data
    //     this.categories = data
    // }    

    @Action
    signOut() {
        console.log('sign out')
    }
}

export const MainModule = new Main({ store, name: "main-module" })
