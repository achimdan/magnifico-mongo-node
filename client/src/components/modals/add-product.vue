<template>
    <b-modal centered
             :title="modalType === 'ADD' ? `Add product` : `Edit product`"
             id="add-product-modal"
             modal-class="gen-modal"
             size="xl"
             @show="show"
             @hide="resetInfoModal"
             hide-header
             hide-footer>
        <div class="header">
            <h4>
                {{modalType === 'ADD' ? `Add product` : `Edit product`}}
            </h4>
            <b-button type="button">
                <font-awesome-icon :icon="['fas', 'eye']"
                                   class="icon alt" />
            </b-button>
        </div>
        <b-form @submit="save">
            <b-tabs content-class="mt-3"
                    pills
                    class="modal-tabs">
                <b-tab title="General"
                       lazy
                       active>
                    <b-overlay :show="loaded"
                               rounded="sm">
                        <div class="add-product">
                            <div>
                                <Input :keyName="'Name'"
                                       :placeholder="`name`"
                                       :type="'text'"
                                       :required="false"
                                       :value="product.Name"
                                       v-model="product.Name" />
                                <Input :keyName="'Price'"
                                       :placeholder="`price`"
                                       :type="'number'"
                                       :required="false"
                                       :value="product.Price"
                                       v-model="product.Price" />
                                <Input :keyName="'Description'"
                                       :placeholder="`description`"
                                       :type="'text'"
                                       :required="false"
                                       :value="product.Description"
                                       v-model="product.Description" />

                                <div class="admin-multiselect-wrapper">
                                    <label class="admin-label">Category</label>
                                    <Multiselect v-model="product.Category"
                                                 :options="categories"
                                                 :multiple="true"
                                                 :close-on-select="false"
                                                 :clear-on-select="false"
                                                 :preserve-search="true"
                                                 :preselect-first="false"
                                                 placeholder="Select category"
                                                 label="Name"
                                                 track-by="Name"
                                                 class="admin-multiselect">
                                    </Multiselect>
                                </div>

                                <!-- <div class="flex mt-3">
                                    <b-form-checkbox id="for-home"
                                                     v-model="product.Home"
                                                     name="for-home"
                                                     :value="true"
                                                     :unchecked-value="false">
                                        For Home
                                    </b-form-checkbox>
                                </div> -->

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
                            <div class="mt-3 colors">
                                <label class="admin-label">Select color</label>
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
                        </div>
                    </b-overlay>
                </b-tab>
                <!-- <b-tab title="Data">
                    <p>I'm the second tab</p>
                </b-tab> -->
                <b-tab>
                    <template #title>
                        <b-spinner type="border"
                                   small
                                   v-if="false">
                        </b-spinner>
                        <span style="margin-left: 7px;">Images</span>
                    </template>
                    <b-overlay :show="false"
                               rounded="sm">
                        <!-- <div class="added-images">
                            <div class="images"
                                 v-for="img in product.ProductImage"
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
                        </div> -->
                        <Uploads @filesToUpload="filesToUpload" />

                    </b-overlay>
                </b-tab>
                <b-tab lazy>
                    <template #title>
                        <b-spinner type="border"
                                   small
                                   v-if="false">
                        </b-spinner>
                        <span style="margin-left: 7px;">Seo</span>
                    </template>
                    <b-overlay :show="false"
                               rounded="sm">
                        SEO
                    </b-overlay>
                </b-tab>
                <b-tab lazy
                       v-if="modalType === 'EDIT'">
                    <template #title>
                        <b-spinner type="border"
                                   small
                                   v-if="false">
                        </b-spinner>
                        <span style="margin-left: 7px;">Settings</span>
                    </template>
                    <b-overlay :show="false"
                               rounded="sm">
                        <div class="settings">
                            <div class="activate">
                                <div class="info">
                                    <label class="admin-label">{{ product.Active ? 'Deactivate' : 'Activate' }} the product</label>
                                    <span class="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nemo nostrum.
                                    </span>
                                </div>
                                <b-form-checkbox v-model="product.Active"
                                                 name="check-button"
                                                 :value="true"
                                                 :unchecked-value="false"
                                                 size="lg"
                                                 class="checkbox"
                                                 switch>
                                </b-form-checkbox>
                            </div>
                            <div class="activate">
                                <div class="info">
                                    <label class="admin-label">{{ product.Home ? 'Unpublish' : 'Publish' }} the product</label>
                                    <span class="description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nemo nostrum.
                                    </span>
                                </div>
                                <b-form-checkbox v-model="product.Home"
                                                 name="check-button"
                                                 :value="true"
                                                 :unchecked-value="false"
                                                 size="lg"
                                                 class="checkbox"
                                                 switch>
                                </b-form-checkbox>
                            </div>
                        </div>
                    </b-overlay>
                </b-tab>
            </b-tabs>

            <div>
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
    import { Vue, Component, Prop, Watch } from "vue-property-decorator"
    import { MainModule } from "../../store/main-module"
    import vueDropzone from 'vue2-dropzone'
    import Input from '../../components/Input.vue'
    import Dropdown from '../../components/Dropdown.vue'
    import Uploads from '../../views/Admin/components/Uploads.vue'

    @Component({
        components: { vueDropzone, Input, Dropdown, Uploads }
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

        // Images
        get dropzoneOptions() {
            return {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
                dictDefaultMessage: "<div class='add-photo'><span class='plus'>+</span><span>Add photo</span></div>"
            }
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
        loaded: boolean = false


        show() {
            this.product = {
                Active: false
            }
            MainModule.fetchCategories()
            this.modalType === 'EDIT'
                ? this.getData()
                : null
        }


        private getData() {
            this.loaded = true
            MainModule
                .fetchProduct(this.$route.query.productId)
                .then((res: Object) => {
                    this.product = res
                    this.loaded = false
                })
        }

        private selectColor(btn) {
            btn.Selected = !btn.Selected
        }

        private filesToUpload(files: any) {
            this.images = files.map((el: any) => el.file)
            console.log(files)
        }

        save(evt: any) {
            evt.preventDefault()
            this.product.Colors = this.colors
            this.product.ProductImage = this.images
            this.modalType === 'ADD'
                ? MainModule.saveProduct(this.product)
                : MainModule.editProduct(this.product)

            this.$bvModal.hide('add-product-modal')
        }

        setPrimary(img: any) {
            console.log(img)
        }

        deleteImage(img: any) {
            MainModule.deleteImage(img)
        }

        resetInfoModal() {
            this.product = {}
            this.colors.filter((el: any) => el.Selected = false)
            this.images = []
            MainModule.setModalType('')
            MainModule.setSelectedProduct({})

            this.$route.query.productId
                ? this.$router.replace({ 'query': {} })
                : null
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";

.header {
}

.settings {
    width: 50%;
    margin-top: 40px;
    .activate {
        display: grid;
        grid-template-columns: auto 20%;
        align-items: center;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 20px;
        padding-bottom: 10px;
        .info {
            display: grid;
            .admin-label {
                margin-bottom: 4px;
            }
            .description {
                font-size: 13px;
                font-weight: 500;
                color: #919191;
                width: 81%;
            }
        }
        .checkbox {
            padding-left: 6rem;
        }
    }
}

.modal-tabs {
    height: 500px;
}
.colors {
    width: 270px;
    button {
        outline: none;
        border: none;
        height: 42px;
        width: 42px;
        border-radius: 50px;
    }
    .color-selected {
        position: relative;
        &::before {
            position: absolute;
            content: url("../../../src/assets/img/check.svg");
            width: 23px;
            height: 23px;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            background: $primary-color;
            padding: 3px;
            border-radius: 10px;
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