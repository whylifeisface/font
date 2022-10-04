import { createStore,Store } from "vuex";
import theIndex from '@/components/one/theIndex_vuex'
import { InjectionKey } from 'vue'
import {sonstore} from '@/components/son/son_vuex'
import fiveIndexVuexState from '@/components/five/fiveIndex_vuex'
import vuexStore from '@/components/six/vuex'
 const store = createStore({
    modules:{
        theIndex,
        sonstore,
        fiveIndexVuexState,
        vuexStore
    }
})

 const key: InjectionKey<Store<any>> = Symbol()
export  {
    key,store
}