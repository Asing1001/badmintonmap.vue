<template>
  <div>
    <gmap-map :center="center" :zoom="zoom" class="gmap" @rightclick="mapRclicked">
      <gmap-cluster>
        <gmap-marker v-for="(location,index) in getLocations()" @click="showModal(location)" :key="index" :position="location.position" :label="location.name" :clickable="true"></gmap-marker>
      </gmap-cluster>
      <gmap-marker    :position="center" label="現在選擇的位置" >
      </gmap-marker>
    </gmap-map>
    <b-modal ref="modal" title="Location" @ok="handleOk" ok-only size="lg">
      <bad-table :badmintonInfos="selectedBadmintonInfos"></bad-table>
    </b-modal>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import BadTable from '@/components/BadTable'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBW6jkW1QIMpjw5SUIytKmuQ40emkWLgM8',
    v: '3'
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  props: ['badmintonInfos', 'center'],
  components: {
    BadTable
  },
  data () {
    return {
      zoom: 15,
      selectedBadmintonInfos: [],
      isCurrenctLocationOpen: true
    }
  },
  methods: {
    getLocations () {
      const locations = this.badmintonInfos.map(({ location }) => location)
      return [...new Set(locations)]
    },
    handleOk () {
      this.$refs.modal.hide()
    },
    showModal ({ name }) {
      this.selectedBadmintonInfos = this.badmintonInfos.filter(({ location }) => {
        return location.name === name
      })
      this.$refs.modal.show()
    },
    mapRclicked (mouseArgs) {
      this.center.lat = mouseArgs.latLng.lat()
      this.center.lng = mouseArgs.latLng.lng()
      this.$emit('update', this.center)
    }
  }
}
</script>

<style scoped>
.gmap {
  height: 600px;
}
</style>
