<template>
  <pin-input
    v-model="pin"
    type="number"
    :length="6"
    @complete="handleComplete"
  />
</template>

<script>
export default {
  data() {
    return {
      pin: ''
    }
  },
  methods: {
    handleComplete(value) {
      console.log('PIN completed:', value)
    }
  }
}
</script>
