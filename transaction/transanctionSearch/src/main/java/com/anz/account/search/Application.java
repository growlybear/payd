package com.anz.account.search;


import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.transport.TransportAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.web.servlet.DispatcherServlet;

import com.anz.account.search.elastic.repository.ElasticRepo;
import com.anz.account.search.filter.UserFilter;


@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = { "com.anz.account" }, 
excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ANNOTATION, value=ElasticRepo.class)})
public class Application extends SpringBootServletInitializer {

//	 @Value("${esearch.port}")
	 @Value("9300")
	 private String port;
    @Value("127.0.0.1")
    private String hostname;

    @Value("transactionsearch")
    private String clusterName;

    @Autowired
    private Environment env;

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Bean
    public DispatcherServlet dispatcherServlet() {
        DispatcherServlet dispatcherServlet = new DispatcherServlet();
        return dispatcherServlet;
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);

    }

    @Bean
    FilterRegistrationBean userDataFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setFilter(new UserFilter());
        return filterRegistrationBean;
    }

    
    @Bean
    @Qualifier("elasticsearchTemplate")
    public ElasticsearchTemplate elasticsearchTemplate() {
        return new ElasticsearchTemplate(client());
    }

    @Bean
    public TransportClient client() {
        Settings settings = ImmutableSettings.settingsBuilder().put("cluster.name", clusterName).build();
        TransportClient transportClient = new TransportClient(settings);
        TransportAddress address = new InetSocketTransportAddress(hostname, Integer.parseInt(port));
        transportClient.addTransportAddress(address);
        return transportClient;
    }

}
