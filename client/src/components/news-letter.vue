<template>
    <div class="news-letter">
        <span class="title">
            Newsletter
        </span>

        <b-form @submit="save"
                class="news-letter-form">
            <Input :keyName="''"
                   :placeholder="`your email`"
                   :type="'email'"
                   :required="true"
                   :customClass="'news-letter-input'"
                   :value="email"
                   v-model="email" />

            <b-button type="submit"
                      class="submit">
                Sign up
            </b-button>
        </b-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import Input from '@/components/Input.vue'
    import { MainModule } from "../store/main-module";

    @Component({
        components: { Input }
    })
    export default class NewsLetterComponent extends Vue {

        email: string = ''

        private save(ev: any) {
            ev.preventDefault()
            const newsletter = {
                email: this.email
            }
            MainModule.subscribeToNewsletter(newsletter)
            this.email = ''
        }

    }
</script>

<style lang="scss" scoped>
.news-letter {
    height: 200px;
    background: #e0e0e0;
    padding: 30px 0;
    .title {
        text-align: center;
        text-transform: uppercase;
        font-size: 25px;
        font-weight: bold;
        display: block;
        margin-bottom: 20px;
    }
    .news-letter-form {
        display: flex;
        justify-content: center;
        .app-form-group {
            width: 400px;
        }
        .submit {
            height: 50px;
            border-radius: 0;
            margin-left: 0px;
            width: 100px;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: bold;
            background: #fc615d;
            border: none;
        }
    }
}
</style>
