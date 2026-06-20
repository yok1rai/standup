# Currency Converter

A simple CLI tool for converting currencies using real-time exchange rates from the Frankfurter API.

## Installation

```bash
npm install
```

## Usage

```bash
node app.js <DESTINATION> [BASE_CURRENCY] [AMOUNT]
```

### Examples

Convert 1 USD to EUR:
```bash
node app.js EUR
```

Convert 1 GBP to USD:
```bash
node app.js USD GBP
```

Convert 100 USD to EUR:
```bash
node app.js EUR USD 100
```

## Arguments

- `<DESTINATION>` (required) - Target currency code (e.g., EUR, GBP, JPY)
- `[BASE_CURRENCY]` (optional) - Source currency code (default: USD)
- `[AMOUNT]` (optional) - Amount to convert (default: 1)

## Output

```text
By 2026-06-20, 100 USD = 92.000 EUR (roughly 92 EUR)
```

## Development

Run with auto-reload:
```bash
npm run dev
```

## API

Uses the free [Frankfurter API](https://www.frankfurter.app/) for exchange rates.

## Error Handling

- Invalid API responses are caught and displayed
- Non-numeric amounts are validated
- Network errors are handled gracefully

## License

This project is licensed under the MIT License - see the LICENSE file for details.
