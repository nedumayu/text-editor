import {model, Schema} from "mongoose"

const TokenModel = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String, required: true},
})

export default model('Token', TokenModel)