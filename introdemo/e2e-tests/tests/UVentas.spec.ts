import { test, expect } from "@playwright/test";
import { loginWith, registerWith, createPost, createAnonPost } from "./helper";


test.describe("Post app", () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post(" http://localhost:3001/api/testing/reset");
        await request.post("/api/users", {
            data: {
                username: "abc",
                email: "abc@abc.com",
                password: "abc123",
            },
        });

        await page.goto("/");
    });
    test.describe("A persona can register and login itself", () => {
        await registerWith(page, "abcdin", "abc@abcdin.cl" , "abc123");
        await loginWith(page, "abcdin", "abc123");
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    })

    test.describe("You can add a SellingPoint", () => {
        await loginWith(page, "abc", "abc123");
        await page.getByRole('link', { name: 'Formulario Nuevo SellingPoint' }).click();
        await expect(page.getByRole('heading', { name: 'Formulario de ventas' })).toBeVisible();
        await createPost("test-store", "static", "comida", "soy una descripción")
        await expect(getByRole('link', { name: 'Nombre: test-store — #' })).toBeVisible();
    });

    
});