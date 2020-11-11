<template>
    <div class="search">
        <input type="text" class="search-input" placeholder="search">
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {  }
    })
    export default class HeaderComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
.search {
    .search-input {
        outline: none;
        display: block;
        width: 100%;
        border-radius: 0;
        border: 0;
        height: 70px;
        border-bottom: 1px solid lightgray;
        text-indent: 10px;
    }
}
</style>
