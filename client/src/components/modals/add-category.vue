<template>
    <b-modal centered
             title="Add product"
             id="add-category-modal"
             @show="show"
             @hide="resetInfoModal"
             hide-footer>
        <b-form @submit="save">
            <Input :keyName="'Name'"
                   :placeholder="`name`"
                   :type="'text'"
                   :required="true"
                   :value="category.Name"
                   v-model="category.Name" />
            <Input :keyName="'Description'"
                   :placeholder="`description`"
                   :type="'text'"
                   :required="true"
                   :value="category.Description"
                   v-model="category.Description" />

            <div class="flex mt-4">
                <b-button pill
                          type="submit"
                          class="mr-2 save">
                    Save
                </b-button>
                <b-button pill
                          type="button"
                          class="cancel"
                          @click="$bvModal.hide('add-category-modal')">
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

    @Component({
        components: { Input }
    })
    export default class AddCategoryModalComponent extends Vue {

        category: any = {}

        show() { }

        save(evt: any) {
            evt.preventDefault()
            MainModule.saveCategory(this.category)
        }

        resetInfoModal() {
            // MainModule.resetModalFata()
        }
    }
</script>