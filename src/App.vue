<template>
  <div id="app">
    <div v-if="displayLab === 1">
      <a-upload
          style="margin: 1rem auto;"
          name="file"
          :multiple="false"
          :show-upload-list="false"
          :transform-file="handleChange"
          :custom-request="() => { return 0}"
      >
        <a-button
            style="width: 30rem; font-size: large; font-weight: bold;"
        >
          Upload file
        </a-button>
      </a-upload>
      <div style="width: 90%; margin: 2rem 5%; overflow-x: auto; max-height: 17rem; overflow-y: auto" v-if="showTable">
        <ScoresTable
            :scores="source"
            :append-row="appendRow"
            :append-column="appendColumn"
            :change-handler="recalculate"
            :remove-row="removeRow"
            :remove-column="removeColumn"
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
    <div v-if="displayLab === 2">
      <div class="lab-2-settings">
        <a-select
            v-model="selectedStrategy"
            @select="handleLab2Change"
        >
          <a-select-option
              v-for="o in strategyChoices"
              :key="o"
          >
            {{ o }}
          </a-select-option>
        </a-select>

        <a-input
            v-model="strategyStartYear"
            style="width: 10rem"
            @change="handleLab2Change"
            type="number"
        />
        <a-input
            v-model="loan"
            style="width: 10rem"
            @change="handleLab2Change"
            type="number"
        />
      </div>

      <Lab2Table
          v-if="lab2Result"
          :items="lab2Result"
      />

      <span style="font-size: large; display: inline-block; margin: 0 50%">
        {{ `Final balance is ${lab2Result[lab2Result.length - 1].balance}` }}
      </span>
    </div>
  </div>
</template>

<script>

import ScoresTable from "@/components/ScoresTable";
import QuantitativeAssessmentTab from "./components/QuantitativeAssessmentTab";
import RankAnalysisTab from "./components/RankAnalysisTab";
import Solver from "./solver";
import DataConsistencyTab from "./components/DataConsistencyTab";
import RankCorrelationTab from "./components/RankCorrelationTab";
import Lab2Solver from "../lab2-solver";
import Lab2Table from "./components/Lab2Table";

const strategyChoices = [
  'DEPOSIT',
  'CONTRACTOR_1',
  'CONTRACTOR_2',
  'CONTRACTOR_3',
]

const source = [
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
];

export default {
  name: 'App',
  components: {
    Lab2Table,
    RankCorrelationTab,
    DataConsistencyTab,
    RankAnalysisTab,
    QuantitativeAssessmentTab,
    ScoresTable,
  },
  computed: {
    lastExpertId() {
      return this.source.at(-1).id;
    },
    scoresOfCurrentSize() {
      return new Array(this.source.at(-1).scores.length).fill(0).map((item, index) => {
        return {id: index + 1, score: 0}
      });
    },
  },
  data() {
    return {
      lab2Solver: new Lab2Solver('DEPOSIT'),
      displayLab: 2,
      strategyChoices: strategyChoices,
      source: source,
      strategyStartYear: 2022,
      loan: 5,
      selectedStrategy: strategyChoices[0],
      showTable: true,
      solvedObject: new Solver(source).toResultObject(),
      lab2Result: [],
    }
  },
  methods: {
    appendRow() {
      this.source.push({id: this.lastExpertId + 1, scores: this.scoresOfCurrentSize});
      this.recalculate();
    },
    removeRow() {
      this.source.splice(-1);

      this.recalculate();
    },
    appendColumn() {
      this.source.forEach(s => {
        s.scores.push({id: s.scores.length + 1, score: 0});
      })
      this.recalculate();
    },
    removeColumn() {
      this.source.forEach(s => {
        s.scores.splice(-1);
      });

      this.recalculate();
    },
    handleChange(file) {
      const reader = new FileReader();

      let newSource = [];

      reader.onload = (e) => {
        e.target.result.split('\n').forEach((line, index) => {
          newSource.push({
            id: index + 1,
            scores: line.split(' ').map((n, i) => {
              return {id: i + 1, score: +n}
            })
          });
        });

        this.source = newSource;
        this.recalculate();
      }

      reader.readAsText(file);

      return false
    },
    handleLab2Change() {
      this.lab2Solver = new Lab2Solver(this.selectedStrategy, parseInt(this.strategyStartYear), parseInt(this.loan));
      this.lab2Result = this.lab2Solver.solve();
    },
    recalculate() {
      this.solvedObject = new Solver(this.source).toResultObject();
    }
  },
  mounted() {
    this.lab2Result = this.lab2Solver.solve();
  }
}
</script>

<style>
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.lab-2-settings {
  display: flex;
  flex-direction: row;
  margin: 2rem 2rem;
}
</style>
