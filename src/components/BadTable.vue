<template>
  <b-table :sort-compare="sortCompare" striped hover :items="badmintonInfos" :fields="badmintonFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
    <template slot="location" scope="row"><a :href="'https://maps.google.com?q='+row.value.name">{{row.value.name}}</a></template>
    <template slot="contactPhone" scope="row"><a :href="'tel:'+row.value">{{row.value}}</a></template>
    <template slot="time" scope="row">{{`${row.item.startTime}~${row.item.endTime}`}}</template>
    <template slot="line" scope="row">
      <a target="_blank" :href="row.value" v-if="row.value">
        <span class="d-none d-lg-block d-lg-block">{{row.value.indexOf('~')!==-1 ? row.value.split('~')[1] : row.value}}</span>
        <img class="d-lg-none d-xl-none" width="30px" src="../assets/line.png" alt="">
      </a>
      </template>
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
        location: { label: '地點', class: 'text-center', sortable: true },
        distance: { label: '距離(KM)', class: 'text-center', sortable: true },
        weekDay: { label: '星期', class: 'text-center', sortable: true },
        time: { label: '時間', class: 'text-center', sortable: true },
        level: { label: '程度', class: 'text-center', sortable: true },
        payInfo: { label: '金額', class: 'text-center', sortable: true },
        contactName: { label: '聯絡人', class: 'text-center', sortable: false },
        contactPhone: { label: '電話', class: 'text-center', sortable: false },
        line: { label: 'Line', class: 'text-center', sortable: false }
      }
    }
  },
  methods: {
    getLocations () {
      const locations = this.badmintonInfos.map(({ location }) => location)
      return [...new Set(locations)]
    },
    sortCompare (a, b, key) {
      return a[key] > b[key] ? -1 : 1
    }
  }
}
</script>

<style lang="scss">
@import "../_vars.scss";
@media (max-width: $mobile) {
  table{
    th.sorting {
      padding-right: 23px !important
    }
    font-size: 11px;
  }
}
</style>
