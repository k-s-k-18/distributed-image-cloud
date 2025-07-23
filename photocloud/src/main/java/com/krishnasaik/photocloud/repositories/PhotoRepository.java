package com.krishnasaik.photocloud.repositories;

import com.krishnasaik.photocloud.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findByUserId(Long userId);
}
