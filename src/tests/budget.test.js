/**
 * @File budget.test.js
 * @breif Test the budget module
 * @author Theo.gauier@cpnv.ch
 * @version 15.05.2022
 */
"use strict";

const Budget = require("../Budget/Budget.js");

test("Budget_create_success", async () => {
    let expectedStatusCode = 200

    let budget = new Budget("709024702237", "Budget de test4", 1, "USD", "DAILY");
    let actualStatusCode = await budget.createBudget();

    expect(actualStatusCode).toBe(expectedStatusCode);
});