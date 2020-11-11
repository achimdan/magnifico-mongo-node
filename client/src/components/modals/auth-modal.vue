<template>
    <b-modal centered
             title="Add product"
             id="auth-modal"
             @show="show"
             hide-footer>

            <div class="flex mt-4">
                <button @click="facebook">
                    Facebook Login
                </button>
                <!-- <b-button pill
                          type="button"
                          class="cancel"
                          @click="$bvModal.hide('add-category-modal')">
                    Cancel
                </b-button> -->
            </div>

    </b-modal>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import { MainModule } from "../../store/main-module";
    import { AuthModule } from "../../store/auth-module";

    @Component({
        components: {}
    })
    export default class AuthModalComponent extends Vue {

        private show() {

        }

        private facebook() {
            AuthModule.faceBook()
            this.$bvModal.hide('auth-modal')
        }
        
    }
</script>