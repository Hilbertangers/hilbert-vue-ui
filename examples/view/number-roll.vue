<style lang="less">
@font-face{
  font-family: "AccidentalPresidency";
  src: url("../assets/fonts/Accidental-Presidency.ttf") format("truetype");
}
.font-AP {
  font-family: AccidentalPresidency;
}
.number-roll-wrapper {
  width: 300px;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/numberBg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: rgb(220,62,56);
}
</style>

<template>
  <div>
    <div class="number-roll-wrapper">
      <number-roll
        class="font-AP"
        v-model="num"
        :font="{width: `${height}px`, height: `${height}px`}"
      ></number-roll>
    </div>
    <number-roll
      v-model="num"
      :font="{width: `${height}px`, height: `${height}px`}"
    ></number-roll>
    <!-- <span class="font-AP" :style="{fontSize: `${height}px`}">9</span>
    <span class="font-AP" :style="{fontSize: `${height / 2}px`}">9</span> -->
    <Button type="primary" @click="() => num++">add one</Button>
    <Button type="error" @click="() => num--">min one</Button>
    <Button type="success" @click="() => num = Math.ceil(Math.random() * 1000)">random</Button>
  </div>
</template>

<script>

  export default {
    name: 'number-roll-demo',
    components: { },
    data() {
      return {
        num: 99,
        height: 50
      };
    },
    computed: {
    }
  };
</script>
