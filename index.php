
<?php
if ('/ru' == $_SERVER['REQUEST_URI']) {
    $GLOBALS['q_config']['language'] = 'ru';
} else {
    $GLOBALS['q_config']['language'] = 'ua';
}

get_header();
require get_template_directory()."/dist/body.html";
get_footer();
?>
