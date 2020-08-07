

## Technologies used:
* Typescript
* React
* Fontawesome

Typescript chosen for static typing which allows great integration with IDEs.

React chosen for component architecture and ease of building single page applications.

Fontawesome provides large amount of various icons used for currency and business images.

## Deployed project
https://react-clicker.appspot.com/

## Architecture

The game consists of the game logic implementation described in `Game`, and the data types under "Types" directory.
The game state is designed to be easily serializable to JSON to simplify saving/loading the game.
The actual game logic is implemented in `Game` class and is completely separate from the user interface implementation.
The user interface consists of React components under "Components" directory.

### GameState persistance
The game state is serialized to JSON and saved to browser local storage. When the game is opened again, the state is loaded and the amount of time that passed since it was last saved is simulated.

## Possible improvements

### Cheat protection
The game state is stored in local storage in plain text format which makes it easy to be edited with browser built-in debugger.

Possible solution: encrypt the save data to make it harder to edit.

### Performance optimization
The game currently uses the setInterval() function to call tick() function 60 times a second for smooth state updates.
The only part of the game that needs to be upgrades that frequently are the progress bars. Instead of updating their states on each tick, CSS animations can be used.
The rest of the state updates can rely on timers and user input.

### Mobile browsers support
The visual style of the game is defined in .sass files. The current implementation is designed to be played on a desktop computer.
To make it possible to make the game work on mobile devices, the user controls were designed to not depend on mouse input device. There are no components that depend on mouse hover event or drag-n-drop. This makes it easy to make the game work in mobile browsers via simple style sheet adjustments.

### Business speed unlocks

### Tutorial popups

## Settings
The game configuration is stored in settings.json. It's a human editable file with following JSON keys: Businesses, Managers and Upgrades.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
