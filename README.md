# fx-nbp

A small library that fetches foreign exchange rates between PLN and various currencies from the National Bank of Poland.

# Usage

```shell
npm install fx-nbp
```

```javascript
const { rates } = require('fx-nbp');

(async () => {
  await rates.getCurrentRate('USD') // 3.663
  await rates.getRateForDate('USD', '2020-11-23') // 3.7616
});
```
# Notes on the NBP API

The National Bank of Poland publishes three types of exchange rate tables:
- "A" tables are published on every working day and contain average exchange rates for a selection of 35 most popular foreign currencies
- "B" tables are published on every Wednesday that is a working day, and otherwise on the previous day, and contain average exchange rates for 115 less popular foreign currencies
- "C" tables are published on every working day and contain average buy and sell rates for a selection of 35 most popular foreign currencies

If data is requested for a date on which no table was published (for example, "A" table rates on a Sunday, or "B" table rates on a Thursday), the API will unceremoniously throw up a 404.

This library currently only supports "A" tables. This library validates the provided dates to make sure the call is valid.

## Date adjustment

Functions that accept a date as an argument will automatically adjust the date backwards to the nearest date for which an "A" table is available, returning the rate that was binding on the originally requested date.

## Supported currencies

```
THB, USD, AUD, HKD, CAD, NZD, SGD, EUR, HUF, CHF, GBP, UAH, JPY, CZK, DKK, ISK, NOK, SEK, HRK, RON, BGN, TRY, ILS, CLP, PHP, MXN, ZAR, BRL, MYR, RUB, IDR, INR, KRW, CNY, XDR
```

# Arguments

## `date`

Accepts a valid `Date` object or a valid ISO8601 date string. Will throw a `FXNBPDateError` if the date is not valid.

## `dateRange`

Accepts an `Array` with length `2` containing two [`dates`](#date), representing respectively the start and end of the time range. Will throw a `FXNBPDateError` if either of the dates is in the future, if the end date is earlier than the start date, or if the range is more than 367 days long (it's a limitation of the NBP API).

## `currencyCode`

Accepts a three letter ISO4217 currency code, case insensitive. Will throw a `FXNBPError` if the code is invalid or if the currency is not supported.

# Module

## `fxNbp.canRequestRatesForDate(date)`

Arguments: [`date`](#date)

Returns `true` if the provided date is **not** a Saturday, Sunday or a public holiday in Poland (in other words if an "A" table exists for the given date), and `false` if it is.

Throws: `FXNBPDateError` if the provided date is not valid.

## `fxNbp.isCurrencySupported(currencyCode)`

Arguments: [`currencyCode`](#currencyCode)

Returns: `true` if the currency is supported, `false` if it is not.

## `fxNbp.getSupportedCurrencies()`

Returns: an array of strings containing three letter ISO4217 currency codes of all currencies supported by the library.

# Rates

## `fxNbp.rates.getCurrentRate(currencyCode)`

Arguments: [`currencyCode`](#currencyCode)

Returns a floating point `number` representing the latest exchange value for the requested currency.

## `fxNbp.rates.getRateForDate(currencyCode, date[, adjustDate = true])`

Arguments: [`currencyCode`](#currencyCode), [`date`](#date), `boolean` adjustDate

Returns a floating point `number` representing the exchange value for the requested currency, on the reqested date. If `adjustDate` is `true`, the date may be changed - see [date adjustment](#date-adjustment).

Throws: if `adjustDate` is `false`, may throw a `FXNBPDateError` if there was no "A" table published on the requested date.

# License

Copyright 2020 Kamil Szydlowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
