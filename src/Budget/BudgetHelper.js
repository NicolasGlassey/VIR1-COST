/**
 * @file BudgetHelper.js
 * @author theo.gautier@cpnv.ch
 */

"use strict";

const { BudgetsClient,
        CreateBudgetCommand,
        DescribeBudgetCommand,
        DeleteBudgetCommand,
        NotFoundException: AwsNotFoundException
        } = require("@aws-sdk/client-budgets");

const ExceptionHandler = require("../ExceptionHandler/ExceptionHandler.js");


/**
 * Budget Helper
 * @class BudgetHelper
 * @type {BudgetHelper}
 */
module.exports = class BudgetHelper{

    /**
     * The aws client used to communicate with the aws api
     * @type {BudgetsClient}
     * @private
     */
    #client = null;

    /**
     * The account id needed to fetch budget information.
     * @type {string}
     * @private
     */
    #accountId = null;

    #exceptionHandler = null;

    /** 
     * @constructor
     * @param {string} accountId - The ID of the AWS account.
     * @param {string} region - The AWS region to connect to.
     * 
     */
    constructor(accountId, region) {
        this.#accountId = accountId;
        this.#client = new BudgetsClient({region: region});
        this.#exceptionHandler = new ExceptionHandler();
    }

    /**
     * Check if budget exists
     * @async
     * @param {string} name Budget name
     * @returns {Promise<boolean>}
     */
    async exists(name) {
        let command = new DescribeBudgetCommand({
            AccountId: "" + this.#accountId,
            BudgetName: name
        });

        try {
            await this.#client.send(command);
            return true;
        }catch (exception){
            if(exception instanceof AwsNotFoundException){
                return false;
            }else {
                this.#exceptionHandler.handle(exception);
            }
        }
    }

    /**
     * Used to create a budget
     * @async
     * @param {string} name - The name of the budget, should be unique.
     * @param {string} limitAmount - The budget limit.
     * @param {string} limitUnit - The currency code, "USD" for exemple.
     * @param {int} timeUnit - The budget period. DAILY, MONTHLY, QUARTERLY, or ANNUALLY.
     * @returns {Promise<boolean>}
     */
    async create(name, limitAmount, limitUnit, timeUnit) {
        let command = new CreateBudgetCommand({
            AccountId: "" + this.#accountId,
            Budget: {
                BudgetLimit: {
                    Amount:  "" + limitAmount,
                    Unit: ""+limitUnit
                },
                BudgetName: name,
                BudgetType: "COST",
                TimeUnit: timeUnit
            }
        });

        try {
            await this.#client.send(command);
            return true;
        }catch (exception){
            this.#exceptionHandler.handle(exception);
        }
    }

    /**
     * Used to delete a budget
     * @async
     * @param {string} name Budget's name
     * @returns {Promise<boolean>}
     * @exeption NotFoundException is thrown if the budget doesn't exist 
     */
    async delete(name){
        let command = new DeleteBudgetCommand({
            AccountId: "" + this.#accountId,
            BudgetName: name
        });

        try {
            await this.#client.send(command);
            return true;
        }catch (exception){
            this.#exceptionHandler.handle(exception);
        }
    }

  }