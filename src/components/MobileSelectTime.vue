<template>
  <div>
    <b-modal ref="modal" title="日期" @ok="handleOk" ok-only size="md">
      {{weekDaysOptions}}
    </b-modal>
    asdasdsds
    {{showSelectTime}}
  </div>
</template>


<script>

export default {
  props: ['weekDaysOptions', 'selectedDays', 'showSelectTime'],
  components: {
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
    }
  },
  watch: {
    showSelectTime: function (val) {
      val ? this.$refs.modal.show() : this.$refs.modal.hide()
    }
  }
}
</script>
