<template>
  <b-table striped hover :items="badmintonInfos" :fields="badmintonFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
    <template slot="location" scope="row">{{row.value.name}}</template>
    <template slot="distance" scope="row">{{row.value}}</template>
    <template slot="weekDay" scope="row">{{row.value}}</template>
    <template slot="startTime" scope="row">{{row.value}}</template>
    <template slot="endTime" scope="row">{{row.value}}</template>
    <template slot="payInfo" scope="row">{{row.value}}</template>
    <template slot="contactName" scope="row">{{row.value}}</template>
    <template slot="contactPhone" scope="row">{{row.value}}</template>
    <template slot="line" scope="row">{{row.value}}</template>
  </b-table>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBW6jkW1QIMpjw5SUIytKmuQ40emkWLgM8',
    v: '3'
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  props: ['badmintonInfos'],
  data () {
    return {
      sortBy: null,
      sortDesc: false,
      badmintonFields: {
        location: { label: '地點', sortable: true },
        distance: {label: '距離(KM)', sortable: true},
        weekDay: { label: '禮拜幾', sortable: true },
        startTime: { label: '開始時間', sortable: true },
        endTime: { label: '結束時間', sortable: true },
        payInfo: { label: '金額', sortable: true },
        contactName: { label: '聯絡人', sortable: true },
        contactPhone: { label: '電話', sortable: true },
        line: { label: 'Line', sortable: true }
      }
    }
  },
  methods: {
    getLocations () {
      const locations = this.badmintonInfos.map(({ location }) => location)
      return [...new Set(locations)]
    },
    closeModal (e) {
      return e.cancel()
    },
    showModal ({ name }) {
      this.selectedBadmintonInfos = this.badmintonInfos.filter(({ location }) => {
        return location.name === name
      })
      this.$refs.modal.show()
    }
  }
}
</script>

<style scoped>
</style>
