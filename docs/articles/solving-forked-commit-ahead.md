## Scenario

> - You fetch the upstream/main to your local repo
> - You pull the upstream/main to your local repo
> - You push the changes to origin/main
> - Now your origin/main is few commits ahead of upstream/main even though they are both same.

## Solution

```console
$ > git checkout main
$ > git fetch upstream
$ > git reset --hard upstream/main
$ > git push --force
```

> This will sync your origin/main with upstream/main and resolve the commit ahead issue.
