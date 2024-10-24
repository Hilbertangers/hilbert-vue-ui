<template>
  <div class="SwitchWrapper" :style="{transform: `scale(${scale})`}">
    <input type="checkbox" :checked="value" @change="handleChange" name="switch">
    <label class="Switch" for="switch">
      <div class="Bulb bulb">
        <div class="BulbCenter bulb-center"></div>
        <div class="filament Filament Filament-Left"></div>
        <div class="filament Filament Filament-Right"></div>
        <div class="Reflections">
          <span></span>
        </div>
        <div class="spark">
          <div class="Spark Spark-1"></div>
          <div class="Spark Spark-2"></div>
          <div class="Spark Spark-3"></div>
          <div class="Spark Spark-4"></div>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'BulbSwitch',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      width: {
        type: Number,
        default: 220
      }
    },
    computed: {
      scale() {
        return typeof this.width === 'number' ? this.width / 220 : 1
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('input', e.target.checked)
      }
    },
  };
</script>
