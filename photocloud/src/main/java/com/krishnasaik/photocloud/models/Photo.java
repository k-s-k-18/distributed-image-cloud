package com.krishnasaik.photocloud.models;

import jakarta.persistence.*;

@Entity
@Table(name="photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long photoId;

    @Column
    private long userId;

    @Column
    private String fileName;

    @Column
    private long size;

    @Column
    private String contentType;

    @Column
    private byte[] fileData;

    //getters
    public long getPhotoId() {
        return photoId;
    }

    public long getUserId() {
        return userId;
    }

    public String getFileName() {
        return fileName;
    }

    public long getSize() {
        return size;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public String getContentType() {
        return contentType;
    }

    //setters
    public void setPhotoId(long photoId) {
        this.photoId = photoId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
