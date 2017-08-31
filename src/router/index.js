import Vue from 'vue'
import Router from 'vue-router'
// import Map from '@/components/Map'
import InfoTabs from '@/components/InfoTabs'

Vue.use(Router)

export default new Router({
  routes: [
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
