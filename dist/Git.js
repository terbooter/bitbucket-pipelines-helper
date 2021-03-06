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
const git = require("git-last-commit");
const branch = require("git-branch");
class Git {
    static getLastCommitInfo(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let commit = yield Git.getLastCommitInfoWithBrokenBranch(folder);
            commit.branch = yield branch(folder);
            return commit;
        });
    }
    static getLastCommitInfoWithBrokenBranch(folder) {
        return new Promise((resolve, reject) => {
            git.getLastCommit((err, commit) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(commit);
            }, { dst: folder });
        });
    }
}
exports.Git = Git;
