import React from 'react';
import PropTypes from 'prop-types';

const copyCollectionURL = URL => {
	navigator.clipboard.writeText(URL);
};

const CollectionItem = ({
	collectionName,
	collectionLength,
	collectionURL,
	handleSelectCollection,
	removeCollection
}) => (
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
			className="collection-item__bookmark"
			onClick={() => copyCollectionURL(collectionURL)}
			onKeyDown={e =>
				e.key === 'Enter' && copyCollectionURL(collectionURL)
			}>
			🔗 Copy Link
		</button>
		<button
			type="button"
			aria-label="Remove Collection"
			className="collection-item__button-remove"
			onClick={() => removeCollection(collectionName)}
			onKeyDown={e => e.key === 'Enter' && removeCollection(collectionName)}>
			✖️ Remove
		</button>
	</li>
);

CollectionItem.propTypes = {
	removeCollection: PropTypes.func,
	collectionURL: PropTypes.string,
	handleSelectCollection: PropTypes.func,
	collectionLength: PropTypes.number,
	collectionName: PropTypes.string
};

export default CollectionItem;
