import {model, Schema} from "mongoose"

const ChangeModel = new Schema({
    content: {type: String},
    date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    board: {type: Schema.Types.ObjectId, ref: 'Board'}
})

export default model('Change', ChangeModel)