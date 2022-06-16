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
const NotFoundException = require("./NotFoundException.js")


/**
 * @typedef {Object} Budget
 * @attribute {string} name
 *
 *
 */
module.exports = class BudgetHelper{

    #client = null;
    #accountId = null;

    constructor(accountId, region) {
        this.#accountId = accountId;
        this.#client = new BudgetsClient({region: region});
    }

    /**
     * Check if budget exists
     * @param name Budget name
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
                this.#exceptionHandler(exception);
            }
        }
    }

    /**
     * Used to create a budget
     * @param accountId - The ID of the AWS account.
     * @param name - The name of the budget, should be unique.
     * @param limitAmount - The budget limit.
     * @param limitUnit - The currency code, "USD" for exemple.
     * @param timeUnit - The budget period. DAILY, MONTHLY, QUARTERLY, or ANNUALLY.
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
            this.#exceptionHandler(exception);
        }
    }

    /**
     * Used to delete a budget
     * @param name Budget's name
     * @returns {Promise<boolean>}
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
            if(exception instanceof AwsNotFoundException){
                return false;
            }else {
                this.#exceptionHandler(exception);
            }
        }
    }

    /**
     * To convert amazon exceptions to our exceptions
     * @param exception
     */
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
            case exception instanceof AwsNotFoundException:
                throw new NotFoundException();
            default:
                throw new InternalErrorException("Undefined internal error");
        }
    }

  }