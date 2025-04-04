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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const db_2 = require("./db");
const db_3 = require("./db");
const util_1 = require("./util");
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "You've signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exits"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const text = req.body.text;
    yield db_2.ContentModel.create({
        title: req.body.title,
        link,
        type,
        userId: req.userId,
        tags: [],
        text
    });
    res.json({
        message: "Content Added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_2.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    yield db_2.ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });
    res.json({ message: "Deleted successfully" });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_3.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, util_1.random)(10); //Generating a url for sharing our content(second brain) with everyone
        yield db_3.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_3.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_3.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Incorrect url"
        });
        return;
    }
    //userId
    const content = yield db_2.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found,error should not happen ideally"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.listen(3000);
