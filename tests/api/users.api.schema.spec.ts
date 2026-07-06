import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

const TOKEN = process.env.API_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let ajv = new Ajv();

//define JSON schema
let userSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string' },
        status: { type: 'string' }
    },
    required: ['id', 'name', 'email', 'gender', 'status']
};

test('GET user', async ({ apiHelper }) => {
    let userData = {
        name: 'Shailesh API',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    };

    // post - create a user
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    let userId = response.body.id;
    console.log('Created user id ', userId);

    //get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);
    console.log(getUserResponse.body);

    //validate the response body with JSON schema
    let validate = ajv.compile(userSchema);
    let valid = validate(getUserResponse.body);
    if (!valid) {
        console.log("Schema validation errors:", validate.errors);
    }
    expect(valid).toBe(true);
})


let userArraySchema = {
    type: 'array',
    items: userSchema
};

test('GET all users ', async ({ apiHelper }) => {

    //get a user
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);
    console.log(getUsersResponse.body);

    //validate the response body with JSON schema
    let validate = ajv.compile(userArraySchema);
    let valid = validate(getUsersResponse.body);
    if (!valid) {
        console.log("Schema validation errors:", validate.errors);
    }
    expect(valid).toBe(true);
})