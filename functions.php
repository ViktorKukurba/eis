<?php

require get_template_directory().'/php/application-data.php';
require get_template_directory().'/php/mail-post.php';

add_action('wp_ajax_send_message', array('Mail_Post', 'send_message') );
add_action('wp_ajax_send_order', array('Mail_Post', 'send_order') );
add_action('wp_ajax_nopriv_send_message', array('Mail_Post', 'send_message') );
add_action('wp_ajax_nopriv_send_order', array('Mail_Post', 'send_order') );
add_filter('wp_mail_content_type', array('Mail_Post', 'mail_content_type') );

add_action('wp_ajax_get_app_info', array('ApplicationData', 'get_app_data') );
add_action('wp_ajax_nopriv_get_app_info', array('ApplicationData', 'get_app_data') );
add_action('admin_init', 'add_google_analytics_field');

function add_google_analytics_field() {
    register_setting( 'general', 'google-analytics_setting-id' );
    add_settings_field('google-analytics_setting-id',
        'Google Analytics ID',
        'google_analytics_setting_callback_function',
        'general',
        'default',
        array('id' => 'google-analytics_setting-id',
              'option_name' => 'google-analytics_setting-id'));

    function google_analytics_setting_callback_function( $val ) {
        $id = $val['id'];
        $option_name = $val['option_name'];
        ?>
        <input
            type="text"
            name="<? echo $option_name ?>"
            id="<? echo $id ?>"
            value="<? echo esc_attr( get_option($option_name) ) ?>"
        />
        <?
    }
}

// Function to change email address

function wpb_sender_email( $original_email_address ) {
    return get_option('admin_email');
}

// Function to change sender name
function wpb_sender_name( $original_email_from ) {
    return get_option('blogname');
}

// Hooking up our functions to WordPress filters
add_filter( 'wp_mail_from', 'wpb_sender_email' );
add_filter( 'wp_mail_from_name', 'wpb_sender_name' );

?>
