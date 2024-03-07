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
exports.sendAllCars = exports.createCar = exports.getCar = void 0;
const database_1 = require("../../database");
function getCar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramCarId = id;
        return yield database_1.prisma.car.findUnique({
            where: {
                id: Number(paramCarId)
            }
        });
    });
}
exports.getCar = getCar;
function createCar(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const car = yield database_1.prisma.car.create({
            data: Object.assign({}, params)
        });
        return car;
    });
}
exports.createCar = createCar;
function sendAllCars() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.car.findMany({
            select: {
                id: true,
                name: true,
                model: true,
                doors: true,
                color: true,
                type: true,
                carChange: true,
                link: true,
                price: true
            }
        });
    });
}
exports.sendAllCars = sendAllCars;
