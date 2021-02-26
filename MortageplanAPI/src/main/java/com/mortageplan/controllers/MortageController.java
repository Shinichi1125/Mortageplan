package com.mortageplan.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mortageplan.controllers.MortageController;
import com.mortageplan.model.DecimalMortage;
import com.mortageplan.model.Mortage;
import com.mortageplan.repos.MortageRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class MortageController {
	private MortageRepository repository; 
	private static final Logger LOGGER = LoggerFactory.getLogger(MortageController.class);
	
	@Autowired
	MortageController(MortageRepository repository){
		this.repository = repository; 
	}
	
	@RequestMapping(value = "/all-mortages", method = RequestMethod.GET)
	public List<Mortage> getAllMortages() {
		return repository.findAll(); 
	}
	
	// Currency like Euro needs to be separated to Euro and Cents when they are stored in the database 
	// to keep the precision on the number below the decimal point, and because of this a help function 
	// like this comes in handy when combining two integer values into a single float value 
	DecimalMortage combineEuroAndCent(Mortage mortage) {
		DecimalMortage decimalMortage = new DecimalMortage();
		decimalMortage.setId(mortage.getId());
		decimalMortage.setCustomer(mortage.getCustomer());
		float totalLoanCent = ((float)mortage.getTotalLoanCent()) / 100;
		decimalMortage.setTotalLoan(((float)mortage.getTotalLoanEuro()) + totalLoanCent);
		float interest = (mortage.getInterest()) / 100;
		decimalMortage.setInterest(interest);
		decimalMortage.setYears(mortage.getYears());
		
		return decimalMortage; 
	}
	
	@RequestMapping(value = "/all-decimal-mortages", method = RequestMethod.GET)
	public List<DecimalMortage> getAllDecimalMortages() {
		List<DecimalMortage> decimalMortagesList = new ArrayList<DecimalMortage>();
		List<Mortage> mortagesList = repository.findAll(); 
		
		for(Mortage mortage: mortagesList) {	
			DecimalMortage decimalMortage = combineEuroAndCent(mortage);
			decimalMortagesList.add(decimalMortage);
		}	
		return decimalMortagesList;
	}
	
	@RequestMapping(value = "/mortage/{id}", method = RequestMethod.GET)
	public DecimalMortage getDecimalMortage(@PathVariable("id") int id) {
		Mortage mortage = repository.findById(id).get();
		DecimalMortage decimalMortage = combineEuroAndCent(mortage);
		return decimalMortage;
	}
	
	double calculatePower(double base, int power) {
	    float result = 1;
	    for( int i = 0; i < power; i++ ) {
	        result *= base;
	    }
	    return result;
	}
	
	// make sure if the calculatePower method works 
	// --> working 
	@RequestMapping(value = "/check-power", method = RequestMethod.GET)
	public double checkPower(
			@RequestParam("base") double base ,
			@RequestParam("power") int power) {
		return calculatePower(base, power);
	}

	@RequestMapping(value = "/monthly-payment/{id}", method = RequestMethod.GET)
	public double getMonthlyPayment(@PathVariable("id") int id) {
		Mortage mortage = repository.findById(id).get();
		DecimalMortage decimalMortage = combineEuroAndCent(mortage);
		LOGGER.info("The content of decimalMortage... ");
		LOGGER.info("decimalMortage.getInterest() " + decimalMortage.getInterest());
		LOGGER.info("decimalMortage.getTotalLoan() " + decimalMortage.getTotalLoan());
		
		double E = 0;    // Fixed monthly payment 
		float b = 0 ; 
		b = decimalMortage.getInterest();    // Interest on a monthly basis
		float U = 0 ; 
		U = decimalMortage.getTotalLoan();    // Total loan
		int p = 12 * decimalMortage.getYears();    // The number of payments 
		
		LOGGER.info("Before the formula... ");
		LOGGER.info("E (Fixed monthly payment): " + E);
		LOGGER.info("b (Interest on a monthly basis): " + b);
		LOGGER.info("U (Total loan): " + U);
		LOGGER.info("p (The number of payments) " + p);
		
		LOGGER.info("Calculating... ");
		LOGGER.info("(1+b): " + (1+b));
		LOGGER.info("(1+b)^p: " + calculatePower((1+b), p));
		LOGGER.info("[b(1+b)^p]: " + b *  calculatePower((1+b), p));
		LOGGER.info("(1+b): " + (1+b));
		LOGGER.info("p-1: " + (p-1));
		LOGGER.info("[(1+b)^p-1]: " + calculatePower((1+b), (p-1)));
		LOGGER.info("U[b(1+b)^p]: " + U * b *  calculatePower((1+b), p));
		LOGGER.info("U[b(1+b)^p] / [(1+b)^p-1]: " + U * b *  calculatePower((1+b), p) / (calculatePower((1+b), (p-1))));
		E = U * b *  calculatePower((1+b), p) / (calculatePower((1+b), (p-1)));
		
		return E; 
	}
}
