(function() {
	const { addFilter } = wp.hooks;
	const { __ } = wp.i18n;
	const { createElement, Fragment } = wp.element;
	const { PanelRow, TextControl, ToggleControl } = wp.components;

	// Define the new component for the conversion tracking tab
	const ConversionTrackingTab = ({ settings, setSettings }) => {
		const { conversionBridgeTrackingEnabled = false, conversionBridgeTrackingLabel = '', conversionBridgeTrackingId } = {...window.conversionBridgeSettings, ...settings};

		const handleToggleChange = () => {
			setSettings({ ...settings, conversionBridgeTrackingEnabled: !conversionBridgeTrackingEnabled });
		};

		const handleConversionBridgeTrackingLabelChange = (conversionBridgeTrackingLabel) => {
			setSettings({ ...settings, conversionBridgeTrackingLabel });
		};

		const handleGoogleTrackingIdChange = (conversionBridgeTrackingId) => {
			setSettings({ ...settings, conversionBridgeTrackingId });
		};

		return createElement(
			Fragment,
			null,
			createElement(
				PanelRow,
				{ className: 'no-extra-gap' },
				createElement(ToggleControl, {
					label: __('Enable conversion tracking', 'give'),
					checked: conversionBridgeTrackingEnabled,
					onChange: handleToggleChange,
				})
			),
			conversionBridgeTrackingEnabled && createElement(
				Fragment,
				null,
				createElement(
					PanelRow,
					null,
					createElement(TextControl, {
						label: __('Conversion Label', 'give'),
						value: conversionBridgeTrackingLabel,
						onChange: handleConversionBridgeTrackingLabelChange,
					})
				),
				createElement(
					PanelRow,
					null,
					createElement(TextControl, {
						label: __('Google Conversion Tracking ID', 'give'),
						value: conversionBridgeTrackingId,
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
