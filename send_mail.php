<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'g18561128@gmail.com'; // Your Gmail
    $mail->Password = 'dsrgjkrbydzggmrc'; // Your App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use TLS
    $mail->Port = 587; // TLS Port

    // Email Details
    $mail->setFrom('g18561128@gmail.com', 'Your Name'); // Sender
    $mail->addAddress('anmolcheema988@gmail.com'); // Receiver

    // Email Content
    $mail->isHTML(true);
    $mail->Subject = 'New Lead Submission';
    $mail->Body    = '<p>You have a new lead from your website!</p>';

    // Send Email
    if ($mail->send()) {
        echo 'Email sent successfully!';
    } else {
        echo 'Failed to send email.';
    }
} catch (Exception $e) {
    echo "Mailer Error: {$mail->ErrorInfo}";
}
?>
