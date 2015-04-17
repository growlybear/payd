package com.anz.account.domain;

import java.io.Serializable;
import java.util.Date;

public class Transaction implements Serializable {
	
	Long id ;
	Date date ;
	String description ; // rule priority 1 to find category and tag.
	String category ;
	String tags[] ;
	Integer amount ;
	String toAccount ; // number priority 2 to find category and tag.
	String fromAccount ;
	String merchant ; // number priority 3 to find category and tag.
	
	public Transaction(){
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long elasticPrimaryKey) {
		this.id = elasticPrimaryKey;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String[] getTags() {
		return tags;
	}
	public void setTags(String[] tags) {
		this.tags = tags;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public String getToAccount() {
		return toAccount;
	}

	public void setToAccount(String toAccount) {
		this.toAccount = toAccount;
	}

	public String getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(String userName) {
		this.fromAccount = userName;
	}

	public String getMerchant() {
		return merchant;
	}

	public void setMerchant(String merchant) {
		this.merchant = merchant;
	}
	
}
