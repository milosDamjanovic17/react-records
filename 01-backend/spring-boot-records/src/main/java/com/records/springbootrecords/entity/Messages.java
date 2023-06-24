package com.records.springbootrecords.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "messages")
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "title")
    private String title;

    @Column(name = "question")
    private String question;

    @Column(name = "admin_email")
    private String adminEmail;

    @Column(name = "response")
    private String response;

    @Column(name = "closed")
    private boolean closed;

    public Messages(){}

    public Messages(String title, String question) {

        this.title = title;
        this.question = question;
    }
}
