async function getRates(base) {
  // If API key is missing or clearly a placeholder, return a small mocked response
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    console.warn('No API key set in config.js — returning mock rates for development.');
    // simple deterministic mock (not accurate, just for dev/testing)
    return {
      result: 'success',
      base_code: base,
      conversion_rates: {
        USD: 1,
        EUR: 0.95,
        GBP: 0.82,
        JPY: 140,
      },
    };
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const data = await response.json();

    if (data.result && data.result === 'error') {
      // API returned an error payload
      throw new Error(data['error-type'] || 'API error');
    }

    return data;
  } catch (err) {
    console.error('getRates failed:', err);
    return { error: err.message };
  }
}
