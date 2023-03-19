import BoardModel from "../models/board-model.js";

class BoardService {
    async getBoards() {
        const boards = await BoardModel.find()
        return boards
    }
}

export default new BoardService()