import { useState } from 'react';
import './style.css'

const Form = () => {
    const [currencyAmount, setCurrencyAmount] = useState("");
    const [inputCurrency, setInputCurrency] = useState("PLN");
    const [outputCurrency, setOutputCurrency] = useState("EUR");
    const [resultText, setResultText] = useState("Tu pojawi się wynik")

    const updateResultText = (currencyAmount, conversionResult, outputCurrency, inputCurrency) => (
        `${currencyAmount} ${inputCurrency} = ${conversionResult.toFixed(2)} ${outputCurrency}`
    );

    const convertCurrency = (currencyAmount, inputCurrency, outputCurrency) => {
        const exchangeRates = {
            PLN: { PLN: 1, USD: 0.25, EUR: 0.22 },
            USD: { PLN: 4.01, USD: 1, EUR: 0.90 },
            EUR: { PLN: 4.45, USD: 1.11, EUR: 1 },
        };

        const exchangeRate = exchangeRates[inputCurrency][outputCurrency];
        return (currencyAmount * exchangeRate).toFixed(2);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const conversionResult = convertCurrency(currencyAmount, inputCurrency, outputCurrency);
        setResultText(updateResultText(currencyAmount, conversionResult, outputCurrency, inputCurrency));
    };

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <fieldset className="form__fieldset">
                <legend className="form__legend">Wprowadź dane</legend>
                <p>
                    <label>
                        <span className="form__labelText">Wpisz kwotę:</span>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            min="0.01"
                            className="form__field"
                            value={currencyAmount}
                            onChange={(event) => setCurrencyAmount(event.target.value)}
                            required
                        />
                    </label>
                    <select
                        name="currency-input"
                        className="form__field form__field--secondary"
                        defaultValue={inputCurrency}
                        onChange={(event) => setInputCurrency(event.target.value)}
                    >
                        <option>PLN</option>
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </p>
                <p>
                    <label>
                        <span className="form__labelText">Wybierz walutę:</span>
                        <select
                            name="currency-output"
                            className="form__field"
                            defaultValue={outputCurrency}
                            onChange={(event) => setOutputCurrency(event.target.value)}
                        >
                            <option value="PLN">Złoty (PLN)</option>
                            <option value="USD">Dolar amerykański (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                        </select>
                    </label>
                </p>
                <button className="form__button">KONWERTUJ</button>
                <div className="form__resultText">
                    {resultText}
                </div>
            </fieldset>
        </form>

    )
};

export default Form;