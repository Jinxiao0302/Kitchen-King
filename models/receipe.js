const mongoose = require('mongoose');
const Review = require('./review')
const Material = require('./materials')
const Schema = mongoose.Schema;

const ReceipeSchema = new Schema({
    name: String,
    image: String,
    steps: String,
    description: String,
    materials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Material'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

ReceipeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Receipe', ReceipeSchema);