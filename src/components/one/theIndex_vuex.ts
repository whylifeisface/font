import { State,B } from '@/components/interface/pmsInterface'
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '@/components/vuex/rootState'
import { GetReq, PostReq } from '../axios/axios';
import array_length_to_0 from '../utils/array_length_to_0';
import { twoObject } from '../utils/twoObject';

const state: State = {
    Loaddata: [undefined],
    diavisible: false,
    total:0,
    dialogValue:0
};



let d: [any] = [''];
const mutations: MutationTree<any> = {
    splice(state: State, agrs: number) {
        console.log("args",agrs);
        
        state.Loaddata.splice(agrs,1)
    },
    xiugai(state:State,data){
        
        state.Loaddata[data.index] = twoObject(data, state.Loaddata[data.index])
        console.log(state.Loaddata[data.index]);
    },
    change(state: State,index) {
        state.diavisible = true
        state.dialogValue = index
        console.log("mutations change",state.dialogValue);
        
    },
    pagechange(state: State, data: any) {
        const array = state.Loaddata
        stateData(array, data.data)
    },
    init(state: State, data: any) {
        const array = state.Loaddata
        console.log(data);
        
        stateData(array, data.data)
        state.total = data.data.total
        console.log("state.Loaddata", state.Loaddata);

    },
    down(state: State, data:any) {
        console.log("saaaaasasass");
        console.log(data.data);
        
        state.Loaddata = array_length_to_0(state.Loaddata)
        console.log("array_length", state.Loaddata.length);

        data.data.list.forEach((element:any) => {
            console.log(element); 
            state.Loaddata.push(element)
        });
        state.total = data.data.total
        console.log("state.Loaddata", state.Loaddata);
    }

}



const getters: GetterTree<any, any> = {
    getLoadData(state: State) {
        return state.Loaddata;
    },
    getDialogVisible(state:State){
        return state.diavisible
    },
    getTotal(state:State){
        return state.total
    },
    getDialogValue(state:State){
        return state.dialogValue
    }
}



const actions: ActionTree<any, any> = {
    change(context,index) { 
        console.log("action change",index);
        
        context.commit('change',index.index)

        // del(index)
    },
    pagechange(context, pageNum: number) {
        d = array_length_to_0<any>(d)
        pagechange(pageNum)
        context.commit('pagechange')
    },
    init(context) {
        
        const s = initData(d);
        console.log(s);
        
        s.then(result => {
            context.commit({ type: 'init', data: result })
        })

    },

    down(context, id) {
        const s = down(id)
        s.then(result => {
            context.commit({ type: 'down', data: result });
        })
    },
    en(context,index){
        console.log("en index",index);
        
        console.log(context.getters['getLoadData']);
        
        console.log(context.getters['getLoadData'][index]);
        del(context.getters['getLoadData'][index].id)


        context.commit('splice',index)

    }
}


const namespaced: boolean = true



const del = (index: number) => {
    PostReq('api/PmsProductCategoryController/delete?id='+index ).then(data => {
        if (data.code == 200) {
            console.log();
        }
    })
}


const pagechange = (newpage: number) => {
    GetReq('api/PmsProductCategoryController/page' + newpage + '').then((data: any) => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.length; index++) {
                d.push(data.data)
            }
        }
    })
}

const initData: (d: any) => Promise<any> = async (d) => {
    
    await GetReq('api/PmsProductCategoryController/page?num=1&size=10').then(data => {
        if (data.code == 200) {
            d = data.data
        }
    })
    
        return d
}



const down: (id: number) => Promise<any> = async (id) => {
    console.log(id);
    let s:any = ''
    await GetReq('api/PmsProductCategoryController/parentId?id='+id + '&num=1&size=5' ).then(data => {
        if (data.code == 200) {
               console.log();
               s = data.data
        }
    })
    return s 
}

const stateData = (array: [any], data:any) => {
    array = array_length_to_0(array)
    console.log("array_length", array.length);
    console.log(data);
    
    data.list.forEach((element:any) => {
        // console.log(element); 
        array.push(element)
    });
    return array
}



const theIndex: Module<State, RootState> = {
    mutations, actions, namespaced, state, getters

}

export default theIndex


