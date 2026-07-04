import { test, expect } from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CSVhelper';

test.beforeEach(async ({ registerPage }) => {
    await registerPage.goToRegisterPage();
})

test.describe('Register Page Tests', () => {

    test('Register Page Title Test', async ({ registerPage }) => {
        let title = await registerPage.getPageTitle();
        expect(title).toBe('Register Account');
    })

    let testData = CsvHelper.readCsv('src/data/registerData.csv');
    for (let row of testData) {
        test(`Invalid Register Test ${row.firstName} - ${row.lastName}`, async ({ registerPage }) => {
            await registerPage.doRegister(row.firstName, row.lastName, row.email, row.telephone, row.password, true);
            expect(await registerPage.isRegisterSuccessMsgDisplayed()).toBeFalsy();
        })
    }
})