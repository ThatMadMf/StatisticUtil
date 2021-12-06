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
        this.p = [];
        for (let i = 0; i < this.itemRanks.length; i++) {
            for (let j = i + 1; j < this.itemRanks.length; j++) {
                const temp = this.itemRanks[i].values.map((item, index) => item - this.itemRanks[j].values[index]);
                const aSquaresSum = temp.reduce((a, b) => a + b ** 2, 0);

                this.differences.push({id: `a ${i + 1}-${j + 1}`, values: temp})

                this.p.push({
                    id: `p ${i + 1}-${j + 1}`,
                    values: [
                        Math.round(
                            (1 - 6 * aSquaresSum / (this.minRowSize() * (Math.pow(this.minRowSize(), 2)))) * 100
                        ) / 100,
                    ],
                });
            }
        }

        let denominator = Math.pow(this.scores.length, 2) * (Math.pow(this.minRowSize(), 3) - this.minRowSize());

        for (let i = 0; i < this.itemRanks.length; i++) {
            let duplicates = {};

            for (let j = 0; j < this.itemRanks[i].values.length; j++) {
                const rank = this.itemRanks[i].values[j];
                duplicates[rank] = (duplicates[rank] || 0) + 1;
            }

            Object.entries(duplicates).map(entry => entry[1]).filter(d => d !== 1).forEach(d => {
                denominator += -6 * (Math.pow(+d, 3) - d);
            })
        }

        let multipliers = [];

        for (let i = 0; i < this.minRowSize(); i++) {
            multipliers.push(
                this.itemRanks
                    .map(item => item.values[i])
                    .reduce((a, b) => a + b, 0) - 0.5 * this.scores.length * (this.minRowSize() + 1)
            )
        }

        const numerator = 12 * multipliers.reduce((a, b) => a + b ** 2, 0);

        this.w = Math.round(numerator / denominator * 100) / 100;
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
            p: this.p,
            w: this.w,
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