## Install

### Download source & install dependencies
1. Clone repository
2. `cd` into source directory
3. `yarn`

## Play & Contribute
1. `npm start -- --open`
* (or `npm start` and open `localhost:8080` in a browser)

## Build & Play
1. `npm run build`
2. Open `<root>/dist/index.html` in a browser

## Test
1. `npm test` (interactive)
* (or `npm test:ci` for a single run)

## Creating Levels
1. Create a new file in `/src/level-configs/` (or copy an existing level)
2. Import & re-export your new level within `/src/components/level-configs/levelConfigs.js`
3. If you want to skip ahead to your new level, change the default state value in the `activeLevelIndex` reducer based on the order of exports you set in step 2.
4. GLHF
