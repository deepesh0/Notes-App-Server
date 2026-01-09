"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ratelimit = new ratelimit_1.Ratelimit({
    redis: redis_1.Redis.fromEnv(),
    limiter: ratelimit_1.Ratelimit.slidingWindow(10, "10 s"),
});
exports.default = ratelimit;
