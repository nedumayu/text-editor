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

router.get('/users', UserController.getUsers)
router.put('/profile', UserController.updateUser)
router.delete('/profile', UserController.deleteUser)

router.get('/boards', BoardController.getBoards)
router.post('/boards', BoardController.addBoard)
router.get('/boards/:id', BoardController.getBoardById)
router.put('/boards/:id', BoardController.updateBoard)
router.delete('/boards/:id', BoardController.deleteBoard)

router.get('/boards/:id/changes', BoardController.getChanges)
router.post('/boards/:id', BoardController.addChange)

export default router