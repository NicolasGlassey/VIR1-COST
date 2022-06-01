/**
 * @File budget.test.js
 * @breif Test the budget module
 * @author Theo.gauier@cpnv.ch
 * @version 15.05.2022
 */
"use strict";

const Budget = require("../Budget/Budget.js");
let budget = null;
let budgetName = "";

beforeEach(() => {
    budget = new Budget();
    budgetName = "myBudgetName";
});

test("exists_NominalCase_Success", async () => {
    //given
    //refer to beforeEach

    //when
    //event is called directly by the assertion

    //then
    expect(budget.exists(budgetName)).toBe(true);
});

test("exists_BudgetNotExist_Success", async () => {
    //given
    budgetName += "NotExist";

    //when
    //event is called directly by the assertion

    //then
    expect(budget.exists(budgetName)).toBe(false);
});

test("create_NominalCase_Success", async () => {
    //given
    //refer to before each
    let actualResult = "";
    expect(budget.exists(budgetName)).toBe(false);

    //when
    await budget.create("709024702237", "test2", 1, "USD", "DAILY");

    //then
    expect(budget.exists(budgetName)).toBe(true);
});

test("create_AlreadyExist_ThrowException", async () => {
    //given
    //refer to before each

    //when
    expect(() => await budget.create("709024702237", budgetName, 1, "USD", "DAILY").toThrow(BudgetAlreadyExistException);

    //then
    //Exception is thrown
});

test("delete_NominalCase_Success", async () => {
    //given
    //refer to before each
    let actualResult = "";
    await budget.create("709024702237", "test2", 1, "USD", "DAILY");
    expect(budget.exists(budgetName)).toBe(true);

    //when
    await budget.delete(budgetName);

    //then
    expect(budget.exists(budgetName)).toBe(false);
});

test("delete_BudgetNotFound_ThrowException", async () => {
    //given
    //refer to before each
    budgetName += "NotExist";

    //when
    expect(() => await budget.create("709024702237", budgetName, 1, "USD", "DAILY").toThrow(BudgetNotFoundException);

    //then
    //Exception is thrown
});

//TODO NGY add after all method