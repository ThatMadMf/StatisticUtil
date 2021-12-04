<template>
  <div style="display: flex; flex-direction: row">
    <a-input class="row-header" :disabled="true" :value="row.id"/>
    <div class="value-wrapper" v-for="(s, i) in row.values" :key="i">
      <a-input class="score-input" :value="s" :disabled="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRow",
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