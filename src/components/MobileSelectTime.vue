<template>
  <div role="group" class="custom-controls-stacked" size="sm">
    <b-form-checkbox v-for="(weekDay, index) in weekDaysOptions" :key="index" v-model="selectedDays"   :value="weekDay.value">{{weekDay.label}}</b-form-checkbox>
    <b-form-select  v-model="selectedTime" :options="startTimeOptions"></b-form-select>
  </div>
</template>


<script>
import globalevent from '../eventbus'
export default {
  props: ['weekDaysOptions', 'selectedDays', 'selectedTime', 'startTimeOptions'],
  components: {
  },
  created () {
    try {
      this.changeTimeSelector()
    } catch (ex) {
      alert(ex)
    }
  },
  data () {
    return {
      zoom: 15
    }
  },
  methods: {
    handleOk () {
      this.$refs.modal.hide()
    },
    showModal () {
      this.$refs.modal.show()
    },
    changeTimeSelector () {
      globalevent.$emit('test', {'selectedTime': this.selectedTime})
    }
  }
}
</script>
