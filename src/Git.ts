import {CommitInfo} from "./interfaces";

const git = require("git-last-commit");

export class Git {
    public async getLastCommitInfo(): Promise<CommitInfo> {
        return new Promise<CommitInfo>((resolve, reject) => {
            git.getLastCommit((err, commit) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(commit);
            });
        });
    }
}