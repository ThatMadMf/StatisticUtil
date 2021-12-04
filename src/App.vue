<template>
  <div id="app">
    <a-button
        style="
          width: 30rem;
          margin-left: 10rem;
          font-weight: bold;
          font-size: large;
          margin-top: 1rem;
          "
    >
      Upload file
    </a-button>
    <div style="width: 90%; margin: 2rem 5%; overflow-x: auto;">
      <ScoresTable
          :scores="source"
          :append-row="appendRow"
          :append-column="appendColumn"
      />
    </div>
  </div>
</template>

<script>

import ScoresTable from "@/components/ScoresTable";

export default {
  name: 'App',
  components: {
    ScoresTable,
  },
  computed: {
    lastExpertId() {
      return this.source.at(-1).id;
    },
    lastScoreId() {
      return this.source[0].scores.at(-1).id
    },
    scoresOfCurrentSize() {
      const temp = this.source.at(-1).scores;
      return temp.map(s => {
        s.score = 0
        return s
      })
    }
  },
  data() {
    return {
      source: [
        {
          id: 1,
          scores: [
            {id: 1, score: 7},
            {id: 2, score: 8},
            {id: 3, score: 4},
            {id: 4, score: 3},
            {id: 5, score: 5},
          ],
        },
        {
          id: 2,
          scores: [
            {id: 1, score: 6},
            {id: 2, score: 10},
            {id: 3, score: 5},
            {id: 4, score: 4},
            {id: 5, score: 5},
          ],
        },
        {
          id: 3,
          scores: [
            {id: 1, score: 9},
            {id: 2, score: 7},
            {id: 3, score: 6},
            {id: 4, score: 6},
            {id: 5, score: 5},
          ],
        },
        {
          id: 4,
          scores: [
            {id: 1, score: 7},
            {id: 2, score: 9},
            {id: 3, score: 7},
            {id: 4, score: 5},
            {id: 5, score: 4},
          ],
        },
        {
          id: 5,
          scores: [
            {id: 1, score: 4},
            {id: 2, score: 5},
            {id: 3, score: 7},
            {id: 4, score: 7},
            {id: 5, score: 6},
          ],
        },
        {
          id: 6,
          scores: [
            {id: 1, score: 8},
            {id: 2, score: 8},
            {id: 3, score: 7},
            {id: 4, score: 7},
            {id: 5, score: 6},
          ],
        }
      ],
    }
  },
  methods: {
    appendRow() {
      this.source.push({id: this.lastExpertId + 1, scores: this.scoresOfCurrentSize})
    },
    appendColumn() {
      this.source.forEach(s => {
        s.scores.push({id: this.lastScoreId + 1, score: 0})
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
