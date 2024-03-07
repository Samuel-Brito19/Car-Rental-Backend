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
const carSchema_1 = require("./carSchema");
const carController_1 = require("./carController");
function carRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get('/:id', {
            preHandler: [server.authenticate],
        }, carController_1.findCar);
        server.get('/', {
            preHandler: [server.authenticate],
        }, carController_1.getCarsHandler);
        server.post('/', {
            preHandler: [server.authenticate],
            schema: {
                body: (0, carSchema_1.$ref)('createCarSchema'),
                response: {
                    200: (0, carSchema_1.$ref)('responseCreateCarSchema')
                }
            }
        }, carController_1.carRegister);
    });
}
exports.default = carRoutes;
