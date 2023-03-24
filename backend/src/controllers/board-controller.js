import BoardService from "../services/board-service.js";

class BoardController {
    async getBoardById(req, res, next) {
        try{
            const {id} = req.params
            const board = await BoardService.getBoardById(id)
            return res.json(board)
        } catch (e) {
            next()
        }
    }

    async getBoards(req, res, next) {
        try{
            const boards = await BoardService.getBoards()
            return res.json(boards)
        } catch (e) {
            next()
        }
    }

    async addBoard(req, res, next) {
        try{
            const {title, author, members} = req.body
            const board = await BoardService.addBoard(title, author, members)
            return res.json(board)
        } catch (e) {
            next()
        }
    }

    async updateBoard(req, res, next) {
        try{
            const {id} = req.params
            const {title, content, isActive, members} = req.body
            const board = await BoardService.updateBoard(id, title, content, isActive, members)
            return res.json(board)
        } catch (e) {
            next()
        }
    }

    async deleteBoard(req, res, next) {
        try{
            const {id} = req.params
            const board = await BoardService.deleteBoard(id)
            return res.json(board)
        } catch (e) {
            next()
        }
    }

    async addChange(req, res, next) {
        try{
            const {id} = req.params
            const {user, content} = req.body
            const change = await BoardService.addChange(id, user, content)
            return res.json(change)
        } catch (e) {
            next()
        }
    }

    async getChanges(req, res, next) {
        try{
            const {id} = req.params
            const changes = await BoardService.getChanges(id)
            return res.json(changes)
        } catch (e) {
            next()
        }
    }
}

export default new BoardController()