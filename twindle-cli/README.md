# To start

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

## Info for developers

### Logging

`console.devLog` function should be used to log everything.
It is a wrapper around `console.log` which only prints the input when DEV environment var is set true
