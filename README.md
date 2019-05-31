# CoderSchool FTW -  PrimeTimeTwitter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Created with love by: Loi Tran

A clone of IMDB using React JS. This application uses ES6 practices such as destructuring, async await, fat arrow functions, fetch, and parsing to achieve our objectives.

## Try it out

Demo online at [this link.](https://festive-thompson-5eeb3f.netlify.com/)

## Video Walkthrough

![Demo](./demo.gif)

## State

The following is an object which represents our application's `state`. Understanding how to work with this object is critical to how the application behaves.

```javascript
{
  "tweets": [
    {
      "body": "Practice on many types of different applications",
      "likes": [
        "PrimeTimeTran",
        "Phil"
      ],
      "retweets": [
        {
          "body": "Sounds like a good idea to me!",
          "likes": [],
          "createdAt": "2019-05-26T06:32:25.172Z",
          "userName": "Chung2klee"
        }
      ],
      "createdAt": "2019-05-26T05:13:17.363Z",
      "userName": "BoomBoomRay"
    },
    {
      "body": "Study hard to learn programming.",
      "likes": [
        "BoomBoomRay",
        "PrimeTimeTran",
        "Hieu"
      ],
      "retweets": [],
      "createdAt": "2019-05-26T05:13:11.748Z",
      "userName": "BoomBoomRay"
    }
  ],
  "currentUser": "BoomBoomRay"
}
```

## User Stories

The following **functionalities** are completed:

* [x] User can see a list of movies.
* [x] User can see click a button to see additional movies.
* [x] User can see a poster of an individual movie.
* [x] User can see the title of an individual movie.
* [x] User can see the description of an individual movie.
* [x] User can see the ratings of an individual movie.
* [x] User can see the vote count of an individual movie.
* [x] User can see the release date of an individual movie.
* [x] User can see all the genres of movies.
* [x] User can see how many movies are in a genre.
* [x] User can filter for a specific genre.
* [x] User can filter from most popular to least popular.
* [x] User can search for a movie from it's title.
* [x] User can search for a movie from it's description.
* [x] User can view the application on a mobile device and access all the functionalties above.

## Time Spent and Lessons Learned

Time spent: **6** hours spent in total.

I learned how to implement a 'react-like' structure for the application using JS. After a few refactors the code ended up a lot cleaner. I also learned how forms work in bootstrap better. If properly setup they can fire actions on enter press without an event listener.

## License

    Copyright [2019] [Loi Tran]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
