
<script>
// import { defineComponent } from '@vue/composition-api'
// import { da } from 'element-plus/es/locale'
import {GetReq} from '../axios/axios'

export default ({
    data() {
        
    },methods: {
      da() { 
        GetReq('api/PmsProductAttributeController/list',null).then(res=>{
        console.log(res)
        })}
    },mounted(){ 
      this.da()
    }
})
</script>




