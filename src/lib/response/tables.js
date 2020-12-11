const { rates } = require("../..");

function formSingleTableResponse(data) {
  return {
    number: data.no,
    date: new Date(data.effectiveDate),
    rates: data.rates.map(({code, mid}) => ({
      code,
      rate: mid
    }))
  }
}

function formMultiTableResponse(data) {
  return data.map(formSingleTableResponse)
}

module.exports = {
  formSingleTableResponse,
  formMultiTableResponse
}