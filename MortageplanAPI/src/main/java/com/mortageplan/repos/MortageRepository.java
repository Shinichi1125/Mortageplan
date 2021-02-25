package com.mortageplan.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mortageplan.model.Mortage;

public interface MortageRepository extends JpaRepository<Mortage, Integer> {

}
