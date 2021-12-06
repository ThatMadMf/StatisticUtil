class Solver {
    constructor(scores) {
        this.scores = scores;
        this.quantitativeAssessment();
        this.rankAnalysis();
        this.dataConsistency();
        this.rankCorrelation();
    }

    minRowSize() {
        return Math.min(...this.scores.map(item => item.scores.length))
    }

    quantitativeAssessment() {
        this.s = [];
        this.x = [];

        for (let i = 1; i <= this.minRowSize(); i++) {
            let sum = this.scores.map(item => item.scores.find(score => score.id === i).score).reduce((a, b) => a + b, 0);

            this.s.push(sum);
            this.x.push(Math.round((sum / this.scores.length * 100)) / 100);
        }

        this.n = this.s.map(item => Math.round(item / this.s.reduce((a, b) => a + b, 0) * 100) / 100);
    }

    rankAnalysis() {
        this.itemRanks = this.scores.map(i => {
            return {
                id: i.id,
                values: i.scores.map(s => s.score).map(n => getRank(+n))
            };
        });
        this.ranksSum = [];
        for (let i = 0; i < Math.min(...this.itemRanks.map(item => item.values.length)); i++) {
            let sum = this.itemRanks.map(item => item.values[i]).reduce((a, b) => a + b, 0);

            this.ranksSum.push(sum);
        }

        this.resultRank = this.ranksSum.map(s => [...new Set(this.ranksSum)].sort((a, b) => a - b).indexOf(s) + 1);
    }

    dataConsistency() {
        this.Var = [];
        for (let i = 1; i <= this.minRowSize(); i++) {
            this.Var.push(
                Math.max(...this.scores.map(item => item.scores.find(score => score.id === i).score)) -
                Math.min(...this.scores.map(item => item.scores.find(score => score.id === i).score))
            );
        }

        this.d = [];
        for (let i = 1; i <= this.minRowSize(); i++) {
            this.d.push(
                Math.round(this.scores
                    .map(item => item.scores.find(score => score.id === i).score)
                    .map(score => Math.pow(score - this.x[i - 1], 2))
                    .reduce((a, b) => a + b) / this.scores.length * 100) / 100
            );
        }

        this.sigma = this.d.map(d => Math.round(Math.sqrt(d) * 100) / 100);
        this.v = [];

        for (let i = 0; i < this.minRowSize(); i++) {
            this.v.push(Math.round(this.d[i] / this.x[i] * 100))
        }

        this.interval = [];

        for (let i = 0; i < this.minRowSize(); i++) {
            this.interval.push({
                lower: Math.round((this.x[i] - 2.23 * this.d[i] / Math.sqrt(this.scores.length)) * 100) / 100,
                upper: Math.round((this.x[i] + 2.23 * this.d[i] / Math.sqrt(this.scores.length)) * 100) / 100,
            })
        }
    }

    rankCorrelation() {
        this.differences = [];
        for (let i = 0; i < this.itemRanks.length; i++) {
            for (let j = i + 1; j < this.itemRanks.length; j++) {
                this.differences.push({
                    id: `a ${i}-${j}`,
                    values: this.itemRanks[i].values.map((item, index) => item - this.itemRanks[j].values[index])
                })
            }
        }
    }

    toResultObject() {
        return {
            s: {id: 'Si', values: this.s},
            x: {id: 'Xi', values: this.x},
            n: {id: 'Ni', values: this.n},
            itemRanks: this.itemRanks,
            ranksSum: this.ranksSum,
            resultRanks: this.resultRank,
            Var: {id: 'Var', values: this.Var},
            d: {id: 'D', values: this.d},
            sigma: {id: 'σ', values: this.sigma},
            v: {id: 'V', values: this.v},
            interval: {id: 'Interval', values: this.interval.map(i => `${i.lower}...${i.upper}`)},
            differences: this.differences,
        }
    }
}

function getRank(score) {
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

export default Solver;