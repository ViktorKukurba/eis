<?php

class Mail_Post {

    public static function send_message() {
        header('Content-type:application/json;charset=utf-8');
        $data = array('success' => False);
        if (isset($_POST['message'])) {
            if (isset($_POST['office'])) {
                $to = $_POST['office'];
            } else {
                $to = get_option('admin_email');
            }
            $headers = 'From: ' . home_url() . ' <"' . $to . '">';
            $subject = "EIS. Заявка від " . $_POST['name'];

            ob_start();

            echo '
                <h2>Заявка:</h2>' .
                '<p>ПІБ: ' . $_POST['name'] . '.</p>' .
                '<p>Контактний телефон: ' . $_POST['phone'] . '.</p>' .
                '<p>Email: ' . $_POST['email'] . '.</p>' .
                '<p>Цікавить вакансія: ' . $_POST['vacancy'] . '.</p>' .
                '<p>Коротко про себе: ' . $_POST['message'] . '.
                <br />
                --
                <p><a href = "' . home_url() . '">' . home_url() . '</a></p>
            ';
            $message = ob_get_contents();
            ob_end_clean();
            $mail = wp_mail($to, $subject, $message, $headers);
            if($mail){
                $data = array('success' => $mail, 'to' => $to);
            }
            else {
                $data = array('success' => $mail, 'to' => $to);
            }
        }

        echo json_encode($data);

        exit();

    }

    public static function send_order() {
        header('Content-type:application/json;charset=utf-8');
        $data = array('success' => False);
        $to = get_option('admin_email');
        $headers = 'From: ' . home_url() . ' <"' . $to . '">';

        $ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
        $newfilename = 'Anketa_EIS_' . round(microtime(true)) . '.' . $ext;
        $destination = WP_CONTENT_DIR . '/uploads/orders/' . $newfilename;
        $uploaded = false;

        try {
            try {
                move_uploaded_file($_FILES["file"]["tmp_name"], $destination);
            } catch (Exception $e) {
                throw $e;
            }

            if (file_exists($destination)) {
                $uploaded = true;
                $attachments = array($destination);

            } else {
                $attachments = array($_FILES['file']['tmp_name']);
            }

//            $attachments = array(WP_CONTENT_DIR . '/uploads/Anketa-EIS.pdf');
            // $_FILES["file"]["name"] = 'Anketa_EIS.pdf';
//            $attachments = array($_FILES['file']['tmp_name']);
            $mail = wp_mail($to, 'EIS: Анкета.', 'Прикріплено анкету.', $headers, $attachments);

            if ($mail) {
                $data = array('success' => $mail, 'to' => $to, 'attachment' => $attachments, 'uploaded' => $uploaded);
            } else {
                $data = array('success' => $mail, 'to' => $to, 'message' => 'Mail not send.', 'attachment' => $destination, 'uploaded' => $uploaded);
            }
        } catch(Exception $e) {
            $data = array('success' => false, 'to' => $to, 'message' => $e->getMessage(), 'attachment' => $destination, 'uploaded' => $uploaded);
        } finally {
            echo json_encode($data);
            exit();
        }
    }

    public static function mail_content_type() {
        return "text/html";
    }
}

?>