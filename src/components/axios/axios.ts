import axios from "axios";
import {ElMessage} from 'element-plus'

axios.defaults.withCredentials = true;



axios.interceptors.response.use(success => {
    if (success.status&&success.status == 200) {
        if(success.data.code==500||success.data.code==403||success.data.code==401){
            ElMessage.error({message:success.data.message})
            return;
        }
        if (success.data.message) {
            ElMessage.success({message:success.data.message})
        }
        return success.data;
    }

}
// ,error => {
//     if (error.data.code == 500||error.data.code == 404) {
//         ElMessage.error({message:'出现错误,请联系管理员.'})
//     }
//     return;
// }
)


export const GetReq = function(url: string,data?: Object){ 
    
    return axios({
    method:'get',
    url:url,
    data:data,
    withCredentials: true
})
}
export const  PostReq=function(url: string ,data?: Object){
return axios({
    headers: {
        'Content-Type': 'application/json'
    },
    method:'post',
    url:url,
    data:data,
    withCredentials: true
})
}
// contentType:'application/json; charset=UTF-8',
