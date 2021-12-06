<template>
  <div style="display: flex; flex-direction: column">
    <BaseRow v-for="r in rows" :row="r" :key="r.id"/>
  </div>
</template>

<script>
import BaseRow from "./BaseRow";

export default {
  name: "DataConsistencyTab",
  components: {
    BaseRow,
  },
  props: {
    rows: Array,
  }
}
</script>

<style scoped>

</style>