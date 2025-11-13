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
    test.describe("A persona can register itself", () => {
        
    })
});