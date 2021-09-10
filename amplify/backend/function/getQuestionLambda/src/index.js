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
    try {
        let dbParams = { TableName: tableName };
        const { Items } = await dynamodb.scan(dbParams).promise();
        const randomIndex = getRandomNumber(0, Items.length);
        const { quizItemId } = Items[randomIndex];
        dbParams = { 
            ...dbParams, 
            Key: { 
                quizItemId 
            }
        };
        const { Item } = await dynamodb.get(dbParams).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, 
            body: JSON.stringify(Item),
        };
    } catch (error) {
        console.error("Error getting question. ", error);
        return {
            statusCode: 500,
            message: error
        }
    }
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};