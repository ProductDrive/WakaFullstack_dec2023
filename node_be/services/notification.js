import admin from "firebase-admin";
import { getNotificationUsersCount, getPaginatedFcmTokens } from "./postgresPlacesService.js";

export const sendNotification = async() => {
    const tokens = [];
    try {
        const tokenCount = await getNotificationUsersCount();
        const batchFetchCount = Math.ceil(tokenCount / 500);

        const batchPromises = Array.from({ length: batchFetchCount }, (_, i) =>
        getPaginatedFcmTokens(500, i * 500)
        );
        const tokenBatches = await Promise.all(batchPromises);
        console.log("tokenBatches",tokenBatches);

        tokenBatches.forEach((batch) => tokens.push(...batch));
        console.log(tokens);

        const messages = tokens.map((token) => ({
        notification: {
            title: "Waka Traffic Alert",
            body: "Alert: Tap to see Traffic Congestion in your area.",
        },
        token,
        }));
        console.log(messages);
        // Send notifications in batches using Firebase
        const responses = await Promise.all(
        messages.map((message) => admin.messaging().send(message))
        );

        // Calculate success and failure counts
        const successes = responses.filter((r) => r.success).length;
        const failures = responses.filter((r) => !r.success).length;
    }catch (error) {
        console.error('Error sending notifications:', error);
    }

}
