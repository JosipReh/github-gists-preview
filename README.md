# github-gists-preview

#Requirements
* NPM
* NODE

###Project is built and tested with:
* Node version: `12.22.0`
* NPM `6.14.11`

#SETUP
1. `git clone https://github.com/JosipReh/github-gists-preview`
2. `npm install`
3. `npm run serve`, or alternatively `npm run dev`
4. Navigate your web-browser to `http://localhost:8080/` and you are ready to go!

#Features:
* Pagination with hardcoded github API limit of 3000 items
* Ability to change number of items per page
* Sort dropdown which sorts data in ASC & DESC orders based on created_at and updated_at fields (locally)
* Gist code syntax highlighter with limits (to check full file you can hover over gist and click `view raw gist`)


## CLI Commands
*   `npm install`: Installs dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

*   `npm run lint`: Pass TypeScript files using ESLint

*   `npm run test`: Run Jest and Enzyme with
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for
    your tests


For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
