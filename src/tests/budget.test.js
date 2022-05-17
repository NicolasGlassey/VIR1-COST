/**
 * @File budget.test.js
 * @breif Test the budget module
 * @author Theo.gauier@cpnv.ch
 * @version 15.05.2022
 */
"use strict";

const Budget = require("../Budget/Budget.js");

test("Budget create", async () => {
    let expectedStatusCode = 200

    let budget = new Budget("709024702237", "Budget de test3", 1, "USD", "DAILY");
    let res = await budget.createBudget();
    let actualStatusCode = res.$metadata.httpStatusCode

    expect(actualStatusCode).toBe(expectedStatusCode);
});