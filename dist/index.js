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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const userRoute_1 = __importDefault(require("./controllers/User/userRoute"));
const cors_1 = __importDefault(require("@fastify/cors"));
const userSchema_1 = require("./controllers/User/userSchema");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const carSchema_1 = require("./controllers/Car/carSchema");
const carRoute_1 = __importDefault(require("./controllers/Car/carRoute"));
const rentSchema_1 = require("./controllers/RentCar/rentSchema");
const rentRoute_1 = __importDefault(require("./controllers/RentCar/rentRoute"));
function buildServer() {
    const fastify = (0, fastify_1.default)({
        logger: true
    });
    fastify.register(cors_1.default, {
        origin: '*',
    });
    fastify.register(jwt_1.default, { secret: `${process.env.SECRET_JWT}` });
    fastify.decorate('authenticate', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield request.jwtVerify();
            }
            catch (error) {
                reply.send(error);
            }
        });
    });
    fastify.get('/check', function handler(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return { hello: 'world' };
        });
    });
    fastify.addHook("preHandler", (req, res, next) => {
        req.jwt = fastify.jwt;
        return next();
    });
    for (const schema of [...userSchema_1.userSchemas, ...carSchema_1.carSchema, ...rentSchema_1.rentSchemas]) {
        fastify.addSchema(schema);
    }
    fastify.register(userRoute_1.default, { prefix: '/users' });
    fastify.register(carRoute_1.default, { prefix: '/cars' });
    fastify.register(rentRoute_1.default, { prefix: '/' });
    return fastify;
}
exports.default = buildServer;
