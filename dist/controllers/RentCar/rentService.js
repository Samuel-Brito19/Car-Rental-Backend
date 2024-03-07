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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRent = exports.getUserRents = exports.createRent = exports.getAvailableCarsInInterval = void 0;
const database_1 = require("../../database");
function getAvailableCarsInInterval(since, until) {
    return __awaiter(this, void 0, void 0, function* () {
        const cars = database_1.prisma.car.findMany({
            where: {
                rents: {
                    every: {
                        OR: [
                            {
                                locatedAt: {
                                    gt: until,
                                },
                            },
                            {
                                devolutionTime: {
                                    lt: since,
                                },
                            },
                        ],
                    },
                }
            }
        });
        return cars;
    });
}
exports.getAvailableCarsInInterval = getAvailableCarsInInterval;
function createRent(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, carId } = params, rentData = __rest(params, ["userId", "carId"]);
        const userFound = yield database_1.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!userFound) {
            throw new Error('User not found');
        }
        const findCar = yield database_1.prisma.car.findUnique({
            where: {
                id: carId
            }
        });
        if (!findCar) {
            console.log(carId);
            throw new Error('Car not found');
        }
        const newRent = yield database_1.prisma.rent.create({
            data: Object.assign(Object.assign({}, rentData), { user: {
                    connect: {
                        id: userId
                    }
                }, rentedCar: {
                    connect: {
                        id: carId
                    }
                } })
        });
        return newRent;
    });
}
exports.createRent = createRent;
function getUserRents(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramsId = id;
        const userRents = yield database_1.prisma.rent.findMany({
            where: {
                userId: Number(paramsId)
            },
            include: {
                rentedCar: true
            }
        });
        return userRents;
    });
}
exports.getUserRents = getUserRents;
function deleteRent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramsId = id;
        const delRent = yield database_1.prisma.rent.delete({
            where: {
                id: Number(paramsId)
            }
        });
        return delRent;
    });
}
exports.deleteRent = deleteRent;
