const report = require('../Report/Report.js');
test('creates a report', async () => {
    jest.setTimeout(200000);
    await report.createAWSCostReport();
    expect(true).toBe(false);
});