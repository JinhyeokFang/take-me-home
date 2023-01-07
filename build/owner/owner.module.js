"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var owner_service_1 = require("./business/owner.service");
var owner_entity_1 = require("./infrastructure/owner.entity");
var owner_mysql_repository_1 = require("./infrastructure/owner.mysql.repository");
var pet_entity_1 = require("./infrastructure/pet.entity");
var owner_controller_1 = require("./interface/owner.controller");
var OwnerModule = /** @class */ (function () {
    function OwnerModule() {
    }
    OwnerModule_1 = OwnerModule;
    var OwnerModule_1;
    OwnerModule.metaData = {
        controllers: [owner_controller_1.OwnerController],
        providers: [owner_service_1.OwnerService, owner_mysql_repository_1.OwnerMysqlRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([pet_entity_1.PetEntity, owner_entity_1.OwnerEntity])],
    };
    OwnerModule = OwnerModule_1 = __decorate([
        (0, common_1.Module)(OwnerModule_1.metaData)
    ], OwnerModule);
    return OwnerModule;
}());
exports.OwnerModule = OwnerModule;
//# sourceMappingURL=owner.module.js.map