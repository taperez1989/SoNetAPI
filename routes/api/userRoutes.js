const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments=========================== potential issue here!!!!
router.route('/:userId/friends').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId================== and here as well routing issue!!!
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
