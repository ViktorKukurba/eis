<?php

class ApplicationData {

    public static function get_app_data() {
        $data = [
            'title' => get_option('blogname'),
            'email' => get_option('admin_email'),
            'description' => get_option('blogdescription'),
            'languages' => [
                        'options' => $GLOBALS['q_config']['enabled_languages'],
                        'current' => $GLOBALS['q_config']['language']
                        ],
            'q_config' => $GLOBALS['q_config']
            ];
        header('Content-type:application/json;charset=utf-8');
        echo json_encode($data);
        exit();
    }
}

?>