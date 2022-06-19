# VIR1-COST
## About the project
VIR1-COST is a set of classes to create and manage costs objects using the AWS SDK.

### Built With

* [NodeJS](https://nodejs.org)
* [AWS NodeJS SDK](https://aws.amazon.com/fr/sdk-for-javascript)
* [Jest](https://jestjs.io)

## Getting Started
###  Prerequisites
#### Packages / Programs
Before cloning this project, make sure you have the following packages/programs installed on your system:

| **Name** | **Version** |
|----------|-------------|
| [Npm](https://www.npmjs.com)      | \>= v8.3.0  |
| [NodeJS](https://nodejs.org)  | \>= v18.1.0 |

#### AWS credentials
Before you clone this repository, [setup your AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) so our classes can connect to the AWS servers.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:TGACPNV/VIR1-COST.git
   cd VIR1-COST
   ```

2. Install npm dependencies
    ```sh
    npm install --dev
    ```

## Usage
### Budget
```javascript
const Budget = require("BudgetHelper/BudgetHelper.js");
budget = new Budget("[ACCOUNT_ID]");

//create a new budget
budget.create("myBudget", 1, "USD", "DAILY");

//check if exists
budget.exists("myBudget");

//delete a budget
budget.delete("myBudget");
```

Budget methods are asynchronous.
## Testing
To run the tests, you can run the following command:

```npm run test```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT.

We do not take any responsability on the usage of the project.