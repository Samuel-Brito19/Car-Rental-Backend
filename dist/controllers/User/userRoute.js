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
const userController_1 = require("./userController");
const userSchema_1 = require("./userSchema");
function userRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post('/', {
            schema: {
                body: (0, userSchema_1.$ref)('createUserSchema'),
                response: {
                    200: (0, userSchema_1.$ref)('createUserNoPassword')
                }
            },
        }, userController_1.registerUserHandler);
        server.post('/login', {
            schema: {
                body: (0, userSchema_1.$ref)('loginSchema'),
            }
        }, userController_1.loginHandler);
        server.get('/', {
            preHandler: [server.authenticate]
        }, userController_1.getUsersHandler);
    });
}
exports.default = userRoutes;
