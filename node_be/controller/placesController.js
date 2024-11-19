
import { createPlace, readAllPlaces, readPlaceById, countPlaces } from '../config/postgresPlacesService.js';
import { getLocations, getSearchLocations, getLocationsByCountry } from '../config/placesapiprocessor.js';
import { v4 as uuidv4 } from 'uuid';

const addPlaces = async (req, res) => {
    let model = {
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        category: req.body.category,
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        needSave: false,
        country: req.body.country
    }
    console.log(model)
    await createPlace(model).then(place => {
        res.status(200).send({
            status: true,
            response: "Place saved successfully!",
            returnObj: model
        });
    });

    
};

const getAllPlaces = async (req, res) => {
    console.log(req.query.country)
    if (!req.query.country) {
        await readAllPlaces().then(places => {
            res.status(200).send(places);
        });
    } else {
        const apidata = await getLocationsByCountry(req.query.country);
        res.status(200).send(apidata);
    }
};

const getPlacefromPlacesAPI = async (req, res) => {
    const apidata = await getLocations(req.query.loc);
    res.status(200).send(apidata);
};

const getPlacesSearch = async (req, res) => {
    const apidata = await getSearchLocations(req.query.loc);
    res.status(200).send(apidata);
};

const getPlacesCount = async (req, res) => {
    try {
        const count = await countPlaces();
        res.status(200).send({
            status: true,
            response: "Places count retrieved successfully",
            count: count
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            status: false,
            response: "Error retrieving places count"
        });
    }
};

const getPlaceCategorization = async (req, res) => {
    // let sql = 'SELECT waka_db.categories.name AS categoryName, waka_db.places.id AS placeId FROM waka_db.categories JOIN waka_db.places ON waka_db.categories.id = waka_db.places.categoryId;';
    // let placeCat = await db.sequelize.query(sql);
    // let grouping = placeCat[0].reduce((group, place) => {
    //     const { categoryName } = place;
    //     group[categoryName] = group[categoryName] ?? [];
    //     group[categoryName].push(place);
    //     return group;
    // }, {});
    // let resModel = [];
    // Object.entries(grouping).forEach(element => {
    //     resModel.push({ categoryName: element[0], count: element[1].length });
    // });
    res.status(200).send({
        status: true,
        response: "Successful",
        // returnObj: resModel
    });
};

const getAPlace = async (req, res) => {
    // let id = req.params.id;
    // let place = await Places.findOne({ where: { id: id } });
    // res.status(200).send(place);
    res.status(200).send();
};

const getPlaceInCategory = async (req, res) => {
    // let catId = req.params.categoryId;
    // let place = await Places.findAll({ where: { categoryId: catId } });
    res.status(200).send({
        status: true,
        response: null,
        // returnObj: place
    });
};

const getPlaceInCities = async (req, res) => {
    // let cId = req.params.cityId;
    // let place = await Places.findAll({ where: { cityId: cId } });
    res.status(200).send({
        status: true,
        response: null,
        // returnObj: place
    });
};

// Update
const updatePlace = async (req, res) => {
    // let id = req.params.id;
    // let place = await Places.update(req.body, { where: { id: id } });
    // let theUpdatePlace = await Places.findOne({ where: { id: id } });
    // res.status(200).send(theUpdatePlace);
    res.status(200).send("place has been updated");
};

// Delete
const deletePlace = async (req, res) => {
    // let id = req.params.id;
    // await Places.destroy({ where: { id: id } });
    res.status(200).send("place has been deleted");
};

const bulkPlaceUploadFromFile = async (req, res) => {
    let assertain = req.params.isTest;
    console.log(assertain);
    if (assertain === 'true') {
        // for (let i = 0; i < filePlaces.length; i++) {
        //     let model = {
        //         id: filePlaces[i].Id,
        //         imageUrl: filePlaces[i].ImageUrl,
        //         name: filePlaces[i].Name,
        //         address: filePlaces[i].FullAddress,
        //         categoryId: filePlaces[i].categoryId,
        //         cityId: filePlaces[i].CityId,
        //         phoneNumber: filePlaces[i].PhoneNumber,
        //         searchedTimes: filePlaces[i].SearchedTimes,
        //         postedBy: filePlaces[i].PostedBy
        //     };
        //     const pp = await places.create(model);
        // }
        res.status(200).send({
            status: true,
            response: "Bulk Upload Successful"
        });
    } else {
        res.status(200).send("The API is up and running");
    }
};

// Export all functions as default
export default {
    addPlaces,
    getAPlace,
    getAllPlaces,
    getPlacefromPlacesAPI,
    getPlacesSearch,
    getPlaceInCategory,
    getPlaceInCities,
    updatePlace,
    deletePlace,
    bulkPlaceUploadFromFile,
    getPlaceCategorization,
    getPlacesCount
};




