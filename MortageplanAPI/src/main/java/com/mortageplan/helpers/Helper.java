package com.mortageplan.helpers;

public class Helper {
	public double calculatePower(double base, int power) {
	    double result = 1;
	    for( int i = 0; i < power; i++ ) {
	        result *= base;
	    }
	    return result;
	}
	
	public double calculateMonthlyPayment(float monthlyInterest, float totalLoan, int noOfPayments) {
		double fixedMonthlyPayment = 0; 
		float b = monthlyInterest;
		float U = totalLoan;
		int p = noOfPayments; 
		
		fixedMonthlyPayment = U * (b * calculatePower((1+b), p)) / (calculatePower((1+b), p) - 1);
		
		return fixedMonthlyPayment; 
	}
}
