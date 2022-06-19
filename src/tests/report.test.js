const report = require('../Report/Report.js');
test('creates a report', async () => {
    console.log(await report.createAWSCostReport());
    expect(true).toBe(false);
});