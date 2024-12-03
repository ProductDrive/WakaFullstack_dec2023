
import { createNotificationUser, tokenExists, notificationGroupExists, createNotificationGroup } from '../config/postgresPlacesService.js';
import { v4 as uuidv4 } from 'uuid';


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
  
  

export default { addNotificationUser };