<template>
    <div>
        <label v-if="label">Category</label>
        <b-dropdown id="dropdown"
                    block
                    :text="setItem.Name"
                    :class="{'admin-dropdown' : admin}">
            <b-dropdown-item v-for="(item, index) in options"
                             @click="setItem = item"
                             :key="index">
                {{item.Name}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

    @Component
    export default class DropdownComponent extends Vue {

        @Prop() admin: boolean
        @Prop() options: any
        @Prop() name: any
        @Prop() label: boolean

        setItem: any = {}

        @Watch('setItem')
        selectedItem(value: any) {
            this.$emit('input', value !== this.name ? value : null)
        }

        get compOptions() {
            return this.options
        }

        set compOptions(value) {
            this.$emit('input', value)
        }

        created() {
            this.setItem = {
                Name: this.name
            }
        }

    }
</script>
