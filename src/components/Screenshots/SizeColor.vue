<template>
  <div class="screenshots-sizecolor">
      <Size :isFont="isFont" :value="size" @onChange="(v) => $emit('onSizeChange', v)" />
      <Color :value="color" @onChange="(v) => $emit('onColorChange', v)" />
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
    }
  };
</script>
