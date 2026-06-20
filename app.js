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

async function main() {
    try {
        const dest = process.argv[2];
        const base = process.argv[3];
        const amount = process.argv[4];
        let currencyData = {};
        if (!dest) {
            console.log("Usage: node app.js <DEST> <?BASE> <?amounts>");
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
            if (Number.isNaN(amountNum)) {
                throw new Error("<AMOUNTS> must be a valid number");
            }
            currencyData.amount = amountNum;
            currencyData.rates[dest] *= amountNum
        }
        currencyData.rates[dest] = Number(currencyData.rates[dest].toFixed(3))
        console.log(`By ${currencyData.date}, ${currencyData.amount} ${currencyData.base} is equal to ${currencyData.rates[dest]} ${dest} (roughly ${Math.ceil(currencyData.rates[dest])} ${dest})`)
    } catch (e) {
        console.error("Error:", e.message);
    }
}

main()
