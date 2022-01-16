import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IBranch} from "~/Interfaces/Branch";
import {CBranch} from "~/classes/Branch";

class SomeBranch {
  constructor(public name: string, public id: string) {
  }
}

export const state = () => ({
  tree: {
    name: 'root',
    children: [
      {
        name: 'Shim',
        children: [
          {
            name: 'street',
            children: [
              {
                name: 'SomeCity',
                children: []
              }
            ]
          }
        ]
      },
      {
        name: 'Hello',
        children: [
          {
            name: 'ji',
            children: []
          }
        ]
      }
    ]
  } as IBranch
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tree: state => state.tree
}

export const mutations: MutationTree<RootState> = {
  ADD_BRANCH: (state, payload: {children: IBranch[], branch: CBranch}) => {
    payload.children.push(payload.branch)
  },
  SET_NEW_NAME: (state, payload: {branch: any, name: string}) => {
    payload.branch.name = ''
  }
}

export const actions: ActionTree<RootState, RootState> = {
  addBranch({commit}, payload: {children: IBranch[], branch: IBranch}){
    commit('ADD_BRANCH', payload)
  },
  setNewName({commit}, payload: {children: IBranch, name: string}) {
    commit('SET_NEW_NAME', payload)
  }
}
