import {model, Schema} from "mongoose"

const BoardModel = new Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    content: {type: Object, default: ''},
    isActive: {type: Boolean, default: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

export default model('Board', BoardModel)