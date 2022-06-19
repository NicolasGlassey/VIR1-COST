/**
 * @File alert.test.js
 * @breif Test the alert module
 * @author Mauro-Alexandre.Costa-dos-Santos@cpnv.ch
 * @version 18.06.2022
 */
"use strict";

const Alert = require("../Alert/Alert.js");
const BudgetHelper = require("../Budget/BudgetHelper.js");

const NotFoundException = require("../ExceptionHandler/exceptions/NotFoundException.js")

let accountId = "709024702237";
let region = "eu-west-3"
let alert = null;
let budgetName = "";
let percentage = 0;
let subscribers = [];
let budgetHelper = null;

beforeEach(async () => {
    budgetName = "Cost-Test";
    budgetHelper = new BudgetHelper("709024702237");
    await budgetHelper.create(budgetName, 1, "USD", "DAILY");
    alert = new Alert(accountId, region);
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
    expect(await alert.exists(budgetName, percentage)).toBe(true);
});
test("exists_DoesNotExist_Success", async () => {
    //given
    percentage = 20
    //when
    //then
    expect(await alert.exists(budgetName, percentage)).toBe(false);
});
test("exists_BudgetNotFound_ThrowException", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //when
    await expect(alert.exists(budgetName, percentage)).rejects.toThrow(NotFoundException);
    //then






});
test("create_NominalCase_Success", async () => {
    //given
    const test1 = await alert.exists(budgetName, percentage);
    //when
    await alert.create(budgetName, percentage,subscribers);
    //then
    const test2 = await alert.exists(budgetName, percentage);
    expect(test1).toBe(false);
    expect(test2).toBe(true);
});
test("create_Duplicate_ThrowException", async () => {
    //given
    //when
    //then

    await expect(alert.create(budgetName, percentage,subscribers)).rejects.toThrow(NotFoundException);

});
test("create_BudgetNotFound_ThrowException", async () => {
    //given
    budgetName = "asdjzagsdiunqwediudagdaoihenowda";
    //when
    //then
    try {
        await alert.create(budgetName, percentage,subscribers)
    } catch (error) {
        expect(true).toBe(true);
    }
});
