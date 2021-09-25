//const AWSXRay = require("aws-xray-sdk-core");
const { SSMClient, GetParametersByPathCommand } = require("@aws-sdk/client-ssm");
const region = process.env.REGION;
const ssm = new SSMClient({ region });
const systemPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const input = {
    MaxResults: 2,
    Path: process.env.TWILIO_CREDS_PATH,
    WithDecryption: true
};
const command = new GetParametersByPathCommand(input);

exports.handler = async (event) => {
    const { inviteePhoneNumber } = JSON.parse(event.body);
    
    try {
        const { Parameters } = await ssm.send(command);
        const [twilioAccountId, twilioAuthToken] = Parameters;
        const twilio = require("twilio")(twilioAccountId.Value, twilioAuthToken.Value, { lazyLoading: true });
        await twilio.messages.create({
            body: "Hello from lambda",
            to: inviteePhoneNumber,
            from: systemPhoneNumber
        });
    
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(`Invite message sent successfully to ${inviteePhoneNumber}`),
        };        
    } catch (error) {
        console.error("Error sending invite. ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        }
    }
};
