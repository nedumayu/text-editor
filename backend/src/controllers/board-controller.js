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
            const {title, isActive, members} = req.body
            const board = await BoardService.updateBoard(id, title, isActive, members)
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
            const {user, content, message} = req.body
            const change = await BoardService.addChange(id, user, content, message)
            return res.json(change)
        } catch (e) {
            next()
        }
    }

    async refreshContent (req, res, next) {
        try{
            const {id} = req.params
            const data = await BoardService.refreshContent(id)
            return res.json(data)
        } catch (e) {
            next()
        }
    }

    async checkEditing (req, res, next) {
        try{
            const {id} = req.params
            const {editorName, paragraphId} = req.body
            const data = await BoardService.checkEditing(id, editorName, paragraphId)
            return res.json(data)
        } catch (e) {
            next()
        }
    }

    async addContent (req, res, next) {
        try{
            const {id} = req.params
            const {paragraphId} = req.body
            const data = await BoardService.addContent(id, paragraphId)
            return res.json(data)
        } catch (e) {
            next()
        }
    }

    async editContent (req, res, next) {
        try{
            const {id} = req.params
            const {paragraphId, content} = req.body
            const data = await BoardService.editContent(id, paragraphId, content)
            return res.json(data)
        } catch (e) {
            next()
        }
    }

    async deleteContent (req, res, next) {
        try{
            const {id, paragraphId} = req.params
            const data = await BoardService.deleteContent(id, paragraphId)
            return res.json(data)
        } catch (e) {
            next()
        }
    }
}

export default new BoardController()