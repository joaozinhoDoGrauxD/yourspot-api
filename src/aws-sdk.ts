import AWS from 'aws-sdk'
AWS.config.update({ region: 'sa-east-1' });

export default async function getPass(){

    const sm = new AWS.SecretsManager()
    const secretId = process.env.AWS_SECRET_ID  as string
    const sec = await sm.getSecretValue({ SecretId: secretId }).promise();
    const password = JSON.parse(sec.SecretString as string).password;
    return password

}