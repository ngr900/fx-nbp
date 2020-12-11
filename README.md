# fx-nbp

A small library that fetches exchange rates between PLN and various foreign currencies from the National Bank of Poland.

# Usage

```shell
npm install fx-nbp
```

```javascript
const { rates } = require('fx-nbp');

(async () => {
  await rates.getCurrentRate('USD') // 3.663
  await rates.getRateForDate('EUR', '2020-11-23') // 4.468
  await rates.getLastRates('CHF', 10) // (10) [..., { rate: 3.8129, date:... }, ...]
  await rates.getRatesBetweenDates('RUB', ['2019-02-13', '2019-06-22']) // (89) [...]
});
```
# Notes on the NBP API

The National Bank of Poland publishes three types of exchange rate tables:
- "A" tables are published on every working day and contain average exchange rates for a selection of 35 most popular foreign currencies
- "B" tables are published on every Wednesday that is a working day, and otherwise on the previous day, and contain average exchange rates for 115 less popular foreign currencies
- "C" tables are published on every working day and contain average buy and sell rates for a selection of 35 most popular foreign currencies

If data is requested for a date on which no table was published (for example, "A" table rates on a Sunday, or "B" table rates on a Thursday), the API will unceremoniously throw up a 404.

This library currently only supports "A" tables and validates the provided dates to make sure the call is valid (i.e. asking for rates published on a working day).

## Date adjustment

Functions that accept a date as an argument will automatically adjust the date backwards to the nearest date for which an "A" table is available, returning the rate that was binding on the originally requested date.

## Supported currencies

```
THB, USD, AUD, HKD, CAD, NZD, SGD, EUR, HUF, CHF, GBP, UAH, JPY, CZK, DKK, ISK, NOK, SEK, HRK, RON, BGN, TRY, ILS, CLP, PHP, MXN, ZAR, BRL, MYR, RUB, IDR, INR, KRW, CNY, XDR
```

# Arguments

## `date`

Valid `Date` object or valid ISO8601 date `string`. `FXNBPDateError` will be thrown otherwise.

## `dateRange = [startDate, endDate]`

`Array` containing two [`dates`](#date), respectively the `startDate` and `endDate` of the date range. The dates may not be set in the future, `endDate` may not be set earlier than `startDate`, and the range may not cover more than 367 days (limit of the NBP API). `FXNBPDateError` will be thrown otherwise.

## `amountOfRecords`

Positive non-zero integer `number`, smaller or equal to 255 (limit of the NBP API). `FXNBPError` will be thrown otherwise.

## `currencyCode`

Accepts a `string` containing a three letter ISO4217 currency code, case insensitive. `FXNBPError` will be thrown if the currency is not supported.

# Module

## `fxNbp.canRequestRatesForDate(date)`

Arguments: [`date`](#date)

Returns `true` if rates can be requested for the provided date (that is, when it was a working day in Poland - not a Saturday, Sunday, or a public holiday), and `false` if they can not.

Throws: `FXNBPDateError` if the provided date is not valid.

## `fxNbp.isCurrencySupported(currencyCode)`

Arguments: [`currencyCode`](#currencyCode)

Returns: `true` if the currency is supported, `false` if it is not.

## `fxNbp.getSupportedCurrencies()`

Arguments: *none*

Returns: `Array` of `strings` containing three letter ISO4217 currency codes of all currencies supported by the library.

# Rates

## `fxNbp.rates.getCurrentRate(currencyCode)`

Arguments: [`currencyCode`](#currencyCode)

Returns: floating point `number` representing the latest exchange rate for the requested currency.

## `fxNbp.rates.getRateForDate(currencyCode, date[, adjustDate = true])`

Arguments: [`currencyCode`](#currencyCode), [`date`](#date), `boolean` `adjustDate`

Returns: floating point `number` representing the exchange rate for the requested currency on the reqested date. If `adjustDate` is `true`, the date may be changed - see [date adjustment](#date-adjustment).

Throws: `FXNBPDateError` if `adjustDate` is false and the requested date was not a working day in Poland

## `fxNbp.rates.getLastRates(currencyCode[, amountOfRecords = 10])`

Arguments: [`currencyCode`](#currencyCode), [`amountOfRecords`](#amountOfRecords)

Returns: `Array` with length equal to `amountOfRecords` (defaults to `10`), containing a number of latest exchange rate records for the requested currency. Records are returned as plain objects, containing two self explanatory properties - `rate` and `date`.

## `fxNbp.rates.getRatesBetweenDates(currencyCode, dateRange)`

Arguments: [`currencyCode`](#currencyCode), [`dateRange`](#dateRange)

Returns: `Array` containing a number of exchange rate records for the requested currency, in the requested range of dates. Records are returned as plain objects with the same properties as the objects returned by [getLastRates](#fxnbpratesgetlastrates).

# Tables

## `fxNbp.tables.getCurrentTable()`

Arguments: *none*

Returns: `Object` representing the latest "A" table of exchange rates, with the following properties:
- `number`:  `string` containing the official identification number of the table, ex. `"237/A/NBP/2020"`
- `date`: `Date` set to the day when the table was published
- `rates`: `Array` of plain objects containing two self explanatory properties - `rate` and `code`.

## `fxNbp.tables.getTableForDate(date[, adjustDate = true])`

Arguments: [`date`](#date), `boolean` `adjustDate`

Returns: `Object` representing the "A" table of exchange rates on the requested date, containing the same properties as the object returned by [`getCurrentTable`](#fxNbp.tables.getCurrentTable()). If `adjustDate` is false the date may be changed the same way as in [`getRateForDate`](#fxnbpratesgetratefordate) - see [date adjustment](#date-adjustment).

Throws: `FXNBPDateError` if `adjustDate` is false and the requested date was not a working day in Poland

## `fxNbp.tables.getLastTables([, amountOfRecords = 10])`

Arguments: [`amountOfRecords`](#amountOfRecords)

Returns: `Array` with length equal to `amountOfRecords` (defaults to `10`), containing a number of `Objects` representing latest "A" tables of exchange rates, with the same properties as the object returned by [`getCurrentTable`](#fxNbp.tables.getCurrentTable()).

## `fxNbp.tables.getTablesBetweenDates(dateRange)`

Arguments: [`dateRange`](#dateRange)

Returns: `Array` containing a number of `Objects` representing "A" tables of exchange rates in the requested range of dates, with the same properties as the object returned by [`getCurrentTable`](#fxNbp.tables.getCurrentTable()).

# License

Copyright 2020 Kamil Szydlowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
