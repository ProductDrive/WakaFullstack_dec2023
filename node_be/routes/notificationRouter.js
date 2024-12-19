import express from 'express';
import notificationController from '../controller/notificationController.js';

const router = express.Router();

//Swagger schema definitions

/**
 * @swagger
 * definitions:
 *   NotificationUser:
 *     properties:
 *       id:
 *         type: string
 *       fcmToken:
 *         type: string
 *       locationCity:
 *         type: string
 *       country:
 *         type: string
 * 
 */



/**
 * @swagger
 * /api/notification/user:
 *   post:
 *     description: Create a notification user
 *     parameters:
 *       - name: details
 *         description: NoficationUser Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NotificationUser'
 *     responses:
 *       200:
 *         description: Successfully Created
 * 
 */
router.post('/user', notificationController.addNotificationUser);


/**
 * @swagger
 * /api/notification/send:
 *   get:
 *     description: Send notifications for testing purposes
 *     responses:
 *       200:
 *         description: returns 200
 * 
 */
router.get('/send', notificationController.sendNotifications);


export default router;