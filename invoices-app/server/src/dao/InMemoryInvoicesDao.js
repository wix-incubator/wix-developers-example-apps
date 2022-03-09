const {InvoicesDao} = require("./InvoicesDao");


class InMemoryInvoicesDao extends InvoicesDao {
    constructor() {
        super();
        this.store = {}
    }

    async save(instanceId, newInvoices) {
        const oldInvoices = this.store[instanceId];
        if(oldInvoices){
            const updatedInvoiceList = oldInvoices.concat(newInvoices)
            this.store[instanceId] = updatedInvoiceList
        } else {
            this.store[instanceId] = newInvoices
        }
    }

    async getByInvoiceId(instanceId, invoiceId) {
        const instanceInvoices = this.store[instanceId]
        if(instanceInvoices) {
            const result = instanceInvoices.filter(invoice => invoice.invoiceId === invoiceId)
            return result && result[0]
        }
    }
    
    async getInvoices(instanceId) {
        return this.store[instanceId]
    }
}

module.exports = {
    InMemoryInvoicesDao
}
