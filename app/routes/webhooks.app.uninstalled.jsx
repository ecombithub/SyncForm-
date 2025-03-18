import { json } from "@remix-run/node";

export const action = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method Not Allowed" }, { status: 405 });
    }

    console.log("✅ Shopify app uninstalled webhook received!");

    try {
        const payload = await request.json();
        console.log("Received Shopify App Uninstalled Webhook:", payload);

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
 