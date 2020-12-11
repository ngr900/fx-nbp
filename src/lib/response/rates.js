function formSingleRateResponse(data) {
  return data.rates[0].mid;
}

function formMultiRateResponse(data) {
  return data.rates.map(entry => ({
    rate: entry.mid,
    date: new Date(entry.effectiveDate)
  }));
}

module.exports = {
  formSingleRateResponse,
  formMultiRateResponse
}