package com.anz.account.search.transaction.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.anz.account.domain.BarChartPoints;
import com.anz.account.domain.ChartPoints;
import com.anz.account.domain.Transaction;

public interface ElasticService {

    boolean update(List<Transaction> updateRequests);

    List<Transaction> create(List<Transaction> addRequest);

	Page<Transaction> searchCustom(String searchStr, Pageable page);

	List<ChartPoints> getCatAgg();

	Page<Transaction> predict(Transaction last, PageRequest pageRequest);

	List<BarChartPoints> getBarAgg();

}
