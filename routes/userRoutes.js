const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController');
const verifyJWT = require("../middleware/verifyJWT");

router.route('/')
    .post(verifyJWT, usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)

router.route('/get-all-users').post(verifyJWT, usersController.getAllUsers)

router.route('/:userid').delete(verifyJWT, usersController.deleteUser)

router.route('/emailTesting').get(verifyJWT, usersController.emailTesting)

router.route('/updateMember/:id').patch(verifyJWT, usersController.approveMember)

router.route('/logged-in-user').get(verifyJWT, usersController.getspecificUserDetails)

router.route('/updateSchema').patch(verifyJWT, usersController.changeSchema)

module.exports = router
