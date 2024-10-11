function addCashFlow() {
    const input = document.getElementById('cashFlowInput');
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
        cashFlows.push(value);
        const list = document.getElementById('cashFlowsList');
        const item = document.createElement('li');
        item.textContent = `CF: ${value}`;
        list.appendChild(item);
        input.value = '';
    } else {
        alert('Please enter a valid number');
    }
}

function calculateNPV(rates, cashFlows) {
    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + rates, i);
    }
    return npv;
}

function derivativeNPV(rates, cashFlows) {
    let derivative = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        derivative -= i * cashFlows[i] / Math.pow(1 + rates, i + 1);
    }
    return derivative;
}

function irr(cashFlows) {
    let rate = 0.1; // Initial guess
    let npv = calculateNPV(rate, cashFlows);
    let tolerance = 1e-6;
    let delta;

    while (Math.abs(npv) > tolerance) {
        const derivative = derivativeNPV(rate, cashFlows);
        if (derivative === 0) {
            alert('IRR calculation failed: Derivative is zero');
            return;
        }
        delta = npv / derivative;
        rate -= delta;
        npv = calculateNPV(rate, cashFlows);
    }

    return rate;
}

function calculateIRR() {
    const result = irr(cashFlows);
    if (typeof result !== 'undefined') {
        document.getElementById('irrResult').textContent = result.toFixed(4);
    }
}

// Initialize cash flows array
let cashFlows = [];