# Setting up auto-formatting in VSCode in 5 minutes

> Originally published on [puruvj.dev](https://puruvj.dev/blog/setup-prettier-vscode)

![Ugly vs Clean](https://puruvj.dev/media/prettier-setup-ugly-vs-clean/large.jpg)

look at the image above ☝. What do you see?

On the left, there is a very clean table chair, and very orderly. It's the kind of place where people would wanna sit and have a chat together. It's place where this 👇 happens

![Tony and Cap Shake hand](https://puruvj.dev/media/tony-cap-handshake-endgame.gif)

On the right, it's a mess. A total mess. You simply can't expect to collaborate with anyone in here. You'd probably scare them off! No good conversation, no collaboration, nothing, NADA!!

![Tony punch Cap in his perfect teeth](https://puruvj.dev/media/tony-punch-cap-perfect-teeth.gif)

This is the same situation with well-formatted code, and unformatted code.

A little letter to those who have written unformatted code/still write them:

> The code may look ugly, but it's still **your** code. You wrote it with the sweat of your brows and strength of your fingers. It's your child, as Scott Tolinsky would say. Having written unformatted code doesn't make you a bad developer.

If you're the only one involved in the project, sure go ahead and write unformatted code. Nobody minds(And ignore those who do).

But if you are in a team or in some situation where multiple developers are collaborating on the code, you need to have properly formatted code, whether by yourself by hand, or by having it auto-formatted by the tooling.

And it's better if it's auto-formatted.

And it's good to have formatted code, even when you're on your own. Higher readability, Higher productivity.

And this is where Prettier comes in.

# What is Prettier?

Prettier is basically a tool that automatically formats the code you've written, saving you the headache of fixing spaces and brackets positioning yourselves.

## So it's a VSCode extension?

Off course, as the title says 😋.

It's a very good extension that saves you a lot of trouble. All you have to know is one shortcut key combo to automatically format the code, and boom, you're done.

But it's more than an extension. it's actually an <mark>NPM package</mark> as well as a <mark>CLI</mark> originally, on top of which the VSCode extension has been written. It can be run as easily as

```powershell
prettier --write filename.js
```

or, to format all kinds of files all at once

```powershell
prettier --write "src/**/*.{html,css,js,json,jsx,tsx}"
```

## Why should I bother with the NPM package?

VSCode extension is much easier and better in terms of Developer Experience, but it can only format one file at a time. If you're adding prettier in a pre-existing large-enough project, you simply can't bother with opening every single file yourselves, and hitting the magic keys. You need to <mark>bulk-format</mark> them. That's where Prettier Node CLI comes in.

There's also the fact that VSCode is a memory hog, and adding extensions to it makes everything slower. You don't need to bother with this point if you have a 8 GB RAM, i5 CPU with blazing-fast SSD laptop, it can take any extension (These specs are just my laptop's specs, these are not hard limits in any way).

But if you have a slow system and don't wanna add any extensions, No Problem 👍. You'll just need to learn to use the CLI. And it's simple enough. I'll cover that below.

Now let's cut to the chase.

# Setting up the VSCode extension

All right, open up your VSCode

1. Hit `Ctrl+P` (Or `Cmd+P` if on MacOS)
2. Type `ext install esbenp.prettier-vscode` in the input box that opens up, and hit enter.
3. This will install the extension. If it opens up a dialog box about syncing this extension, choose your sync preference for this extension. If you're not sure what that means, I recommend just choosing `Yes`. That should be good enough

There, now you have Prettier installed as an extension in VSCode

## How to use it?

Easy. Open up any file you wish to format. Any JavaScript file for example.

Right click anywhere in the code, and you'll see the <mark>Format Document</mark> option in the context menu. Click on it, and your document will be auto-formatted, like this 👇

![VSCode right click to format](https://puruvj.dev/media/prettier-setup-format-option-vscode.gif)

Magic, right?

## Shortcut keys

This is a tricky one. You see, the shortcut keys are different for different Operating Systems and sometimes even for different environments.

You'll have to see for yourself. Look at the GIF above. You can the see the shortcut key combo right next to the <mark>Format Document</mark> option. It's <mark>Alt+Shift+F</mark> for me.

## Optional

You can modify your settings to format the document whenever you hit `Ctrl+S`.

Just open up your VSCode settings, search for `"Format on Save"`, and check the option as true.

![Format on Save](https://puruvj.dev/media/format-on-save.gif)

> Note: If you have autosave turned on, beware, for whenever you type, your code may jump around like crazy, as prettier tries to format your document at the instant you're typing.

# Using it with the CLI

This section is dedicated to how to format using the Prettier CLI

## Installing the CLI

There 2 ways to install the CLI 👉

### Global

It can be installed globally:

```powershell
npm install -g prettier
```

This approach is fine. However, if you're a new linux user and getting permission errors, don't worry for now. Just read the next section to install prettier locally.

### Local

Local here means you install prettier in the folder you're working on right now, and run it locally. This is actually the recommended way, and better than the global approach, in my opinion ¯\\\_(ツ)\_/¯

```powershell
npm install --save-dev prettier
```

## Running it

```powershell
npx prettier --write file.js
```

This is for the locally installed prettier. For global, remove `npx`:

```powershell
prettier --write file.js
```

You can tell it to run prettify all JS files directly in the directory

```powershell
npx prettier --write "./src/*.js"
```

Or recursively prettify all the JS files, no matter how deeply embedded in folders

```powershell
npx prettier --write "./src/**/*.js"
```

You can target multiple file formats too

```powershell
npx prettier --write "./src/**/*.{js,ts,html,css,json}"
```

The possibilities are endless.

# .prettierrc

Lastly, you can add your own `.prettierrc` file to the your workspace. It is basically a little config file telling prettier how it should handle the formatting.

Here's mine:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

As you see, this file is tiny. And that's the best thing about prettier. Prettier comes with very sensible defaults, and will get you very good formatting even without the config file

# Conclusion

Hoped this article helped 😁
