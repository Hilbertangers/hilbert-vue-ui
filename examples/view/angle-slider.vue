<template>
  <div style="display: flex;">
    <div style="margin-right: 30px;">
      常规：
      <AngleSlider v-model="angle1" />
    </div>
    <div style="margin-right: 30px;">
      步进器：
      <AngleSlider
        v-model="angle2"
        :size="150"
        :use-step="true"
        :step="30"
        :showProgress="false"
        backgroundColor="#f1f3f5"
      />
    </div>
    <div style="margin-right: 30px;">
      进度条：
      <AngleSlider
        v-model="angle3"
        :size="200"
        progressColor="#ff6b6b"
        endMarkColor="#40c057"
        :showProgress="true"
        :showEndMark="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      angle1: 0,
      angle2: 90,
      angle3: 180,
    }
  }
}
</script>
