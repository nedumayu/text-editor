import {Router} from "express"
import AuthController from "../controllers/auth-controller.js"
import UserController from "../controllers/user-controller.js"
import BoardController from "../controllers/board-controller.js"

const router = new Router()

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)
router.get('/profile', UserController.getUser)
router.get('/boards', BoardController.getBoards)
router.get('/board/:id', BoardController.getBoardById)

export default router