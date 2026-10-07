document.addEventListener('DOMContentLoaded', () => {
    const model = new BillModel();

    const currencySelect = document.getElementById('currency');
    const billTotalInput = document.getElementById('billTotal');
    const peopleCountInput = document.getElementById('peopleCount');
    const customTipInput = document.getElementById('customTip');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const calculateBtn = document.getElementById('calculateBtn');

    const tipAmountDisplay = document.getElementById('tipAmount');
    const grandTotalDisplay = document.getElementById('grandTotal');
    const perPersonDisplay = document.getElementById('perPerson');
    const currSymbols = document.querySelectorAll('.curr-symbol');

    function updateView() {
        model.setBillTotal(billTotalInput.value);
        model.setPeopleCount(peopleCountInput.value);

        const result = model.calculateSplit();

        tipAmountDisplay.innerText = result.tipAmount;
        grandTotalDisplay.innerText = result.grandTotal;
        perPersonDisplay.innerText = result.perPerson;
    }

    currencySelect.addEventListener('change', (e) => {
        const symbol = e.target.value;
        model.setCurrencySymbol(symbol);
        currSymbols.forEach(s => s.innerText = symbol);
        updateView();
    });

    tipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tipButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            model.setTipPercentage(e.target.dataset.tip);
            customTipInput.value = '';
            updateView();
        });
    });

    customTipInput.addEventListener('input', () => {
        tipButtons.forEach(b => b.classList.remove('active'));
        model.setTipPercentage(customTipInput.value);
        updateView();
    });

    billTotalInput.addEventListener('input', updateView);
    peopleCountInput.addEventListener('input', updateView);
    calculateBtn.addEventListener('click', updateView);
});