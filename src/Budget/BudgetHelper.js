/**
 * @file BudgetHelper.js
 * @author theo.gautier@cpnv.ch
 */

"use strict";
//import { BudgetsClient, CreateBudgetCommand } from "@aws-sdk/client-budgets";
const { BudgetsClient,
        CreateBudgetCommand,
        DescribeBudgetCommand,
        DeleteBudgetCommand,
        AccessDeniedException: AwsAccessDeniedException,
        CreationLimitExceededException: AwsCreationLimitExceededException,
        DuplicateRecordException: AwsDuplicateRecordException,
        InternalErrorException: AwsInternalErrorException,
        InvalidParameterException: AwsInvalidParameterException,
        NotFoundException: AwsNotFoundException
        } = require("@aws-sdk/client-budgets");

const AccessDeniedException = require("./AccessDeniedException.js")
const CreationLimitExceededException = require("./CreationLimitExceededException.js")
const DuplicateRecordException = require("./DuplicateRecordException.js")
const InternalErrorException = require("./InternalErrorException.js")
const InvalidParameterException = require("./InvalidParameterException.js")
const Console = require("console");


/**
 * @typedef {Object} Budget
 * @attribute {string} name
 *
 *
 */
module.exports = class BudgetHelper{

    #client = new BudgetsClient({region: "eu-west-3"});
    #accountId = null;

    constructor(accountId) {
        this.#accountId = accountId;
    }

    async exists(name) {
        let command = new DescribeBudgetCommand({
            AccountId: "" + this.#accountId,
            BudgetName: name
        });

        try {
            let res = await this.#client.send(command);
            return (res.$metadata.httpStatusCode === 200);
        }catch (exception){
            if(exception instanceof AwsNotFoundException){
                return false;
            }else {
                this.#exceptionHandler(exception);
            }
        }
    }

    /**
     * Used to create a budget
     * @param accountId
     * @param name
     * @param limitAmount
     * @param limitUnit
     * @param timeUnit
     * @returns {Promise<boolean>}
     */
    async create(name, limitAmount, limitUnit, timeUnit) {
        let res;
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
            res = await this.#client.send(command);
            return (res.$metadata.httpStatusCode === 200);
        }catch (exception){
            this.#exceptionHandler(exception);
        }
    }

    async delete(name){
        let command = new DeleteBudgetCommand({
            AccountId: "" + this.#accountId,
            BudgetName: name
        });

        try {
            let res = await this.#client.send(command);
            return (res.$metadata.httpStatusCode === 200);
        }catch (exception){
            if(exception instanceof AwsNotFoundException){
                return false;
            }else {
                this.#exceptionHandler(exception);
            }
        }
    }

    #exceptionHandler(exception) {
        switch (true){
            case exception instanceof AwsAccessDeniedException:
                throw new AccessDeniedException();
            case exception instanceof AwsCreationLimitExceededException:
                throw new CreationLimitExceededException();
            case exception instanceof AwsDuplicateRecordException:
                throw new DuplicateRecordException(exception.message);
            case exception instanceof AwsInternalErrorException:
                throw new InternalErrorException("Internal error");
            case exception instanceof AwsInvalidParameterException:
                throw new InvalidParameterException(exception.message);
            default:
                throw new InternalErrorException("Undefined internal error");
        }
    }

  }