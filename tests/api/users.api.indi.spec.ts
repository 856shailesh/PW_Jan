import { get } from 'node:http';
import { ApiHelper } from '../../src/api/ApiHelper';
import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//Post - get
//Post - put
//Post - delete 
// Common thing is post
async function createUser(apiHelper: any) {
    let userData = {
        name: 'Shailesh API',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test1 : Create a user + verify
//Post > userID > Get/userId > verify
test.skip('POST - create a user', async ({ apiHelper }) => {
    //create a user:
    let userResponse = await createUser(apiHelper);
    //get the user
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Shailesh API');
})

//Test 2 : update a user
//Post > userID > put > get/userID > verify
test.skip('Update a user', async ({ apiHelper }) => {
    //create a user:
    let userResponse = await createUser(apiHelper);
    //get the user
    let userUpdatedData = {
        name: 'Shailesh API Updated',
        status: 'inactive'
    };
    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData , AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);

    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
})

//Test 3 : Delete a user
// Post > delete > get
// test('Delete a user', async ({ apiHelper }) => {
//     //create a user:
//     let userResponse = await createUser(apiHelper);
//     //get the user
    
//     let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}` , AUTH_HEADER);
//     expect(response.status).toBe(204);

//     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
//     expect(getResponse.status).toBe(404);
//     expect(getResponse.body.message).toBe('Resource not found');
// })