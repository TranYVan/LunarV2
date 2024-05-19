package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(String toEmail, String subject, Order order) throws MessagingException {
        SimpleMailMessage message
                = new SimpleMailMessage();
        message.setFrom("yvantran0506@gmail.com");
        message.setTo(toEmail);
        message.setText("Your order's total price is: " + order.getTotalPrice());
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("Send successfully" + toEmail);
    }
}
