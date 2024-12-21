import { pool } from '../config/dbConfig.js';


// Create a place
export const createPlace = async (place) => {
  console.log(place);
  if (!place || !place.id || !place.name || !place.address || !place.category || !place.city || !place.country || place.latitude == null || place.longitude == null) {
    throw new Error('Invalid place data');
  }

  const query = {
    text: 'INSERT INTO places (id, name, address, category, city, latitude, longitude, needSave, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: [place.id, place.name, place.address, place.category, place.city, place.latitude, place.longitude, place.needSave, place.country],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.error('Error creating place:', err);
    throw err;
  }
};

// Read all places
export const readAllPlaces = async () => {
  const query = {
    text: 'SELECT * FROM places',
  };

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('Error reading all places:', err);
    throw err;
  }
};

// Read a place by ID
export const readPlaceById = async (id) => {
  const query = {
    text: 'SELECT * FROM places WHERE id = $1',
    values: [id],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.error('Error reading place by ID:', err);
    throw err;
  }
};

// Read places by search term
export const readPlacesBySearchTerm = async (searchTerm) => {
    const query = {
      text: `SELECT *
              FROM places
              WHERE 
                LOWER(name) LIKE LOWER($1) 
                OR LOWER(category) LIKE LOWER($1) 
                OR LOWER(city) LIKE LOWER($1) 
                OR LOWER(country) LIKE LOWER($1)
              ORDER BY 
                CASE 
                  WHEN LOWER(country) = LOWER($1) THEN 1
                  ELSE 2
                END;
              `,
      values: [`%${searchTerm}%`],
    };
  
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      console.error('Error reading places by search term:', err);
      throw err;
    }
  };


export const createNotificationUser = async (details) => {
  //TODO: find a way to clean up expired tokens from the database
  const query = {
    text: 'INSERT INTO notificationUsers (id, fcmToken, locationCity) VALUES ($1, $2, $3) RETURNING *',
  }

  try {
    const { rows } = await pool.query(query, [details.id, details.fcmToken, details.locationCity]);
    return rows[0];
  } catch (err) {
    console.error('Error creating notification user:', err);
    throw err;
  }
}

export const tokenExists = async (token) => {
  const query = {
    text: 'SELECT EXISTS (SELECT 1 FROM notificationUsers WHERE fcmToken = $1)',
    values: [token],
  }
  try {
    const { rows } = await pool.query(query);
    return rows[0].exists;
  } catch (err) {
    console.error('Error checking token:', err);
    throw err;
  }
}

export const getPaginatedFcmTokens = async (limit, offset) => {
  const query = {
    text: 'SELECT fcmtoken FROM notificationUsers ORDER BY id LIMIT $1 OFFSET $2',
  };

  try {
    const { rows } = await pool.query(query, [limit, offset]);
    console.log("notUser",rows);
    return rows.map((row) => row.fcmtoken); // Extract the tokens into an array
  } catch (err) {
    console.error('Error retrieving paginated FCM tokens:', err);
    throw err;
  }
};

export const getNotificationUsersCount = async () => {
  const query = {
    text: 'SELECT COUNT(*) AS count FROM notificationUsers',
  };

  try {
    const { rows } = await pool.query(query);
    return parseInt(rows[0].count, 10); // Convert count to a number
  } catch (err) {
    console.error('Error retrieving notification users count:', err);
    throw err;
  }
};



export const createNotificationGroup = async (details) => {
  const query = {
    text: 'INSERT INTO notificationGroups (id, name, city, country) VALUES ($1, $2, $3, $4) RETURNING *',
  }  
  try {    
    const { rows } = await pool.query(query, [details.id, details.name, details.city, details.country]);
    return rows[0];
  } catch (err) {
    console.error('Error creating notification group:', err);
    throw err;
  }
}

export const notificationGroupExists = async (details) => {
  const query = {
    text: 'SELECT EXISTS (SELECT 1 FROM notificationGroups WHERE name = $1)',
    values: [details.name],
  }
  try {
    const { rows } = await pool.query(query);
    return rows[0].exists;
  } catch (err) {
    console.error('Error checking notification group:', err);
    throw err;
  }
}

export const createNotificationSubscription = async (details) => {
  const query = {
    text: 'INSERT INTO notificationSubscriptions (id, notificationUserId, notificationGroupId) VALUES ($1, $2, $3) RETURNING *',
  }  
  try {    
    const { rows } = await pool.query(query, [details.id, details.notificationUserId, details.notificationGroupId]);
    return rows[0];
  } catch (err) {
    console.error('Error creating notification subscription:', err);
    throw err;
  }
}

export const deleteNotificationSubscription = async (userId) => {
  const query = {
    text: 'DELETE FROM notificationSubscriptions WHERE notificationUserId = $1 RETURNING *',
    values: [userId],
  };
  
  try {
    const result = await pool.query(query);
    return result.rowCount; // Return the number of rows deleted
  } catch (err) {
    console.error('Error deleting notification subscription:', err);
    throw err;
  } 
  
}

// Update a place
export const updatePlace = async (id, place) => {
  const query = {
    text: 'UPDATE places SET name = $1, category = $2, city = $3, latitude = $4, longitude = $5 WHERE id = $6 RETURNING *',
    values: [place.name, place.category, place.city, place.latitude, place.longitude, id],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.error('Error updating place:', err);
    throw err;
  }
};

// Delete a place
export const deletePlace = async (id) => {
  const query = {
    text: 'DELETE FROM places WHERE id = $1 RETURNING *',
    values: [id],
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    console.error('Error deleting place:', err);
    throw err;
  }
};

export const countPlaces = async () => {
  const query = {
    text: 'SELECT COUNT(*) FROM places',
  };

  try {
    const { rows } = await pool.query(query);
    return rows[0].count;
  } catch (err) {
    console.error('Error counting places:', err);
    throw err;
  }
};