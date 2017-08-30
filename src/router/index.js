import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Map from '@/components/Map'
import InfoTabs from '@/components/InfoTabs'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',
      name: 'infoTab',
      component: InfoTabs
      // children: [
      //   {
      //     path: 'map',
      //     component: Map
      //   }
      // ]
    }
  ]
})
