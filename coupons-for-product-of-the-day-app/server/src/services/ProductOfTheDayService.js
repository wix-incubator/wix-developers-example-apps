const fs = require('fs');

class ProductOfTheDayService {
    async setProductOfTheDay(productId) {
        fs.writeFile(this.databasePath, productId, err => {
            if (err) {
                console.err(`Error writing to file db: ${err}`);
                return;
            }
        });
    }

    async getProductOfTheDay() {
        const productOfTheDay = fs.readFileSync(this.databasePath).toString();
        return productOfTheDay;
    }
}

module.exports = {
    ProductOfTheDayService
}
