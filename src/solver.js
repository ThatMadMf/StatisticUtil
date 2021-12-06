class Solver {
    constructor(scores) {
        this.scores = scores;
        this.quantitativeAssessment();
        this.rankAnalysis();
        this.dataConsistency();
    }

    quantitativeAssessment() {
        this.s = [];
        this.x = [];

        for (let i = 1; i <= Math.min(...this.scores.map(item => item.scores.length)); i++) {
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
        for (let i = 1; i <= Math.min(...this.scores.map(item => item.scores.length)); i++) {
            this.Var.push(
                Math.max(...this.scores.map(item => item.scores.find(score => score.id === i).score)) -
                Math.min(...this.scores.map(item => item.scores.find(score => score.id === i).score))
            );
        }

        this.d = [];
        for(let i = 1; i <= Math.min(...this.scores.map(item => item.scores.length)); i++) {
            this.d.push(
                this.scores
                    .map(item => item.scores.find(score => score.id === i).score)
                    .map(score => Math.pow(score - this.x[i - 1], 2))
                    .reduce((a, b) => a + b) / this.scores.length
            );
        }

        this.sigma = this.d.map(d => Math.sqrt(d));
        this.v = [];

        for(let i = 0; i < Math.min(...this.scores.map(item => item.scores.length)); i++) {
            this.v.push(Math.round(this.d[i] / this.x[i] * 100))
        }

        this.interval = [];

        for(let i = 0; i < Math.min(...this.scores.map(item => item.scores.length)); i++) {
            this.interval.push({
                lower: this.x[i] - 2.23 * this.d[i] / Math.sqrt(this.scores.length),
                upper: this.x[i] + 2.23 * this.d[i] / Math.sqrt(this.scores.length),
            })
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
            Var: this.Var,
            d: this.d,
            sigma: this.sigma,
            v: this.v,
            interval: this.interval,
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