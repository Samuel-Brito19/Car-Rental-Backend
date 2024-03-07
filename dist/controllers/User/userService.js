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
exports.findUsers = exports.findUserEmail = exports.createUser = void 0;
const bcrypt_1 = require("bcrypt");
const database_1 = require("../../database");
function createUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = params;
        const hashPassword = yield (0, bcrypt_1.hash)(password, 8);
        const user = yield database_1.prisma.user.create({
            data: Object.assign(Object.assign({}, params), { password: hashPassword })
        });
        return user;
    });
}
exports.createUser = createUser;
function findUserEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.user.findUnique({ where: {
                email,
            } });
    });
}
exports.findUserEmail = findUserEmail;
function findUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.user.findMany({
            select: {
                email: true,
                id: true,
                name: true
            }
        });
    });
}
exports.findUsers = findUsers;
