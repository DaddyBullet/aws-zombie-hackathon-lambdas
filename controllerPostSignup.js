import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {

  var phone = event.request.userAttributes.phone_number

  console.log(event)
  console.log(context)

  const params = {
    TableName: 'User',
    Item: {
      id: uuid.v1(),
      phone: phone,
      username: phone,
      contacts: [],
      chatIds: []
    },
  };

  console.log(params)

  try {
    const result = await dynamoDbLib.call('put', params);
    console.log('success', result)
    context.done(null, event)
  }
  catch(e) {
    console.log('failure', e)
    callback(null, failure({status: false}));
    context.done(e, event)
  }
};