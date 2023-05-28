package com.records.springbootrecords.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Check;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {

    public Checkout(){}

    public Checkout(String userEmail, String checkoutDate, Long recordId){
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.recordId = recordId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "checkout_date")
    private String checkoutDate;
    @Column(name = "record_id")
    private Long recordId;
}