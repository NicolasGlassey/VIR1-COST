/**
 * @file Budget.js
 * @author theo.gautier@cpnv.ch
 */

"use strict";
//import { BudgetsClient, CreateBudgetCommand } from "@aws-sdk/client-budgets";
const { BudgetsClient, CreateBudgetCommand} = require("@aws-sdk/client-budgets");

/**
 * @typedef {Object} Budget
 * @attribute {string} name
 *
 *
 */
module.exports = class Budget{
    constructor(AccountId, name, limitAmount, limitUnit, timeUnit) {
        this.accountId = AccountId;
        this.name = name;
        this.limitAmount = limitAmount;
        this.limitUnit = limitUnit;
        this.timeUnit = timeUnit;
        this.client = new BudgetsClient({region: "eu-west-3"});
    }

    async createBudget() {

        let command = new CreateBudgetCommand({
            AccountId: ""+this.accountId,
            Budget: {
                BudgetLimit: {
                    Amount:  ""+this.limitAmount,
                    Unit: this.limitUnit
                },
                BudgetName: this.name,
                BudgetType: "COST",
                TimeUnit: this.timeUnit
            }
        });

        return this.client.send(command);


    }
  }