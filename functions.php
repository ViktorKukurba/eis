<?php

add_action('wp_ajax_send_message', array('Mail_Post', 'send_message') );
add_action('wp_ajax_nopriv_send_message', array('Mail_Post', 'send_message') );
add_filter('wp_mail_content_type', array('Mail_Post', 'mail_content_type') );

class Mail_Post {

    public static function send_message() {

        if (isset($_POST['message'])) {

            $to = get_option('admin_email');
            $headers = 'From: ' . $_POST['name'] . ' <"' . $_POST['email'] . '">';
            $subject = "carlofontanos.com | New Message from " . $_POST['name'];

            ob_start();

            echo '
                <h2>Message:</h2>' .
                wpautop($_POST['message']) . '
                <br />
                --
                <p><a href = "' . home_url() . '">www.carlofontanos.com</a></p>
            ';

            $message = ob_get_contents();

            ob_end_clean();

            $mail = wp_mail($to, $subject, $message, $headers);

            if($mail){
                echo 'success';
            }
        }

        exit();

    }

    public static function mail_content_type() {
        return "text/html";
    }
}

?>
