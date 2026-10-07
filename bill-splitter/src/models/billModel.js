class BillModel {
    constructor() {
        this.billTotal = 0;
        this.tipPercentage = 10;
        this.peopleCount = 2;
        this.currencySymbol = "Rs. ";
    }

    setBillTotal(val) {
        this.billTotal = parseFloat(val) || 0;
    }

    setTipPercentage(val) {
        this.tipPercentage = parseFloat(val) || 0;
    }

    setPeopleCount(val) {
        const count = parseInt(val);
        this.peopleCount = count > 0 ? count : 1;
    }

    setCurrencySymbol(symbol) {
        this.currencySymbol = symbol;
    }

    calculateSplit() {
        if (this.billTotal <= 0) {
            return {
                tipAmount: "0.00",
                grandTotal: "0.00",
                perPerson: "0.00"
            };
        }

        const tipAmount = (this.billTotal * this.tipPercentage) / 100;
        const grandTotal = this.billTotal + tipAmount;
        const perPerson = grandTotal / this.peopleCount;

        return {
            tipAmount: tipAmount.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            perPerson: perPerson.toFixed(2)
        };
    }
}