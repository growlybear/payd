package com.anz.account.search.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.anz.account.search.util.StringConstants;
import com.anz.account.search.util.UserData;
public class UserFilter implements Filter {
	
    private static final Logger LOGGER = LoggerFactory.getLogger(UserFilter.class);

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {

        try {
            if (request instanceof HttpServletRequest) {
                HttpServletRequest req = (HttpServletRequest) request;
                

                HttpSession session = req.getSession(false);

                session = req.getSession();
                
                Map<String, Object> user = (Map<String, Object>) session.getAttribute(StringConstants.USER_DATA);
                if (null != user) {
                    UserData.setUserData(user);
                }

            }
            filterChain.doFilter(request, response);
        } finally {
            UserData.setUserData(new HashMap<String, Object>());
        }
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
