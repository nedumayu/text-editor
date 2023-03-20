export default class UserDto {
    id;
    username;
    email;
    boards;

    constructor(model) {
        this.id = model._id;
        this.username = model.username
        this.email = model.email;
        this.boards = model.boards
    }
}