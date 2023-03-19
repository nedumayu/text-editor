import {model, Schema} from "mongoose"
import {ObjectId} from "mongodb";

const ChangeModel = new Schema({
    content: {type: String},
    date: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    board: {type: Schema.Types.ObjectId, ref: 'Board'}
})

export default model('Change', ChangeModel)