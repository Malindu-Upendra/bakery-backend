const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)

router.route('/:userid').delete(usersController.deleteUser)

router.route('/emailTesting').get(usersController.emailTesting)

router.route('/updateMember/:id').patch(usersController.approveMember)

router.route('/:id').get(usersController.getspecificUserDetails)

router.route('/updateSchema').patch(usersController.changeSchema)

module.exports = router
