const express = require('express');
const router = express.Router();

const StoreController = require('../../controllers/v1/Stores.Controller');




router.route('/store').post(StoreController.createStore).get(StoreController.getAllStores);

router.route('/store/:id').patch(StoreController.updateStoreById).get(StoreController.getStoreById);


module.exports = router;
