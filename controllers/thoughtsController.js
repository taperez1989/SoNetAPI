const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find().populate('thoughtText');
            res.json(allThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a Thought
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.body.thoughtText })
                .populate('User');

            if (!Thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            }

            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a Thought
    async createThought(req, res) {
        try {
            const userThought = await Thought.create(req.body);
            const singleUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: userThought._id } },
                { new: true }
            );
            res.json(singleUser);


        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a Thought++++++++++++ issue here 
    async deleteThought(req, res) {
        try {
            const Thoughts = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!Thought) {
                res.status(404).json({ message: 'No Thought with that ID' });
            }

            await User.deleteMany({ _id: { $in: Thought.user } });
            res.json({ message: 'Thought and users deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a Thought
    async updateThought(req, res) {
        try {
            const Thoughts = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!Thought) {
                res.status(404).json({ message: 'No Thought with this id!' });
            }

            res.json(Thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
