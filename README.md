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

<strong>components</strong> are where I store all my presentational and container components or dumb/smart components.
<strong>sagas</strong> are where I store all my redux saga.
and the rest are self explanatory.

Each module has an "index.js" file which is like an interface for other modules to use, thus reducing code coupling. This file exports all the other 7 groups that are mentioned up there.

I wrote my test using Jest, Enzyme and Redux-Saga-Plan. I tried using Jest snapshot but for me personally I prefer enzyme shallow/mount test methods. In the future if I have an interest in this project again I might put the snapshot feature test in there; but by then I will be horrified by what I wrote and vow to refactor everything.

At the moment, I want to practice the back end and database layer; I am working on a creating a PostgreSQL database which will store the user login/password and the statistics of that user (amount of games played, win/loss ratio against which players etc). I will also be working on creating a RESTful API endpoint which my Redux-Thunk will call; this API endpoint will be created using Java and Spring Boot. Hell, if I want to go one step further... I might even want to practice CD/CI and put this project into a Go-CD server running Gradle and NPM scripts (or I might put that in another project that I will built next time, maybe using Angular 2 instead?)