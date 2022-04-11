
const LandingPage = () => (
	<div className="landing-page">
		<h3 className="landing-page__title">Get Started with the Met Object Look Up Tool</h3>
		<p className="landing-page__paragraph">
			Try searching for an object by its title, description or accession number.
			(The more specific you can be, the more likely you are to find the object you&apos;re looking for.)
		</p>
		<p className="landing-page__paragraph">
			If you don&apos;t feel like typing, press the <b>Scan Label Text</b> button and take a photo of the object&apos;s label text.
		</p>
		<h3 className="landing-page__title">Saving Objects</h3>
		<p className="landing-page__paragraph">When you come to an object you&apos;d like to remember, press the <b>Save Object</b> button.
			Saved objects are added to Collections &ndash; Your collections will be saved on your device for up to one week.
			If you would like to save it permanently, press the <b>Copy Collection Link</b> button to generate a sharable and savable URL.
		</p>
		<p className="landing-page__paragraph landing-page__paragraph--warning">Saving Collections will not work in incognito/private browsing mode</p>
	</div>
);

export default LandingPage;