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
Object.defineProperty(exports, "__esModule", { value: true });
const user_login_1 = require("../controllers/user.login");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const authUser = yield user_login_1.userService.getOne({ _id: user.id });
        if (!user) {
            return res.status(403).send({
                message: 'You must be signed in to view this page',
                status: 'failed'
            });
        }
        else {
            if (user.role === 'admin') {
                console.log('Admin access granted to:', user);
                next();
            }
            else {
                return res.status(403).send({
                    message: 'You are not authorised to view this page',
                    status: 'failed'
                });
            }
        }
    }
    catch (err) {
        return res.status(404).send({
            message: err,
            status: 'failed'
        });
    }
});
exports.default = authorize;
