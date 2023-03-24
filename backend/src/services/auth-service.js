import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-errors.js";
import bcrypt from "bcrypt";
import UserDto from "../dtos/user-dto.js";
import TokenService from "./token-service.js";
import UserService from "./user-service.js";

class AuthService {
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

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не зарегистрирован')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        const currentUser = await UserService.getCurrentUser(user)

        return {...tokens, user: currentUser}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        const currentUser = await UserService.getCurrentUser(user)
        return {...tokens, user: currentUser}
    }
}

export default new AuthService()