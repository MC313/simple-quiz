/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUIZGAMEDB_ARN
	STORAGE_QUIZGAMEDB_NAME
Amplify Params - DO NOT EDIT */
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUIZGAMEDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
    try {
        let dbParams = { TableName: tableName };

        const { Items: quotes = null } = await dynamodb.scan(dbParams).promise();
        if(!quotes || !quotes.length) throw new CustomException("No quotes found.", 404);

        const randomIndex = getRandomNumber(0, quotes.length);
        
        const { quizItemId = null } = quotes[randomIndex];
        
        const { Items: quote = null } = await dynamodb.get(dbParams).promise();
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