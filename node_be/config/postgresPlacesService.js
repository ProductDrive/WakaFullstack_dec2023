import { pool } from './dbConfig.js';


// Create a place
export const createPlace = async (place) => {
  const query = {
    text: 'INSERT INTO places (id, name, address, category, city, phoneNumber, latitude, longitude, needSave) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [place.id, place.name, place.address, place.category, place.city, place.phoneNumber, place.latitude, place.longitude, place.needsave],
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
      text: 'SELECT * FROM places WHERE LOWER(name) LIKE LOWER($1) OR LOWER(category) LIKE LOWER($1) OR LOWER(city) LIKE LOWER($1)',
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