package com.krishnasaik.photocloud.services;

import com.krishnasaik.photocloud.models.Photo;
import com.krishnasaik.photocloud.repositories.PhotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;

    public PhotoServiceImpl(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }


    public void uploadPhoto(Photo photo) {
        photoRepository.save(photo);
    }

    public List<Photo> getAllPhotosByUserId(long user_id) {
        return photoRepository.findByUserId(user_id);
    }
}
