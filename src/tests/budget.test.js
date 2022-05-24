/**
 * @File budget.test.js
 * @breif Test the budget module
 * @author Theo.gauier@cpnv.ch
 * @version 15.05.2022
 */
"use strict";

const Budget = require("../Budget/Budget.js");

test("Budget_create_success", async () => {
    //given
    let expected = true
    let budget = new Budget();

    //when
    let actual = await budget.createBudget("709024702237", "test2", 1, "USD", "DAILY");

    //then
    expect(actual).toBe(expected);
});