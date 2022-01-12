package com.siemens.carsharing.controller;

import com.siemens.carsharing.configuration.MailConfiguration;
import com.siemens.carsharing.dto.Mail;
import com.siemens.carsharing.service.MailService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mail")
public class MailController {
    private MailConfiguration mailConfiguration;
    private MailService mailService;

    private MailController(MailConfiguration mailConfiguration, MailService mailService) {
        this.mailConfiguration = mailConfiguration;
        this.mailService = mailService;
    }

    @PostMapping(value = "/send")
    public void sendEmail(@RequestBody Mail mail, BindingResult bindingResult) throws ValidationException {
        if(bindingResult.hasErrors()) {
            throw new ValidationException("Mail is not valid");
        }
        mailConfiguration.getMailSender();
        mailService.sendMail(mail);
    }
}

