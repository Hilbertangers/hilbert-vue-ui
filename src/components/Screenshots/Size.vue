
<template>
  <div class="screenshots-size">
    <template v-if="!isFont">
      <div
        v-for="t in border"
        :key="t"
        :class="[
          'screenshots-size-item',
          t === value ? 'screenshots-size-active' : ''
        ]"
        @click="() => $emit('onChange', t)"
      >
        <div
          class="screenshots-size-pointer"
          :style="{
            width: t * 1.8,
            height: t * 1.8
          }"
        />
      </div>
    </template>
    <div v-else class="screenshots-size-font">
      <select
        :value="value"
        @change="(e) => $emit('onChange', e.target.value)"
      >
        <option
          v-for="(t,i) in font"
          :value="t"
          :key="i">{{t}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Size',
    props: {
      value: Number,
      isFont: Boolean,
    },
    data() {
      return {
        border: [3, 6, 9],
        font: [14, 17, 20, 23, 26, 29, 32, 64, 96, 128]
      };
    }
  };
</script>
