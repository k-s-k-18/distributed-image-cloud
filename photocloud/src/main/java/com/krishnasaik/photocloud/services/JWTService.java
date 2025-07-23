package com.krishnasaik.photocloud.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.krishnasaik.photocloud.utils.JWTInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JWTService {

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;

    public JWTInfo verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTInfo jwtInfo = new JWTInfo();
        try{
            JWTVerifier verifier = JWT.require(algorithm).build();

            DecodedJWT jwt = verifier.verify(token);

            jwtInfo.setVerified(true);
            jwtInfo.setUser_id(jwt.getClaim("id").toString());

        } catch (Exception e) {
            jwtInfo.setVerified(false);
            jwtInfo.setUser_id(null);
        }

        return jwtInfo;
    }
}


