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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internship = void 0;
const typeorm_1 = require("typeorm");
const userentities_1 = require("./userentities");
let Internship = class Internship {
};
exports.Internship = Internship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Internship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Internship.prototype, "joined_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Internship.prototype, "completion_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Internship.prototype, "is_certified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Internship.prototype, "mentor_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userentities_1.User, (user) => user.internships),
    __metadata("design:type", userentities_1.User)
], Internship.prototype, "user", void 0);
exports.Internship = Internship = __decorate([
    (0, typeorm_1.Entity)()
], Internship);
