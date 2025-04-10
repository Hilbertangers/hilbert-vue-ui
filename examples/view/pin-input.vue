<template>
  <div>
    <div style="margin-bottom: 10px;">
      数字类型：
      <pin-input
        v-model="pin1"
        type="number"
        :length="6"
        @complete="handleComplete"
      />
    </div>
    <div style="margin-bottom: 10px;">
      数字字母类型：
      <pin-input
        v-model="pin2"
        type="text"
        :length="4"
        @complete="handleComplete"
      />
    </div>
    <div style="margin-bottom: 10px;">
      密码类型：
      <pin-input
        v-model="pin3"
        type="password"
        :length="6"
        @complete="handleComplete"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pin1: '',
      pin2: '',
      pin3: '',
    }
  },
  methods: {
    handleComplete(value) {
      console.log('PIN completed:', value)
    }
  }
}
</script>
