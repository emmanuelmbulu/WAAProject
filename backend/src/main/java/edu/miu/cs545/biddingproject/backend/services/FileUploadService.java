package edu.miu.cs545.biddingproject.backend.services;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;

@Service
public interface FileUploadService {
    public String saveFile(MultipartFile file) throws IOException;
    public Resource fetchFileAsResource(String fileName) throws FileNotFoundException;
    public Path getUploadPath();
}
