import { createNotificationUser, tokenExists, notificationGroupExists, createNotificationGroup, getNotificationUsersCount, getPaginatedFcmTokens } from '../config/postgresPlacesService.js';
import { v4 as uuidv4 } from 'uuid';
import admin from "firebase-admin";

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
}
admin.initializeApp({
  
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint to send notifications to multiple users
const sendNotifications = async (req, res) => {
  console.log("serviceAccount",serviceAccount);
  //const { title, body } = req.body; // Extract title and body from the request
  const tokens = [];

  try {
    // Get the total count of notification users
    const tokenCount = await getNotificationUsersCount();
    const batchFetchCount = Math.ceil(tokenCount / 500);

    // Fetch tokens concurrently in batches
    const batchPromises = Array.from({ length: batchFetchCount }, (_, i) =>
      getPaginatedFcmTokens(500, i * 500)
    );
    const tokenBatches = await Promise.all(batchPromises);
    console.log("tokenBatches",tokenBatches);

    // Flatten the fetched token batches into a single array
    tokenBatches.forEach((batch) => tokens.push(...batch));
    console.log(tokens);
    // Create notification messages
    const messages = tokens.map((token) => ({
      notification: {
        title: "Waka Traffic Alert",
        body: "Alert: Traffic congestion in your area from BE",
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

    // Respond with the results
    res.status(200).send({
      message: "Notifications sent",
      successCount: successes,
      failureCount: failures,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).send({ message: "Failed to send notifications", error });
  }
};


const addNotificationUser = async (req, res) => {
    const details = req.body;
  
    try {
      // Check if token already exists
      if (await tokenExists(details.fcmToken)) {
        return res.status(200).send({
          status: true,
          response: 'Token already exists',
          returnObj: null,
        });
      }
  
      // Add new notification user
      const notificationDetails = {
        id: uuidv4(),
        fcmToken: details.fcmToken,
        locationCity: details.locationCity,
      };
  
      const user = await createNotificationUser(notificationDetails);
      if (!user) {
        return res.status(500).send({
          status: false,
          response: 'Error adding new notification user',
          returnObj: null,
        });
      }
  
      // Check if group exists or create a new one
      const groupName = `${details.locationCity}_${details.country}`;
      let group = null;
  
      if (!(await notificationGroupExists(groupName))) {
        const newGroup = {
          id: uuidv4(),
          name: groupName,
          city: details.locationCity,
          country: details.country,
        };
  
        group = await createNotificationGroup(newGroup);
        if (!group) {
          return res.status(500).send({
            status: false,
            response: 'Error adding new notification group',
            returnObj: null,
          });
        }
      }
  
      return res.status(200).send({
        status: true,
        response: group
          ? 'Token added successfully and notification group created successfully'
          : 'Token added successfully',
        returnObj: { user, group },
      });
    } catch (err) {
      console.error('Error in addNotificationUser:', err);
      return res.status(500).send({
        status: false,
        response: err.message,
        returnObj: null,
      });
    }
  };
  
  //====================================== Private functions =======================================

  const getIterationCount = async (number) => {
    if  (number <= 500){
        return number
    }
    else{
      if(number % 500 == 0){
        return number / 500
      }
      else{
        return Math.floor(number / 500) + 1
      }
    }
  };

export default { addNotificationUser, sendNotifications };


