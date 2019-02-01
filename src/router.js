import Vue from "vue";
import Router from "vue-router";
import Home from '@/views/Home.vue';
import Category from '@/components/Category';
import Product from '@/components/Product';
import Checkout from '@/components/Checkout';
import Order from '@/components/Order';
import Complete from '@/components/Complete';
import supriseMe from '@/views/supriseMe';
import deliveryInfo from '@/views/deliveryInfo';
import faq from '@/views/faq';
import ourStory from '@/views/ourStory';
import contactUs from '@/views/contactUs';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      name:"home",
      component:Home
    },
    {
      path:'/category/:category/:subcategory',
      name: 'category',
      component:Category,
      props:true
    },
    {
      path:'/product/:id',
      name:'product',
      component:Product,
      props:true
    },
    {
      path:'/charge',
      name:'checkout',
      component:Checkout,
    },
    {
      path:'/order',
      name:'order',
      component:Order,
      props:true,
      beforeEnter(to, from , next){
        console.log(from.path);
        if(from.path != '/charge'){
          next('/')
        }else{
          next()
        }
      }
    },
    {
      path:'/order-complete/:id',
      name:'order-complete',
      component:Complete
    },
    {
      path:'/supriseme',
      name:'supriseMe',
      component:supriseMe
    },
    {
      path:'/deliveryinfo',
      name:'deliveryInfo',
      component:deliveryInfo
    },
    {
      path:'/faq',
      name:'faq',
      component:faq
    },
    {
      path:'/ourstory',
      name:'ourStory',
      component:ourStory
    },
    {
      path:'/contactus',
      name:'contactUs',
      component:contactUs 
    },

  ]
});
