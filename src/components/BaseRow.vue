<template>
  <div style="display: flex; flex-direction: row">
    <a-input class="row-header" :disabled="true" :value="getRow.id"/>
    <div class="value-wrapper" v-for="(s, i) in getRow.values" :key="i">
      <a-input class="score-input" style="background-color: white" :value="s" :disabled="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRow",
  computed: {
    getRow() {
      return this.row;
    }
  },
  props: {
    row: Object,
  }
}
</script>

<style scoped>
.value-wrapper, .row-header {
  width: 8rem;
}
</style>