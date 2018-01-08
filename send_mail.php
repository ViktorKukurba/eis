<?php
    ini_set("SMTP", "smtp.mailtrap.io");
    ini_set("sendmail_from", "app84394485@heroku.com");

    $message = "The mail message was sent with the following mail setting:\r\nSMTP = aspmx.l.google.com\r\nsmtp_port = 2525\r\nsendmail_from = YourMail@address.com";

    $headers = "From: app84394485@heroku.com";


    mail("app84394485@heroku.com", "Testing", $message, $headers);
    echo "Check your email now....<BR/>";
?>