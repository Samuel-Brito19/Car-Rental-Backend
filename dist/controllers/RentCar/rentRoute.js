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
const rentController_1 = require("./rentController");
const rentSchema_1 = require("./rentSchema");
function rentRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get('/available', {
            preHandler: [server.authenticate],
            schema: {
                querystring: {
                    locatedAt: { type: 'string' },
                    devolutionTime: { type: 'string' }
                }
            }
        }, rentController_1.findAvailableCars);
        server.post('/users/rent', {
            preHandler: [server.authenticate],
            schema: {
                body: (0, rentSchema_1.$ref)('createRent'),
                response: {
                    200: (0, rentSchema_1.$ref)('responseRent')
                }
            }
        }, rentController_1.createNewRent);
        server.get('/users/:userId/rent', {
            preHandler: [server.authenticate],
        }, rentController_1.getRents);
        server.delete('/users/:userId/rent/:id', {
            preHandler: [server.authenticate],
        }, rentController_1.rentDelete);
    });
}
exports.default = rentRoutes;
