package com.mortageplan.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mortageplan.model.Mortage;

public interface MortageRepository extends JpaRepository<Mortage, Integer> {
	@Query("SELECT COUNT(id) FROM Mortage")
	int getNoOfCustomers();
}
