<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" style="z-index:2" type="dark">
        <b-navbar-brand href="#">Badminton map - 羽球地圖</b-navbar-brand>
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-nav is-nav-bar>
            <b-nav-form>
              <b-button class="d-lg-none d-xl-none" v-b-modal.filter v-b-toggle.nav_collapse>Selection Filter</b-button>
            </b-nav-form>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main>
      <b-modal id="filter" title="日期" ok-only size="sm">
        <mobile-select-time :weekDaysOptions="weekDaysOptions"  :startTimeOptions="startTimeOptions"> </mobile-select-time>
      </b-modal>

      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import MobileSelectTime from '@/components/MobileSelectTime'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    MobileSelectTime
  },
  async created () {
    try {
      var today = new Date()
      var todayWeekday = today.getDay()
      // default 2 days
      var selectedDays = []
      selectedDays.push(todayWeekday)
      selectedDays.push(todayWeekday + 1 > 6 ? 0 : todayWeekday + 1)
      this.changeSelectedDays(selectedDays)
      this.changeSelectDaysTime('')
    } catch (ex) {
      alert(ex)
    }
  },
  data () {
    return {
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }],
      startTimeOptions: [
        { text: '整天', value: '' },
        { text: '中午十二點前', value: { from: 0, to: 12 } },
        { text: '中午至下午六點', value: { from: 12, to: 18 } },
        { text: '晚上六點後', value: { from: 18, to: 24 } }
      ]
    }
  },
  methods: {
    ...mapActions([
      'changeSelectedDays',
      'changeSelectDaysTime'
    ])
  }
}
</script>

<style lang="scss">
@import "./_vars.scss";

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
  nav {
    background-color: #4fc08d!important;
  }
}

.modal-body {
  overflow: auto;
}

@media (max-width: $mobile) {
  header {
      padding: 0;
  }
}
</style>
