package com.mortageplan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mortage")
public class Mortage {
	
	@Id
	private int id;
	private String customer;
	private int totalLoanEuro;
	private int totalLoanCent; 
	private float interest;
	private int years;
	
	public Mortage() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public int getTotalLoanEuro() {
		return totalLoanEuro;
	}

	public void setTotalLoanEuro(int totalLoanEuro) {
		this.totalLoanEuro = totalLoanEuro;
	}

	public int getTotalLoanCent() {
		return totalLoanCent;
	}

	public void setTotalLoanCent(int totalLoanCent) {
		this.totalLoanCent = totalLoanCent;
	}

	public float getInterest() {
		return interest;
	}

	public void setInterest(float interest) {
		this.interest = interest;
	}

	public int getYears() {
		return years;
	}

	public void setYears(int years) {
		this.years = years;
	} 
}

