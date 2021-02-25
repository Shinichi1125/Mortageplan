package com.mortageplan.model;

public class DecimalMortage {
	
	private int id;
	private String customer;
	private float totalLoan; 
	private float interest;
	private int years;
	
	public DecimalMortage() {

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

	public float getTotalLoan() {
		return totalLoan;
	}

	public void setTotalLoan(float totalLoan) {
		this.totalLoan = totalLoan;
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
