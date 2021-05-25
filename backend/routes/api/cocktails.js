const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')
// const { restoreCSRF} = require('../../../frontend/src/store/csrf')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Cocktail } = require('../../db/models');


const router = express.Router();

router.get('/', asyncHandler(async (req, res)=>{
  const cocktails = await Cocktail.findAll()
  res.json(cocktails)
}))

router.post('/', asyncHandler(async (req, res)=>{

  const { name, description, imageUrl, classic} = req.body
  const cocktail = await Cocktail.create(req.body);
 
  return res.json({
    cocktail
  })
}))

router.patch('/:id', asyncHandler(async (req, res)=>{
  const id = req.params.id
  console.log("HELLO HELLO HELLO", id)
  const {name, description,imageUrl, classic} = req.body

  const cocktailToUpdate = await Cocktail.findByPk(id)

  await cocktailToUpdate.update({
    name, description, imageUrl, classic
  })

  return res.json(cocktailToUpdate)

}))


router.delete("/:id", asyncHandler(async (req, res)=>{
  const id = req.params.id
  // console.log("LOOK HERE HERE HERE", id)
  console.log(req.params)
  const cocktailToDelete = await Cocktail.findByPk(id)


  if (cocktailToDelete){
   await cocktailToDelete.destroy();
    return res.json(id)
  } else {
    console.log('that is not there')
  }


}))

// router.post(
//   '/',
//   asyncHandler(async(req, res)=>{
//     const {name, description, userId} = req.body;
//     const land = await Land.createNew({name, description, userId});
//     return res.json({
//       land
//     })
//   })
// )

module.exports = router