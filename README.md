![Zond Wallet Preview Cover](misc/zond_wallet_preview_cover.png)

# Zond Wallet

A browser extension, for creating accounts, signing transactions and sending transactions over the zond blockchain.

## Info for developers

- Run `git clone THIS_REPO_URL` for cloning the repo to your machine.
- Run `npm i` for installing dependencies.
- The extension's `manifest.json` file can be found inside the `public/` folder.
- The production output folder is named `Extension` (not `dist`) and this folder alone needs to be loaded as browser extension.
- Run `npm run build` to generate a production build of the extension to the `Extension` folder.
- Load the `Extension` folder as an extension package in your browser.
