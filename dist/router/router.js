"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercntroller_1 = require("../controller/usercntroller");
const router = express_1.default.Router();
router.get('/', usercntroller_1.getUsers);
router.get('/', usercntroller_1.getUserById);
router.post('/', usercntroller_1.createUser);
router.put('/:id', usercntroller_1.updateUser);
router.delete('/:id', usercntroller_1.deleteUser);
exports.default = router;
