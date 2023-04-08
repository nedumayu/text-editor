import {model, Schema} from "mongoose"

const BoardModel = new Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    content: {type: Schema.Types.Mixed},
    isActive: {type: Boolean, default: true},
    isEditing: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

export default model('Board', BoardModel)