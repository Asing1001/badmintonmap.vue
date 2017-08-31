import Vue from 'vue'
import InfoTabs from '@/components/InfoTabs'

describe('InfoTabs.vue', () => {
  it('should have two tabs', function (done) {
    this.timeout(20000)
    const Constructor = Vue.extend(InfoTabs)
    const vm = new Constructor().$mount()
    vm.loading = false
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('b-tab').length)
      .to.equal(2)
      done()
    })
  })
})
