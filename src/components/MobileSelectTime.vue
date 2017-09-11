<template>
  <div role="group" class="custom-controls-stacked" size="sm">
    <b-form-checkbox v-for="(weekDay, index) in weekDaysOptions" :key="index" v-model="selectedDays"   :value="weekDay.value">{{weekDay.label}}</b-form-checkbox>
    <b-form-select  v-model="selectedTime" :options="startTimeOptions"></b-form-select>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  props: ['weekDaysOptions', 'startTimeOptions'],
  components: {
  },
  data () {
    return {
      zoom: 15
    }
  },
  computed: {
    selectedDays: {
      get () {
        return this.$store.state.selectedDays
      },
      set (value) {
        this.changeSelectedDays(value)
      }
    },
    selectedTime: {
      get () {
        return this.$store.state.selectedTime
      },
      set (value) {
        this.changeSelectDaysTime(value)
      }
    }

  },
  methods: {
    ...mapActions([
      'changeSelectedDays',
      'changeSelectDaysTime'
    ]),
    handleOk () {
      this.$refs.modal.hide()
    },
    showModal () {
      this.$refs.modal.show()
    }
  }
}
</script>
