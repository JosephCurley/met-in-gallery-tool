import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createWorker } from 'tesseract.js';

const ImageInput = ({ searchObjects }) => {
	const [imageInputText, setImageInputText] = useState('Scan Accession #');
	const accessionRegex = /^[a-z]{0,4}?(.\d+(\.\d+)*$)/i;

	const worker = createWorker({
		logger: m => {
			console.log(m);
			let text = "Processing...";
			if (m.status === "recognizing text") {
				text += ` ${Math.floor(m.progress * 100)}%`;
			}
			setImageInputText(text);
		},
	});
	
	const readImage = async (e) => {
		const file = e.target.files[0];
		if (!file?.type?.includes('image')) { 
			return;
		}
		await worker.load();
		await worker.loadLanguage('eng');
		await worker.initialize('eng');
		const { data } = await worker.recognize(file);
		await worker.terminate();
		parseImage(data);
	};

	const parseImage = (data) => {
		let success = false;
		data.lines.forEach(line => {
			const firstChunkOfText = line.text.split(' ')[0].replace(/\n/g, '');
			if (firstChunkOfText.match(accessionRegex)) {
				searchObjects(firstChunkOfText);
				success = true;
			}
		});
		if (success) {
			setImageInputText('Scan Accession #');
		} else {
			setImageInputText('Error Reading Image');
		}
	};

	return (
		<div className="image-input__container">
			<label
				htmlFor="image-input"
				className="image-input__label button button--secondary">
				<input
					onChange={readImage}
					id="image-input"
					type="file"
					capture="environment"
					accept="image/jpeg,image/png"
					className="image-input__input"
				/>
				{imageInputText}
			</label>
		</div>
	);
};

ImageInput.propTypes = {
	searchObjects: PropTypes.func,
};
export default ImageInput;
