package com.krishnasaik.photocloud.services;

import com.krishnasaik.photocloud.models.Photo;
import org.springframework.stereotype.Service;

import java.util.List;


public interface PhotoService {
    void uploadPhoto(Photo photo);

    List<Photo> getAllPhotosByUserId(long userId);
}
