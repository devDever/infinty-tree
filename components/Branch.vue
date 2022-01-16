<template>
  <div class="tree">
    <div :style="indent" class="name">
      <span v-if="!showTreeEdit" @click="toggleChildren">
        {{ name }}
      </span>
      <div v-else>
        <input type="text" :value="name" @keypress.enter="editTree">
        <button @click="addDopTree()">
          add
        </button>
      </div>
      <div>
        <button @click="editTree">
          {{ showTreeEdit ? 'done' : 'edit' }}
        </button>
        <button>delete</button>
      </div>
    </div>
    <transition-group name="list" tag="div">
      <Branch
        v-if="showChildren"
        v-for="(child, index) in children"
        :key="index"
        :children="child.children"
        :name="child.name"
        :depth="depth + 1"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {IBranch} from "~/Interfaces/Branch";
import {Action} from "vuex-class";
@Component
export default class PageIndex extends Vue {
  showChildren: boolean = false
  showTreeEdit: boolean = false
  newBranchName: string = ''
  showButtons: boolean = false
  @Prop({type: Array,  required: true}) children!: IBranch[]
  @Prop({type: String, required: true}) name!: string
  @Prop({type: Number, required: true}) depth!: number
  @Action('modules/tree/addBranch') addBranch: any
  @Action('modules/tree/setNewName') setNewName: any
  get indent() {
    const colorHash = this.depth * 20
    return {
      fontWeight: this.children.length ? 'bold' : 'none',
      cursor: this.children.length ? 'pointer' : 'text',
      backgroundColor: `rgb(${colorHash}, 76, 114)`,
      paddingLeft: this.depth * 50 + 'px',
    }
  }

  addDopTree() {
    this.addBranch({
      children: this.children,
      branch: {
        name: this.name ,
        children: []
      }
    })
    this.showTreeEdit = false
  }

  saveBranchEdit(){
    this.setNewName(this.newBranchName)
  }

  editTree() {
    this.showTreeEdit = !this.showTreeEdit;
  }

  toggleChildren() {
    this.showChildren = !this.showChildren
  }
}
</script>

<style lang="scss" scoped>
.tree {
  .name {
    display: flex;
    color: #fff;
    justify-content: space-between;
    padding: 5px 0;
    button{
      border: none;
      background-color: #aaa;
      text-transform: uppercase;
    }
    span {
      margin-right: 100px;
    }
  }
}

.some{
  color: rgb(59, 76, 114);
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(-30px);
}
</style>
