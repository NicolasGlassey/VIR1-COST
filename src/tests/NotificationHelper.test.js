/**
 * @File notificationHelper.test.js
 * @breif Test the notificationHelper module
 * @author Mauro-Alexandre.Costa-dos-Santos@cpnv.ch
 * @version 18.06.2022
 */
"use strict";
const NotificationHelper = require("../NotificationHelper/NotificationHelper.js");
const BudgetHelper = require("../BudgetHelper/BudgetHelper.js");
const DuplicateRecordException = require("../ExceptionHandler/exceptions/DuplicateRecordException.js");
const NotFoundException = require("../ExceptionHandler/exceptions/NotFoundException.js")

let accountId = "709024702237";
let region = "eu-west-3"
let notificationHelper = null;
let budgetName = "";
let percentage = 0;
let subscribers = [];
let budgetHelper = null;

beforeEach(async () => {
    budgetName = "Cost-Test";
    budgetHelper = new BudgetHelper("709024702237");
    await budgetHelper.create(budgetName, 1, "USD", "DAILY");
    notificationHelper = new NotificationHelper(accountId, region);
    percentage = 80;
    subscribers = ["testEmail@test.xyz","testEmail2@test.xyz"]
});

afterEach(async ()=>{
    budgetName = "Cost-Test";
    if(await budgetHelper.exists(budgetName)) {
        await budgetHelper.delete(budgetName);
    }
})

test("exists_NominalCase_Success", async () => {
    //given
    let percentage = 80;
    budgetName = "SaaS-CPNV";
    //when
    //then 
    expect(await notificationHelper.exists(budgetName, percentage)).toBe(true);
});
test("exists_DoesNotExist_Success", async () => {
    //given
    percentage = 20
    //when
    //then
    expect(await notificationHelper.exists(budgetName, percentage)).toBe(false);
});
test("exists_BudgetNotFound_Success", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //when
    //then
    expect(await notificationHelper.exists(budgetName, percentage)).toBe(false);
});
test("create_NominalCase_Success", async () => {
    //given
    const test1 = await notificationHelper.exists(budgetName, percentage);
    //when
    await notificationHelper.create(budgetName, percentage,subscribers);
    //then
    const test2 = await notificationHelper.exists(budgetName, percentage);
    expect(test1).toBe(false);
    expect(test2).toBe(true);
});
test("create_Duplicate_ThrowException", async () => {
    //given
    //when
    await notificationHelper.create(budgetName, percentage,subscribers);
    //then
    await expect(notificationHelper.create(budgetName, percentage,subscribers)).rejects.toThrow(DuplicateRecordException);
});
test("create_BudgetNotFound_ThrowException", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //when
    //event is called directly by the assertion

    //then
    await expect(notificationHelper.create(budgetName, percentage,subscribers)).rejects.toThrow(NotFoundException);
});
