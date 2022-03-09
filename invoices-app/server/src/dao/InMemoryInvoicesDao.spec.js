const {randomString, randomObject, randomObjectWithField} = require("../../__tests__/utils");
const {InMemoryInvoicesDao} = require("./InMemoryInvoicesDao");

describe('InMemoryInvoicesDao', () => {

    it('should populate invoices for instanceId, and allow fetching them', async () => {
        const dao = new InMemoryInvoicesDao();
        const instanceId = randomString();
        const firstInvoice = randomObject();
        const secondInvoice = randomObject();
        await dao.save(instanceId, [firstInvoice, secondInvoice]);
        await expect(dao.getInvoices(instanceId)).resolves.toEqual([firstInvoice, secondInvoice])
    })

    it('should store invoices by instanceId and invoiceId, and allow fetching them', async () => {
        const dao = new InMemoryInvoicesDao();
        const instanceId = randomString();
        const invoiceId = randomString();
        const newInvoice = randomObjectWithField("invoiceId", invoiceId);
        await dao.save(instanceId, [newInvoice]);
        await expect(dao.getByInvoiceId(instanceId, invoiceId)).resolves.toEqual(newInvoice)
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new InMemoryInvoicesDao();
        await expect(dao.getByInvoiceId(randomString(), randomString())).resolves.toBeUndefined();
    })

    it('should return null when the invoiceId does not exist in the store', async () => {
        const dao = new InMemoryInvoicesDao();
        const instanceId = randomString();
        const invoiceId = randomString();
        const newInvoice = randomObjectWithField("invoiceId", invoiceId);
        await dao.save(instanceId, [newInvoice]);
        await expect(dao.getByInvoiceId(instanceId, randomString())).resolves.toBeUndefined();
    })

})
