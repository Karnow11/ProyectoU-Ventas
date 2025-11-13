import { Page } from "@playwright/test";

const registerWith = async (page: Page, username: string, email: string, password: string, confirmpass: string) => {
    await page.getByRole('button', { name: 'Create Account >' }).click()
    await page.locator('input[name="Username"]').fill(username);
    await page.locator('input[name="Mail"]').fill(email);
    await page.locator('input[name="Password"]').fill(password);
    await page.getByRole('button', { name: 'Create', exact: true }).click();
};

const loginWith = async (page: Page, username: string, password: string) => {
    await page.getByRole('button', { name: 'Login >' }).click()
    await page.locator('input[name="Username"]').fill(username);
    await page.locator('input[name="Password"]').fill(password);
    await page.getByRole('button', { name: 'login', exact: true }).click();
};

const createPost = async (page: Page, store_name: string, movility = "static", product_type: string, descrip: string) => {
    await page.getByRole('link', { name: 'Formulario Nuevo SellingPoint' }).click()
    await page.getByRole('textbox', { name: 'Nombre de tienda' }).fill(store_name);
    if movility = "static":
        page.getByRole('radio', { name: 'Estático' }).click()
    else: 
        page.getByRole('radio', { name: 'Móvil' }).click()
    await page.getByRole('textbox', { name: 'Tipo de producto o servicio' }).fill(product_type);
    await page.getByRole('textbox', { name: 'Descripcion' }).fill(descrip);
    await page.getByRole('button', { name: 'Enviar formulario' }).click();
}; 

export { loginWith, registerWith, createPost };