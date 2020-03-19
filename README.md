### GIFted

App Link: https://umangg21.github.io/gifted-search/

CodeSandbox: https://codesandbox.io/s/github/umangg21/gifted-search

This is GIF search project build with React JS and Giphy Developer API's available on - ​https://developers.giphy.com.
This is a responsive app which works on all the screens including Desktop, Mobile, Tab, and IPad.
User has to enter Keywords (like car, apple, laugh and cartoon e.t.c) in Search Bar and Press Enter Key to get GIFs.
User can Play/Pause GIFs on clicking on it.
User can change the Dark/Light mode theme by Toggle theme available at the right on Search Bar.
User can Scroll infinitely to view More results.
 
## Components

1. Search: Main Component/Container which includes all the other child components. Search Components maintain a list of GIF. Used to change the theme.

2. GifyView: GifyView Component used to display a single GIF and also manages Play/Pause.

3. Loading: Reusable Component Used to display round loader while API is loading.

4. Toggle:  Reusable Component Used to toggle 2 options. (Here it is used to toggle Dark/Light Mode theme.)

5. SearchInput: is a  Reusable Search Bar component. Keeps the state of keyword and on press enter sends the keyword to the parent component.

## Service 

GiphyService: GiphyService is service used to keep constants used in APIs and methods to call API's.

## Assets

Icons: Having reusable icons used in the projects in SVG component format.

## Style

Having Stylesheets of various components used to GIFted.

## Test

Contains all the test for all the components having positive and negative test cases. 
Having below Code Coverage:

GifyView.jsx : 85.71%
Search.jsx: 58.06%
Loading.jsx: 100%
SearchInput.jsx: 100%
Toggle.jsx: 100%


### Special Features.

1. User can Play/Pause GIFs on clicking on it.
2. User can change Dark/Light mode theme by Toggle theme available at the right on Search Bar.
3. User can Scroll infinitely to view More results.



### Setup Instructions

Requirments.

1. The system should have Node.
2. Run "npm install" in the root directory
3. Run "npm start"

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>


4. Run "npm run test" to run the test in interactive watch mode.
5. Run "npm run coverage" to run test and view coverage of all the components.
6. When you’re ready to deploy to production, create a minified bundle with `npm run build`.

## Screenshots are attached.
