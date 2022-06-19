const {
  CostExplorerClient,
  GetCostAndUsageCommand
} = require("@aws-sdk/client-cost-explorer");

module.exports = class CostReport {
  static async createAWSCostReport(){
    let dateEnd = new Date();
    let dateStart = new Date();
    dateStart.setMonth(dateEnd.getMonth()-1);

    const client = new CostExplorerClient({region: "eu-west-3"});
    try {
      const command = new GetCostAndUsageCommand({
        TimePeriod:[{
          Start: dateStart.toLocaleDateString(),
          End: dateEnd.toLocaleDateString()
        }],
        Granularity: "DAILY",
        Metrics: ["BlendedCost","UsageQuantity"]


      });
      const data = await client.send(command).then(
        (data) =>{
          console.log(data);
        }
      );
      // process data.
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Done");
    }
  }
};
