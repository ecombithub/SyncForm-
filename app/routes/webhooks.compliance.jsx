import { json } from "@remix-run/node";
import crypto from "crypto";

const SHOPIFY_API_SECRET_KEY = process.env.SHOPIFY_API_SECRET_KEY;

export const action = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const rawText = await request.text();
        console.log("📦 Raw Webhook Payload:", rawText);

        const receivedHmac = request.headers.get("X-Shopify-Hmac-Sha256");

        if (!receivedHmac) {
            console.error("❌ Missing HMAC signature");
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        const computedHmac = crypto
            .createHmac("sha256", SHOPIFY_API_SECRET_KEY)
            .update(rawText, "utf8")
            .digest("base64");

        if (computedHmac !== receivedHmac) {
            console.error("❌ HMAC validation failed");
            return json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("✅ HMAC validation successful");

        const payload = JSON.parse(rawText);
        console.log("🔍 Incoming Headers:", JSON.stringify([...request.headers.entries()], null, 2));

        const topic = request.headers.get("x-shopify-topic") || request.headers.get("X-Shopify-Topic");
        console.log("🔔 Webhook Topic:", topic);

        const allowedTopics = ["customers/redact", "customers/data_request", "shop/redact"];
        if (!allowedTopics.includes(topic)) {
            return json({ error: "Unrecognized topic" }, { status: 400 });
        }

        const response = await fetch("https://apps.syncform.app/api/CostomerRequest", {
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
