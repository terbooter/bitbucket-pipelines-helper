import {Git} from "./Git";
import * as fs from "fs";
import * as path from "path";

export class Main {
    public static async main() {

        const args = Args.parse(process.argv);
        const BITBUCKET_BUILD_NUMBER = args[0];
        console.log("--------------- Generating version file -------------");
        console.log(`   BitBucket build number: ${BITBUCKET_BUILD_NUMBER}`);

        const templateFile = path.resolve(__dirname, "../html/template.html");
        console.log(`   Template File: ${templateFile}`);
        let html: string = await Helper.readFile(templateFile);
        console.log(html);

        let commit = await Git.getLastCommitInfo();
        console.log(commit);

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