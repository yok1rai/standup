async function getData(dest, base = "USD") {
    try {
        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?from=${base}&to=${dest}`
        );

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API Error ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (e) {
        throw new Error(`Request failed: ${e.message}`);
    }
}

async function getCurrentCurrencies() {
    try {
        const res = await fetch(
            "https://api.frankfurter.dev/v1/currencies"
        );
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API ERROR: ${res.status}: ${errorText}`);
        }
        return await res.json();
    } catch (e) {
        throw new Error(`Request failed: ${e.message}`);
    }
}

async function main() {
    const VER = "1.5";
    try {
        const command = process.argv[2];
        switch (command) {
            case '--help':
            case '-h':
                const datas = await getCurrentCurrencies();
                console.log(`
╔════════════════════════════════════════╗
║        CURRENCY CONVERTER CLI          ║
╚════════════════════════════════════════╝

USAGE:
  node app.js <COMMAND> [ARGS]

<> required   [] optional

COMMANDS:
  --run, -r      Compare two currencies
  --help, -h     Show commands and subcommands
  --version, -v  Show version info

AVAILABLE CURRENCIES:
`);
                console.log("Code   Full Name")
                for (const [key, value] of Object.entries(datas)) {
                    console.log(`${key}    ${value}`)
                }
                break;
            case '--version':
            case '-v':
                console.log("yok1rai/currency-convertor");
                console.log(`version: ${VER}`);
                console.log(`Licensed under MIT license`);
                break;
            case '--run':
            case '-r':
                const dest = process.argv[3];
                if (dest === '--help' || dest === '-h') {
                    console.log(`
╔════════════════════════════════════════╗
║        CURRENCY CONVERTER CLI          ║
╚════════════════════════════════════════╝

SUBCOMMAND: --run (-r)

USAGE:
node app.js <DEST> [BASE | AMOUNT] [AMOUNT]

ARGUMENTS:
DEST      Target currency (e.g. TRY, EUR, USD)
BASE      Source currency (default: USD)
AMOUNT    Amount to convert (default: 1)

BEHAVIOR:
node app.js --run TRY
    → 1 USD → TRY

node app.js --run TRY EUR
    → 1 EUR → TRY

node app.js --run TRY EUR 10
    → 10 EUR → TRY

node app.js --run TRY 10
    → 10 USD → TRY

NOTES:
- If BASE is omitted, USD is used
- If AMOUNT is omitted, 1 is used`);
            return;
                }
                const base = process.argv[4];
                let amount = process.argv[5];
                let currencyData = {};
                if (!dest) {
                    throw new Error("You must enter a destination (run --run --help for detailed information)");

                }
                if (Number.isNaN(Number(base))) {
                    const data = await getData(dest, base);
                    currencyData = data;
                } else if (base) {
                    amount = Number(base);
                    currencyData = await getData(dest);
                } else {
                    const data = await getData(dest);
                    currencyData = data;
                }
                if (amount) {
                    const amountNum = Number(amount);
                    if (Number.isNaN(amountNum) || !(amountNum > 0)) {
                        throw new Error("<AMOUNTS> must be a valid positive number");
                    }
                    currencyData.amount = amountNum;
                    currencyData.rates[dest] *= amountNum
                }
                currencyData.rates[dest] = Number(currencyData.rates[dest].toFixed(3))
                console.log(`By ${currencyData.date}, ${currencyData.amount} ${currencyData.base} is equal to ${currencyData.rates[dest]} ${dest} (roughly ${Math.round(currencyData.rates[dest])} ${dest})`)
                break;
            default:
                throw new Error("invalid command (run --help or -h to get command list ");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

main()
