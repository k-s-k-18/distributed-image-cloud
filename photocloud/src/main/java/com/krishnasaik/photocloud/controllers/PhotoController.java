package com.krishnasaik.photocloud.controllers;

import com.krishnasaik.photocloud.models.Photo;
import com.krishnasaik.photocloud.services.JWTService;
import com.krishnasaik.photocloud.services.PhotoService;
import com.krishnasaik.photocloud.utils.JWTInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/photo")
@CrossOrigin (origins = "http://localhost:3000")
public class PhotoController {


    private final JWTService jwtService;
    private final PhotoService photoService;

    public PhotoController(JWTService jwtService, PhotoService photoService) {
        this.jwtService = jwtService;
        this.photoService = photoService;
    }

    @GetMapping("/photos")
    public ResponseEntity<List<Photo>> getAllPhotos(@RequestHeader(value = "Authorization") String token) {

        //System.out.println(token);

        token = token.split(": ")[1];

        JWTInfo tokenInfo = jwtService.verifyToken(token);

        System.out.println(tokenInfo.isVerified());

        if(!tokenInfo.isVerified()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }



        return new ResponseEntity<>(photoService.getAllPhotosByUserId(Long.parseLong(tokenInfo.getUser_id())), HttpStatus.OK);


    }

    @PostMapping("/upload")
    public ResponseEntity<List<Photo>> photoUpload(@RequestPart MultipartFile file, @RequestHeader(value="Authorization") String token) throws IOException {
        token = token.split(" ")[1];

        JWTInfo tokenInfo = jwtService.verifyToken(token);

        System.out.println(tokenInfo.isVerified());

        if(!tokenInfo.isVerified()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }




        /*for(byte b : fileBytes) {
            System.out.print(b);
        }*/

        Photo photo = new Photo();

        photo.setUserId(Long.parseLong(tokenInfo.getUser_id()));
        photo.setFileName(file.getName());
        photo.setSize(file.getSize());
        photo.setContentType(file.getContentType());
        photo.setFileData(file.getBytes());



        photoService.uploadPhoto(photo);

        //photoService.getAllPhotosByUser(Long.parseLong(tokenInfo.getUser_id()));

        ResponseEntity<List<Photo>> response = new ResponseEntity<List<Photo>>(photoService.getAllPhotosByUserId(Long.parseLong(tokenInfo.getUser_id())), HttpStatus.OK);

        return response;

    }
}
