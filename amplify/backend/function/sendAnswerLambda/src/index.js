/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUOTESDB_ARN
	STORAGE_QUOTESDB_NAME
Amplify Params - DO NOT EDIT */
//const AWSXRay = require('aws-xray-sdk-core');
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUOTESDB_NAME;
const dynamodb = new DynamoDBClient({ region });

exports.handler = async (event) => {
    const { answer, quoteId } = JSON.parse(event.body);

    if(typeof(answer) !== "boolean" || !quoteId) return createErrorResponse("Invalid parameter.", 400);

    try {
        const commandParams = {
            TableName: tableName,
            Key: {
                quoteId
            }
        };
        const command = new GetItemCommand(commandParams);
        const { Item = null } = await dynamodb.send(command);
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
    } catch (error) {
        console.error("Error submitting answer.", error);
        return {
            statusCode,
            body: JSON.stringify({ message: "Error submitting answer." })
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

