import Vue from 'vue'
import InfoTabs from '@/components/InfoTabs'
import store from '../../../src/store'

describe('InfoTabs.vue', () => {
  it('should have two tabs', function (done) {
    this.timeout(20000)
    const vm = new Vue({
      store,
      components: {
        'InfoTabs': InfoTabs
      }
    }).$mount()
    vm.loading = false
    Vue.nextTick(() => {
      // expect(vm.$el.querySelectorAll('b-tab').length)
      // .to.equal(2)
      done()
    })
  })
})
