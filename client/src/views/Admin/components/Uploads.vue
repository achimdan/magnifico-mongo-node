<template>
    <div class="file-upload">
        <ul class="file-list">
            <li v-for="(file, index) in productImages"
                :key="file.id"
                class="list">

                {{file}}

                <img :src="`http://localhost:3000/uploads//${file}`"
                     alt=""
                     width="100"
                     height="100">

                <transition name="slide">
                    <div class="img-wrap"
                         v-if="file.thumb"
                         :style="{ backgroundImage: `url('${file.thumb}')` }">
                        <b-button type="button"
                                  class="remove-img"
                                  @click="removeImg(index)">
                            <font-awesome-icon :icon="['fas', 'eye']"
                                               class="icon alt" />
                        </b-button>
                    </div>
                </transition>

                <!-- <div class="info">
                        <div class="zone-loader">
                            <span class="title">{{file.name}}</span>
                            <div v-if="!file.success">
                                in progress
                            </div>
                            <div class="ok"
                                 v-else-if="file.response.WarningMessage === 'Upload successful'"></div>
                            <div class="warning"
                                 v-else>
                                <img src="/Scripts/Bootstrap/condensed/assets/img/warning.svg"
                                     alt="">
                            </div>
                        </div>
                        <div class="progress"
                             v-if="file.active || file.progress !== '0.00'">
                            <div :class="{'progress-bar': true, 'progress-bar-danger': (file.success && file.response.WarningMessage !== 'Upload successful'), 'progress-bar-animated': !file.success}"
                                 role="progressbar"
                                 :style="{width: file.progress + '%'}"></div>
                        </div>
                        <div class="messages">
                            <span v-if="file.error">{{file.error}}</span>
                            <span v-else-if="!file.success">Uploading...</span>
                            <span v-else-if="file.success">{{file.response.WarningMessage}}</span>
                            <span v-else></span>
                        </div>
                        <a class="dropdown-item"
                           href="#"
                           @click.prevent="$refs.upload.remove(file)">Remove</a>
                    </div> -->
            </li>
        </ul>
        <label :for="name"
               class="wrapper">
            <div class="upload-file">
                <div>
                    <img class="upload-file-svg"
                         src="/Scripts/Bootstrap/condensed/assets/img/upload-file.svg"
                         alt="">
                    <span class="upload-file-text">
                        Drag images here, or <span class="browse">Browse</span>
                    </span>
                </div>
                <!-- :post-action="postAction" -->
                <!-- @input-file="inputFile" -->
                <file-upload class="btn-add"
                             :data="data"
                             :accept="accept"
                             :name="name"
                             :multiple="true"
                             :directory="false"
                             :size="size || 0"
                             :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                             :drop="true"
                             :add-index="false"
                             v-model="files"
                             @input-filter="inputFilter"
                             ref="upload">
                    <!-- Add images -->
                </file-upload>
            </div>
        </label>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator';
    import { MainModule } from '../../../store/main-module';

    @Component
    export default class FileUploadComponent extends Vue {

        get productImages() {
            return MainModule.selectedProduct.ProductImage
        }

        $refs: {
            upload: HTMLFormElement
        }

        files: any = [];
        name = 'image';
        postAction = '/Images/UploadImage';
        data: any = { itemsPerPage: 12, page: 1, type: 'this.imagesType' };
        accept = 'image/png,image/gif,image/jpeg,image/webp';
        thread = 1;
        size = 1024 * 1024 * 10;
        autoCompress = 1024 * 1024;
        uploadAuto: boolean = true;

        @Watch('files')
        wFiles() {
            this.$emit('filesToUpload', this.files)
        }

        inputFilter(newFile: any, oldFile: any, prevent: any) {
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }

                // Thumbnails
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        }

        // add, update, remove File Event
        inputFile(newFile: any, oldFile: any) {
            // console.log(newFile)
            // if (newFile && oldFile) {
            //     // update
            //     if (newFile.active && !oldFile.active) {
            //         // beforeSend
            //         // min size
            //         if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            //             this.$refs.upload.update(newFile, { error: 'size' })
            //         }
            //     }
            //     if (newFile.progress !== oldFile.progress) {
            //         // progress
            //     }
            //     if (newFile.error && !oldFile.error) {
            //         // error
            //     }
            if (newFile && newFile.success && !oldFile.success) {
                console.log(newFile.progress);
                console.log(newFile.success);
                // newFile.response.Data ? ImagesModule.mutateRequestData(newFile.response) : null
            }
            // }
            // if (!newFile && oldFile) {
            //     // remove
            //     if (oldFile.success && oldFile.response.id) {
            //         // $.ajax({
            //         //   type: 'DELETE',
            //         //   url: '/upload/delete?id=' + oldFile.response.id,
            //         // })
            //     }
            // }
            // // Automatically activate upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
            }
        }

        private removeImg(index) {
            this.files.splice(index, 1)
        }

    }
</script>

<style lang="scss" scoped>
.file-upload {
    display: flex;
    .file-list {
        list-style: none;
        padding: 0;
        margin: 0%;
        display: flex;
        .list {
            display: flex;
            justify-content: space-between;
            width: 150px;
            padding: 10px;
            .img-wrap {
                width: 100%;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                position: relative;
                .remove-img {
                    position: absolute;
                    right: 0;
                }
            }
            .info {
                width: 88%;
                text-align: left;
                .zone-loader {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title {
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 30px;
                        color: #222222;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 90%;
                    }
                    .ok {
                        position: relative;
                        width: 17px;
                        height: 17px;
                        border-radius: 30px;
                        background-image: linear-gradient(
                            135deg,
                            #31ce94,
                            #a6f1cd
                        );
                        &:after {
                            content: "";
                            display: block;
                            width: 5px;
                            height: 9px;
                            border: solid #fff;
                            border-width: 0 2px 2px 0;
                            transform: rotate(45deg);
                            position: absolute;
                            left: 0;
                            right: 0;
                            margin: auto;
                            top: 0;
                            bottom: 3px;
                        }
                    }
                }
                .progress {
                    height: 4px !important;
                    border-radius: 10px;
                    .progress-bar {
                        background-image: linear-gradient(
                            89deg,
                            #a6f1cd,
                            #31ce94
                        );
                    }
                    .progress-bar-animated {
                        background-image: linear-gradient(
                            89deg,
                            #62ccd8,
                            #00a9f3
                        );
                    }
                    .progress-bar-danger {
                        background-image: linear-gradient(
                            89deg,
                            #ff9292,
                            #ff0000
                        );
                    }
                }
                .messages {
                    margin-top: 3px;
                    span {
                        display: block;
                        font-size: 12px;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .wrapper {
        width: 150px;
        margin: 0;
        padding: 10px;
        .upload-file {
            border: 1px dashed lightgrey;
            .upload-file-svg {
                width: 80px;
                display: block;
                margin: 90px auto 16px;
            }
            .upload-file-text {
                font-size: 15px;
                line-height: 30px;
                color: #666666;
                .browse {
                    color: #222222;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>