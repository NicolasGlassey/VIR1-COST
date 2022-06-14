/**
 * @File budget.test.js
 * @brief Test the budget module
 * @author Theo.gauier@cpnv.ch
 * @version 15.05.2022
 */
"use strict";

const BudgetHelper = require("../Budget/BudgetHelper.js");
let budgetHelper = null;
let budgetName = "";

beforeEach(() => {
    budgetHelper = new BudgetHelper("709024702237");
    budgetName = "unitTestsBudget";
});

afterEach(async ()=>{
    //TODO NGY - do not use try and catch in a test class. Prefer to check (condition) before trying to delete (exists)
    try{
        await budgetHelper.delete(budgetName);
    }catch (exception){
        if(!(exception instanceof BudgetNotFoundException)){
            throw exception;
        }
    }
})

test("exists_NominalCase_Success", async () => {
    //given
    //refer to beforeEach
    await budgetHelper.create(budgetName, 1, "USD", "DAILY");
    //when
    //event is called directly by the assertion

    //then
    expect(await budgetHelper.exists(budgetName)).toBe(true);
});

test("exists_BudgetNotExist_Success", async () => {
    //given
    budgetName += "NotExist";

    //when
    //event is called directly by the assertion

    //then
    expect(await budgetHelper.exists(budgetName)).toBe(false);
});

test("create_NominalCase_Success", async () => {
    //given
    //refer to before each
    expect(await budgetHelper.exists(budgetName)).toBe(false);

    //when
    await budgetHelper.create(budgetName, 1, "USD", "DAILY");

    //then
    expect(await budgetHelper.exists(budgetName)).toBe(true);
});

test("create_AlreadyExist_ThrowException", async () => {
    //given
    //refer to before each

    //when
    let budget;
    //TODO - NGY - please review the way you are using exception import
    expect(async () => await budget.create(budgetName, 1, "USD", "DAILY").toThrow(BudgetAlreadyExistException));

    //then
    //Exception is thrown
});

test("delete_NominalCase_Success", async () => {
    //given
    //refer to before each
    let actualResult = "";
    await budgetHelper.create(budgetName, 1, "USD", "DAILY");
    expect(await budgetHelper.exists(budgetName)).toBe(true);

    //when
    await budgetHelper.delete(budgetName);

    //then
    expect(await budgetHelper.exists(budgetName)).toBe(false);
});

test("delete_BudgetNotFound_ThrowException", async () => {
    //given
    //refer to before each
    budgetName += "NotExist";

    //when
    expect(async () => await budgetHelper.delete(budgetName, 1, "USD", "DAILY").toThrow(BudgetNotFoundException));

    //then
    //Exception is thrown
});

//TODO NGY add after all method