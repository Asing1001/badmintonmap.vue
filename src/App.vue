<template>
  <div id="app">
    <header>
      <span v-if="isMobileDevice ==false" >Badminton map - 羽球地圖</span>
      <b-navbar v-if="isMobileDevice" type="dark" variant="info">
        Badminton map - 羽球地圖 {{showSelectTime}}
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-nav is-nav-bar>
            <b-button  v-on:click="showSelectTime == true">日期選擇</b-button>
          </b-nav>

        </b-collapse>
      </b-navbar>

    </header>
    <main>
      <mobile-select-time v-if="showSelectTime" :showSelectTime="showSelectTime" :weekDaysOptions="weekDaysOptions" :selectedDays="selectedDays" ></mobile-select-time>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import MobileDetect from 'mobile-detect'
import MobileSelectTime from '@/components/MobileSelectTime'
export default {
  name: 'app',
  components: {
    MobileSelectTime
  },
  async created () {
    try {
      var md = new MobileDetect(window.navigator.userAgent)
      this.isMobileDevice = md.mobile() != null
    } catch (ex) {
      alert(ex)
    }
  },
  data () {
    return {
      isMobileDevice: false,
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }],
      selectedDays: [],
      showSelectTime: true
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
