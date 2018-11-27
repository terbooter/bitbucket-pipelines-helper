import {CommitInfo} from "./interfaces";

const git = require("git-last-commit");
const branch = require("git-branch");

export class Git {
    public static async getLastCommitInfo(folder): Promise<CommitInfo> {
        let commit: CommitInfo = await Git.getLastCommitInfoWithBrokenBranch(folder);
        commit.branch = await branch(folder);
        return commit;
    }

    private static getLastCommitInfoWithBrokenBranch(folder): Promise<CommitInfo> {
        return new Promise<CommitInfo>((resolve, reject) => {
            git.getLastCommit((err, commit: CommitInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(commit);
            }, {dst: folder});
        });
    }
}