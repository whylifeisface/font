import { createRouter, createWebHashHistory } from 'vue-router'
import five from '@/components/five/fiveIndex.vue'
import Two from '@/components/one/two/wtoIndex.vue'
import Home from '@/components/home/pageIndex.vue'
import Three from '@/components/three/threeIndex.vue'
import One from '@/components/one/TheIndex.vue'
import ThreeFromIndex from '@/components/three/form/FormItem.vue'
import Four from '@/components/four/FourIndex.vue'
import FourTable from '@/components/four/tableIndex.vue'

import seven from '@/components/seven/sevenIndex.vue'
import sevenfourfour from '@/components/seven/four/fourIndex.vue'
import sevenone from '@/components/seven/one/detail/oneIndex.vue'
import seventhree from '@/components/seven/three/threeIndex.vue'
import seventwo from '@/components/seven/two/twoIndex.vue'
import threeDetail from '@/components/seven/three/detail/detailIndex.vue'
import six from '@/components/six/sixIndex.vue'
import FormtwoIndex from '@/components/six/form/twoIndex.vue'
import sixone from '@/components/six/form/oneIndex.vue'
import FormthreeIndex from '@/components/six/form/threeIndex.vue'
import twoIndex from '@/components/six/router/twoIndex.vue'
import threeIndex from '@/components/six/router/threeIndex.vue'
import FourIndex from '@/components/six/router/fourIndex.vue'
import fiveIndex from '@/components/six/router/fiveIndex.vue'
import Login from '@/components/Login/LoginIndex.vue'
import wto from '@/components/two/twoIndex.vue'
import wtoattr from '@/components/two/table/attriTable.vue'
import eight from '@/components/eight/eightIndex.vue'
import ni from '@/components/ni/niIndex.vue'
import nitable from '@/components/ni/tabel/nitableIndex.vue'
import nitwotable from '@/components/ni/tabel/nitwoTableIndex.vue'
import nithreeTable from '@/components/ni/tabel/nithreeTableIndex.vue'
import tenIndex from '@/components/ten/tenIndex.vue'
import tenForm from '@/components/ten/tenForm/tenFormIndex.vue'
import tenDes from '@/components/ten/tenForm/desIndex.vue'
import llIndex from '@/components/ll/llIndex.vue'
import LLtwoIndex from '@/components/ll/IItwoIndex.vue'
import forIndex from '@/components/ll/forIndex.vue'
import fiv from '@/components/ll/fiveIndex.vue'
import sixIndex from '@/components/ll/sixIndex.vue'
import oneIndex from '@/components/III/oneIndex.vue'
import twoIndexs from '@/components/III/twoIndex.vue'
import oneiiIndex from '@/components/III/II/oneIndex.vue'
import fourtableform from '@/components/four/tableformIndex.vue'

import twoiiIndex from '@/components/III/II/twoIndex.vue'
import ti from '@/components/IIII/twoIndex.vue'

import oi from '@/components/IIII/OneIndex.vue'
import of from '@/components/IIII/oneForm.vue'

import ri from '@/components/IIII/threeIndex.vue'
import fi from '@/components/IIII/fourIndex.vue'

import wtoForm from '@/components/two/form/twoForm.vue'
import { useCookies } from 'vue3-cookies'



const { cookies } = useCookies();

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        children: [
          
            {
                path: '/FourTable',
                component: FourTable
            },
            {
                path: '/ri',
                component: ri
            },
            {
                path: '/fourtableform',
                component: fourtableform
            },
            {
                path: '/fi',
                component: fi
            },
            {
                path: '/two',
                component: Two
            },
            {
                path: '/oneiiIndex/:id',
                component: oneiiIndex
            },
            {
                path: '/twoiiIndex/:id',
                component: twoiiIndex
            },
            {
                path: '/ti',
                component: ti
            },
            {   
                path: '/oi/',
                component: oi,
            },
            {
                path: 'oi/of',
                component: of
            },
            {
                path: '/forIndex',
                component: forIndex
            },
            {
                path: '/twoIndexs',
                component: twoIndexs
            },
            {
                path: '/oneIndex',
                component: oneIndex
            },
            {
                path: '/sixIndex',
                component: sixIndex
            },
            {
                path: '/nithreeTable/:id',
                component: nithreeTable
            },
            {
                path: '/LLtwoIndex',
                component: LLtwoIndex
            },
            {
                path: '/fiv',
                component: fiv
            },
            {
                path: '/llIndex',
                component: llIndex
            },
            {
                path: '/tenDes/:id',
                component: tenDes
            },
            {
                path: '/tenForm',
                component: tenForm
            },
            {
                path: '/tenIndex',
                component: tenIndex
            },
            {
                path: '/nitwotable',
                component: nitwotable
            },
            {
                path: '/wto',
                component: wto
            },
            {
                path: '/ni',
                component: ni
            },
            {
                path: '/nitable',
                component: nitable
            },
            {
                path: '/wtoForm',
                component: wtoForm
            },
            {
                path: '/wtoattr/:id/:NAME',
                component: wtoattr,
                props: true
            },
            {
                path: '/eight/:id',
                component: eight
            },
            {
                path: '/four',
                component: Four
            },
            {
                path: '/one',
                component: One
            },
            {
                path: '/three',
                component: Three
            }, {
                path: '/seven',
                component: seven
            }, {
                path: '/sevenfourfourIndex',
                component: sevenfourfour
            },
            {
                path: '/seventhree',
                component: seventhree
            },
            {
                path: '/sevenone',
                component: sevenone
            },
            {
                path: '/seventwo',
                component: seventwo
            },
            {
                path: '/threeDetail/:id',
                component: threeDetail,
                props: true
            },
            {
                path: '/threeForm',
                component: ThreeFromIndex,

            },
            // 缺少父级 path:'/six'
            {
                path: '/six/:id',
                component: six,
                children:
                    [{
                        path: '/six/one/:id',
                        component: sixone
                    },
                    {
                        path: '/six/twoIndex/:id/',
                        component: FormtwoIndex,
                        children:[                    {
                            path: 'four',
                            component: FourIndex
                        }, {
                            path: 'two',
                            component: twoIndex
                        },
                        {
                            path: 'three',
                            component: threeIndex
                        },                     {
                            path: 'five',
                            component: fiveIndex
                        }, ]
                    },
                 
                    {
                        path: '/six/threeIndex',
                        component: FormthreeIndex
                    },



                    ]
            },
            {
                path: '/five',
                component: five
            }

        ]
    },


]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

//   router.beforeEach((to, from, next) => {
//     console.log("beforeEach");

//     // console.log(cookies.keys());
//     // cookies.set('key',"value")
//     // console.log(cookies.keys()); 

//     // if (document.cookie === '1') {
//     //   next()
//     // } else {      
//     //   if (to.path === "/login") {
//     //     next()
//     //   } else {
//     //     next('/login')
//     //   }
//     // }
//   })


router.afterEach(route => {
    console.log("afterEach");

    console.log(route);
    //these hooks do not get a next function and cannot affect the navigation}
    console.log(cookies.keys());

})
export default router