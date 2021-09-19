/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUOTESDB_ARN
	STORAGE_QUOTESDB_NAME
Amplify Params - DO NOT EDIT */
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUOTESDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { answer, quoteId } = JSON.parse(event.body);

    if(typeof(answer) !== "boolean" || !quoteId) return createErrorResponse("Invalid parameter.", 400);

    try {
        const dbParams = {
            TableName: tableName,
            Key: {
                quoteId
            }
        };
        const { Item = null } = await dynamodb.get(dbParams).promise();
        if(!Item) return createErrorResponse(`Quote with id of ${quoteId} not found.`, 404);

        const { isRealQuote, source } = Item;

        const response = {
            isRealQuote,
            isCorrectAnswer: isRealQuote === answer,
            source
        };
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(response)
        }
    } catch ({ message, statusCode = 500, uiMessage = "Internal server error." }) {
        console.error("Error submitting answer.", message);
        return {
            statusCode,
            body: JSON.stringify({ message })
        }
    }
};

function createErrorResponse(message, status, error = message) {
    console.error("Error submitting answer.", error);
    return {
        statusCode: status,
        body: JSON.stringify({ message })
    }
};

