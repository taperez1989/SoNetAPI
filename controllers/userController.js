const { ObjectId } = require('mongoose').Types;
const { user, Course } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async () => {
//     const numberOfUsers = await user.aggregate()
//         .count('userCount');
//     return numberOfUsers;
// }

module.exports = {

    // Get all students
    async getUsers(req, res) {
        try {
            const users = await user.find();

            const userObj = {
                users,
                // headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await user.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
                grade: await grade(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await user.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and remove them from the course
    async deleteUser(req, res) {
        try {
            const user = await user.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const course = await Course.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!course) {
                return res.status(404).json({
                    message: 'user deleted, but no courses found',
                });
            }

            res.json({ message: 'user successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend to a user
    async addFriend(req, res) {
        console.log('You are adding an assignment');
        console.log(req.body);

        try {
            const student = await Student.findOneAndUpdate(
                { _id: req.params.studentId },
                { $addToSet: { assignments: req.body } },
                { runValidators: true, new: true }
            );

            if (!student) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' });
            }

            res.json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend from a user
    async removeFriend(req, res) {
        try {
            const student = await Student.findOneAndUpdate(
                { _id: req.params.studentId },
                { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
                { runValidators: true, new: true }
            );

            if (!student) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' });
            }

            res.json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

