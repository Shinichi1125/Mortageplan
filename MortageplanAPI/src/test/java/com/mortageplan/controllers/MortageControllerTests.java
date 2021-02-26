package com.mortageplan.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.mortageplan.model.DecimalMortage;
import com.mortageplan.model.Mortage;
import com.mortageplan.repos.MortageRepository;
import com.sun.el.stream.Optional;

@ExtendWith(SpringExtension.class) 
@WebMvcTest 
public class MortageControllerTests {
	
	@MockBean
	private MortageRepository repository;
	
	@Autowired 
	private MockMvc mockMvc;
	
	private int JuhaID = 1; 
	
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
		
		//when(repository.findById(JuhaID)).thenReturn(Optional.of(existingCustomer));
		
		mockMvc
				.perform((RequestBuilder) ((ResultActions) MockMvcRequestBuilders.multipart("/api/mortage/{id}", JuhaID)) 
				.andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
		        .andExpect(jsonPath("$.customer").value("Juha"))
		        .andExpect(jsonPath("$.totalLoan").value(1000.0))
		        .andExpect(jsonPath("$.interest").value(0.05))
		        .andExpect(jsonPath("$.years").value(2)));
	}
}
