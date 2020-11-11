<template>
    <div class="profile">
        Profile
        <img :src="user.photoURL" alt="" width="150">
        Order status
        <br>
        My orders
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { AuthModule } from "../../store/auth-module";

    @Component({
        components: {  }
    })
    export default class ProfileAdminComponent extends Vue {
        get user() {
            return AuthModule.user
        }
    }
</script>

<style lang="scss" scoped>
</style>
