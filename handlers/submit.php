<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName  = htmlspecialchars(trim($_POST['lastName']));
    $email     = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone     = htmlspecialchars(trim($_POST['phone']));
    $subject   = htmlspecialchars(trim($_POST['subject']));
    $message   = htmlspecialchars(trim($_POST['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "invalid_email";
        exit;
    }

    $to = "support@cogzin.com";
    $subjectLine = empty($subject) ? "New message from contact form" : $subject;

    $headers = "From: Cogzin Contact Form <no-reply@cogzin.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $body = "You received a new message from Cogzin Contact Form:\n\n";
    $body .= "Name: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n";

    if (mail($to, $subjectLine, $body, $headers)) {
        http_response_code(200);
        echo "success";
    } else {
        http_response_code(500);
        echo "error";
    }
}
?>
