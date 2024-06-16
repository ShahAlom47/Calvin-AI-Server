const express = require('express');
const {  paintingGenerate, getSinglePainting, painting } = require('../Controller/painting.controller');
const router= express.Router()

router.get('/',painting);
router.post('/generate',paintingGenerate);
router.get('/:id',getSinglePainting);

module.exports=router;