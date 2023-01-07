"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var config_1 = require("@nestjs/config");
var dotenv_1 = require("dotenv");
var typeorm_1 = require("typeorm");
var database_module_1 = require("./module/database.module");
(0, dotenv_1.config)();
var configService = new config_1.ConfigService();
var databaseConfig = database_module_1.DatabaseModule.getModuleOption(configService);
exports.dataSource = new typeorm_1.DataSource(databaseConfig);
//# sourceMappingURL=ormconfig.js.map