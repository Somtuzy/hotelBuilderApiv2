"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../services/service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const userService = new service_1.default(user_model_1.default);
class UserController {
    // Updating a user
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const { fullname, username, email, password, role, age } = req.body;
                // Checks if user already exists
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    });
                }
                // Updates the user
                const updatedUser = yield userService.edit(id, { username: username, fullname: fullname, email: email, password: password, role: role, age: age });
                // Sends a success message and displays the updated user
                return res.status(200).send({
                    success: true,
                    message: 'User updated successfully!',
                    data: updatedUser
                });
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
    // Deleting a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    });
                }
                else {
                    // Deletes the user
                    const deletedUser = yield userService.delete(id);
                    // Sends a success message and displays the deleted user
                    return res.status(200).send({
                        success: true,
                        message: 'User deleted successfully!',
                        data: deletedUser
                    });
                }
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
    // Getting one user by id
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    });
                }
                else {
                    // Sends a success message and displays user
                    return res.status(200).send({
                        success: true,
                        message: 'User fetched successfully!',
                        data: existingUser
                    });
                }
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
    // Getting all users
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAll({});
                // Sends a message if no users exist
                if (!users) {
                    return res.status(404).send({
                        success: false,
                        message: 'There are no users on your database'
                    });
                }
                else {
                    // Sends a success message and displays users
                    return res.status(200).send({
                        success: true,
                        message: 'Users fetched successfully!',
                        data: users
                    });
                }
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
}
exports.default = new UserController();
