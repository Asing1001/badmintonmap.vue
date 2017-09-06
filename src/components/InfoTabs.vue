<template>
  <div id="app" class="col-12">
    <pulse-loader :loading="loading" style="margin-top:50px"></pulse-loader>
    <div v-if="!loading">
      <!--Website-->
      <b-form inline v-if="isMobileDevice== false" style="margin-bottom:.5em">
        <b-form-checkbox @change="setFilteredBadmintonInfos" v-for="(weekDay, index) in weekDaysOptions" :key="index" v-model="selectedDays"   :value="weekDay.value">{{weekDay.label}}</b-form-checkbox>
        <b-form-select @input="setFilteredBadmintonInfos" v-model="selectedTime" :options="startTimeOptions">
        </b-form-select>
      </b-form>
      <b-tabs small v-if="!loading && isMobileDevice== false">
        <b-tab title="General map" active>
          <bad-map class="gmap" :badmintonInfos="filteredBadmintonInfos" :center="currentLocation" @update="locationUpdate"></bad-map>
        </b-tab>
        <b-tab title="List Location Info">
          <bad-table :badmintonInfos="filteredBadmintonInfos"></bad-table>
        </b-tab>
      </b-tabs>
      <!--Mobile Device-->
      <b-tabs small v-if="!loading && isMobileDevice">

      </b-tabs>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BadMap from '@/components/BadMap'
import BadTable from '@/components/BadTable'
import MobileDetect from 'mobile-detect'

export default {
  name: 'app',
  components: {
    PulseLoader,
    BadMap,
    BadTable
  },
  async created () {
    try {
      var md = new MobileDetect(window.navigator.userAgent)
      this.isMobileDevice = md.mobile() != null
      const responses = await Promise.all([
        fetch(process.env.API_HOST + '/api/locationinfolist'),
        fetch(process.env.API_HOST + '/api/badmintoninfolist')]
      )
      const [locationInfos, badmintonInfos] = await Promise.all(responses.map(res => res.json()))
      this.filteredBadmintonInfos = this.badmintonInfos = badmintonInfos.map(badmintonInfo => {
        badmintonInfo.location = locationInfos.find(({ name }) => badmintonInfo.location === name)
        return badmintonInfo
      })
      var today = new Date()
      this.loading = false
      this.todayWeekday = today.getDay()
      // default 2 days
      this.selectedDays.push(this.todayWeekday)
      this.selectedDays.push(this.todayWeekday + 1 > 6 ? 0 : this.todayWeekday + 1)
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ 'coords': { 'latitude': lat, 'longitude': lng } }) => {
          this.currentLocation = { lat, lng }
        })
        this.locationUpdate(this.currentLocation)
      }
      this.setFilteredBadmintonInfos()
    } catch (ex) {
      alert(ex)
    }
  },
  data () {
    return {
      currentLocation: { lat: 25.079613, lng: 121.556082 },
      loading: true,
      todayWeekday: 1,
      badmintonInfos: [],
      filteredBadmintonInfos: [],
      selectedDays: [],
      selectedTime: '',
      startTimeOptions: [
        { text: '整天', value: '' },
        { text: '中午十二點前', value: { from: 0, to: 12 } },
        { text: '中午至下午六點', value: { from: 12, to: 18 } },
        { text: '晚上六點後', value: { from: 18, to: 24 } }
      ],
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }],
      isMobileDevice: false
    }
  },
  methods: {
    setFilteredBadmintonInfos () {
      this.filteredBadmintonInfos = this.badmintonInfos
        .filter(({ weekDayInt, startHour }) => {
          const inSelectedDays = this.selectedDays.indexOf(weekDayInt) !== -1
          const inSelectedTime = !this.selectedTime || (startHour >= this.selectedTime.from && startHour < this.selectedTime.to)
          return inSelectedDays && inSelectedTime
        })
    },
    locationUpdate (val) {
      var self = this
      this.badmintonInfos.forEach(badmintonInfo => {
        badmintonInfo.distance = getDistanceInKM(self.currentLocation['lng'], self.currentLocation['lat'], badmintonInfo.location.position.lng, badmintonInfo.location.position.lat)
      })
      this.setFilteredBadmintonInfos()
    }
  }
}

function getDistanceInKM (lon1, lat1, lon2, lat2) {
  var R = 6371 // Radius of the earth in km
  var dLat = getRadians(lat2 - lat1)  // Javascript functions in radians
  var dLon = getRadians(lon2 - lon1)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(getRadians(lat1)) * Math.cos(getRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return Math.round(d * 10) / 10
}

function getRadians (num) {
  return (num) * Math.PI / 180
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gmap {
  height: 600px;
}
</style>
