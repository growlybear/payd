package com.anz.account.search.transaction.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.anz.account.domain.BarChartPoints;
import com.anz.account.domain.ChartPoints;
import com.anz.account.domain.Test;
import com.anz.account.domain.Transaction;
import com.anz.account.search.transaction.service.ElasticService;
import com.anz.account.search.util.StringConstants;
import com.anz.account.search.util.UserData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fasterxml.jackson.core.*;

@Controller
@RequestMapping(value = "/transactionHistory")
public class TransactionHistory {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(TransactionHistory.class);

	@Autowired
	ElasticService elasticService;

	@Autowired
	ObjectMapper om;

	@PostConstruct
	public void init() {
//		om.configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false);
//		om.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		final DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		om.setDateFormat(df);
	}

	@RequestMapping(value = "/login/{userName}", method = RequestMethod.GET)
	@ResponseBody
	public void login(@PathVariable("userName") String userName,
			final HttpServletRequest request) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		request.getSession().setAttribute(StringConstants.USER_DATA, hashMap);
		hashMap.put(StringConstants.USER, userName);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> update(
			@RequestBody final List<Transaction> transactions) {
		elasticService.update(transactions);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/search/{searchStr}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> search(@PathVariable("searchStr") String searchStr) {
		Page<Transaction> searchCustom = elasticService.searchCustom(searchStr,
				new PageRequest(0, 100));
		return new ResponseEntity<>(searchCustom.getContent(),
				HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value = "/prediction", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> predict(@RequestBody Transaction last) {
		Page<Transaction> searchCustom = elasticService.predict(last,
				new PageRequest(0, 100));	
		return new ResponseEntity<>(searchCustom.getContent(),
				HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> testServerUP() {
		System.out.println("server is up and running");
		String okString = "Tested OK";
		if (UserData.getUserData() != null && UserData.getUser() != null) {
			okString = okString + ", Logged in User :" + UserData.getUser();
		}
		return new ResponseEntity<>(okString, HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/add", method = RequestMethod.PUT, produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> add(@RequestBody List<Transaction> list) {
		List<Transaction> create = elasticService.create(list);
		return new ResponseEntity<>(create, HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/getDonut", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<ChartPoints>> aggregationOnCategory() {
		List<ChartPoints> chartPoints = elasticService.getCatAgg();
		return new ResponseEntity<>(chartPoints, HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/getBar", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<BarChartPoints>> barOnCategory() {
		List<BarChartPoints> chartPoints = elasticService.getBarAgg();
		return new ResponseEntity<>(chartPoints, HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Test> get() {
		Test test = new Test();
		test.setName("abhi");
		return new ResponseEntity<>(test, HttpStatus.ACCEPTED);
	}

}
