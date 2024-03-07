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
exports.getCarsHandler = exports.findCar = exports.carRegister = void 0;
const carService_1 = require("./carService");
function carRegister(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const car = yield (0, carService_1.createCar)(body);
            return reply.code(200).send(car);
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.carRegister = carRegister;
function findCar(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const car = yield (0, carService_1.getCar)(id);
            return reply.code(200).send(car);
        }
        catch (error) {
            console.log(error);
            return reply.code(500).send(error);
        }
    });
}
exports.findCar = findCar;
function getCarsHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const cars = yield (0, carService_1.sendAllCars)();
        return cars;
    });
}
exports.getCarsHandler = getCarsHandler;
