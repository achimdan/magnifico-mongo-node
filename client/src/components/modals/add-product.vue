<template>
    <b-modal centered
             :title="modalType === 'ADD' ? `Add product` : `Edit product`"
             id="add-product-modal"
             size="xl"
             @show="show"
             @hide="resetInfoModal"
             hide-footer>
        <b-form @submit="save">

            <div class="add-product">
                <div>
                    <Input :keyName="'Name'"
                           :placeholder="`name`"
                           :type="'text'"
                           :required="true"
                           :value="product.Name"
                           v-model="product.Name" />
                    <Input :keyName="'Price'"
                           :placeholder="`price`"
                           :type="'number'"
                           :required="true"
                           :value="product.Price"
                           v-model="product.Price" />
                    <Input :keyName="'Description'"
                           :placeholder="`description`"
                           :type="'text'"
                           :required="true"
                           :value="product.Description"
                           v-model="product.Description" />
                    <Dropdown :options="categories"
                              :name="'Categories'"
                              :label="true"
                              v-model="product.Category" />

                    <div class="flex mt-3">
                        <b-form-checkbox id="for-home"
                                         v-model="product.Home"
                                         name="for-home"
                                         :value="true"
                                         :unchecked-value="false">
                            For Home
                        </b-form-checkbox>
                    </div>

                    <div class="mt-3 colors">
                        <span>Select color:</span>
                        <div class="flex space-between ">
                            <button type="button"
                                    v-for="btn in colors"
                                    :key="btn.Id"
                                    @click="selectColor(btn)"
                                    :class="{ 'color-selected': btn.Selected }"
                                    :style="{ backgroundColor: btn.Color }">
                            </button>
                        </div>
                    </div>

                    <div class="flex mt-3">
                        <b-form-checkbox id="in-stock"
                                         v-model="product.Stock"
                                         name="in-stock"
                                         :value="true"
                                         :unchecked-value="false">
                            In stock
                        </b-form-checkbox>
                    </div>

                    <div class="mt-3"
                         v-if="product.Stock">
                        <label for="example-datepicker">Available</label>
                        <b-form-datepicker id="example-datepicker"
                                           v-model="product.Available"
                                           class="mb-2">
                        </b-form-datepicker>
                    </div>
                </div>

                <div>
                    <div class="added-images">
                        <div class="images"
                             v-for="img in selectedProduct.ProductImage"
                             :key="img.Id"
                             @mouseenter="deleteButton = img.Id"
                             @mouseleave="deleteButton = 0">

                            <b-form-checkbox class="primary-image"
                                             v-if="deleteButton === img.Id"
                                             v-model="img.Primary"
                                             @change="setPrimary">
                                Primary
                            </b-form-checkbox>
                            <button type="button"
                                    class="delete-image"
                                    v-if="deleteButton === img.Id"
                                    @click="deleteImage(img)">
                                <img src="@/assets/img/face.svg"
                                     alt=""
                                     id="popover-1-user"
                                     class="user">
                            </button>
                            <img :src="`http://localhost:3000/uploads//${img}`"
                                 alt=""
                                 width="100"
                                 height="100">
                        </div>
                    </div>
                    <Uploads @filesToUpload="filesToUpload" />
                </div>
            </div>

            <div class="flex mt-4 float-right">
                <b-button pill
                          type="submit"
                          class="mr-2 save">
                    Save
                </b-button>
                <b-button pill
                          type="button"
                          class="cancel"
                          @click="$bvModal.hide('add-product-modal')">
                    Cancel
                </b-button>
            </div>
        </b-form>
    </b-modal>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import { MainModule } from "../../store/main-module";
    import Input from '@/components/Input.vue'
    import Dropdown from '@/components/Dropdown.vue'
    import Uploads from '@/components/Uploads.vue'

    @Component({
        components: { Input, Dropdown, Uploads }
    })
    export default class AddProductModalComponent extends Vue {

        get modalType() {
            return MainModule.modalType
        }

        get baseUrl() {
            return MainModule.BASE_URL_MONGO
        }

        get categories() {
            return MainModule.categories
        }

        get selectedProduct() {
            return MainModule.selectedProduct
        }

        colors: Array<{}> = [
            { Id: 1, Color: '#c0382b', Selected: false },
            { Id: 2, Color: 'blue', Selected: false },
            { Id: 3, Color: 'black', Selected: false },
            { Id: 4, Color: 'grey', Selected: false },
            { Id: 5, Color: 'yellow', Selected: false },
        ]
        product: any = {}
        images: any = []
        deleteButton: number = 0

        show() {
            MainModule.fetchCategories()
            // console.log(this.modalType)
            // console.log(this.selectedProduct)
            this.product = { ...this.selectedProduct }
        }

        selectColor(btn) {
            btn.Selected = !btn.Selected
        }

        filesToUpload(files: any) {
            this.images = files.map((el: any) => el.file)
        }

        save(evt: any) {
            evt.preventDefault()
            this.product.Colors = this.colors
            this.product.ProductImage = this.images
            this.modalType === 'ADD'
                ? MainModule.saveProduct(this.product)
                : MainModule.editProduct(this.product)

            this.$bvModal.hide('add-product-modal')
            MainModule.fetchProducts()
        }

        setPrimary(img: any) {
            console.log(img)
        }

        deleteImage(img: any) {
            MainModule.deleteImage(img)
        }

        resetInfoModal() {
            // MainModule.resetModalFata()
            MainModule.setModalType('')
            MainModule.setSelectedProduct({})
            this.$router.replace({ 'query': {} });
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";
.colors {
    width: 270px;
    button {
        outline: none;
        border: none;
        height: 40px;
        width: 45px;
        border-radius: 5px;
    }
    .color-selected {
        position: relative;
        &::before {
            position: absolute;
            content: url("../../../src/assets/img/check.svg");
            width: 25px;
            height: 25px;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            background: $primary-color;
            padding: 3px;
            border-radius: 50px;
        }
    }
}
.add-product {
    display: grid;
    grid-template-columns: 40% auto;
    grid-gap: 50px;
    .added-images {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 20px;
        .images {
            position: relative;
            .primary-image {
                position: absolute;
                top: 0;
                left: 0;
            }
            .delete-image {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
}
</style>