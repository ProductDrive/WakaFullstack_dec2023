import cron from 'node-cron';
import {sendNotification} from './notification.js';

cron.schedule('0 */10 * * *', async () => {  // Every 5 minute
    console.log('Running the background job to send push notifications');

    try {   
        console.log('Sending notifications...', new Date());
        await sendNotification();
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
});