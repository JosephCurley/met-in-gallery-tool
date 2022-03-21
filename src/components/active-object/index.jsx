import React from 'react';
import PropTypes from 'prop-types';

const ActiveObject = ({ object, handleSavedObjectChange, savedObjects }) => (
	<div className="active-object">
		<div>
			<div className="active-object__title-box">
				<div className="active-object__titles">
					<h1
						className="active-object__header"
						dangerouslySetInnerHTML={{ __html: object.titles?.primaryTitle}}
					/>
					<h2 className="active-object__artist">
						{object.facetInfo?.artistMaker?.length && object.facetInfo?.artistMaker[0].name.split(`$`)[1]}
					</h2>
				</div>
				<div className="active-object__buttons">
					{savedObjects[object.objectID] ? (
						<button
							onClick={handleSavedObjectChange}
							onKeyDown={e => e.key === 'Enter' && handleSavedObjectChange}
							className="active-object__button active-object__button--remove button button--ghost"
							type="submit">
							Remove
						</button>
					) : (
						<button
							onClick={handleSavedObjectChange}
							onKeyDown={e => e.key === 'Enter' && handleSavedObjectChange}
							className="active-object__button active-object__button--save button button--primary"
							type="submit">
							Save &#9829;
						</button>
					)}
					<a
						href={object.objectURL}
						target="_blank"
						rel="noreferrer"
						className="button button--tertiary">
						View Object Page
					</a>
				</div>
			</div>
			{(object.media?.images?.primaryImage && object.media?.images?.additionalImages?.length) ? (
				<div className="active-object__image-container">
					<div className="active-object__images" draggable="true">
						<img
							src={object.media?.images?.primaryImage?.webImageUrl}
							className="active-object__image active-object__image--multiple"
							alt={object.media?.images?.primaryImage?.altText}
						/>
						{object.media?.images?.additionalImages.map(additionalImage => {
							return (
								<img
									key={additionalImage.webImageUrl}
									src={additionalImage.webImageUrl}
									loading="lazy"
									className="active-object__image active-object__image--multiple"
									alt={additionalImage.altText}
								/>
							);
						})}
					</div>
				</div>
			) : ""}
			{object.media?.images?.primaryImage && !object.media?.images?.additionalImages?.length ? (
				<img
					src={object.media?.images?.primaryImage?.webImageUrl}
					className="active-object__image"
					alt={object.media?.images?.primaryImage?.altText}
				/>
			) : ""}
			{!object.media?.images?.primaryImage ? (
				<div className="active-object__no-image">
					<span>Due to rights restrictions this image can only be viewed on our </span>
					<a
						href={object.object.media?.images?.primaryImage?.objectURL}
						target="_blank"
						rel="noreferrer"
						className="active-object__link">
						Object Page
					</a>
				</div>
			) : "" }
			<div>
				{object.artistRole && object.artistDisplayName && (
					<div className="active-object__info">
						<span className="active-object__key">{object.artistRole}: </span>
						<span className="active-object__value">
							{object.artistDisplayName}
						</span>
					</div>
				)}
				{object.tombstone.map(tombstone => {
					return (
						<div className="active-object__info" key={tombstone.label}>
							<span className="active-object__key">{tombstone.label}</span>
							<span className="active-object__value"> {tombstone.text}</span>
						</div>
					)
				})}
			</div>

			{object.primaryImage ? (<div className="active-object__info">
				<span className="active-object__key">
					<a
						target="_blank"
						className="active-object__link"
						href={object.primaryImage}
						rel="noreferrer">
						View High Resolution Image
					</a>
				</span>
			</div>) : ""}

		</div>
	</div>
);

ActiveObject.propTypes = {
	savedObjects: PropTypes.object,
	object: PropTypes.object,
	handleSavedObjectChange: PropTypes.func
};

export default ActiveObject;
