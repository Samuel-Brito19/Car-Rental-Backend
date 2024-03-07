"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.rentSchemas = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const rentCore = {
    locatedAt: zod_1.z.date(),
    devolutionTime: zod_1.z.date(),
    userId: zod_1.z.number(),
    carId: zod_1.z.number()
};
const createRent = zod_1.z.object(Object.assign({}, rentCore));
const responseRent = zod_1.z.object(Object.assign({ id: zod_1.z.number() }, rentCore));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createRent,
    responseRent
}, { $id: "MySchema" }), exports.rentSchemas = _a.schemas, exports.$ref = _a.$ref;
