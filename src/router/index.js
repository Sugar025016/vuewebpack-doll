import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Participate from '@/components/Participate'
import Products from '@/components/pages/Products'
import Custom from '@/components/pages/Custom'
import CustomChackout from '@/components/pages/CustomCheckout'
import FullCalendar from '@/components/pages/FullCalendar'
import Date from '@/components/pages/Date'
import Date2 from '@/components/pages/Date2'
import OpenDate from '@/components/pages/OpenDate'
import AddUser from '@/components/pages/AddUser'
import HomeBoard from '@/components/HomeBoard'
import Front from '@/components/pages/Front'
import SearchShopBoard from '@/components/SearchShopBoard'
import SearchShop from '@/components/pages/SearchShop'
import ShopBoard from '@/components/ShopBoard'
import ShopProduct from '@/components/pages/ShopProduct'
import Checkout from '@/components/pages/Checkout'
import Join from '@/components/pages/Join'
import ChangeUser from '@/components/pages/ChangeUser'
import OrderHistory from '@/components/pages/OrderHistory'
import OrderPay from '@/components/pages/OrderPay'
import OrderDetail from '@/components/pages/OrderDetail'
import Category from '@/components/pages/Category'
import Category2 from '@/components/pages/Category2'

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
export default new VueRouter({
    // mode:'history',//可以取消路徑的#
    routes: [
        {
            path:'*',
            redirect:'/shopBoard/shopProduct'
        },
        {
            name: '首頁',
            path: '/home',
            component: Home,
            meta:{requiresAuth:2}
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'participate',
            path: '/participate',
            component: Participate,
            meta:{requiresAuth:2}
        },
        
        {
            name: 'Home',
            path: '/homeBoard',
            component: HomeBoard,
            children:[
                {
                    name: '購物',
                    path: 'front',
                    component: Front,
                },
                ]
        },
        
        {
            name: 'SearchShopBoard',
            path: '/searchShopBoard',
            component: SearchShopBoard,
            children:[
                {
                    name: '搜尋商店',
                    path: 'searchShop',
                    component: SearchShop,
                },
                ]
        },
        
        {
            name: '商店',
            path: '/shopBoard',
            component: ShopBoard,
            children:[
                {
                    name: '商店產品',
                    path: 'shopProduct',
                    component: ShopProduct,
                },
                {
                    name: '結帳',
                    path: 'checkout',
                    component: Checkout,
                    meta:{requiresAuth:1},
                },
                {
                    name: '加入會員',
                    path: 'join',
                    component: Join,
                },
                {
                    name: '更改會員資料',
                    path: 'changeUser',
                    component: ChangeUser,
                    meta:{requiresAuth:1},
                },
                {
                    name: '模擬付款',
                    path: 'customer_checkout/:orderId',
                    component: CustomChackout,
                    meta:{requiresAuth:1},
                },
                {
                    name: '歷史訂單',
                    path: 'orderHistory',
                    component: OrderHistory,
                    meta:{requiresAuth:1},
                },
                {
                    name: '訂單付款',
                    path: 'orderPay/:orderId',
                    component: OrderPay,
                    meta:{requiresAuth:1},
                },
                {
                    name: '訂單明細',
                    path: 'orderDetail/:orderId',
                    component: OrderDetail,
                    meta:{requiresAuth:1},
                },
                ]
        },

        {
            name: '產品',
            path: '/dashboard',
            component: Dashboard,
            // meta:{requiresAuth:2},
            children:[
                {
                    name: '產品',
                    path: 'products',
                    component: Products,
                },
                {
                    name: 'fullCalendar',
                    path: 'fullCalendar',
                    component: FullCalendar,
                },
                {
                    name: 'date2',
                    path: 'date2',
                    component: Date2,
                },
                {
                    name: 'openDate',
                    path: 'openDate',
                    component: OpenDate,
                },
                {
                    name: '分類',
                    path: 'category',
                    component: Category,
                },
                {
                    name: '分類2',
                    path: 'category2',
                    component: Category2,
                },
                {
                    name: 'addUser',
                    path: 'addUser',
                    component: AddUser,
                },
                {
                    name: '模擬功能',
                    path: 'custom',
                    component: Custom,
                },
                {
                    name: '模擬付款',
                    path: 'customer_checkout/:orderId',
                    component: CustomChackout,
                },

            ]
        },
        // {
        //     name: '產品',
        //     path: '/',
        //     component: Dashboard,
        //     meta:{requiresAuth:2},
        //     children:[
        //         {
        //             name: '模擬功能',
        //             path: 'custom',
        //             component: Custom,
        //         },
        //         {
        //             name: '模擬付款',
        //             path: 'customer_checkout/:orderId',
        //             component: CustomChackout,
        //         },
        //     ]
        // },
    ]
});