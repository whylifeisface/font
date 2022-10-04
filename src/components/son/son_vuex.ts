import { ActionTree, MutationTree } from "vuex";
import { sonState } from "@/components/interface/sonInterface";


const state:sonState = {
    args:''
}

const mutations:MutationTree<any> = {

}

const actions:ActionTree<any,any> = {

}
const namespaced: boolean = true


const sonstore = {
    state,
    mutations,
    actions,
    namespaced
}
export {
    sonstore
}