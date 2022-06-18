/**
 * @File alert.test.js
 * @breif Test the alert module
 * @author Mauro-Alexandre.Costa-dos-Santos@cpnv.ch
 * @version 18.06.2022
 */
"use strict";

const Alert = require("../Alert/Alert.js");
const Budget = require("../Budget/Budget.js");
let alert = null;
let budgetName = "";
let accountId = "";
let percentage = 0;
let subscribers = [];
beforeEach(() => {
    alert = new Alert();
    budgetName = "Cost-Test";
    accountId = "709024702237";    
    percentage = 80;
    subscribers = ["testEmail@test.xyz"]
});

test("exists_NominalCase_Success", async () => {
    //given
    let percentage = 80;
    budgetName = "SaaS-CPNV";
    //when
    //then 
    expect(await alert.exists(accountId, budgetName, percentage)).toBe(true);
});
test("exists_DoesNotExist_Success", async () => {
    //given
    percentage = 20
    //when
    //then
    expect(await alert.exists(accountId, budgetName, percentage)).toBe(false);
});
test("exists_BudgetNotFound_ThrowException", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //when
    //then
    expect(await alert.exists(accountId, budgetName, percentage)).toThrow();
});
test("create_NominalCase_Success", async () => {
    //given
    //refer to before each
    const test1 = await alert.exists(accountId, budgetName, percentage,subscribers);
    //when
    await alert.create(accountId, budgetName, percentage);
    //then
    const test2 = await alert.exists(accountId, budgetName, percentage,subscribers);
    expect(test1).toBe(false);
    expect(test2).toBe(true);
});
test("create_Duplicate_ThrowException", async () => {
    //given
    //refer to before each
    //when
    await alert.create(accountId, budgetName, percentage,subscribers);

    //then
    expect(await alert.create(accountId, budgetName, percentage,subscribers)).toThrow(DuplicateRecordException);
});
test("create_BudgetNotFound_ThrowException", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //refer to before each
    //when
    //then
    expect(await alert.create(accountId, budgetName, percentage,subscribers)).toThrow();
});
