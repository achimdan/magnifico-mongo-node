<template>
    <section class="home-container">
        <div class="main">
          ABOUT
            <div class="grid-1">
                <img src="https://bridge193.qodeinteractive.com/wp-content/uploads/2018/03/home-single-image-1.jpg"
                     alt="">
            </div>
            <div class="grid-2">
                <div class="item"
                     v-for="item in Items"
                     :key="item.Id">
                    <div class="description">
                        <p>{{item.Name}}</p>
                        <p>from: {{item.Price}}</p>
                    </div>
                    <img :src="item.DownloadURL"
                         alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { fireDb } from "../firebaseConfig";
    import firebase, { firestore, storage } from "firebase/app";
    import "firebase/storage";

    @Component({
        components: { }
    })
    export default class PostPreview extends Vue {

        Items: Array<{}> = []

        created() {
			
            fireDb
                .collection("products")
                .orderBy("Name")
                .onSnapshot((querySnapshot: any) => {
                    this.Items = []
                    querySnapshot.forEach((doc: any) => {
                        const data = {
                            Id: doc.id,
                            Name: doc.data().Name,
                            Category: doc.data().Category,
                            Description: doc.data().Description,
                            DownloadURL: doc.data().DownloadURL
                        }
                        this.Items.unshift(data)
                        console.log(this.Items)
                    })
                })
        }

    }
</script>

<style lang="scss" scoped>
.home-container {
    .main {
        display: grid;
        grid-template-columns: 50% auto;
        grid-gap: 30px;
        .grid-1 {
            img {
                width: 100%;
            }
        }
        .grid-2 {
            grid-template-columns: 50% auto;
            // grid-template-rows: 50% auto;
            grid-column-gap: 30px;
            grid-row-gap: 30px;
            display: grid;
            .item {
                // height: 300px;
                overflow: hidden;
                position: relative;
                .description {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                }
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>
