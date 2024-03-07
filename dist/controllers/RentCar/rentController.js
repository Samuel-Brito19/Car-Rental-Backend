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
exports.rentDelete = exports.getRents = exports.createNewRent = exports.findAvailableCars = void 0;
const rentService_1 = require("./rentService");
function findAvailableCars(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { locatedAt, devolutionTime } = request.query;
        try {
            console.log(locatedAt, devolutionTime);
            const cars = yield (0, rentService_1.getAvailableCarsInInterval)(locatedAt, devolutionTime);
            return cars;
        }
        catch (error) {
            console.log(error);
            console.log('test');
            return reply.code(500).send(error);
        }
    });
}
exports.findAvailableCars = findAvailableCars;
function createNewRent(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const carRent = yield (0, rentService_1.createRent)(body);
            return reply.code(200).send(carRent);
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.createNewRent = createNewRent;
function getRents(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = request.params;
        try {
            const userRent = yield (0, rentService_1.getUserRents)(userId);
            return reply.code(200).send(userRent);
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.getRents = getRents;
function rentDelete(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const dRent = yield (0, rentService_1.deleteRent)(id);
            return reply.code(200).send(dRent);
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.rentDelete = rentDelete;
