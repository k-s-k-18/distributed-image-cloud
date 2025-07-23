package com.krishnasaik.photocloud.utils;

public class JWTInfo {
    private boolean verified;
    private String user_id;

    //getters
    public boolean isVerified() {
        return verified;
    }

    public String getUser_id() {
        return user_id;
    }

    //setters
    public void setUser_id(String user_id) {
        //System.out.println(user_id);
        this.user_id = user_id;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}
