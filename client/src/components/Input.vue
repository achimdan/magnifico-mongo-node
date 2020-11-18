<template>
    <b-form-group :id="`input-group_${keyName.replace(/\s/g, '')}`"
                  class="nms-form-group"
                  :label="keyName"
                  :label-for="keyName.replace(/\s/g, '')">
        <b-form-input :id="keyName.replace(/\s/g, '')"
                      v-model="inputValue"
                      :type="type"
                      class="nms-input"
                      :disabled="disabled"
                      :required="required"
                      :placeholder="`Enter ${placeholder}`">
        </b-form-input>
    </b-form-group>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Inject, Watch } from 'vue-property-decorator';

    @Component
    export default class InputComponent extends Vue {

        @Prop() id!: any
        @Prop() required!: string
        @Prop() keyName!: string
        @Prop() type!: string
        @Prop() placeholder!: string
        @Prop() noLabel!: boolean
        @Prop() customClass!: boolean
        @Prop() disabled!: boolean

        @Prop() value!: null

        get inputValue() {
            return this.value
        }

        set inputValue(value) {
            this.$emit('input', value)
        }

    }
</script>

<style scoped lang="scss">
.api-form-group {
    .input-area {
        display: flex;
        margin-bottom: 24px;
        position: relative;
        .input-error {
            border: 1.2px solid #f22435;
        }
        .error-tooltip {
            position: absolute;
            right: 80px;
            bottom: -20px;
            font-size: 13px;
            color: #f22435;
        }
    }
}

@media screen and (max-width: 480px) {
    .api-form-group /deep/ {
        margin: 0 0 20px;
        div {
            width: 100%;
        }
    }
}
</style>