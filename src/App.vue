<template>
  <div id="app">
    <a-button
        style="
          width: 30rem;
          margin: 1rem auto;
          font-weight: bold;
          font-size: large;
          "
    >
      Upload file
    </a-button>
    <div style="width: 90%; margin: 2rem 5%; overflow-x: auto; max-height: 17rem; overflow-y: auto" v-if="showTable">
      <ScoresTable
          :scores="source"
          :append-row="appendRow"
          :append-column="appendColumn"
      />
    </div>
    <a-button
        style="
          width: 30rem;
          margin: 1rem auto;
          font-weight: bold;
          font-size: large;
          "
        @click="showTable = !showTable"
    >
      {{ showTable ? 'Hide table' : 'Show table' }}
    </a-button>
    <a-tabs
        default-active-key="1"
        style="width: 90%; margin: 2rem 5%; overflow-x: auto; max-height: 25rem; overflow-y: auto;"
    >
      <a-tab-pane key="1" tab="Quantitative assessment">
        <QuantitativeAssessmentTab :items="source" :result="[solvedObject.s, solvedObject.x, solvedObject.n]"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Rank analysis">
        <RankAnalysisTab
            :item-ranks="solvedObject.itemRanks"
            :ranks-sum="solvedObject.ranksSum"
            :result-ranks="solvedObject.resultRanks"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Data consistency">
        <DataConsistencyTab
          :rows="[
              solvedObject.Var,
              solvedObject.x,
              solvedObject.d,
              solvedObject.sigma,
              solvedObject.v,
              solvedObject.interval,
              ]"
        />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Rank correlation">
      <RankCorrelationTab
        :difference-rows="solvedObject.differences"
        :p="solvedObject.p"
        :w="solvedObject.w"
      />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

import ScoresTable from "@/components/ScoresTable";
import QuantitativeAssessmentTab from "./components/QuantitativeAssessmentTab";
import RankAnalysisTab from "./components/RankAnalysisTab";
import Solver from "./solver";
import DataConsistencyTab from "./components/DataConsistencyTab";
import RankCorrelationTab from "./components/RankCorrelationTab";

export default {
  name: 'App',
  components: {
    RankCorrelationTab,
    DataConsistencyTab,
    RankAnalysisTab,
    QuantitativeAssessmentTab,
    ScoresTable,
  },
  computed: {
    solvedObject() {
      return new Solver(this.source).toResultObject();
    },
    lastExpertId() {
      return this.source.at(-1).id;
    },
    lastScoreId() {
      return this.source[0].scores.at(-1).id
    },
    scoresOfCurrentSize() {
      return new Array(this.source.at(-1).scores.length).fill(0).map((item, index) => {
        return {id: index + 1, score: 0}
      });
    }
  },
  data() {
    return {
      showTable: true,
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
