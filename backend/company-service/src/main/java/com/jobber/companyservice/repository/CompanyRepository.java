package com.jobber.companyservice.repository;

import com.jobber.companyservice.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
} 