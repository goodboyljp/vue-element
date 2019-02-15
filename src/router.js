import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/list1',
      name: "home",
      component: resolve => require(['@/views/home/page'],resolve),
      children:[{
          path:'/list1',
          name:'List1',
          component: resolve => require(['@/views/list1/page'],resolve)
      },{
          path:'/editor/:type',
          name:'editor',
          component: resolve => require(['@/views/list1/editor/page'],resolve)
      }]
    },
    {
        path: "/login",
        name: "Login",
        component: resolve => require(['@/views/login/page'],resolve)
    }
  ]
});
