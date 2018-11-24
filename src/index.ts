import {Git} from "./Git";

console.log("Start");

async function main() {
    const git = new Git();
    let commit = await git.getLastCommitInfo();
    console.log(commit);
}

main();