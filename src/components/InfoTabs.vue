<template>
  <div class="col-12">
    <pulse-loader :loading="loading" style="margin-top:50px"></pulse-loader>
    <div v-if="!loading">
      <!--Website-->
      <b-form inline class="d-none d-lg-flex d-xl-flex" style="margin-bottom:.5em">
        <b-form-checkbox v-for="(weekDay, index) in weekDaysOptions" :key="index" v-model="selectedDays" :value="weekDay.value">{{weekDay.label}}</b-form-checkbox>
        <b-form-select  v-model="selectedTime" :options="startTimeOptions">
        </b-form-select>
      </b-form>
      <b-tabs small>
        <b-tab title="General map" active>
          <bad-map class="gmap" :badmintonInfos="filteredBadmintonInfos" :center="currentLocation" :onDragEnd="locationUpdate"></bad-map>
        </b-tab>
        <b-tab title="List Location Info">
          <div class="tab-wrapper">
            <bad-table :badmintonInfos="filteredBadmintonInfos"></bad-table>
          </div>
        </b-tab>
      </b-tabs>

    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BadMap from '@/components/BadMap'
import BadTable from '@/components/BadTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PulseLoader,
    BadMap,
    BadTable
  },
  computed: {
    ...mapGetters([
      'getSelectedDays',
      'getSelectedTime'
    ]),
    selectedDays: {
      get () {
        return this.getSelectedDays
      },
      set (value) {
        this.changeSelectedDays(value)
        this.setFilteredBadmintonInfos()
      }
    },
    selectedTime: {
      get () {
        return this.getSelectedTime
      },
      set (value) {
        this.changeSelectDaysTime(value)
        this.setFilteredBadmintonInfos()
      }
    }

  },
  async created () {
    try {
      const responses = await Promise.all([
        fetch(process.env.API_HOST + '/api/locationinfolist'),
        fetch(process.env.API_HOST + '/api/badmintoninfolist')]
      )
      const [locationInfos, badmintonInfos] = await Promise.all(responses.map(res => res.json()))
      this.filteredBadmintonInfos = this.badmintonInfos = badmintonInfos.map(badmintonInfo => {
        badmintonInfo.location = locationInfos.find(({ name }) => badmintonInfo.location === name)
        return badmintonInfo
      })
      this.loading = false
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
          this.currentLocation = { lng, lat }
          this.locationUpdate(this.currentLocation)
        })
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
      startTimeOptions: [
        { text: '整天', value: '' },
        { text: '中午十二點前', value: { from: 0, to: 12 } },
        { text: '中午至下午六點', value: { from: 12, to: 18 } },
        { text: '晚上六點後', value: { from: 18, to: 24 } }
      ],
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }]
    }
  },
  methods: {
    ...mapActions([
      'changeSelectedDays',
      'changeSelectDaysTime'
    ]),
    setFilteredBadmintonInfos () {
      this.filteredBadmintonInfos = this.badmintonInfos
        .filter(({ weekDayInt, startHour }) => {
          const inSelectedDays = this.selectedDays.indexOf(weekDayInt) !== -1
          const inSelectedTime = !this.selectedTime || (startHour >= this.selectedTime.from && startHour < this.selectedTime.to)
          return inSelectedDays && inSelectedTime
        })
    },
    locationUpdate ({lng, lat}) {
      this.badmintonInfos.forEach(badmintonInfo => {
        badmintonInfo.distance = getDistanceInKM(lng, lat, badmintonInfo.location.position.lng, badmintonInfo.location.position.lat)
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
<style scoped lang="scss">
@import "../_vars.scss";

.tab-wrapper {
  overflow: auto
}

@media (max-width: $mobile) {
  #app{
    padding: 0em
  }
}
</style>
