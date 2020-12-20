# File Name Conventions

## Possible characters

### Use dashes as delimiters

- You should use dashes (-) as delimiters.
- Periods are allowed in some cases, such as for languages and conditions.
- Never use spaces or underscores. Spaces are converted to %20 in URLs or can break an URL when shared. Underscores are difficult to see when the file name is displayed as an underlined link. Although the use of underscores does not impact your ranking that much, [Google advices not to use underscores](https://www.youtube.com/watch?v=AQcSFsQyct8).


**Right:**
```
file-name-with-dashes.en.min.html
```

### Do not use special characters

Avoid using non-alphanumeric characters in file names, such as: '*' ':' '\' '/' '<' '>' '|' '"' '!' '?' '[' ']' ';' '=' '+' '&' '£' '$' '€' '%' or ','. These characters can have special meaning in programming languages or can cause problems with different operating systems.

### Use lowercase, never uppercase

We should always consider URLs as case-sensitive according to [W3.org](http://www.w3.org/TR/WD-html40-970708/htmlweb.html). Therefore, use lowercase to reduces errors when typing URLs.

# Commit Message Naming

Consist of two parts:
- Subject: Short informative summary of the commit
- Body: More detailed explanatory text if needed

## Subject:
- Short and descriptive (max 50 chars)
- Capitalized
- In imperative present tense
- Not end with period

Example:
```
Implement access right management
```

## Body:
- Separated with a blank line from the subject
- Explain what, why, etc.
- Max 72 chars
- Each paragraph capitalized

Example:
```
Implement proper authorization for each service on development phase to validate during the API call.

Access right management is used to check proper authorization to access an API by an employee or the employer.
```

# Pull Request Naming

Consists of two parts:
- Title: Short informative summary of the pull request
- Description: More detailed explanatory text describing the PR for the reviewer

## Subject:
- Short and descriptive summary
- Start with corresponding ticket/story id (GitHub issue)
- Should be capitalized and written in imperative present tense
- Not end with period

Suggested Format:   
*#[Ticket_ID] PR description*

Example:
```
#CLS-23 Add Edit on Github button to all the pages
```

## Description:
- Separated with a blank line from the subject
- Explain what, why, etc.
- Max 72 chars
- Each paragraph capitalized

Example:
``` 
This pull request is part of the work to make it easier for people to contribute to naming convention guides. One of the easiest way to make small changes would be using the Edit on Github button.

To achieve this, we needed to:
- Find the best Gitbook plugin which can do the work
- Integrate it in all the pages to redirect the user to the right page on GitHub for editing
- Make it visible on the page so users can notice it easily
```
