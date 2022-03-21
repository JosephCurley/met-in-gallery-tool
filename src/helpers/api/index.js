const searchAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true?q=';
const objectAPI = 'https://collectionapi.metmuseum.org/api/collection/v1/object/';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTU1BIFdlYnNpdGUiLCJwZXJtaXNzaW9ucyI6eyJwcm92ZW5hbmNlIjp0cnVlLCJ3ZWJMYWJlbCI6dHJ1ZX0sImV4cCI6NDY3NjM3NjUwM30.VjHH60a3oS-lvVabaA5nf0JZt9FY9r0hYixXj-oh74I";

const fetchObjects = async objectID => {
	const objects = await fetch(`${objectAPI}${objectID}`,
		{
			headers: new Headers({
				'Authorization': token
			})
		})
		.then(response => response.json())
		.catch(err => console.error(`Couldn't hit API`, err));
	return objects || null;
};

export { searchAPI, objectAPI, fetchObjects }