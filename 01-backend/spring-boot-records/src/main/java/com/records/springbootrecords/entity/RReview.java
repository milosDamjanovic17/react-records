package com.records.springbootrecords.entity;

import java.util.Date;

public record RReview(Long id, String userEmail, Date date, double rating, Long recordId, String reviewDescription) {
}
