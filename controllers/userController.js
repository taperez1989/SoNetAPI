const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async () => {
//     const numberOfUsers = await User.aggregate()
//         .count('userCount');
//     return numberOfUsers;
// }

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            console.log(users);
            // const userObj = {
            //     users,
            //     // headCount: await headCount(),
            // };

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a User and remove them from the course
    async deleteUser(req, res) {
        try {
            const User = await User.findOneAndRemove({ _id: req.params.userId });

            if (!User) {
                return res.status(404).json({ message: 'No such User exists' });
            }

            const singleUser = await User.findOneAndUpdate(
                { users: req.params.userId },
                { $: { users: req.params.userId } },
                { new: true }
            );

            if (!singleUser) {
                return res.status(404).json({
                    message: 'User deleted',
                });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend to a User
    async addFriend(req, res) {
        console.log('You are adding an afriend');
        console.log(req.body);

        try {
            const friend = await friends.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend from a User
    async removeFriend(req, res) {
        try {
            const singleFriend = await friends.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: singlefriend._id } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' });
            }

            res.json(singleFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

