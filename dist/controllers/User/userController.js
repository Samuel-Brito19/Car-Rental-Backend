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
exports.getUsersHandler = exports.loginHandler = exports.registerUserHandler = void 0;
const userService_1 = require("./userService");
const bcrypt_1 = require("bcrypt");
function registerUserHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const user = yield (0, userService_1.createUser)(body);
            return reply.code(200).send({
                id: user.id,
                name: user.name,
                email: user.email
            });
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.registerUserHandler = registerUserHandler;
function loginHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const user = yield (0, userService_1.findUserEmail)(body.email);
        if (!user) {
            reply.code(500).send({
                message: 'User not found!'
            });
        }
        const validPassword = (0, bcrypt_1.compare)(body.password, user.password);
        if (!validPassword) {
            return reply.code(500).send({ massage: 'Invalid password!' });
        }
        if (yield validPassword) {
            const accessToken = request.jwt.sign({
                id: user === null || user === void 0 ? void 0 : user.id
            }, {
                expiresIn: '7d'
            });
            return reply.code(200).send({
                accessToken,
                user: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                },
            });
        }
        return reply.code(401).send({
            message: "Invalid email or password!"
        });
    });
}
exports.loginHandler = loginHandler;
function getUsersHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, userService_1.findUsers)();
        return users;
    });
}
exports.getUsersHandler = getUsersHandler;
