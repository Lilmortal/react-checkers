A personal project that I created using React + Redux and CreateReactApp.
This is a checkerboard game.

I used Redux-saga to deal with logics like highlighting the tiles or selecting a draught. This is far from perfect (it's fine on my desktop but on my laptop it can be a bit slow).

This project is split into 8 groups for each module:
- components
- sagas
- actions
- actionTypes
- constants
- reducers
- selectors
- index

<strong>components</strong> are where I store all my presentational and container components or dumb/smart components. <br />
<strong>sagas</strong> are where I store all my redux saga, and the rest are self explanatory.

Each module has an "index.js" file which is like an interface for other modules to use, thus reducing code coupling. This file exports all the other 7 groups that are mentioned up there.

I wrote my test using Jest, Enzyme and Redux-Saga-Plan. I tried using Jest snapshot but for me personally I prefer enzyme shallow/mount test methods. In the future if I have an interest in this project again I might put the snapshot feature test in there; but by then I will be horrified by what I wrote and vow to refactor everything.

EDIT:

I just finished my redux project at work. The file structures I have there is:
- app
- components
- config
- utils
- state

<strong>App</strong> is where I keep my modules. <br />
<strong>Components</strong> is where I store my small components like textfields, modal etc.
<strong>Config</strong> is where I keep my constants like routes (e.g. /link1) etc.
<strong>Utils</strong> is where I store generic functions.
<strong>State</strong> is where I put my redux stuff; actions, selectors etc.

There are more but I can't remember... I will probably update this on what I learned at work once I have time.
