# Payload 3.0 beta Performance Issues

This repo exists to reproduce performance issues with Payload CMS 3.0.0-beta.68. Specifically, there is a threshold of rich text editors in a given document that will trigger a performance degradation that is so severe that it actually prevents saving (auto saving or manual saving).

## To reproduce

1. Copy `.env.example` to `.env`
2. Install dependencies: `yarn`
3. Make a production build: `yarn build`
4. Start the server: `yarn start`
5. Create a new `Page` document
6. Create a PageContent Panel
7. Insert a Cards block in the `Content` field
8. Add three or so cards to the cards block
9. Duplicate the panel several times. About 14 will consistently reproduce.
10. Type two or three sentences (actually type, don't copy/paste) into one of the card content fields

## Observations

1. The card content fields become very high latency at this point. There is a large delay between keyboard input and feedback.
2. More importantly, saving will essentially stop occurring. Sometimes a single autosave will trigger after the first few characters, but none of the remaining content will ever be saved, even after waiting several minutes. If you disable autosave in the config, you'll be able to manually click the Save button, but the saved content will similarly be missing all but the first few characters of the change.
