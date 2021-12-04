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
  computed: {
    result() {
      let s = [];
      let x = [];

      for (let i = 1; i <= this.items[0].scores.length; i++) {
        let sum = this.items.map(item => item.scores.find(score => score.id === i).score).reduce((a, b) => a + b, 0);

        s.push(sum);
        x.push(Math.round((sum / this.items.length * 100)) / 100);
      }


      return [
        {
          id: 'Si',
          values: s,
        },
        {
          id: 'Xi',
          values: x,
        },
        {
          id: 'Ni',
          values: s.map(item => Math.round(item / s.reduce((a, b) => a + b,0) * 100)/ 100),
        }
      ]
    }
  },
  props: {
    items: Array,
  }
}
</script>

<style scoped>

</style>