const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends=========================== potential issue here!!!!
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/assignments/:friendsId================== and here as well routing issue!!!
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
