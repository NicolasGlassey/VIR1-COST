const {
  CostAndUsageReportServiceClient,
   
} = require("@aws-sdk/client-cost-and-usage-report-service");

module.exports = class CostReport {
  static async createAWSCostReport(){
    
    const client = new CostAndUsageReportServiceClient({region: "us-east-1"});
    try {
      const command = new PutReportDefinitionCommand({
        PutReportDefinitionRequest: {
          ReportName: "AWS_Cost_Report",
          TimeUnit: "DAILY",
          Compression: "GZIP",
          S3Bucket: "aws-cost-report",
          S3Prefix: "AWS-Cost-Report",
          S3Region: "eu-west-3",
          AdditionalSchemaElements: [
            "RESOURCES",
          ],
          ReportVersioning: "CREATE_NEW_REPORT"          
        },
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
