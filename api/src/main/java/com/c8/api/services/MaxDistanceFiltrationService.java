package com.c8.api.services;

import com.c8.api.models.BusLocation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaxDistanceFiltrationService {
    private static final double EARTH_RADIUS = 6371; // Promień Ziemi w kilometrach

    public List<BusLocation> filterByDistance(List<BusLocation> locations, double lat, double lon, int maxDistance) {
        return locations.stream()
                .filter(location -> calculateDistance(lat, lon, location.getLat(), location.getLon()) <= maxDistance)
                .collect(Collectors.toList());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c * 1000; // Odległość w metrach
    }
}
