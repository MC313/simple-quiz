/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUOTESDB_ARN
	STORAGE_QUOTESDB_NAME
	STORAGE_QUOTESDB_STREAMARN
Amplify Params - DO NOT EDIT */
//const AWSXRay = require("aws-xray-sdk-core");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUOTESDB_NAME;
const dynamodb = new DynamoDBClient({ region });
const commandParams = { 
    TableName: tableName,
    Limit: 20
};
const command = new ScanCommand(commandParams);

exports.handler = async () => {
    try {
        const { Items: quotes = null } = await dynamodb.send(command);
        if(!quotes || !quotes.length) throw new CustomException("No quotes found.", 404);

        const randomIndex = getRandomNumber(0, quotes.length);
        
        const quote = quotes[randomIndex] || null;
        
        if(!quote) throw new CustomException("Quote not found.", 404);
        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, 
            body: JSON.stringify(quote),
        };
    } catch ({ message, statusCode = 500, uiMessage = "Internal server error." }) {
        console.error("Error getting quote. ", message);
        return {
            statusCode,
            body: JSON.stringify({ message: uiMessage })
        }
    }
};

function CustomException(message, statusCode = 500,  uiMessage = message) {
  this.message = message;
  this.statusCode = statusCode;
  this.uiMessage = uiMessage;
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};