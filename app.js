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
    const VER = "1.0";
    try {
        const dest = process.argv[2];
        if (dest === '--help' || dest === '-h') {
            const datas = await getCurrentCurrencies();
            console.log("╔════════════════════════════════════════╗");
            console.log("║        CURRENCY CONVERTER CLI          ║");
            console.log("╚════════════════════════════════════════╝\n");

            console.log("USAGE: node app.js <DEST | CMD> [BASE] [AMOUNT]\n");

            console.log("ARGUMENTS:");
            console.log("  <DEST | CMD>          (required) Target currency code (e.g., EUR, GBP, JPY) or special command");
            console.log("  [BASE]          (optional) Source currency code (default: USD)");
            console.log("  [AMOUNT]        (optional) Amount to convert (default: 1)\n");

            console.log("EXAMPLES:");
            console.log("  node app.js EUR              → Convert 1 USD to EUR");
            console.log("  node app.js USD GBP          → Convert 1 GBP to USD");
            console.log("  node app.js EUR USD 100      → Convert 100 USD to EUR\n");

            console.log("ALL AVAILABLE CURRENCIES:\n");
            console.log("Code   Full Name")
            for (const [key, value] of Object.entries(datas)) {
                console.log(`${key}    ${value}`)
            }
            console.log("\nSPECIAL COMMANDS\n");
            console.log("--help     -h      help menu");
            console.log("--version  -v      version info")
        } else if (dest === '--version' || dest === '-v') {
            console.log("yok1rai/currency-convertor");
            console.log(`version: ${VER}`);
            console.log(`Licensed under MIT license`);
        } else {
            const base = process.argv[3];
            const amount = process.argv[4];
            let currencyData = {};
            if (!dest) {
                console.log("Usage: node app.js <DEST | CMD> <?BASE> <?AMOUNTS>");
                return;
            }
            if (base) {
                const data = await getData(dest, base);
                currencyData = data;
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
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

main()
