<?php
if ('/ru' == $_SERVER['REQUEST_URI']) {
    $GLOBALS['q_config']['language'] = 'ru';
    require get_template_directory()."/create-agency/index.html";
} else {
    $GLOBALS['q_config']['language'] = 'ua';
    require get_template_directory()."/dist/index.html";
}
?>