package com.records.springbootrecords.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "record")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "artist")
    private String artist;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copiesAvailable;

    @Column(name= "genre")
    private String genre;

    @Column(name = "img")
    private String img;
}
