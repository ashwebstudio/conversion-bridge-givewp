<?php
/**
 * Plugin Name: Conversion Bridge for GiveWP
 * Description: Custom admin panel for GiveWP forms
 * Author:      Conversion Bridge
 * Author URI:  https://conversionbridgewp.com
 * Version:     0.1
 */

add_action( 'admin_enqueue_scripts', 'add_custom_route_script' );
function add_custom_route_script() {
	wp_enqueue_script(
		'conversion-bridge-givewp',
		plugin_dir_url( __FILE__ ) . '/editor.js',
		array('wp-hooks', 'wp-i18n', 'wp-element', 'wp-components'),
		null,
		true
	);
}
