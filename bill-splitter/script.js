document.addEventListener('DOMContentLoaded', () => {
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

    let selectedTip = 10;

    currencySelect.addEventListener('change', (e) => {
        const symbol = e.target.value;
        currSymbols.forEach(s => s.innerText = symbol);
        calculate();
    });

    tipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tipButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedTip = parseFloat(e.target.dataset.tip);
            customTipInput.value = '';
            calculate();
        });
    });

    customTipInput.addEventListener('input', () => {
        tipButtons.forEach(b => b.classList.remove('active'));
        selectedTip = parseFloat(customTipInput.value) || 0;
        calculate();
    });

    billTotalInput.addEventListener('input', calculate);
    peopleCountInput.addEventListener('input', calculate);
    calculateBtn.addEventListener('click', calculate);

    function calculate() {
        const billTotal = parseFloat(billTotalInput.value) || 0;
        const peopleCount = parseInt(peopleCountInput.value) || 1;

        if (billTotal <= 0) {
            tipAmountDisplay.innerText = "0.00";
            grandTotalDisplay.innerText = "0.00";
            perPersonDisplay.innerText = "0.00";
            return;
        }

        const tipTotal = (billTotal * selectedTip) / 100;
        const finalTotal = billTotal + tipTotal;
        const sharePerPerson = finalTotal / (peopleCount > 0 ? peopleCount : 1);

        tipAmountDisplay.innerText = tipTotal.toFixed(2);
        grandTotalDisplay.innerText = finalTotal.toFixed(2);
        perPersonDisplay.innerText = sharePerPerson.toFixed(2);
    }
});
