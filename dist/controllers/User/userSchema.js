"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userCore = {
    email: zod_1.z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    name: zod_1.z.string(),
};
const user = {
    id: (0, zod_1.number)(),
    email: (0, zod_1.string)()
};
const createUserSchema = zod_1.z.object(Object.assign(Object.assign({}, userCore), { password: zod_1.z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }) }));
const createUserNoPassword = zod_1.z.object(Object.assign({ id: zod_1.z.number() }, userCore));
const loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    password: zod_1.z.string()
});
const loginResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string()
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createUserSchema,
    createUserNoPassword,
    loginSchema,
    loginResponseSchema
}), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
