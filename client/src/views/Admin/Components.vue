<template>
    <div class="components">
        <h3 class="mb-4">
            Components
        </h3>

        <div class="admin-card">
            <h5 class="mb-4">Home component</h5>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { AuthModule } from "../../store/auth-module";

    @Component({
        components: {  }
    })
    export default class ComponentsAdminComponent extends Vue {
        get user() {
            return AuthModule.user
        }
    }
</script>

<style lang="scss" scoped>
</style>
