# VIR1-COST
VIR1-Costs is a javascript library for creating and managing cost objects.

## Installation
### Requirements
| **Name** | **Version** |
|----------|-------------|
| NPM      | \>= v8.3.0  |
| Node.js  | \>= v18.1.0 |

### node modules
After installing the node dependencies, you can run the following command to install node modules:

```npm install```

## Usage
### Budget
```javascript
const Budget = require("../Budget/BudgetHelper.js");
budget = new Budget();

//create a new budget
budget.create("[ACCOUNT_ID]", "myBudget", 1, "USD", "DAILY");

//check if exists
budget.exists("[ACCOUNT_ID]", "myBudget");

//delete a budget
    // Not implemented yet
```

Budget methods are asynchronous.
## Testing
To run the tests, you can run the following command:

```npm run test```

**Attention: The tests do not clean up after themselves. You have to manually remove the tests budgets and reports.**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT.

We do not take any responsability on the usage of the project.