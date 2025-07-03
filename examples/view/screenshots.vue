<template>
  <div>
    <Button @click="start = true">开启截图</Button>
    <img
      v-if="!start"
      :src="image"
      style="display: block; width: 500px; height: 500px;"
    />
    <Screenshots
      v-if="start"
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
      start: false,
      image: require('../assets/screenshot.png'),
      width: 500,
      height: 500
    }
  },
  methods: {
    onCancel() {
      this.start = false
      console.log('SCREENSHOTS::CANCEL')
    },
    onOk({ viewer, dataURL }) {
      this.start = false
      console.log('SCREENSHOTS::OK', dataURL, viewer)
    },
  }
}
</script>
