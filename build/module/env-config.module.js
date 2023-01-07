"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigModule = void 0;
var config_1 = require("@nestjs/config");
var EnvConfigModule = /** @class */ (function () {
    function EnvConfigModule() {
    }
    EnvConfigModule.getModule = function () {
        return config_1.ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env['NODE_ENV'] === 'production'
                ? '.env'
                : process.env['NODE_ENV'] === 'test'
                    ? '.env.test'
                    : '.env.development',
        });
    };
    return EnvConfigModule;
}());
exports.EnvConfigModule = EnvConfigModule;
//# sourceMappingURL=env-config.module.js.map