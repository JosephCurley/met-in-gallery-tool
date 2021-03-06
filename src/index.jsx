import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { warmUpObjectJSON, warmUpTesseract } from "./helpers/cache";


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('app')
);

const warmup = async () => {
	console.log("getting ready for offline") // todo: make this a UI message, too
	Promise.all(
		[
			warmUpTesseract(),
			new Promise(resolve => setTimeout(()=> {
				// haha race condition waiting for react to save these 😐
				if (localStorage.getItem('savedObjects') !== null) {
					let objectIds = Object.keys(JSON.parse(localStorage.getItem('savedObjects')));
					resolve(warmUpObjectJSON(objectIds));
				}
			}, 3000)) // todo: fix by refactor to trigger this on a componentDidMount or something
		]
	).then(() => console.log("ready for offline!") // todo: make this a UI message, too
	).catch(err=>console.error("there was an error warming up the cache for offline:", err))
}

// warmup(); comment this in to test in dev

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
	onSuccess: warmup
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


