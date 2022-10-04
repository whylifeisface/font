import { ActionTree, GetterTree, MutationTree } from "vuex";
import  {sixIndex_vuex_state} from '@/components/interface/vuex_interface'
import { formInput } from "../utils/formInput";

const actions:ActionTree<any,any> = {

}

const mutations:MutationTree<any> = {
    setone(state:sixIndex_vuex_state,data){
    state.one =  formInput(data)
    console.log("state.one", state.one);
    },
    settwo(state:sixIndex_vuex_state,data){
        state.two = formInput(data)
        console.log("state.two", state.two);
    },
    setthree(state:sixIndex_vuex_state,data){
        state.three = formInput(data)
        console.log("state.three", state.three);
    }
}

const getters:GetterTree<any,any> ={

}
const state:sixIndex_vuex_state = {
    one:{
        productCategoryName:'string',
        name:'string',
        subTitle:'string',
        brandName:'string'
        ,description:'string',
        productSn:'string',
        price:'string',
        originalPrice:'string',
        stock:'string',
        unit:'string',
        weight:'string',
        sort:'string'
    },
    two:{
        serviceIds: [],
        giftPoint:'string',
        giftGrowth:'string',
        usePointLimit:'',
        previewStatus:0,
        publishStatus:0,
        recommandStatus:0,
        newStatus:0,
        detailTitle:'string',
        detailDesc:'string',
        keywords:'string',
        note:'string'
    },
    three:{
        price:0,
        stock:0,
        low_stock:0,
        sku_code:0,
        inputList:'string',
        name:'string'
    }
}


const vuexStore = {
    state,mutations,actions,getters
}
export default vuexStore

