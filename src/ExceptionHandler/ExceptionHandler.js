const {
    AccessDeniedException: AwsAccessDeniedException,
    CreationLimitExceededException: AwsCreationLimitExceededException,
    DuplicateRecordException: AwsDuplicateRecordException,
    InternalErrorException: AwsInternalErrorException,
    InvalidParameterException: AwsInvalidParameterException,
    NotFoundException: AwsNotFoundException
} = require("@aws-sdk/client-budgets");

const AccessDeniedException = require("./exceptions/AccessDeniedException.js");
const CreationLimitExceededException = require("./exceptions/CreationLimitExceededException.js");
const DuplicateRecordException = require("./exceptions/DuplicateRecordException.js");
const InternalErrorException = require("./exceptions/InternalErrorException.js");
const InvalidParameterException = require("./exceptions/InvalidParameterException.js");
const NotFoundException = require("./exceptions/NotFoundException.js");

module.exports = class ExceptionHandler {

    /**
     * To convert amazon exceptions to our exceptions
     * @param exception
     */
    handle(exception) {
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
                throw new NotFoundException(exception.message);
            default:
                throw new InternalErrorException("Undefined internal error");
        }
    }
}