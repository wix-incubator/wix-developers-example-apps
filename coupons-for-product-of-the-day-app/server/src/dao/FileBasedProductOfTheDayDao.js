const fs = require('fs');

class FileBasedProductOfTheDayDao {
    async set(productId) {
        fs.writeFile(this.databasePath, productId, err => {
            if (err) {
                console.err(`Error writing to file db: ${err}`);
                return;
            }
        });
    }

    async get() {
        const productOfTheDay = fs.readFileSync(this.databasePath).toString();
        return productOfTheDay;
    }
}

module.exports = {
    FileBasedProductOfTheDayDao
}
