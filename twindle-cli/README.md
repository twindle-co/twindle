## To start

    Usage: -i <tweet id> -f <file format> -o <filename>

```
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -i, --tweetId  First tweet's tweet id in of the twitter thread
                                                             [string] [required]
  -f, --format   Output file format
                      [string] [choices: "mobi", "epub", "pdf"] [default: "pdf"]
  -o, --output   Filename for the output file                [string] [required]
```

It only supports epub & pdf for now.

[![tutorial](https://img.youtube.com/vi/KWqNm7FBFcI/0.jpg)](https://www.youtube.com/watch?v=KWqNm7FBFcI).

## Example
Tested on 8th Oct 2021 (Mac)
```
node src/index.js -e https://fasterthanli.me/articles/frustrated-its-not-you-its-rust -s
```


## Info for developers

### Testing

Run `npm run test` to run tests. Run `npm run test:watch` to have the test watch. Also before commit, it will run tests and commit will fail if any tests are broken.

### Logging

`console.devLog` function should be used to log everything.
It is a wrapper around `console.log` which only prints the input when DEV environment var is set true

### Sending mails

There are two options,

- **nodemailer**: Sending attachments to normal mails, send to kindle working
