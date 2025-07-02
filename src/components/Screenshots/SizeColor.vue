<template>
  <div class="screenshots-sizecolor">
      <Size :isFont="isFont" :value="size" @onChange="handleSizeChange" />
      <Color :value="color" @onChange="handleColorChange" />
  </div>
</template>

<script>
  import Size from './Size'
  import Color from './Color'

  export default {
    name: 'SizeColor',
    components: { Size, Color},
    props: {
      size: Number,
      color: String,
      isFont: Boolean,
    },
    methods: {
      handleSizeChange(v) {
        this.$emit('onSizeChange', v)
      },
      handleColorChange(v) {
        this.$emit('onColorChange', v)
      }
    }
  };
</script>
