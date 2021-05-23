const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Cocktail } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res)=>{
  const cocktails = await Cocktail.findAll()
  res.json(cocktails)
}))

module.exports = router