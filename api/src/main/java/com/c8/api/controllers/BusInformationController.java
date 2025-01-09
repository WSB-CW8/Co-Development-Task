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

/**
 * REST controller for retrieving information about bus locations.
 *
 * This controller handles requests for fetching bus data, filtering depoted buses,
 * and optionally filtering buses by maximum distance from a given point.
 */
@RestController
@RequestMapping("/buses")
public class BusInformationController {

    /** Service for retrieving bus data from an external source. */
    @Autowired
    private DataRetrievalService dataRetrievalService;

    /** Service for filtering out depoted buses from the data. */
    @Autowired
    private DepotFiltrationService depotFiltrationService;

    /** Service for filtering buses by maximum distance from a specified point. */
    @Autowired
    private MaxDistanceFiltrationService maxDistanceFiltrationService;

    /**
     * Retrieves bus locations, optionally filtered by maximum distance from a given point.
     *
     * This endpoint returns a list of bus locations after filtering out depoted buses.
     * If the `maxDistance`, `lat`, and `lon` parameters are provided, the list is further filtered
     * by the specified maximum distance from the given latitude and longitude.
     *
     * **Request Parameters:**
     * - `maxDistance` (Optional): Maximum distance from the given point.
     * - `lat` (Optional): Latitude of the point for distance filtering.
     * - `lon` (Optional): Longitude of the point for distance filtering.
     *
     * **Responses:**
     * - `200 OK`: Returns a list of filtered bus locations.
     * - `400 Bad Request`: Returns if `maxDistance` is provided without `lat` or `lon`.
     *
     * @param maxDistance Optional maximum distance from the specified point.
     * @param lat Optional latitude for filtering by distance.
     * @param lon Optional longitude for filtering by distance.
     * @return A {@link ResponseEntity} containing the filtered list of bus locations or a bad request response.
     */
    @GetMapping
    public ResponseEntity<IncomingData> getBusLocation(
            @RequestParam(required = false) Optional<Integer> maxDistance,
            @RequestParam(required = false) Optional<Double> lat,
            @RequestParam(required = false) Optional<Double> lon) {

        // Fetch and filter bus data by removing depoted buses
        List<BusLocation> busLocations = depotFiltrationService
                .removeDepotedBuses(dataRetrievalService.fetchData().getResult());

        // Return all buses if maxDistance is not provided
        if (maxDistance.isEmpty()) {
            return ResponseEntity.ok(new IncomingData().setResult(busLocations));
        }

        // Filter buses by distance if maxDistance, lat, and lon are provided
        else if (lat.isPresent() && lon.isPresent()) {
            List<BusLocation> filteredLocations = maxDistanceFiltrationService.filterByDistance(
                    busLocations, lat.get(), lon.get(), maxDistance.get());
            return ResponseEntity.ok(new IncomingData().setResult(filteredLocations));
        }

        // Return bad request if maxDistance is provided without lat or lon
        return ResponseEntity.badRequest().build();
    }
}

