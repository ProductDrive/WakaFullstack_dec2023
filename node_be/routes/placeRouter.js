import express from 'express';
import placesController from '../controller/placesController.js';

const router = express.Router();

//Swagger schema definitions

/**
 * @swagger
 * definitions:
 *   Place:
 *     properties:
 *       id:
 *         type: string
 *       imageUrl:
 *         type: string
 *       name:
 *         type: string
 *       category:
 *         type: string
 *       city:
 *         type: string
 *       address:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       searchedTimes:
 *         type: integer
 *       postedBy:
 *         type: string
 * 
 */

/**
 * @swagger
 * definitions:
 *   PlacesInCategory:
 *     properties:
 *       catogoryName:
 *         type: string
 *       count:
 *         type: integer
 * 
 */
//=============================================================================================================

/**
 * @swagger
 * /api/place/allPlaces:
 *   get:
 *     description: Get all places
 *     responses:
 *       200:
 *         description: Array of places
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/allPlaces', placesController.getAllPlaces);

/**
 * @swagger
 * /api/place/placesfromapi:
 *   get:
 *     description: Get places from Bing Places API
 *     parameters:
 *       - name: loc
 *         in: query
 *         description: Location query
 *     responses:
 *       200:
 *         description: Array of places
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/placesfromapi', placesController.getPlacefromPlacesAPI);

/**
 * @swagger
 * /api/place/searchplaces:
 *   get:
 *     description: Get places from Bing Places API
 *     parameters:
 *       - name: loc
 *         in: query
 *         description: Location query
 *     responses:
 *       200:
 *         description: Array of places
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/searchplaces', placesController.getPlacesSearch);


/**
 * @swagger
 * /api/place/placescount:
 *   get:
 *     description: Get number of places in Database
 *     responses:
 *       200:
 *         description: integer
 */
router.get('/placescount', placesController.getPlacesCount);

/**
 * @swagger
 * /api/place/placeInCat:
 *   get:
 *     description: Get Places count in Category
 *     responses:
 *       200:
 *         description: Array of Places categories
 *         schema:
 *           $ref: '#/definitions/PlacesInCategory'
 * 
 */
 router.get('/placeInCat', placesController.getPlaceCategorization);


/**
 * @swagger
 * /api/place/addPlaces:
 *   post:
 *     description: Create a new place
 *     parameters:
 *       - name: place
 *         description: Place Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Place'
 *     responses:
 *       200:
 *         description: Successfully Created
 * 
 */
router.post('/addPlaces', placesController.addPlaces);

/**
 * @swagger
 * /api/place/categoryplace/{id}:
 *   get:
 *     description: Get places by category
 *     parameters:
 *       - name: id
 *         description: Category Id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: A places oject
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/categoryplace/:categoryId', placesController.getPlaceInCategory);


/**
 * @swagger
 * /api/place/cityplace/{id}:
 *   get:
 *     description: Get places by city
 *     parameters:
 *       - name: id
 *         description: City Id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: A places oject
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/cityplace/:cityId', placesController.getPlaceInCities);

/**
 * @swagger
 * /api/place/{id}:
 *   get:
 *     description: Get places by id
 *     parameters:
 *       - name: id
 *         description: Place Id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: A places oject
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/:id', placesController.getAPlace);

/**
 * @swagger
 * /api/place/{id}:
 *   put:
 *     description: Update a place
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Place Id
 *         in: path
 * 
 *       - name: place
 *         description: Place
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Place'
 *     responses:
 *       200:
 *         description: A places oject
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.put('/:id', placesController.updatePlace);


/**
 * @swagger
 * /api/place/{id}:
 *   delete:
 *     description: Remove a place
 *     parameters:
 *       - name: id
 *         description: Place Id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: A places object
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.delete('/:id', placesController.deletePlace);

/**
 * @swagger
 * /api/place/bulkUpload/{id}:
 *   delete:
 *     description: Bulk upload from file or Test API
 *     parameters:
 *       - name: id
 *         description: true or false
 *         in: path
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: A places object
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.delete('/bulkUpload/:isTest', placesController.bulkPlaceUploadFromFile);


export default router;