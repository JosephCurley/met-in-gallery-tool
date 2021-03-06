import { createWorker } from 'tesseract.js';
import { objectAPI } from '../api';

export const warmUpTesseract = async () => {
	console.log("warm up tesseract")
	const worker = createWorker({
		logger: m => {
			console.log(m);
		}
	});
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	await worker.recognize("data:image/png;base64,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");
	await worker.terminate();
	console.log("tesseract warmed up")
}

export const warmUpObjectJSON = async objectIds => {
	Promise.all(
		objectIds.map(id => {
			fetch(`${objectAPI}${id}`)
				.then(response => response.json())
				.then(
					({ additionalImages }) => {
						if ((additionalImages ?? []).length) {
							additionalImages.forEach(url => fetch(url.replace('original', 'web-large'), { mode: 'no-cors' }))
						}
					}
				)
				.catch(err => console.error(err))
		})
	)
		.then(() => console.log("object JSON cached"))
		.catch(err => console.error(err))
}