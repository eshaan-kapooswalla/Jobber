package com.jobber.reviewservice.repository;

import com.jobber.reviewservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
} 