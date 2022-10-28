import { prompt } from 'enquirer';
import questions from '../shared/questions';

class Calculator {
  constructor(currencies) {
    this.currencies = currencies;
  }

  findCurrenciesAvailable() {
    return this.currencies.map((currency) => currency.name);
  }

  findPriceByName(name) {
    const [currency] = this.currencies.filter(
      (availableCurrency) => availableCurrency.name === name
    );

    if (!currency) {
      throw new Error(
        `Currency "${name}" not found, check the data and try again.`
      );
    }

    return parseFloat(currency.price);
  }

  findCodeByName(name) {
    const [currency] = this.currencies.filter(
      (availableCurrency) => availableCurrency.name === name
    );

    if (!currency)
      throw new Error(
        `Code "${name}" not found, check the data and try again.`
      );

    return currency.code;
  }

  // eslint-disable-next-line consistent-return
  convertValues(quantity, source, target) {
    try {
      const sourcePrice = this.findPriceByName(source, this.currencies);
      const targetPrice = this.findPriceByName(target, this.currencies);
      const code = this.findCodeByName(target, this.currencies);

      const result = (sourcePrice / targetPrice) * quantity;

      return `${result.toFixed(2)} - ${code}`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Oh no 🙈, an error occurred, check the data and try again');
    }
  }

  async calculate() {
    const { quantity, source, target } = await this.getValuesFromCLI();
    const result = this.convertValues(quantity, source, target);
    // eslint-disable-next-line no-console
    console.log(result);
  }

  // eslint-disable-next-line consistent-return
  async getValuesFromCLI() {
    try {
      // eslint-disable-next-line
      for (let i = 0; i <= 1; i++) {
        questions[i].choices = this.currencies;
      }

      const { source, target, quantity } = await prompt(questions);

      return { source, target, quantity };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`🙄 Ops, it shouldn't happen.`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addRate(value, rate) {
    const exchangeRate = value * (rate / 100);

    return value + exchangeRate;
  }
}

export default Calculator;
