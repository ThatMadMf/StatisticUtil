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
  computed: {
    itemRanks() {
      return this.items.map(i => {
        return {
          id: i.id,
          values: i.scores.map(s => s.score).map(n => this.getRank(+n))
        }
      })
    },
    ranksSum() {
      let result = [];
      for (let i = 0; i < Math.min(...this.itemRanks.map(item => item.values.length)); i++) {
        let sum = this.itemRanks.map(item => item.values[i]).reduce((a, b) => a + b, 0);

        result.push(sum);
      }

      return result;
    },
    resultRanks() {
      return this.ranksSum.map(s => [...new Set(this.ranksSum)].sort((a, b) => a - b).indexOf(s) + 1);
    }
  },
  props: {
    items: Array,
  },
  methods: {
    getRank(score) {
      switch (true) {
        case score > 7:
          return 1;
        case score > 5:
          return 2;
        case score > 3:
          return 3;
        default:
          return 4
      }
    }
  }
}
</script>

<style scoped>

</style>