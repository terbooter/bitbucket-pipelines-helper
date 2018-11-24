export interface CommitInfo {
    shortHash // '6dfea2c',
    hash // '6dfea2cb62101f6a2a1cac839770b052391c946b',
    subject // 'Init',
    sanitizedSubject // 'Init',
    body // '',
    authoredOn // '1543071832',
    committedOn // '1543071832',
    author:
        {
            name // 'dmitry',
            email // 'dmitry@github.com'
        },
    committer:
        {
            name
            email
        },
    notes  // 'master',
    branch,
    tags: string[]
}