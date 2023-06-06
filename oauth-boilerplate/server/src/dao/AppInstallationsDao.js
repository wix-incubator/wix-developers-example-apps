class AppInstallationsDao {
   /*
   * data structure:
   * {
   *    premiumPlan: string,
   *    createDate: string,
   *    isInstalled: boolean
   * }
   * */
    async save(instanceId, data) {
        throw new Error('Unimplemented')
    }

    async getBy(instanceId) {
        throw new Error('Unimplemented')
    }
}


module.exports = {AppInstallationsDao}
