
// bingMapsModule.js
import 'dotenv/config';
//import { readPlacesFromFileByName } from './storeConfig.js';
import { readPlacesBySearchTerm } from './postgresPlacesService.js';
export const API_URL = 'https://dev.virtualearth.net/REST/v1/Locations';
export const API_KEY = process.env.BING_MAPS_API_KEY;

// Helper function to process the response
function extractPlaceInfoForUser(input) {
    const result = input.resourceSets[0].resources.map(resource => {
        const address = resource.address.formattedAddress || [
            resource.address.locality,
            resource.address.adminDistrict2,
            resource.address.adminDistrict,
            resource.address.countryRegion
        ].filter(Boolean).join(', ');

        const [latitude, longitude] = resource.geocodePoints[0].coordinates;

        return {
            name: resource.name,
            address: address,
            city: resource.address.locality,
            latitude: latitude,
            longitude: longitude,
            category: resource.entityType,
            confidenceLevel: resource.confidence,
            boundingBox: resource.bbox,
            matchCodes: resource.matchCodes,
            calculationMethod: resource.geocodePoints[0].calculationMethod,
            country: resource.address.countryRegion,
            needSave: true
        };
    });

    return result;
}


export const getSearchLocations = async (loc, maxResults = 5)=> {
    const placesResults = await readPlacesBySearchTerm(loc);
    if (placesResults.length > 0) {
        return placesResults;
    } else {
        return await getLocations(loc, maxResults);
    }
}

// Function to call the Bing Maps API and process the response
export const getLocations = async (loc, maxResults = 5)=> {
    const url = `${API_URL}?query=${encodeURIComponent(loc)}&includeNeighborhood=1&include=queryParse&maxResults=${maxResults}&key=${API_KEY}`;
    console.log(url);
    try {
        const response = await fetch(url);
        console.log(response);
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();

        // Check if the API returned a valid response with results
        if (data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
            return extractPlaceInfoForUser(data);
        } else {
            throw new Error('No locations found');
        }

    } catch (error) {
        console.error('Error in getLocations:', error);
        return { error: error.message };
    }
}








// export const getSearchLocations = async (loc, maxResults = 5)=> {
//     const placesResults = await readPlacesFromFileByName(loc);
//     if (placesResults.length > 0) {
//         return placesResults;
//     } else {
//         return await getLocations(loc, maxResults);
//     }
// }

// // Function to call the Bing Maps API and process the response
// export const getLocations = async (loc, maxResults = 5)=> {
//     const url = `${API_URL}?query=${encodeURIComponent(loc)}&includeNeighborhood=1&include=queryParse&maxResults=${maxResults}&key=${API_KEY}`;
//     console.log(url);
//     try {
//         const response = await fetch(url);
//         console.log(response);
//         // Check if the response is OK (status 200-299)
//         if (!response.ok) {
//             throw new Error(`Error fetching data: ${response.statusText}`);
//         }

//         const data = await response.json();

//         // Check if the API returned a valid response with results
//         if (data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
//             return extractPlaceInfoForUser(data);
//         } else {
//             throw new Error('No locations found');
//         }

//     } catch (error) {
//         console.error('Error in getLocations:', error);
//         return { error: error.message };
//     }
// }