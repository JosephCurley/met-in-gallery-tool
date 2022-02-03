import React from 'react';
import './app.scss';
import { MapSvg, CloseSvg } from './mavSvg';
import PropTypes from 'prop-types';

const Section = props => {
	return(
		<section className="welcome-links-section">
			<h3>{props.heading}</h3>
			{props.links.map((link, index)=>{
				return (<a href={link.url} className="welcome-link button primary-button primary-button--ghost-light primary-button--small" key={index}>{link.text}</a>)
			})}
		</section>)
}

Section.propTypes = {
	heading: PropTypes.string,
	links: PropTypes.array
}

const MapButton = props => {
	return (<div onClick={props.onClick} className="map-svg-container">
		{props.showMap && <CloseSvg />}
		{!props.showMap && <MapSvg />}
	</div>)
}

MapButton.propTypes = {
	showMap: PropTypes.bool,
	onClick: PropTypes.func
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: props.hours,
			showMap: false
		}

		this.handleToggleShowMap = this.handleToggleShowMap.bind(this);
	}

	handleToggleShowMap() {
		this.setState(prevState => {
			return { showMap: !prevState.showMap }
		})
	}

	sections() {
		const data = [
			{
				heading: "What's on",
				links: [
					{
						text: "Current Exhibitions",
						url: "https://www.metmuseum.org/exhibitions"
					},
					{
						text: "Events and Tours",
						url: "https://www.metmuseum.org/events/whats-on"
					},
				]
			},

			{
				heading: "Guided experiences",
				links: [
					{
						text: "Audio Guide",
						url: "https://www.metmuseum.org/audio-guide"
					},
					{
						text: "In-Gallery Guide",
						url: "https://www.metmuseum.org/gallery-guide/afrofuturist-period-room"
					},
				]
			},

			{
				heading: "Take a break",
				links: [
					{
						text: "Gift Shop",
						url: "https://store.metmuseum.org/"
					},
					{
						text: "Dining",
						url: "https://www.metmuseum.org/visit/dining"
					},
				]
			},

			{
				heading: "Visit Information",
				links: [
					{
						text: "Visit Guidelines",
						url: "https://www.metmuseum.org/about-the-met/policies-and-documents/visitor-guidelines"
					},
					{
						text: "Buy Tickets",
						url: "https://engage.metmuseum.org/admission"
					},
				]
			},

			{
				heading: "Helpful links",
				links: [
					{
						text: "Map PDF",
						url: "https://www.metmuseum.org/welcome/-/media/d6986eb6c4354f50943aa659dac1a0f9.ashx?la=en"
					},
				]
			},
		]


		return data.map((section, index) => {
			return <Section {...section} key={index} />
		})
	}

	render() {
		return (
			<main className="welcome-page-container" style={this.state.showMap ? {background: "rgb(51,51,51)"} : {}}>
				<MapButton showMap={this.state.showMap} onClick={this.handleToggleShowMap}/>
				{this.state.showMap && <iframe src="https://maps.metmuseum.org/" title="met museum map" style={{width: '100%', height: '80vh', marginTop: '10vh'}}></iframe>}
				{!this.state.showMap && <div>
					<header className="welcome-header">
						<h2>Welcome to The Met</h2>
						<p><b>Today&apos;s hours: {this.state.hours.Closed ? "Closed" : `${this.state.hours.OpeningTime} -- ${this.state.hours.ClosingTime}`}</b></p>
					</header>
					<div className="welcome-links-container">
						{this.sections()}
					</div>
				</div>}
			</main>)
	}
}

export default App;

App.propTypes = {
	hours: PropTypes.object
}