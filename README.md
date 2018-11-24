## Install
### Download prerequisites
- [Yarn](https://yarnpkg.com/en/docs/install)

### Download source & install dependencies
1. Clone repository
2. `cd` into source directory
3. `yarn`

## Play & Contribute
1. `yarn start --open`
* (or `yarn start` and open `localhost:8080` in a browser)

## Build & Play
1. `yarn build`
2. Open `/dist/index.html` in a browser

## Test
1. `yarn test`

## Creating Levels
1. Create a new file in `/src/level-configs/` (or copy an existing level)
2. Import & re-export your new level within `/src/components/level-configs/levelConfigs.js`
3. Update the `World`'s `activelLevelIndex` based on step 2
4. GLHF
