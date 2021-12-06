<template>
  <div style="display: flex; flex-direction: row">
    <div style="display: flex; flex-direction: column">
      <BaseRow v-for="r in differenceRows" :row="r" :key="r.id"/>
      <div style="display: flex; flex-direction: row">
        <a-input value="W=" :disabled="true"/>
        <a-input :value="w" :disabled="true"/>
      </div>
    </div>
    <div style="display: flex; flex-direction: column">
      <BaseRow v-for="r in p" :row="r" :key="r.id"/>
    </div>
  </div>
</template>

<script>
import BaseRow from "./BaseRow";

export default {
  name: "RankCorrelationTab",
  components: {
    BaseRow,
  },
  props: {
    differenceRows: Array,
    p: Array,
    w: Number,
  }
}
</script>

<style scoped>

</style>