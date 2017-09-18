<template>
  <b-table striped hover :items="badmintonInfos" :fields="badmintonFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
    <template slot="location" scope="row"><a :href="'https://maps.google.com?q='+row.value.name">{{row.value.name}}</a></template>
    <template slot="distance" scope="row">{{row.value}}</template>
    <template slot="weekDay" scope="row">{{row.value}}</template>
    <template slot="startTime" scope="row">{{row.value}}</template>
    <template slot="endTime" scope="row">{{row.value}}</template>
    <template slot="payInfo" scope="row">{{row.value}}</template>
    <template slot="contactName" scope="row">{{row.value}}</template>
    <template slot="contactPhone" scope="row"><a :href="'tel:'+row.value">{{row.value}}</a></template>
    <template slot="line" scope="row"><a target="_blank" :href="row.value">{{row.value.indexOf('~')!==-1 ? row.value.split('~')[1] : row.value}}</a></template>
  </b-table>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
</style>
