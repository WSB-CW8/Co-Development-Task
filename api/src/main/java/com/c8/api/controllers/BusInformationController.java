package com.c8.api.controllers;

import com.c8.api.models.IncomingData;
import com.c8.api.services.DataRetrievalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/buses")
public class BusInformationController {

    @Autowired
    private DataRetrievalService dataRetrievalService;

    @GetMapping
    public ResponseEntity<IncomingData> HelloWorld() {
        return ResponseEntity.ok(dataRetrievalService.fetchData());
    }

}
