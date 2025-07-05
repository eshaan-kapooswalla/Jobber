package com.jobber.jobservice.repository;

import com.jobber.jobservice.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
} 