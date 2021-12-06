<template>
  <div style="display: flex; flex-direction: column">
    <BaseRow v-for="r in result" :row="r" :key="r.id"/>
  </div>
</template>

<script>
import BaseRow from "./BaseRow";

export default {
  name: "QuantitativeAssessmentTab",
  components: {
    BaseRow,
  },
  props: {
    result: Array,
  },
}
</script>

<style scoped>

</style>