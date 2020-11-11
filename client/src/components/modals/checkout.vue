<template>
    <b-modal centered
             title="Checkout"
             id="checkout-modal"
             @show="show"
             @hide="resetInfoModal"
             hide-footer>
             <!-- <v-stepper :steps="steps" v-model="step"></v-stepper> -->
            <template v-if="step === 1">
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
                                @click="$bvModal.hide('checkout-modal')">
                            Cancel
                        </b-button>
                    <button type="button"
                            @click="step === 2">
                        Next
                    </button>
                    </div>
                </b-form>
            </template>
            <template v-if="step === 2">
                <!-- Step 2 Content -->
                step === 2
            </template>
            <template v-if="step === 3">
                <!-- Step 3 Content -->
                step === 3
            </template>
    </b-modal>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    // import { VStepper } from 'vue-stepper-component';
    import { MainModule } from "../../store/main-module";
    import Input from '@/components/Input.vue'

    @Component({
        components: { Input }
    })
    export default class CheckoutModalComponent extends Vue {

        steps: any = 3
        step = 1
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