// ============================================
// const addPlaces = async (req, res) => {
//     let model = {
//         id: uuidv4(),
//         imageUrl: req.body.imageUrl,
//         name: req.body.name,
//         address: req.body.address,
//         category: req.body.category,
//         city: req.body.city,
//         phoneNumber: req.body.phoneNumber || 'NA',
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         searchedTimes: req.body.searchedTimes,
//         postedBy: req.body.postedBy
//     }

//     await writePlacesToFile(model);

//     res.status(200).send({
//         status: true,
//         response: "Place Posted Successfully!",
//         needsave: true,
//         returnObj: model
//     });
// };

// const getAllPlaces = async (req, res) => {
//     await Places.then(places => {
//         console.log('my places', places);
//         res.status(200).send(places);
//     });
// };

// const getPlacefromPlacesAPI = async (req, res) => {
//     const apidata = await getLocations(req.query.loc);
//     res.status(200).send(apidata);
// };

// const getPlacesSearch = async (req, res) => {
//     const apidata = await getSearchLocations(req.query.loc);
//     res.status(200).send(apidata);
// };

// const getPlacesCount = async (req, res) => {
//     try {
//         const count = await countPlacesInFile();
//         res.status(200).send({
//             status: true,
//             response: "Places count retrieved successfully",
//             count: count
//         });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send({
//             status: false,
//             response: "Error retrieving places count"
//         });
//     }
// };

// const getPlaceCategorization = async (req, res) => {
//     // let sql = 'SELECT waka_db.categories.name AS categoryName, waka_db.places.id AS placeId FROM waka_db.categories JOIN waka_db.places ON waka_db.categories.id = waka_db.places.categoryId;';
//     // let placeCat = await db.sequelize.query(sql);
//     // let grouping = placeCat[0].reduce((group, place) => {
//     //     const { categoryName } = place;
//     //     group[categoryName] = group[categoryName] ?? [];
//     //     group[categoryName].push(place);
//     //     return group;
//     // }, {});
//     // let resModel = [];
//     // Object.entries(grouping).forEach(element => {
//     //     resModel.push({ categoryName: element[0], count: element[1].length });
//     // });
//     res.status(200).send({
//         status: true,
//         response: "Successful",
//         // returnObj: resModel
//     });
// };

// const getAPlace = async (req, res) => {
//     // let id = req.params.id;
//     // let place = await Places.findOne({ where: { id: id } });
//     // res.status(200).send(place);
//     res.status(200).send();
// };

// const getPlaceInCategory = async (req, res) => {
//     // let catId = req.params.categoryId;
//     // let place = await Places.findAll({ where: { categoryId: catId } });
//     res.status(200).send({
//         status: true,
//         response: null,
//         // returnObj: place
//     });
// };

// const getPlaceInCities = async (req, res) => {
//     // let cId = req.params.cityId;
//     // let place = await Places.findAll({ where: { cityId: cId } });
//     res.status(200).send({
//         status: true,
//         response: null,
//         // returnObj: place
//     });
// };

// // Update
// const updatePlace = async (req, res) => {
//     // let id = req.params.id;
//     // let place = await Places.update(req.body, { where: { id: id } });
//     // let theUpdatePlace = await Places.findOne({ where: { id: id } });
//     // res.status(200).send(theUpdatePlace);
//     res.status(200).send("place has been updated");
// };

// // Delete
// const deletePlace = async (req, res) => {
//     // let id = req.params.id;
//     // await Places.destroy({ where: { id: id } });
//     res.status(200).send("place has been deleted");
// };

// const bulkPlaceUploadFromFile = async (req, res) => {
//     let assertain = req.params.isTest;
//     console.log(assertain);
//     if (assertain === 'true') {
//         // for (let i = 0; i < filePlaces.length; i++) {
//         //     let model = {
//         //         id: filePlaces[i].Id,
//         //         imageUrl: filePlaces[i].ImageUrl,
//         //         name: filePlaces[i].Name,
//         //         address: filePlaces[i].FullAddress,
//         //         categoryId: filePlaces[i].categoryId,
//         //         cityId: filePlaces[i].CityId,
//         //         phoneNumber: filePlaces[i].PhoneNumber,
//         //         searchedTimes: filePlaces[i].SearchedTimes,
//         //         postedBy: filePlaces[i].PostedBy
//         //     };
//         //     const pp = await places.create(model);
//         // }
//         res.status(200).send({
//             status: true,
//             response: "Bulk Upload Successful"
//         });
//     } else {
//         res.status(200).send("The API is up and running");
//     }
// };

// // Export all functions as default
// export default {
//     addPlaces,
//     getAPlace,
//     getAllPlaces,
//     getPlacefromPlacesAPI,
//     getPlacesSearch,
//     getPlaceInCategory,
//     getPlaceInCities,
//     updatePlace,
//     deletePlace,
//     bulkPlaceUploadFromFile,
//     getPlaceCategorization,
//     getPlacesCount
// };
