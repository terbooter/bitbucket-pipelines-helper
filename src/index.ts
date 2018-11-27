import {Git} from "./Git";
import * as fs from "fs";
import * as path from "path";
import {CommitInfo} from "./interfaces";

export class Main {
    public static async main() {

        const args = Args.parse(process.argv);
        const BITBUCKET_BUILD_NUMBER = args[0];
        const templateFile = path.resolve(__dirname, "../html/template.html");

        console.log("--------------- Generating version file -------------");
        console.log(`   BitBucket build number: ${BITBUCKET_BUILD_NUMBER}`);
        console.log(`   Script cwd: ${process.cwd()}`);
        console.log(`   Template File: ${templateFile}`);

        let html: string = await Helper.readFile(templateFile);
        // console.log(html);

        let commit: CommitInfo = await Git.getLastCommitInfo(process.cwd());

        const replacements = {
            BITBUCKET_BUILD_NUMBER,
            BITBUCKET_BRANCH: commit.branch,
            BITBUCKET_COMMIT: commit.shortHash,
            DEPLOY_DATE: (new Date()).toISOString()
        };
        let newHtml = Helper.replace(html, replacements);
        // console.log(commit);
        // console.log(newHtml);
        Helper.writeFile("index.html", newHtml);
    }
}

class Helper {
    public static async readFile(fileName): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(fileName, {encoding: "utf-8"}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(data);
            })
        });
    }

    public static async writeFile(fileName, data): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    }

    public static replace(text: string, values: { [oldValue: string]: string }) {
        let returnText = text;
        for (let key in values) {
            let value: string = values[key];
            returnText = returnText.replace(key, value);
        }

        return returnText;
    }
}

class Args {
    public static parse(args): any[] {
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