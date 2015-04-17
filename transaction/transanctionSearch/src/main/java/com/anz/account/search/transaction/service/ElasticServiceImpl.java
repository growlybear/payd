package com.anz.account.search.transaction.service;

import static org.elasticsearch.index.query.QueryBuilders.boolQuery;
import static org.elasticsearch.index.query.QueryBuilders.termQuery;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.index.query.QueryStringQueryBuilder.Operator;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.StringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.metrics.sum.InternalSum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;

import com.anz.account.domain.BarChartPoints;
import com.anz.account.domain.ChartPoints;
import com.anz.account.domain.LableValue;
import com.anz.account.domain.Transaction;
import com.anz.account.search.util.UserData;

@Service
public class ElasticServiceImpl implements ElasticService {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(ElasticServiceImpl.class);

	private static final String TYPE = "payg";

	private static final String INDEX_NAME = "payg";

	@Autowired
	private TransportClient client;

	@Autowired
	private ElasticsearchTemplate elasticsearchTemplate;

	@Override
	public boolean update(List<Transaction> updateRequests) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Transaction> create(List<Transaction> addRequest) {
		try {
			List<IndexQuery> indexQueries = new ArrayList<IndexQuery>();
			int count = 0;
			for (Transaction addEntity : addRequest) {
				Long elasticPrimaryKey = System.currentTimeMillis() + count;
				addEntity.setId(elasticPrimaryKey);
				IndexQuery indexQuery = new IndexQueryBuilder()
						.withId(String.valueOf(elasticPrimaryKey))
						.withType(TYPE).withIndexName(INDEX_NAME)
						.withObject(addEntity).build();
				LOGGER.debug(indexQuery.getSource());
				indexQueries.add(indexQuery);
			}

			elasticsearchTemplate.bulkIndex(indexQueries);

			elasticsearchTemplate.refresh(INDEX_NAME, true);
			return addRequest;
		} catch (Exception e) {
			LOGGER.error("Elastic server Error", e);
			return null; // the service should throw exception, however for
							// present scenario we return false.
		}
	}

	@Override
	public Page<Transaction> searchCustom(String searchStr, Pageable page) {

		try {
			
			if(!searchStr.contains(":")){
				searchStr = searchStr.toLowerCase() ;
			}

			BoolQueryBuilder builder = boolQuery();
			QueryStringQueryBuilder queryString = QueryBuilders
					.queryStringQuery(searchStr);
			queryString.defaultOperator(Operator.AND);
			builder.must(queryString)
					.must(QueryBuilders.queryStringQuery("fromAccount:"
							+ String.valueOf(UserData.getUser()).toLowerCase()));

			String[] fields = null;
			NativeSearchQueryBuilder withIndices = new NativeSearchQueryBuilder()
					.withPageable(page)
					.withQuery(QueryBuilders.matchAllQuery()).withTypes(TYPE)
					.withIndices(INDEX_NAME).withFields(fields);
			withIndices.withQuery(builder);
			SearchQuery searchQuery = withIndices.build();
			LOGGER.debug(searchQuery.getQuery().toString());
			Page<Transaction> result = elasticsearchTemplate.queryForPage(
					searchQuery, Transaction.class);
			return result;
		} catch (Exception e) {
			LOGGER.error("Elastic server Error", e);
			return null;
		}
	}

	@Override
	public List<ChartPoints> getCatAgg() {

		SearchResponse response = client
				.prepareSearch(INDEX_NAME)
				.setTypes(TYPE)
				.setQuery(QueryBuilders.queryStringQuery("a*"))
				.addAggregation(
						AggregationBuilders
								.terms("group_by_category")
								.field("category")
								.size(10)
								.subAggregation(
										AggregationBuilders.sum("amount")
												.field("amount"))).execute()
				.actionGet();
		Terms terms = response.getAggregations().get("group_by_category");
		Collection<Terms.Bucket> buckets = terms.getBuckets();
		Iterator<Bucket> iterator = buckets.iterator();
		System.out.println(iterator.next().getAggregations().getAsMap()
				.get("amount"));
		List<ChartPoints> list = new ArrayList<ChartPoints>();
		for (Iterator iterator2 = buckets.iterator(); iterator2.hasNext();) {
			Bucket bucket = (Bucket) iterator2.next();
			ChartPoints chartPoints = new ChartPoints();
			Map<String, Aggregation> asMap = bucket.getAggregations()
					.getAsMap();
			for (Entry<String, Aggregation> aggre : asMap.entrySet()) {
				chartPoints.setKey(bucket.getKey());
				InternalSum internalSum = (InternalSum) aggre.getValue();
				chartPoints.setY(internalSum.getValue());
			}
			list.add(chartPoints);
		}
		return list;
	}

	@Override
	public Page<Transaction> predict(Transaction last, PageRequest pageRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BarChartPoints> getBarAgg() {

		SearchResponse response = client
				.prepareSearch(INDEX_NAME)
				.setTypes(TYPE)
				.setQuery(QueryBuilders.queryStringQuery("a*"))
				.addAggregation(
						AggregationBuilders
								.terms("group_by_category")
								.field("category")
								.size(10)
								.subAggregation(
										AggregationBuilders
												.terms("group_by_tags")
												.field("tags")
												.size(10)
												.subAggregation(
														AggregationBuilders
																.sum("amount")
																.field("amount"))))
				.execute().actionGet();
		Terms terms = response.getAggregations().get("group_by_category");
		Collection<Terms.Bucket> buckets = terms.getBuckets();
		Iterator<Bucket> iterator = buckets.iterator();
//		System.out.println(iterator.next().getAggregations().getAsMap()
//				.get("amount"));
		List<BarChartPoints> list = new ArrayList<BarChartPoints>();
		for (Iterator iterator2 = buckets.iterator(); iterator2.hasNext();) {
			Bucket bucket = (Bucket) iterator2.next();
			BarChartPoints barChartPoints = new BarChartPoints();
			Map<String, Aggregation> asMap = bucket.getAggregations()
					.getAsMap();
			for (Entry<String, Aggregation> aggre : asMap.entrySet()) {
				barChartPoints.setKey(bucket.getKey());
				List<LableValue> values = new ArrayList<LableValue>();
				barChartPoints.setValues(values );
				StringTerms stringTerms = (StringTerms) aggre.getValue();
				List<Bucket> termBucket = stringTerms.getBuckets();
				for (Iterator iterator3 = termBucket.iterator(); iterator3
						.hasNext();) {
					LableValue barVal = new LableValue();
					values.add(barVal );
					Bucket bucket2 = (Bucket) iterator3.next();
					Aggregations aggregations = bucket2.getAggregations();
					barVal.setLabel(bucket2.getKey());
					for (Entry<String, Aggregation> aggre1 : aggregations.getAsMap().entrySet()) {
						InternalSum internalSum = (InternalSum) aggre1.getValue();
						barVal.setValue(internalSum.value());
					}

					
				}
				System.out.println(stringTerms);
			}
			list.add(barChartPoints);
		}
		return list;
	}

}
