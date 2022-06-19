/**
 * @file Alert.js
 * @author Mauro-Alexandre.costa-dos-santos@cpnv.
 * @version 18.06.2022
 */

"use strict";
const {
    BudgetsClient,
    CreateNotificationCommand,
    DescribeNotificationsForBudgetCommand
} = require("@aws-sdk/client-budgets");

const AccessDeniedException = require("../ExceptionHandler/exceptions/AccessDeniedException.js")

/**
 * @typedef {Object} Alerts
 * @attribute {string} name
 *
 *
 */
module.exports = class Alerts {
    #client = null;
    #accountId = null;

    constructor(accountId, region) {
        this.#accountId = accountId;
        this.#client = new BudgetsClient({
            region: region
        });
    }

    async exists(budgetName, limitAmount) {
        let command = new DescribeNotificationsForBudgetCommand({
            AccountId: this.#accountId,
            BudgetName: budgetName
        });

        try {
            const res = await this.#client.send(command);
            return await res.Notifications.some(notification => notification.Threshold == limitAmount);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(budgetName, limitAmount, subscribers) {
        let input = {AccountId: this.#accountId,
            BudgetName: budgetName,
            Notification: {
                ComparisonOperator: "GREATER_THAN",
                NotificationType: "ACTUAL",
                Threshold: limitAmount,
                ThresholdType: "PERCENTAGE"
            },
            Subscribers: []
        }
        
        subscribers.forEach(subscriber => {
            let values = {
                Address: subscriber,
                SubscriptionType: "EMAIL"
            };
            input.Subscribers.push(values);
        });
        let command = new CreateNotificationCommand(input);
        try {
            await this.#client.send(command);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}