const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('Cenário de Login no Sauce Demo', () => {

    test('Caso 1: Deve fazer login com sucesso e navegar para a página de produtos', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    });

    test('Caso 2: Deve falhar o login com usuário bloqueado', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const errorMessage = page.locator('.error-message-container');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Caso 3: Deve falhar o login com senha incorreta', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'senha_incorreta');
        await page.click('#login-button');

        const errorMessage = page.locator('.error-message-container');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
});