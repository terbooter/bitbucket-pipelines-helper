"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Git_1 = require("./Git");
const fs = require("fs");
const path = require("path");
class Main {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = Args.parse(process.argv);
            const BITBUCKET_BUILD_NUMBER = args[0];
            const templateFile = path.resolve(__dirname, "../html/template.html");
            console.log("--------------- Generating version file -------------");
            console.log(`   BitBucket build number: ${BITBUCKET_BUILD_NUMBER}`);
            console.log(`   Script cwd: ${process.cwd()}`);
            console.log(`   Template File: ${templateFile}`);
            let html = yield Helper.readFile(templateFile);
            let commit = yield Git_1.Git.getLastCommitInfo(process.cwd());
            const replacements = {
                BITBUCKET_BUILD_NUMBER,
                BITBUCKET_BRANCH: commit.branch,
                BITBUCKET_COMMIT: commit.shortHash,
                DEPLOY_DATE: (new Date()).toISOString()
            };
            let newHtml = Helper.replace(html, replacements);
            Helper.writeFile("index.html", newHtml);
        });
    }
}
exports.Main = Main;
class Helper {
    static readFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        });
    }
    static writeFile(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(fileName, data, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        });
    }
    static replace(text, values) {
        let returnText = text;
        for (let key in values) {
            let value = values[key];
            returnText = returnText.replace(key, value);
        }
        return returnText;
    }
}
class Args {
    static parse(args) {
        console.log(args);
        console.log(__dirname);
        if (args.length < 3) {
            throw new Error("Please provide BitBucket build number");
        }
        let parameters = Object.assign([], args);
        parameters.shift();
        parameters.shift();
        return parameters;
    }
}
