package com.c8.api.controllers;

import com.c8.api.models.BusLocation;
import com.c8.api.models.IncomingData;
import com.c8.api.services.DataRetrievalService;
import com.c8.api.services.DepotFiltrationService;
import com.c8.api.services.MaxDistanceFiltrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/buses")
public class BusInformationController {

    @Autowired
    private DataRetrievalService dataRetrievalService;

    @Autowired
    private DepotFiltrationService depotFiltrationService;
    @Autowired
    private MaxDistanceFiltrationService maxDistanceFiltrationService;

    @GetMapping
    public ResponseEntity<IncomingData> getBusLocation(@RequestParam(required = false) Optional<Integer> maxDistance,
            @RequestParam(required = false) Optional<Double> lat,
            @RequestParam(required = false) Optional<Double> lon) {
        List<BusLocation> busLocations = depotFiltrationService
                .removeDepotedBuses(dataRetrievalService.fetchData().getResult());
        if (maxDistance.isEmpty()) {
            return ResponseEntity.ok(new IncomingData().setResult(busLocations));
        } else if (lat.isPresent() && lon.isPresent()) {
            List<BusLocation> filteredLocations = maxDistanceFiltrationService.filterByDistance(busLocations, lat.get(),
                    lon.get(), maxDistance.get());
            return ResponseEntity.ok(new IncomingData().setResult(filteredLocations));
        }
        return ResponseEntity.badRequest().build();
    }
}
