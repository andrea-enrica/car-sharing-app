package com.siemens.carsharing.service;
import com.siemens.carsharing.dto.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("mailService")
public class DefaultMailService implements MailService{

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public void sendMail(Mail mail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(mail.getMailFrom());
        message.setTo(mail.getMailTo());
        message.setSubject(mail.getMailSubject());
        message.setText(mail.getMailContent());

        javaMailSender.send(message);
    }
}
