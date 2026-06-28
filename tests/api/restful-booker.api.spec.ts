import { ApiHelper } from '../../src/api/ApiHelper';
import { test, expect } from '../../src/fixtures/apifixtures';

let TOKEN;

//Post - getToken
async function fetchToken(apiHelper: any) {
    let data = {
        "username": "admin",
        "password": "password123"
    };
    let response = await apiHelper.post('/auth', data);
    expect(response.status).toBe(201);
    return response.body;
}

test('POST - get the token', async ({ apiHelper }) => {
    //create a user:
    let userResponse = await fetchToken(apiHelper);
    //get the user
    
})

