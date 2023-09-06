const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/:id', imageController.getImageById);
//router.get('/:id', imageController.getImagesByProductId);
router.post('/:id', imageController.createImage);
router.put('/:id', imageController.updateImageForProduct);
router.delete('/:id', imageController.deleteImage);

module.exports = router;