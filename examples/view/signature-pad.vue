<style lang="less">
</style>

<template>
  <signature-pad
    :background="{
      type: 'grid', // 'line' | 'grid' | 'image'
      color: '#e5e5e5',
      gridSize: 20,
      opacity: 0.2
    }"
    @save="handleSave"
  />
</template>

<script>
// // 横线背景
// {
//   type: 'line',
//   color: '#e5e5e5',
//   lineHeight: 40,
//   opacity: 0.2
// }

// // 网格背景
// {
//   type: 'grid',
//   color: '#e5e5e5',
//   gridSize: 20,
//   opacity: 0.2
// }

// // 图片背景
// {
//   type: 'image',
//   imageSrc: 'path/to/image.jpg',
//   opacity: 0.1
// }
  export default {
    name: 'signature-pad-demo',
    methods: {
      handleSave(dataUrl) {
        console.log('签名图片数据:', dataUrl)
        // 这里可以处理签名图片数据
      }
    }
  };
</script>
