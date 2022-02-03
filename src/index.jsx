import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const getLocationHours = async () => {
	const data = await fetch("https://www.metmuseum.org/api/Ghidorah/LocationHours").then(data=>data.json())
	return data.filter(result=> result.Key === "main")[0]
}

const initialize = async () =>{
	const hours = await getLocationHours();
	ReactDOM.render(
		<React.StrictMode>
			<App hours={hours} />
		</React.StrictMode>,
		document.getElementById('app')
	);
	console.log(hours)
}

initialize();

