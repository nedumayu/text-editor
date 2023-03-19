import {model, Schema} from "mongoose"

const UserModel = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    boards: [{type: Schema.Types.ObjectId, ref: 'Board'}]
})

export default model('User', UserModel)