import { ActionTree, GetterTree, MutationTree } from "vuex"
import { GetReq, PostReq } from "../axios/axios";
import array_length_to_0 from "../utils/array_length_to_0";
import deleteKeyIfnull from "../utils/deleteKeyIFnull";
import {map1,map2}  from '@/components/map/fiveIndex_map'
import { IntegerToString } from "../utils/integerToString";
import {fiveIndex_vuex_state} from '@/components/interface/vuex_interface'

const state:fiveIndex_vuex_state = {
    visible:false,
    tableData:[
        {
            parentId: 0,
            id: 0, 
            name: 'string', 
            level: 0,
            productCount: 0,
            productUnit: 'string',
            navStatus: 'string',
            showStatus: 0,
            sort: 0,
            icon: 'string', 
            keywords: 'string', 
            description: 'string',
            index:'string'
        }
    ],
    total:0,
    dialogValue:0,
    diaTable:[{
        verifyStatus:'string|null'
        ,publishtatus:'string|null'
        ,brandName:'string|null'
        ,productCategoryName:'string|null'
        ,productSn:'string|null'
        ,name:'string|null'
    }],
    dialogTableVisible:false
}

const mutations:MutationTree<any> = {
    init(state:fiveIndex_vuex_state,data){
        array_length_to_0(state.tableData)
        console.log("init data",data);
        console.log("init data list ",data.list);
        
        // data.list.foreach( (e:any) =>{
        //     state.tableData.push(e)
        // })
        for (let index = 0; index < data.list.length; index++) {
            state.tableData.push(data.list[index])
        }
        state.total = data.total
    },
    change(state:fiveIndex_vuex_state,id){
        // array_length_to_0(state.tableData)
        console.log("mutations change", state.visible);
        
        state.visible = true
        state.dialogValue = id
    },
    toFalse(state:fiveIndex_vuex_state){
        array_length_to_0(state.tableData)

        state.dialogTableVisible = false
    },
    initTableData(state:fiveIndex_vuex_state,data){
        array_length_to_0(state.tableData)
        console.log("initTableData data",data);

        for (let index = 0; index < data.list.length; index++) {
            state.tableData.push(data.list[index])
        }
        state.total = data.total

    },
    search(state:fiveIndex_vuex_state,data){
        array_length_to_0(state.tableData)
        console.log("search data",data);

        data.foreach((el:any) =>{
            state.tableData.push(el)
        })
    },
    page(state:fiveIndex_vuex_state,data){
        array_length_to_0(state.tableData)
        console.log("page data",data);

        for (let index = 0; index < data.list.length; index++) {
            state.tableData.push(data.list[index])
        }
    },
    en(state:fiveIndex_vuex_state,id){
        for (let index = 0; index < state.tableData.length; index++) {
            if (state.tableData[index].id == id) {
                state.tableData.splice(id,1)
            }
            
        }
    }
    

}

const actions:ActionTree<any,any> = {

    init(context){
        const s = init_data();
        s.then((result:any) =>{
            context.commit('init',result)
        })
    },
    initTableData(context,id){
       const s = init_dia_data(id)
       s.then(result => {
        context.commit('initTableData',result)
       })
    },
    search(context,model){
        search(model).then((result:any) => {
            context.commit('search',result)
        })
    },
    page(context,pageNum){
        page(pageNum).then(data =>{
            context.commit('page',data)
            
        })
    },
    en(context){
       const id = context.getters.getdialogTableVisible()
       console.log("en getdialogTableVisible",id);
       en(id)
       context.commit('en',id)
    }

}












const getters:GetterTree<any,any> = {
    getVisible(state:fiveIndex_vuex_state){
        console.log("getters  getVisible",state.visible);
        
        return state.visible
    },
    getTableData(state:fiveIndex_vuex_state){
        return state.tableData
    },
    getTotal(state:fiveIndex_vuex_state){
        return state.total
    },
    getdialogTableVisible(state:fiveIndex_vuex_state){
        return state.dialogTableVisible
    },
    getdiaTable(state:fiveIndex_vuex_state){
        return state.diaTable
    }
   
}














const namespaced = true




const page = async (now:number)=>{
   let s:any = ''

  await  GetReq("api/PmsProductController/page?size=5&num="+now).then(data => {
        if (200 == data.code) {
            s = data.data
        }
    });
    return s 
}



const search = async (data:any) => {
   let s:any = ''
   data = deleteKeyIfnull(data)
   data.publishtatus =IntegerToString(data.publishtatus,map1)
   data.verifyStatus =IntegerToString(data.verifyStatus,map2)

   const  json =  JSON.stringify(data)
   console.log("search json",data);

   await PostReq('api/PmsProductController/search?size=5&num=1',json).then(data => {
            if (data.code == 200) {
                s = data.data
            }
        })
        return s;
}


const init_data =async ()=>{    
    let s:any = '';
    await GetReq("api/PmsProductController/page?size=5&num=1").then(data => {
        if (200 == data.code) {
            s = data.data
        }
    });
    return s 
}


const init_dia_data =  async (id:number) =>{
    let s:any = ''
   await GetReq("/api/pmsSkuStockController/se?id=" + id + "").then(data => {
        console.log(data.data);
        if (200 == data.code) {
           s = data.data
        }
    });
    return s;
}


// const en = (data:any)=>{
//     let s:any = '';
//     PostReq('',JSON.stringify(data)).then(
//         if (data.code == 200) {
            
//         }
//     )
// }
const en = (id:number)=>{
    PostReq('api/pmsSkuStockController/del?index='+id).then(data => {
        if (data.code == 200) {
            console.log();
        }
    })
}
const fiveIndexVuexState = {
    mutations,actions,getters,namespaced,state
}

export default fiveIndexVuexState
