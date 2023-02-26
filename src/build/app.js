"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routers/route"));
const db_config_1 = __importDefault(require("./config/db.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Getting access to the .env file for the database link & port
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// Allows us to send and receive json files 
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Allows us to access a user's token stored as a cookie
app.use((0, cookie_parser_1.default)());
// Lets the server listen on all files
app.use("/api", route_1.default);
// Our port processed from the env file
const port = parseFloat(PORT) || 3939;
// Server listening for requests
app.listen(port, () => {
    (0, db_config_1.default)(Uri);
    console.log(`Server connected on port ${port}`);
});
