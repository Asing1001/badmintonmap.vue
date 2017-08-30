<template>
  <div id="app" class="col-12">
    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    <b-tabs small>
      <b-tab title="General map" active>
        <gmap-map v-if="!loading" class="gmap" :center="center" :zoom="zoom">
          <!-- <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
               -->
          <gmap-cluster>
            <gmap-marker v-for="(marker,index) in markers" @click="showModal(marker, index)" :key="index" :position="marker.position" :clickable="true"></gmap-marker>
          </gmap-cluster>

        </gmap-map>
      </b-tab>
      <b-tab title="List Location Info">

      </b-tab>
    </b-tabs>
    <b-modal ref="modal" title="Location" @ok="closeModal" size="lg">
      <b-table striped hover show-empty :items="selectedBadmintonInfo" :fields="badmintonFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
        <template slot="location" scope="row">{{row.value}}</template>
        <template slot="startTime" scope="row">{{row.value}}</template>
        <template slot="endTime" scope="row">{{row.value}}</template>
        <template slot="payInfo" scope="row">{{row.value}}</template>
        <template slot="contactName" scope="row">{{row.value}}</template>
        <template slot="contactPhone" scope="row">{{row.value}}</template>
        <template slot="line" scope="row">{{row.value}}</template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBW6jkW1QIMpjw5SUIytKmuQ40emkWLgM8',
    v: '3'
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  name: 'app',
  components: {
    PulseLoader
  },
  async created () {
    try {
      const res = await Promise.all([
        fetch(process.env.API_HOST + '/api/locationinfolist'),
        fetch(process.env.API_HOST + '/api/badmintoninfolist')]
      )
      const locationInfo = await res[0].json()
      this.markers = locationInfo
      // const badmintonInfo = await res[1].json()
      this.loading = false
    } catch (ex) {

    }
  },
  data () {
    return {
      color: '',
      size: '',
      center: { lat: 25.079613, lng: 121.556082 },
      zoom: 15,
      tabIndex: 0,
      markers: [],
      locationList: [],
      badmintonList: [],
      errorMsg: '',
      selected: '',
      matchLocation: [],
      loading: true,
      selectedBadmintonInfo: [],
      filterBadmintonList: [],
      sortBy: null,
      sortDesc: false,
      badmintonFields: {
        location: { label: '地點', sortable: true },
        startTime: { label: '開始時間', sortable: true },
        endTime: { label: '結束時間', sortable: true },
        payInfo: { label: '金額', sortable: true, 'class': 'text-center' },
        contactName: { label: '聯絡人' },
        contactPhone: { label: '電話', sortable: true, 'class': 'text-center' },
        line: { label: 'Line', sortable: true, 'class': 'text-center' }
      },
      dateTimeRange: [],
      todayWeekday: 0,
      weekDays: [],
      weekDaysOptions: [{ 'label': '星期日', 'value': 0 }, { 'label': '星期一', 'value': 1 }, { 'label': '星期二', 'value': 2 }, { 'label': '星期三', 'value': 3 }, { 'label': '星期四', 'value': 4 }, { 'label': '星期五', 'value': 5 }, { 'label': '星期六', 'value': 6 }]
    }
  },
  watch: {
    selected: function (val) {
      this.markers = this.badmintonList.filter(function (badmintonInfo) {
        return val === '' || badmintonInfo.location === val
      }
      )
      this.center = this.markers[0].position
    },
    weekDays: function (val) {
      this.updateMap()
    }
  },
  methods: {
    updateMap () {
      var self = this
      this.filterBadmintonList = this.badmintonList.filter(function (badminton) {
        return self.weekDays.indexOf(badminton.weekDayInt) !== -1
      })
      var filterLocationList = this.locationList.filter(function (location) {
        return self.filterBadmintonList.filter(function (badminton) {
          return location.name === badminton.location
        }).length > 0
      })
      this.markers = filterLocationList
      self.getLocation()
    },
    closeModal (e) {
      return e.cancel()
    },
    showModal (marker) {
      this.selectedBadmintonInfo = this.filterBadmintonList.filter(function (badminton) {
        return marker.name === badminton.location
      })
      this.$refs.modal.show()
    },
    showTodayInfo () {
      var self = this
      this.markers = this.badmintonList.filter(function (location) { return location.weekDayInt === self.todayWeekday })
      this.center = this.markers[0].position
    },
    getLocation () {
      var self = this
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(function (position) { self.center = { 'lat': position.coords.latitude, 'lng': position.coords.longitude } })
      } else {
        console.log('Geolocation is not supported by this browser.')
        return { lat: 25.079613, lng: 121.556082 }
      }
    }
    // clickMarker: function  (marker, index) {
    //   this.center = marker.position
    //   this.zoom = 15
    //   this.infoWindowPos = marker.position
    //   this.infoContent = marker.infoText
    //   this.infoWinOpen = true
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gmap {
  height: 600px;
}
</style>
