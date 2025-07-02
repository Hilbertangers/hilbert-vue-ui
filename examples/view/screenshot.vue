<template>
  <div>
    <Screenshots
      :image="image"
      :width="width"
      :height="height"
      @onCancel="onCancel"
      @onOk="onOk"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require('../assets/screenshot.png'),
      width: 500,
      height: 500
    }
  },
  methods: {
    onCancel() {
      console.log('SCREENSHOTS::CANCEL')
    },
    onOk({ viewer, dataURL }) {
      console.log('SCREENSHOTS::OK', dataURL, viewer)
    },
  }
}
</script>
