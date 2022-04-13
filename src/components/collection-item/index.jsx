import React, { useState } from 'react';
import PropTypes from 'prop-types';
const CollectionItem = ({
	collectionName,
	collectionLength,
	collectionURL,
	handleSelectCollection,
	removeCollection
}) => {

	const [isCopied, setIsCopied] = useState(false);
	const copyCollectionURL = URL => {
		navigator.clipboard.writeText(URL);
		setIsCopied(true);
	};

	return (
		<li className="collection-item">
			<button
				type="button"
				aria-label="Open Collection"
				className="collection-item__button"
				onClick={() => handleSelectCollection(collectionName)}
				onKeyDown={e =>
					e.key === 'Enter' && handleSelectCollection(collectionName)
				}>
				<span className="collection-item__title">{collectionName}</span>
				<span className="collection-item__count">
					({collectionLength} objects)
				</span>
			</button>
			<button
				type="button"
				data-copied={isCopied}
				className="collection-item__bookmark collection-item__button--secondary"
				onClick={() => copyCollectionURL(collectionURL)}
				onMouseLeave={() => isCopied && setIsCopied(false)}
				onKeyDown={e =>
					e.key === 'Enter' && copyCollectionURL(collectionURL)
				}>
				{isCopied ? `Copied!` :`🔗 Copy Link`}
			</button>
			<button
				type="button"
				aria-label="Remove Collection"
				className="collection-item__button-remove collection-item__button--secondary"
				onClick={() => removeCollection(collectionName)}
				onKeyDown={e => e.key === 'Enter' && removeCollection(collectionName)}>
				✖️ Remove
			</button>
		</li>
	);
};

CollectionItem.propTypes = {
	removeCollection: PropTypes.func,
	collectionURL: PropTypes.string,
	handleSelectCollection: PropTypes.func,
	collectionLength: PropTypes.number,
	collectionName: PropTypes.string
};

export default CollectionItem;
