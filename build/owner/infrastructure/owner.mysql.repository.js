"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerMysqlRepository = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var owner_type_1 = require("../domain/owner-type");
var owner_entity_1 = require("./owner.entity");
var pet_entity_1 = require("./pet.entity");
var OwnerMysqlRepository = /** @class */ (function () {
    function OwnerMysqlRepository(rawOwnerRepo, petRepo) {
        this.rawOwnerRepo = rawOwnerRepo;
        this.petRepo = petRepo;
    }
    OwnerMysqlRepository.prototype.save = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var ownerEntity, saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ownerEntity = owner_entity_1.OwnerEntity.create(owner);
                        return [4 /*yield*/, this.rawOwnerRepo.save(ownerEntity)];
                    case 1:
                        saved = _a.sent();
                        return [2 /*return*/, owner_entity_1.OwnerEntity.toDomain(saved)];
                }
            });
        });
    };
    OwnerMysqlRepository.prototype.findOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ownerEntity, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rawOwnerRepo.findOne({
                            where: { id: id },
                        })];
                    case 1:
                        ownerEntity = _a.sent();
                        owner = owner_entity_1.OwnerEntity.toDomain(ownerEntity);
                        return [2 /*return*/, owner];
                }
            });
        });
    };
    OwnerMysqlRepository.prototype.deletePetById = function (ownerId, petId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.petRepo.delete(petId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OwnerMysqlRepository.prototype.findShelter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ownerEntities, shelters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rawOwnerRepo.find({
                            where: { type: owner_type_1.OwnerType.SHELTER },
                        })];
                    case 1:
                        ownerEntities = _a.sent();
                        shelters = ownerEntities.map(owner_entity_1.OwnerEntity.toDomain);
                        return [2 /*return*/, shelters];
                }
            });
        });
    };
    OwnerMysqlRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(owner_entity_1.OwnerEntity)),
        __param(1, (0, typeorm_1.InjectRepository)(pet_entity_1.PetEntity)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], OwnerMysqlRepository);
    return OwnerMysqlRepository;
}());
exports.OwnerMysqlRepository = OwnerMysqlRepository;
//# sourceMappingURL=owner.mysql.repository.js.map