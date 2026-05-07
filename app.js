async function convertCurrency() {

  const amount = document.getElementById("amount").value;

  const from = document.getElementById("fromCurrency").value;

  const to = document.getElementById("toCurrency").value;

  const resultEl = document.getElementById('result');
  resultEl.textContent = 'Fetching rates...';

  const data = await getRates(from);

  if (!data || data.error) {
    resultEl.textContent = `Failed to get rates: ${data && data.error ? data.error : 'unknown error'}`;
    return;
  }

  const rate = data.conversion_rates && data.conversion_rates[to];

  if (typeof rate !== 'number') {
    resultEl.textContent = `No rate available for ${to}`;
    return;
  }

  const result = amount * rate;

  resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}
