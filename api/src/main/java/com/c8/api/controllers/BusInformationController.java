package com.c8.api.controllers;

import com.c8.api.models.BusLocation;
import com.c8.api.models.IncomingData;
import com.c8.api.services.DataRetrievalService;
import com.c8.api.services.DepotFiltrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/buses")
public class BusInformationController {

    @Autowired
    private DataRetrievalService dataRetrievalService;

    @Autowired
    private DepotFiltrationService depotFiltrationService;

    @GetMapping
    public ResponseEntity<IncomingData> HelloWorld() {
        List<BusLocation> busLocations = depotFiltrationService.removeDepotedBuses(dataRetrievalService.fetchData().getResult());
        return ResponseEntity.ok(new IncomingData().setResult(busLocations));
    }

}
