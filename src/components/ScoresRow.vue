<template>
  <div class="scores-row-wrapper">
    <a-input class="row-header" :disabled="true" :value="row.id"/>
    <div class="score-value-wrapper" v-for="s in row.scores" :key="s.id">
      <a-input class="score-input"  v-model="s.score"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoresRow',
  props: {
    row: Object,
  }
}
</script>

<style scoped>

.scores-row-wrapper {
  display: flex;
  flex-direction: row;
}

.score-value-wrapper, .row-header {
  width: 8rem;
}

</style>