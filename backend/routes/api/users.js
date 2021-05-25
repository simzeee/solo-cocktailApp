const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];



router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({
      username,
      email,
      password,
      profileImageUrl,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.patch('/:id', asyncHandler(async (req, res) =>{
  const id = req.params.id

  const {email, password, username} = req.body
  const userToUpdate = await User.findByPk(id)

  let payload = {}

  if (email) payload.email = email
  if (username) payload.username = username
  if (password) payload.hashedPassword = bcrypt.hashSync(password)

  await userToUpdate.update(
    payload
  )

  return res.json(userToUpdate)

}))

router.patch('/withImage/:id', singleMulterUpload('image'), asyncHandler(async (req, res) =>{
  const id = req.params.id

  const {email, password, username} = req.body
  const profileImageUrl	= await singlePublicFileUpload(req.file)
  const userToUpdate = await User.findByPk(id)

  let payload = {}

  if (email) payload.email = email
  if (username) payload.username = username
  if (req.file) payload.profileImageUrl = profileImageUrl
  if (password) payload.hashedPassword = bcrypt.hashSync(password)

  await userToUpdate.update(
    payload
  )

  return res.json(userToUpdate)

}))

router.delete("/:id", asyncHandler(async (req, res) =>{
  const id = req.params.id

  const userToDelete = await User.findByPk(id)

  if( userToDelete){
    await userToDelete.destroy()
    return res.json(id)
  }else {
    console.log('No user found')
  }
}))

module.exports = router;