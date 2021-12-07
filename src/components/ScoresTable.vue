<template>
  <div style="display: flex; flex-direction: row">
    <div class="scores-table-wrapper">
      <div class="scores-table-header">
        <a-input value="Experts\Factors" :disabled="true"/>
        <a-input v-for="(_, i) in scores[0].scores.length" :key="i" :value="i+1" :disabled="true"/>
      </div>
      <ScoresRow v-for="r in scores"  :change-handler="changeHandler" :row="r" :key="r.id"/>
      <a-button
          style="width: 8rem; font-size: large; font-weight: bold"
          @click="appendRow"
      >
        +
      </a-button>
      <a-button
          style="width: 8rem; font-size: large; font-weight: bold"
          @click="removeRow"
      >
        -
      </a-button>
    </div>
    <div style="display: flex; flex-direction: column">
      <a-button
          style="width: 8rem; font-size: large; font-weight: bold"
          @click="appendColumn"
      >
        +
      </a-button>
      <a-button
          style="width: 8rem; font-size: large; font-weight: bold"
          @click="removeColumn"
      >
        -
      </a-button>
    </div>
  </div>
</template>

<script>
import ScoresRow from '@/components/ScoresRow';

export default {
  name: "ScoresTable",
  components: {
    ScoresRow
  },
  props: {
    scores: Array,
    appendRow: Function,
    appendColumn: Function,
    changeHandler: Function,
    removeColumn: Function,
    removeRow: Function,
  },
}
</script>

<style scoped>

.scores-table-header {
  display: flex;
  flex-direction: row;
}

.ant-input {
  width: 8rem;
}


</style>