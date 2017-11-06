<template>
  <div>
    <gmap-map :center="center" :zoom="zoom" class="gmap" >
      <gmap-cluster>
        <gmap-marker v-for="(location,index) in getLocations()" @click="showModal(location)" :key="index" :position="location.position" :label="location.name" :clickable="true"></gmap-marker>
      </gmap-cluster>
      <gmap-marker v-if="!isMobileDevice" :position="center" label="目前位置" :draggable="true" @dragend="dragEndHandler">
      </gmap-marker>
    </gmap-map>
    <b-modal ref="modal" title="Location" @ok="handleOk" ok-only size="lg">
      <bad-table :badmintonInfos="selectedBadmintonInfos"></bad-table>
    </b-modal>
  </div>
</template>

<script>
import MobileDetect from 'mobile-detect'
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

const md = new MobileDetect(window.navigator.userAgent)

export default {
  props: ['badmintonInfos', 'center', 'onDragEnd'],
  components: {
    BadTable
  },
  data: function () {
    return {
      zoom: 15,
      selectedBadmintonInfos: [],
      isCurrenctLocationOpen: true,
      isMobileDevice: md.mobile() != null
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
    dragEndHandler ({latLng: {lat, lng}}) {
      this.onDragEnd({lat: lat(), lng: lng()})
    }
  }
}
</script>

<style scoped lang="scss">
@import "../_vars.scss";
.gmap {
  height: 600px;
}

@media (max-width: $mobile) {
  .gmap {
    height: calc(100vh - 109px);
  }
}

</style>
