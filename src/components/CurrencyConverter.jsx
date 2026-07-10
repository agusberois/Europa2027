import { useState } from 'react'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { tripCurrencies } from '../data/currencies'
import Spinner from './Spinner.jsx'
import './CurrencyConverter.css'

function formatAmount(value) {
  return value.toLocaleString('es-UY', { maximumFractionDigits: 2 })
}

function CurrencyConverter() {
  const { rates, loading, error } = useExchangeRates()
  const [fromCode, setFromCode] = useState('UYU')
  const [amount, setAmount] = useState('1000')

  const parsedAmount = parseFloat(amount.replace(',', '.')) || 0
  const amountInBase = rates ? parsedAmount / rates[fromCode] : 0

  return (
    <div className="card currency-converter">
      <h3>Conversor de moneda</h3>

      <div className="currency-converter__input">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="currency-converter__amount"
          aria-label="Monto a convertir"
        />
        <select
          value={fromCode}
          onChange={(event) => setFromCode(event.target.value)}
          className="currency-converter__select"
          aria-label="Moneda de origen"
        >
          {tripCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.code}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-muted currency-converter__status">
          <Spinner size={14} /> Cargando cotizaciones…
        </p>
      )}

      {error && <p className="text-muted currency-converter__status">No se pudo obtener la cotización.</p>}

      {rates && (
        <ul className="currency-converter__results">
          {tripCurrencies
            .filter((currency) => currency.code !== fromCode)
            .map((currency) => (
              <li key={currency.code}>
                <span>
                  {currency.flag} {currency.code}
                </span>
                <span className="currency-converter__value">
                  {formatAmount(amountInBase * rates[currency.code])}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default CurrencyConverter
