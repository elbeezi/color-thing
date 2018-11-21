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
1. Create a new file in `/src/level-configs/` (or copy the `.example` file in that dir)
2. Import & re-export your new level within `/src/components/level-configs/levelConfigs.js`
3. Update the `World` component constructor with the name of the level you want to play (has to match the property name exported in step 2)
4. GLHF
