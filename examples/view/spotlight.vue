<template>
  <div>
    <Input
      placeholder="Search..."
      style="width: 300px"
      @on-focus="openSearch"
    >
      <span slot="append">Ctrl/Command + K</span>
    </Input>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    openSearch() {
      this.$spotlight.open()
    }
  }
}
</script>
