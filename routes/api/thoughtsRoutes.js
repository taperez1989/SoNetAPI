const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction
} = require('../../controllers/thoughtsController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
    .post(addReaction);

module.exports = router;
