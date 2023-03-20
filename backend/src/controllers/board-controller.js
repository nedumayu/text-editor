import BoardService from "../services/board-service.js";

class BoardController {
    async getBoardById(req, res, next) {
        try{

        } catch (e) {

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

        } catch (e) {
            next()
        }
    }

    async updateBoard(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }

    async deleteBoard(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }

    async addChange(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }
}

export default new BoardController()