import { json } from "@remix-run/node";

export const action = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const rawText = await request.text();
        console.log("📦 Raw Webhook Payload:", rawText);

        const payload = JSON.parse(rawText);

        console.log("🔍 Incoming Headers:", JSON.stringify([...request.headers.entries()], null, 2));

        const topic = request.headers.get("x-shopify-topic") || request.headers.get("X-Shopify-Topic");
        console.log("🔔 Webhook Topic:", topic);

        const allowedTopics = ["customers/redact", "customers/data_request", "shop/redact"];
        if (!allowedTopics.includes(topic)) {
            return json({ error: "Unrecognized topic" }, { status: 400 });
        }
        const response = await fetch("http://localhost:4001/api/CostomerRequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-shopify-topic": topic,  
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
