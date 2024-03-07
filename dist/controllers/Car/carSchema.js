"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.carSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const carCore = {
    name: zod_1.z.string(),
    model: zod_1.z.string(),
    doors: zod_1.z.number(),
    color: zod_1.z.string(),
    type: zod_1.z.string(),
    carChange: zod_1.z.string(),
    link: zod_1.z.string(),
    price: zod_1.z.string()
};
const createCarSchema = zod_1.z.object(Object.assign({}, carCore));
const responseCreateCarSchema = zod_1.z.object(Object.assign({ id: zod_1.z.number() }, carCore));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createCarSchema,
    responseCreateCarSchema,
}, { $id: "NewSchema" }), exports.carSchema = _a.schemas, exports.$ref = _a.$ref;
