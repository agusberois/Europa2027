import { useState } from 'react'
import { tippingGuide } from '../data/tipping'
import './TipCalculator.css'

function formatMoney(value) {
  return value.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function TipCalculator() {
  const [countryCode, setCountryCode] = useState(tippingGuide[0].code)
  const [amount, setAmount] = useState('50')
  const [percent, setPercent] = useState(String(tippingGuide[0].suggestedPercent))
  const [people, setPeople] = useState('1')

  const country = tippingGuide.find((entry) => entry.code === countryCode)

  function handleCountryChange(event) {
    const code = event.target.value
    const next = tippingGuide.find((entry) => entry.code === code)
    setCountryCode(code)
    setPercent(String(next.suggestedPercent))
  }

  const parsedAmount = parseFloat(amount.replace(',', '.')) || 0
  const parsedPercent = parseFloat(percent.replace(',', '.')) || 0
  const parsedPeople = Math.max(1, parseInt(people, 10) || 1)

  const tip = (parsedAmount * parsedPercent) / 100
  const total = parsedAmount + tip

  return (
    <div className="card tip-calculator">
      <h3>Calculadora de propinas</h3>

      <div className="tip-calculator__section">
        <label className="tip-calculator__field">
          <span className="text-muted">País</span>
          <select value={countryCode} onChange={handleCountryChange}>
            {tippingGuide.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.flag} {entry.country}
              </option>
            ))}
          </select>
        </label>
        <p className="text-muted tip-calculator__custom">{country.custom}</p>
      </div>

      <div className="tip-calculator__inputs">
        <label className="tip-calculator__field">
          <span className="text-muted">Cuenta</span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-label="Monto de la cuenta"
          />
        </label>
        <label className="tip-calculator__field">
          <span className="text-muted">Propina %</span>
          <input
            type="text"
            inputMode="decimal"
            value={percent}
            onChange={(event) => setPercent(event.target.value)}
            aria-label="Porcentaje de propina"
          />
        </label>
        <label className="tip-calculator__field">
          <span className="text-muted">Personas</span>
          <input
            type="text"
            inputMode="numeric"
            value={people}
            onChange={(event) => setPeople(event.target.value)}
            aria-label="Cantidad de personas"
          />
        </label>
      </div>

      <ul className="tip-calculator__results">
        <li>
          <span>Propina</span>
          <span className="tip-calculator__value">{formatMoney(tip)}</span>
        </li>
        <li>
          <span>Total</span>
          <span className="tip-calculator__value">{formatMoney(total)}</span>
        </li>
        {parsedPeople > 1 && (
          <li>
            <span>Por persona</span>
            <span className="tip-calculator__value">{formatMoney(total / parsedPeople)}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TipCalculator
