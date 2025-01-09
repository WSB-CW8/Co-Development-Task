package com.c8.api.services;

import com.c8.api.models.BusLocation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for filtering bus locations by distance.
 *
 * This service provides functionality to filter bus locations based on a given maximum
 * distance from a specified latitude and longitude. It calculates the distance between
 * the given coordinates and each bus's location using the Haversine formula.
 */
@Service
public class MaxDistanceFiltrationService {

    /** Earth's radius in kilometers used for distance calculation. */
    private static final double EARTH_RADIUS = 6371;

    /**
     * Filters a list of bus locations by distance from a specified point.
     *
     * @param locations The list of {@link BusLocation} objects to be filtered.
     * @param lat The latitude of the point to calculate distance from.
     * @param lon The longitude of the point to calculate distance from.
     * @param maxDistance The maximum allowed distance in meters.
     * @return A list of {@link BusLocation} objects that are within the specified distance.
     */
    public List<BusLocation> filterByDistance(List<BusLocation> locations, double lat, double lon, int maxDistance) {
        return locations.stream()
                // Filter the locations based on whether their distance from the given coordinates is less than or equal to maxDistance
                .filter(location -> calculateDistance(lat, lon, location.getLat(), location.getLon()) <= maxDistance)
                .collect(Collectors.toList()); // Collect the filtered results into a list
    }

    /**
     * Calculates the distance between two geographic coordinates using the Haversine formula.
     *
     * @param lat1 Latitude of the first point.
     * @param lon1 Longitude of the first point.
     * @param lat2 Latitude of the second point.
     * @param lon2 Longitude of the second point.
     * @return The distance between the two points in meters.
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        // Haversine formula for calculating distance between two points on the Earth's surface
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Return the distance in meters
        return EARTH_RADIUS * c * 1000;
    }
}
