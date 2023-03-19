import UserModel from "../models/user-model.js"
import bcrypt from 'bcrypt'
import ApiError from "../exceptions/api-errors.js"
import UserDto from "../dtos/user-dto.js"
import TokenService from "./token-service.js";

class UserService {
    async registration(email, password, username) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с емейлом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword, username})

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new UserService()