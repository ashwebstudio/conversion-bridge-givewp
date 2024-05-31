(function() {
	const { addFilter } = wp.hooks;
	const { __ } = wp.i18n;
	const { createElement, Fragment } = wp.element;
	const { PanelRow, TextControl, ToggleControl } = wp.components;

	// Define the new component for the conversion tracking tab
	const ConversionTrackingTab = ({ settings, setSettings }) => {
		const { conversionTrackingEnabled, conversionLabel, googleConversionTrackingId } = settings;

		const handleToggleChange = () => {
			setSettings({ ...settings, conversionTrackingEnabled: !conversionTrackingEnabled });
		};

		const handleConversionLabelChange = (conversionLabel) => {
			setSettings({ ...settings, conversionLabel });
		};

		const handleGoogleTrackingIdChange = (googleConversionTrackingId) => {
			setSettings({ ...settings, googleConversionTrackingId });
		};

		return createElement(
			Fragment,
			null,
			createElement(
				PanelRow,
				{ className: 'no-extra-gap' },
				createElement(ToggleControl, {
					label: __('Enable conversion tracking', 'give'),
					checked: conversionTrackingEnabled,
					onChange: handleToggleChange,
				})
			),
			conversionTrackingEnabled && createElement(
				Fragment,
				null,
				createElement(
					PanelRow,
					null,
					createElement(TextControl, {
						label: __('Conversion Label', 'give'),
						value: conversionLabel,
						onChange: handleConversionLabelChange,
					})
				),
				createElement(
					PanelRow,
					null,
					createElement(TextControl, {
						label: __('Google Conversion Tracking ID', 'give'),
						value: googleConversionTrackingId,
						onChange: handleGoogleTrackingIdChange,
					})
				)
			)
		);
	};

	// Define the new route
	const newRoute = {
		name: __('Conversion Tracking', 'give'),
		path: 'conversion-tracking',
		element: ConversionTrackingTab,
	};

	// Add the new route using the filter
	addFilter(
		'givewp_form_builder_settings_additional_routes',
		'conversion-tracking/conversion-tracking-route',
		(routes) => {
			return [...routes, newRoute];
		}
	);
})();
