package com.mortageplan.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.mortageplan.model.DecimalMortage;
import com.mortageplan.model.Mortage;
import com.mortageplan.repos.MortageRepository;
import java.util.Optional;

@ExtendWith(SpringExtension.class) 
@WebMvcTest 
public class MortageControllerTests {
	
	@MockBean
	private MortageRepository repository;
	
	@Autowired 
	private MockMvc mockMvc;
	
	private int JuhaID = 1; 
	private int KarvinenID = 2; 
	
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
	
	double calculatePower(double base, int power) {
	    double result = 1;
	    for( int i = 0; i < power; i++ ) {
	        result *= base;
	    }
	    return result;
	}
	
	@Test
	@DisplayName("When a get request with an ID number is sent, the customer whose ID matches gets returned in the form of JSON")
	public void testGetDecimalMortage() throws Exception {
		Mortage existingCustomer = new Mortage();
		existingCustomer.setId(JuhaID);
		existingCustomer.setCustomer("Juha");
		existingCustomer.setTotalLoanEuro(1000);
		existingCustomer.setTotalLoanCent(0);
		existingCustomer.setInterest((float) 0.05);
		existingCustomer.setYears(2);
		
		DecimalMortage decimalExistingCustomer = combineEuroAndCent(existingCustomer);
		String expectedName = decimalExistingCustomer.getCustomer();
		float expectedTotalLoan = decimalExistingCustomer.getTotalLoan();
		float expectedInterest = decimalExistingCustomer.getInterest();
		int expectedYears = decimalExistingCustomer.getYears();
		
		Optional<Mortage> existingCustomerOpt = Optional.ofNullable(existingCustomer);	
		when(repository.findById(JuhaID)).thenReturn(existingCustomerOpt);
		
		mockMvc
		.perform(MockMvcRequestBuilders.get("/api/mortage/{id}", JuhaID)) 
		.andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
		    .andExpect(jsonPath("$.customer").value(expectedName))
		    .andExpect(jsonPath("$.totalLoan").value(expectedTotalLoan))
		    .andExpect(jsonPath("$.interest").value(expectedInterest))
		    .andExpect(jsonPath("$.years").value(expectedYears));
	}
	
	@Test
	@DisplayName("When a get request with an ID number is sent, the fixed monthly payment that the customer needs to pay gets returned in the form of JSON")
	public void testGetMonthlyPayment() throws Exception {
		Mortage existingCustomer = new Mortage();
		existingCustomer.setId(KarvinenID);
		existingCustomer.setCustomer("Karvinen");
		existingCustomer.setTotalLoanEuro(4356);
		existingCustomer.setTotalLoanCent(0);
		existingCustomer.setInterest((float) 1.27);
		existingCustomer.setYears(6);
		
		DecimalMortage decimalExistingCustomer = combineEuroAndCent(existingCustomer);
		double expectedFixedMonthlyPayment = 0;    // Fixed monthly payment 
		float b = 0 ; 
		b = decimalExistingCustomer.getInterest() / 12;    // Interest on a monthly basis
		float U = 0 ; 
		U = decimalExistingCustomer.getTotalLoan();    // Total loan
		int p = 12 * decimalExistingCustomer.getYears();    // The number of payments 
		// expectedFixedMonthlyPayment: 62.86576062270081
		expectedFixedMonthlyPayment = U * (b * calculatePower((1+b), p)) / (calculatePower((1+b), p) - 1);
		
		Optional<Mortage> existingCustomerOpt = Optional.ofNullable(existingCustomer);
		when(repository.findById(KarvinenID)).thenReturn(existingCustomerOpt);
		
		mockMvc
		.perform(MockMvcRequestBuilders.get("/api/monthly-payment/{id}", KarvinenID)) 
		.andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
	        .andExpect(jsonPath("$").value(expectedFixedMonthlyPayment));
	}
}
