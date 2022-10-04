import { B,AC, AB, two, three } from "@/components/interface/pmsInterface";


interface fiveIndex_vuex_state {
    visible:Boolean,
    tableData:[B],
    total:number
    dialogValue:number,
    diaTable:[AC]
    dialogTableVisible:Boolean,
}
interface sixIndex_vuex_state {
    one:AB
    two:two,
    three:three
}


export{
    fiveIndex_vuex_state,sixIndex_vuex_state
}