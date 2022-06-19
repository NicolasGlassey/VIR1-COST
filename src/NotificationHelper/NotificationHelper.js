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
const BudgetHelper = require ("../Budget/BudgetHelper.js");
const ExceptionHandler = require("../ExceptionHandler/ExceptionHandler.js");

/**
 * @typedef {Object} Alerts
 * @attribute {string} name
 *
 *
 */
module.exports = class Alerts {
    /**
     * The aws client used to communicate with the aws api
     * @type {BudgetsClient}
     * @private
     */
    #client = null;

    /**
     * The account id needed to fetch aws information.
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
        this.#client = new BudgetsClient({
            region: region
        });

        this.#exceptionHandler = new ExceptionHandler();
    }
    /**
     * Check if alert exists
     * @async
     * @param {string} budgetName Budget name
     * @param {string} limitAmount budget pourcentage threshold
     * @returns {Promise<boolean>}
     */
    async exists(budgetName, limitAmount) {
        let command = new DescribeNotificationsForBudgetCommand({
            AccountId: this.#accountId,
            BudgetName: budgetName
        });
        let budgetHelper = new BudgetHelper(this.#accountId);
        if(! await budgetHelper.exists(budgetName))return false;
        try {
            const res = await this.#client.send(command);
            return await res.Notifications.some(notification => notification.Threshold == limitAmount);
        } catch (error) {
            this.#exceptionHandler.handle(error);
        }
    }
    /**
     * Creates an alert
     * @async
     * @param {string} budgetName Budget name
     * @param {string} limitAmount budget pourcentage threshold
     * @param {string[]} subscribers list of emails that will be subscribed to the alert
     * @returns {Promise<null>}
     */
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
            return true;
        } catch (error) {
            this.#exceptionHandler.handle(error);
        }
    }
}