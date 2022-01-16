<template>
  <div>
    <Branch :name="tree.name" :children="tree.children" :depth="1"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Getter} from "vuex-class";
import {IBranch} from "~/Interfaces/Branch";

@Component
export default class PageIndex extends Vue {
  @Getter('modules/tree/tree') tree!: IBranch
}
</script>

<style lang="scss" scoped>
.row {
  h2 {
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
