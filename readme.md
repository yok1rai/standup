# Currency Converter

A simple CLI tool for converting currencies using real-time exchange rates from the Frankfurter API.

## About

This is a lightweight command-line utility that fetches live exchange rates and converts between different currencies. Perfect for quick currency conversions without leaving your terminal.

## Features

- Real-time exchange rates
- Support for 150+ currencies
- Command-based CLI interface
- View all available currencies
- Simple and fast
- Error handling for invalid inputs
- Clean CLI output

## Installation

```bash
npm install
```

## Usage

### Main Commands

```bash
node app.js --help, -h      # Show help and available currencies
node app.js --version, -v   # Show version info
node app.js --run, -r       # Convert currencies
```

### Convert Currency

```bash
node app.js --run <DESTINATION> [BASE_CURRENCY] [AMOUNT]
```

### Examples

Convert 1 USD to EUR:
```bash
node app.js --run EUR
```

Convert 1 GBP to USD:
```bash
node app.js --run USD GBP
```

Convert 100 USD to EUR:
```bash
node app.js --run EUR USD 100
```

Convert 100 USD to TRY (without specifying base):
```bash
node app.js --run TRY 100
```

## Arguments

- `<DESTINATION>` (required) - Target currency code (e.g., EUR, GBP, JPY, TRY)
- `[BASE_CURRENCY]` (optional) - Source currency code (default: USD)
- `[AMOUNT]` (optional) - Amount to convert (default: 1)

## Output

```text
By 2026-06-20, 100 USD = 92.000 EUR (roughly 92 EUR)
```

## Commands

- `--help, -h` - Display all available currencies and usage instructions
- `--version, -v` - Display version information and license
- `--run, -r` - Convert between currencies (see usage above)

## Development

Run with auto-reload:
```bash
npm run dev
```

## API

Uses the free [Frankfurter API](https://www.frankfurter.app/) for exchange rates.
- Supports 150+ currencies
- Real-time exchange data
- No authentication required

## Error Handling

- Invalid API responses are caught and displayed
- Non-numeric amounts are validated
- Invalid currency codes are detected
- Network errors are handled gracefully
- Helpful error messages guide the user

## Version

Current version: **1.5**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
