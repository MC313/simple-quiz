/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUIZGAMEDB_ARN
	STORAGE_QUIZGAMEDB_NAME
Amplify Params - DO NOT EDIT */
//const AWSXRay = require('aws-xray-sdk-core');
//const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const AWS = require('aws-sdk');
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUIZGAMEDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
    const clientError = new ClientError();
    try {
        let dbParams = { TableName: tableName };

        const { Items = null } = await dynamodb.scan(dbParams).promise();
        if(!Items) handleError("Invalid Items in the database.");

        const randomIndex = getRandomNumber(0, Items.length);

        const { quizItemId = null } = Items[randomIndex];
        if(!quizItemId) handleError( "Invalid quizItemId returned.");

        dbParams = { 
            ...dbParams, 
            Key: { 
                quizItemId 
            }
        };
        const { Item = null } = await dynamodb.get(dbParams).promise();
        if(!Items) handleError("Invalid Items in the database.");

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, 
            body: JSON.stringify(Item),
        };
    } catch (error) {
        console.error("Error getting quote. ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: clientError.get() || error })
        }
    }
};

function handleError(internalError, uiError = null) {
    clientError.set(uiError);
    throw new Error(internalError);
};

class ClientError {
    constructor() {
        this.clientError = "Internal server error.";
        this.get = () => this.clientError;
        this.set = (error) => { this.clientError = error }
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};