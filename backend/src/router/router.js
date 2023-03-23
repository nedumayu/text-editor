import {Router} from "express"
import AuthController from "../controllers/auth-controller.js"
import UserController from "../controllers/user-controller.js"
import {body} from 'express-validator'
import BoardController from "../controllers/board-controller.js"
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = new Router()

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 30}),
    AuthController.registration
)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)

router.get('/users', AuthMiddleware, UserController.getUsers)
router.get('/profile', AuthMiddleware, UserController.getUserById)
router.put('/profile', AuthMiddleware, UserController.updateUser)
router.delete('/profile', AuthMiddleware, UserController.deleteUser)

router.get('/boards', BoardController.getBoards)
router.post('/boards', AuthMiddleware, BoardController.addBoard)
router.get('/boards/:id', AuthMiddleware, BoardController.getBoardById)
router.put('/boards/:id', AuthMiddleware, BoardController.updateBoard)
router.delete('/boards/:id', AuthMiddleware, BoardController.deleteBoard)

router.get('/boards/:id/changes', AuthMiddleware, BoardController.getChanges)
router.post('/boards/:id', AuthMiddleware, BoardController.addChange)

export default router