/**
 * @file Alert.js
 * @author Mauro-Alexandre.costa-dos-santos@cpnv.
 * @version 18.06.2022
 */

"use strict";
const { BudgetsClient,
        CreateNotificationCommand,
        DescribeNotificationsForBudgetCommand,
        DuplicateRecordException: AwsDuplicateRecordException,
        InternalErrorException: AwsInternalErrorException
        } = require("@aws-sdk/client-budgets");
        
const DuplicateRecordException = require("./DuplicateRecordException.js")
const InvalidParameterException = require("./InvalidParameterException.js")
const InternalErrorException = require("./InternalErrorException.js")
/**
 * @typedef {Object} Alerts
 * @attribute {string} name
 *
 *
 */
module.exports = class Alerts{

    #client = new BudgetsClient({region: "eu-west-3"});

    async create(accountId, budgetName, limitAmount, Subscribers) {
        let command = new CreateNotificationCommand({
            AccountId: accountId,
            BudgetName: budgetName,
            Notification: {
                ComparisonOperator: "GREATER_THAN",
                NotificationType: "ACTUAL",
                Threshold: limitAmount,
                ThresholdType: "PERCENTAGE"
            },
            Subscribers: [
                {
                    Address: "maurx18@gmail.com",
                    SubscriptionType: "EMAIL"
                }
            ]
            
        });
        await this.#client.send(command).catch((err)=>{
            this.exceptionHandler(err);
        });
    }
    async exists(accountId, budgetName,limitAmount) {
        let command = new DescribeNotificationsForBudgetCommand({
            AccountId: accountId,
            BudgetName: budgetName
        });
        const res = await this.#client.send(command).catch((err)=>{
            exceptionHandler(err);
        });
        return await res.Notifications.some(notification =>notification.Threshold==limitAmount);
    }
    exceptionHandler(exception) {
        switch (true){
            case exception instanceof AwsDuplicateRecordException:
                throw new DuplicateRecordException(exception.message);
            default:
                throw new InternalErrorException("Undefined internal error");
        }
    }
}
