class Lab2Solver {
    startYear = 2022;
    endYear = 2032;
    balance = 0;
    plainProfit = 1;
    newSolutionProfit = 5;
    yearlyReport = [];
    loanTakenYear = null;

    constructor(selectedStrategy, strategyStartYear = 2022, loan = 0) {
        this.strategyStartYear = strategyStartYear;
        this.loan = loan;
        this.loanTotal = loan;

        switch (selectedStrategy) {
            case 'DEPOSIT':
                this.strategy = this.depositStrategy;
                break;
            case 'CONTRACTOR_1':
                this.strategy = this.contractorStrategy;
                this.totalProjectExpenses = 8;
                this.yearlyProjectExpenses = 6;
                this.projectFinisedYear = strategyStartYear + 2;
                break;
            case 'CONTRACTOR_2':
                this.strategy = this.contractorStrategy;
                this.totalProjectExpenses = 7;
                this.yearlyProjectExpenses = 3;
                this.projectFinisedYear = strategyStartYear + 3;
                break;
            case 'CONTRACTOR_3':
                this.strategy = this.contractorStrategy;
                this.totalProjectExpenses = 7;
                this.yearlyProjectExpenses = 2;
                this.projectFinisedYear = strategyStartYear + 4;
                break;
            default:
                this.strategy = this.unknownStrategy;
        }
        this.totalProjectExpenses *= (1 + 0.1 * (strategyStartYear - 2022));
    }

    isProjectFinished(year) {
        return this.projectFinisedYear !== null && year >= this.projectFinisedYear;
    }

    getYearlyProfit(year) {
        return this.isProjectFinished(year) ? this.newSolutionProfit : this.plainProfit;
    }

    unknownStrategy() {
        this.balance += this.getYearlyProfit();
        console.log('Unknown strategy');
    }

    depositStrategy() {
        this.depositValue = this.balance * 0.1;
    }

    getProjectExpense() {
        return Math.min(this.yearlyProjectExpenses || 0, this.totalProjectExpenses || 0);
    }

    getLoanReturned(year) {
        if (this.loanTakenYear && year - this.loanTakenYear <= 3) {
            return Math.min(Math.round(this.loanTotal / 3 * 100) / 100, this.loan);
        }

        return 0;
    }

    getLoanPayment(returned) {
        return returned ? this.loanTotal * 0.2 : 0;
    }

    contractorStrategy(year) {
        if (year < this.strategyStartYear) {
            this.depositStrategy();

            return;
        }

        if (year >= this.strategyStartYear) {
            this.projectExpenses = this.getProjectExpense();
            this.totalProjectExpenses -= this.projectExpenses;
        }
    }

    runYear(year) {
        this.projectExpenses = 0;
        this.depositValue = 0;
        this.strategy(year);

        const loanReturned = this.getLoanReturned(year)
        this.loan -= loanReturned;
        // this.loan = this.loan < 0 ? 0 : this.loan;

        this.balance += this.getYearlyProfit(year) + this.depositValue - this.projectExpenses - loanReturned - this.getLoanPayment(loanReturned);

        if (this.balance < 0 && !this.loanTakenYear) {
            this.balance += this.loanTotal;
            this.loanTakenYear = year;
        }

        this.yearlyReport.push({
            key: year,
            year: year,
            profit: this.getYearlyProfit(year),
            loan: this.loanTakenYear ? this.loan : 0,
            deposit: this.depositValue,
            balance: this.balance,
            projectExpense: this.projectExpenses,
            loanReturned: loanReturned,
            loanPayment: this.getLoanPayment(year),
        })
    }

    solve() {
        for (let i = this.startYear; i <= this.endYear; i++) {
            this.runYear(i);

            if (this.yearlyReport[this.yearlyReport.length - 1].balance < 0) {
                break;
            }
        }

        return this.yearlyReport;
    }
}

export default Lab2Solver;
