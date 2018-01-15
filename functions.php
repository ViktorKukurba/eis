<?php

require_once('php/application-data.php');

add_action('wp_ajax_send_message', array('Mail_Post', 'send_message') );
add_action('wp_ajax_nopriv_send_message', array('Mail_Post', 'send_message') );
add_filter('wp_mail_content_type', array('Mail_Post', 'mail_content_type') );

add_action('wp_ajax_get_app_info', array('ApplicationData', 'get_app_data') );
add_action('wp_ajax_nopriv_get_app_info', array('ApplicationData', 'get_app_data') );

function mailtrap($phpmailer) {
  $phpmailer->isSMTP();
  $phpmailer->Host = 'smtp.mailtrap.io';
  $phpmailer->SMTPAuth = true;
  $phpmailer->Port = 2525;
  $phpmailer->Username = '65aa1f40eb692d';
  $phpmailer->Password = 'd9f733a751536c';
}

add_action('phpmailer_init', 'mailtrap');

class Mail_Post {

    public static function send_message() {
        header('Content-type:application/json;charset=utf-8');
        $data = ['success' => False];
        if (isset($_POST['message'])) {
            $to = get_option('admin_email');
            $headers = 'From: ' . $_POST['name'] . ' <"' . $_POST['email'] . '">';
            $subject = home_url() . " | New Message from " . $_POST['name'];

            ob_start();

            echo '
                <h2>Message:</h2>' .
                '<p>ПІБ: ' . wpautop($_POST['name']) . '</p>' .
                '<p>Контактний телефон: ' . wpautop($_POST['phone']) . '</p>' .
                '<p>Email: ' . wpautop($_POST['email']) . '</p>' .
                '<p>Цікавить вакансія: ' . wpautop($_POST['vacancy']) . '</p>' .
                '<p>Коротко про себе: ' . wpautop($_POST['message']) . '
                <br />
                --
                <p><a href = "' . home_url() . '">' . home_url() . '</a></p>
            ';

            $message = ob_get_contents();

            ob_end_clean();

            $mail = wp_mail($to, $subject, $message, $headers);

            if($mail){
                $data = ['success' => True, 'to' => $to ];
            }
            else {
                $data = ['success' => False, 'to' => $to ];
            }
        }

        echo json_encode($data);

        exit();

    }

    public static function mail_content_type() {
        return "text/html";
    }
}

?>
