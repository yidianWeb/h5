import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import Index from '@/components/Index'
import design from '@/components/design'
import masterpiece from '@/components/masterpiece'
import product from '@/components/product'
import productdetail from '@/components/productdetail'
import consultSubmit from '@/components/consultSubmit'
import about from '@/components/about'

Vue.use(Router)
Vue.prototype.axios= axios

export default new Router({
	mode:'history',
	 base: '/h5/',
     routes:[
       {
         path: '/',
         name: 'Index',
         component: Index
       },
       {
         path: '/design',
         name: 'design',
         component: design
       },
       {
        path: '/masterpiece',
        name: 'masterpiece',
        component: masterpiece
      },
       {
        path: '/product',
        name: 'product',
        component: product
      },
       {
        path: '/productdetail',
        name: 'productdetail',
        component: productdetail
      },
       {
        path: '/consultSubmit',
        name: 'consultSubmit',
        component: consultSubmit
      },
       {
        path: '/about',
        name: 'about',
        component: about
      }
     ]
})
