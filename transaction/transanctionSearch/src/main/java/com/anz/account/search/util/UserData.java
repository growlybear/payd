package com.anz.account.search.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class UserData {
    private static final ThreadLocal<Map<String, Object>> LOCAL_OBJECT = new ThreadLocal<Map<String, Object>>() {
        @Override
        protected Map<String, Object> initialValue() {
            HashMap<String, Object> userDataMap = new HashMap<String, Object>();
            
            return userDataMap;
        }
    };   
    
    public static String getUser() {
        return (String) ((Map<String, Object>)(LOCAL_OBJECT.get().get(StringConstants.AUTH))).get(StringConstants.USER);
    }


    public static void setUserData(Map<String, Object> user) {
        LOCAL_OBJECT.get().put(StringConstants.AUTH, user);
    }
    
    
    /**
     * Get Authorization data for the current User.
     * @return
     */
    public static Map<String, Object> getUserData(){
        return ((Map<String, Object>)(LOCAL_OBJECT.get().get(StringConstants.AUTH)));
    }

}