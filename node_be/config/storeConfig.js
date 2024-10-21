import { promises as fs } from 'fs'; // Destructure 'promises' directly from 'fs'
const filePath = './config/placesstore.json';

export const writePlacesToFile = async (data) => {
    const existingData = await readPlacesFromFile();
    existingData.places.push(data);
    const jsonData = JSON.stringify(existingData, null, 2);

    try {

        await fs.writeFile(filePath, jsonData); // Use await to write the file
        console.log('JSON data written to', filePath);
    } catch (err) {
        console.error('Error writing file:', err);
    }
};

export const readPlacesFromFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Read the file with UTF-8 encoding
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error:', err);
    }
};

export const readPlacesFromFileByName = async (searchName) => {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Read the file with UTF-8 encoding
        const jsonData = JSON.parse(data);
        // Filter places whose names contain the search name
        const places = jsonData.places.filter(place => place.name.toLowerCase().includes(searchName.toLowerCase()));

        return places;
    } catch (err) {
        console.error('Error:', err);
    }
};

export const countPlacesInFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Read the file with UTF-8 encoding
        const jsonData = JSON.parse(data);
        // Return the count of places
        return jsonData.places.length;
    } catch (err) {
        console.error('Error:', err);
    }
};
