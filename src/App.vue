<template>
  <div id="app">
    <header>
      <span v-if="isMobileDevice ==false" >Badminton map - 羽球地圖</span>
      <b-navbar style="z-index:300" v-if="isMobileDevice" type="dark" variant="info">
        Badminton map - 羽球地圖 
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-nav is-nav-bar>
            <b-nav-form>
              <b-button size="md" v-on:click="showSelectTime">日期 時間選擇</b-button>
            </b-nav-form>
          </b-nav>

        </b-collapse>
      </b-navbar>

    </header>
    <main>
      <b-modal ref="dateSelector" title="日期" @ok="handleOk" ok-only size="sm">
        <mobile-select-time :weekDaysOptions="weekDaysOptions" :selectedDays="selectedDays" :startTimeOptions="startTimeOptions" :selectedTime="selectedTime" > </mobile-select-time>
      </b-modal>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import MobileDetect from 'mobile-detect'
import MobileSelectTime from '@/components/MobileSelectTime'
import globalevent from './eventbus'
export default {
  name: 'app',
  components: {
    MobileSelectTime
  },
  async created () {
    try {
      var today = new Date()
      var md = new MobileDetect(window.navigator.userAgent)
      this.isMobileDevice = md.mobile() != null
      var todayWeekday = today.getDay()
      // default 2 days
      this.selectedDays.push(todayWeekday)
      this.selectedDays.push(todayWeekday + 1 > 6 ? 0 : todayWeekday + 1)
      globalevent.$on('test', this.changeTimeSelect)
    } catch (ex) {
      alert(ex)
    }
  },
  data () {
    return {
      isMobileDevice: false,
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }],
      selectedDays: [],
      selectedTime: { from: 0, to: 12 },
      startTimeOptions: [
        { text: '整天', value: '' },
        { text: '中午十二點前', value: { from: 0, to: 12 } },
        { text: '中午至下午六點', value: { from: 12, to: 18 } },
        { text: '晚上六點後', value: { from: 18, to: 24 } }
      ]
    }
  },
  methods: {
    showSelectTime () {
      this.$refs.dateSelector.show()
    },
    changeTimeSelect (data) {
      console.log('sdsds' + data.selectedTime.from)
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 1em;
}

header {
  margin: 0;
  height: 56px;
  background-color: #4fc08d;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
