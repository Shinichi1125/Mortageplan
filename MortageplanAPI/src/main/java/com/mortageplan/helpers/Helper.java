package com.mortageplan.helpers;

public class Helper {
	public double calculatePower(double base, int power) {
	    double result = 1;
	    for( int i = 0; i < power; i++ ) {
	        result *= base;
	    }
	    return result;
	}
}
