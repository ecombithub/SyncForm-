import { json } from "@remix-run/node";
import shopify from "../shopify.server";

export const action = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method Not Allowed" }, { status: 405 });
    }

    console.log("✅ Shopify app uninstalled webhook received!");

    try {
        const payload = await request.json();
        const shop = payload.myshopify_domain;
        console.log("Received Shopify App Uninstalled Webhook for shop:", shop);

        const sessionIds = [`offline_${shop}`, shop];
        await shopify.sessionStorage.deleteSessions(sessionIds);
        console.log(`🗑️ Deleted all sessions for ${shop}`);

        const response = await fetch("http://localhost:4001/api/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        return json({ success: true, backendResponse: data });
    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        return json({ error: "Invalid JSON" }, { status: 400 });
    }
};

export const loader = async () => {
    return json({ error: "GET requests are not allowed" }, { status: 405 });
};
