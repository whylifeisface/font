<template>

<div>

        
<FormIndex></FormIndex>

<TableIndex></TableIndex>

<DialogIndex></DialogIndex>

<FiveCardIndex></FiveCardIndex>

<MyDialogIndex :visible="visible" mes="是否要进行删除操作" @show="en"></MyDialogIndex>

</div>




</template>

<script>
import { GetReq } from '../axios/axios';
import TableIndex from './tableIndex.vue';
import DialogIndex from './dialogIndex.vue';
import FiveCardIndex from './fiveCardIndex.vue';
import FormIndex from './FIVE/FormIndex.vue';
import MyDialogIndex from '../son/myDialogIndex.vue';
import { mapActions, mapGetters } from 'vuex';

export default{ 
    // components:{
    //     FormIndex
    // },
    data() {
        return {
            tableData: [],
            dialogTableVisible: false,
            dataTable: [],
            total: "",
            // visible:false
        };
    },
    computed:{

       ...mapGetters({
        visible:'fiveIndexVuexState/getVisible'
    })
    },
    created() {
        this.load();
    },
    methods: {
        ...mapActions({
            en:'fiveIndexVuexState/en'
        })
        ,
        page(now) {
            console.log(now);
            console.log("111");
            this.tableData.length = 0;
            GetReq("api/PmsProductController/page?size=5&num=" + now).then(data => {
                if (200 == data.code) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.tableData.push(data.data[index]);
                    }
                }
            });
        },
        load() {
            GetReq("api/PmsProductController/page?size=5&num=1").then(data => {
                if (200 == data.code) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.tableData.push(data.data[index]);
                    }
                }
            });
            GetReq("api/PmsProductController/se").then(data => {
                if (200 == data.code) {
                    this.total = data.data;
                }
            });
        },
        editxx(index) {
            console.log(index);
            this.$router.push("/six/" + index);
        },
        sku(id) {
            console.log(id);
            // this.dataTable.length = 0
            this.dialogTableVisible = true;
            GetReq("/api/pmsSkuStockController/se?id=" + id + "").then(data => {
                console.log(data.data);
                if (200 == data.code) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.dataTable.push(data.data[index]);
                    }
                }
            });
        },
        delxx(index) {
            console.log(index);
            this.tableData.splice(index, 1);
        },
        shenhe() { }
    },
    components: { TableIndex, DialogIndex, FiveCardIndex, FormIndex, MyDialogIndex }
}
</script>
<style>
    .ion{
        font-size: 25px;
    }
</style>