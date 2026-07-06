import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer ce3cf7c512b55c5b07b770f58bfdfa2465c1499e24395605b46f8809abd58b63' };


test.skip('get user test', async ({ request }) => {
    let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
})

test.skip('create a user test', async ({ request }) => {
    //JS Object
    let userData = {
        name: 'Shai',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    };

    //JS object to JSON : Serialization(Auto serialization)
    let response = await request.post('https://gorest.co.in/public/v2/users/8516586', {
        headers: AUTH_TOKEN,
        data: userData
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); // 201
    console.log(response.statusText()); // Created
})