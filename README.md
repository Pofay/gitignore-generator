# A Simple Gitignore Generator

Under the hood this project just uses [Github Api][1] and makes a request through the API on the [.gitignore repository][2]. It uses [RxJS][5] for API requests, transform JSON content to a String and writing or append the String content to the .gitignore file.

Note: **This project has no tests whatsoever**. I'm only making this to test my knowledge on [Monads][4] and [Observable as an IO Monad][3]
as well as making a CLI App in NodeJS. 

## Installation

Note: **I'm only covering Linux (and possibly MacOS) with this installation**

You need the following installed in your machine

- Yarn
- Node

Clone the repository to your directory of choosing: `git clone https://github.com/Pofay/gitignore-generator.git`

Change directory to repository:

    cd gitignore-generator

and run the following:

    yarn install
    npm link

**The command should appear in your terminal when you input `git` and press tab as gitignore-generator**

## Commands

This project only has one command: `generate --options <dir> [prog-lang]`

Heres an example on creating a .gitignore for node in the current directory and overwrites the current .gitignore if there is any.

    gitignore-generator generate -o pwd node

## Options

`-c, --concatenate`: Just concatenates the content to an existing .gitignore file in the directory. 

`-o, --overwrite`: **The default behavior**. Overwrites the .gitignore inside the directory.

Note: *In both cases, if the file doesn't exist inside the directory it will just create it.*

## Issues

Currently the project can't directly add .gitignore content from text-editors (i.e vim, sublime text) 

So using it like this: 

    gitignore-generator generate -c pwd vim

    gitignore-generator generate -c pwd sublimeText

Doesn't work since vim and most text editors reside in the [Global Folder][6] of the repository

**To bypass this issue use the full path:**

    gitignore-generator generate -c pwd Global/Vim // Example using vim
 
    gitignore-generator generate -c pwd Glboal/SublimeText // Example using Sublime Text


[1]: https://developer.github.com/v3/
[2]: https://github.com/github/gitignore
[3]: https://medium.com/@luijar/the-observable-disguised-as-an-io-monad-c89042aa8f31
[4]: http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html
[5]: https://rxjs-dev.firebaseapp.com/
[6]: https://github.com/github/gitignore/tree/master/Global
