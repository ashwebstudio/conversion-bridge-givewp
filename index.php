<?php
/**
 * Plugin Name: Conversion Bridge for GiveWP
 * Description: Custom admin panel for GiveWP forms
 * Author:      Conversion Bridge
 * Author URI:  https://conversionbridgewp.com
 * Version:     0.1
 */

add_action( 'givewp_form_builder_enqueue_scripts', 'add_custom_route_script' );
function add_custom_route_script() {
	wp_enqueue_script(
		'conversion-bridge-givewp',
		plugin_dir_url( __FILE__ ) . '/editor.js',
		array('wp-hooks', 'wp-i18n', 'wp-element', 'wp-components'),
		null,
		true
	);

    $formId = isset($_GET['donationFormID']) ?  abs($_GET['donationFormID']) : null;

    wp_localize_script('conversion-bridge-givewp', 'conversionBridgeSettings', [
        'conversionBridgeTrackingEnabled' =>  give()->form_meta->get_meta($formId, 'conversionBridgeTrackingEnabled', true),
        'conversionBridgeTrackingLabel' =>  give()->form_meta->get_meta($formId, 'conversionBridgeTrackingLabel', true),
        'conversionBridgeTrackingId' =>  give()->form_meta->get_meta($formId, 'conversionBridgeTrackingId', true)
    ]);
}

add_action('givewp_form_builder_updated', function($form) {
    if (isset($_POST['settings'])){
        $settings = json_decode(give_clean($_POST['settings']), true);
        $formId = $form->id;

        if (isset($settings['conversionBridgeTrackingEnabled'])){
            $conversionBridgeTrackingEnabled = give_clean($settings['conversionBridgeTrackingEnabled']);
            give()->form_meta->update_meta($formId, 'conversionBridgeTrackingEnabled', $conversionBridgeTrackingEnabled);
        }

        if (isset($settings['conversionBridgeTrackingLabel'])){
            $conversionBridgeTrackingLabel = give_clean($settings['conversionBridgeTrackingLabel']);
            give()->form_meta->update_meta($formId, 'conversionBridgeTrackingLabel', $conversionBridgeTrackingLabel);
        }

        if (isset($settings['conversionBridgeTrackingId'])){
            $conversionBridgeTrackingId = give_clean($settings['conversionBridgeTrackingId']);
            give()->form_meta->update_meta($formId, 'conversionBridgeTrackingId', $conversionBridgeTrackingId);
        }
    }
});
