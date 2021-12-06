<template>
  <div style="display: flex; flex-direction: column">
    <BaseRow v-for="r in itemRanks" :row="r" :key="r.id"/>
    <BaseRow :row="{id: 'Rank sum', values: ranksSum}" key="Rank sum"/>
    <BaseRow :row="{id: 'Result rank', values: resultRanks}" key="Result ranks"/>
  </div>
</template>

<script>
import BaseRow from "./BaseRow";

export default {
  name: "RankAnalysisTab",
  components: {
    BaseRow
  },
  props: {
    items: Array,
    itemRanks: Array,
    ranksSum: Array,
    resultRanks: Array,
  },
}
</script>

<style scoped>

</style>