package com.c8.api.services;

import com.c8.api.globals.DepotCoordinates;
import com.c8.api.models.BusDepot;
import com.c8.api.models.BusLocation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for filtering out buses located within depots.
 *
 * This service checks whether a bus is located inside any of the predefined depots
 * and provides a method to filter out buses that are inside depots from a list of bus locations.
 */
@Service
public class DepotFiltrationService {

    /** The {@link DepotCoordinates} object that holds the coordinates of the depots. */
    private final DepotCoordinates depotCoordinates = new DepotCoordinates();

    /**
     * Checks if the provided bus is located within any depot's coordinates.
     *
     * @param bus The {@link BusLocation} object representing the bus to be checked.
     * @return {@code true} if the bus is inside a depot, {@code false} otherwise.
     */
    public boolean isBusInDepot(BusLocation bus){
        // Loop through each depot to check if the bus's location is within the depot's area
        for (BusDepot depot : depotCoordinates.getDepots()){
            if ((depot.getNorthLat() > bus.getLat()) && (depot.getSouthLat() < bus.getLat())){
                if ((depot.getWestLon() < bus.getLon()) && (depot.getEastLon() > bus.getLon())){
                    return true; // Bus is inside the depot
                }
            }
        }
        return false; // Bus is not inside any depot
    }

    /**
     * Filters out buses that are located within depots from a list of bus locations.
     *
     * This method removes buses that are inside any depot's area from the provided list.
     *
     * @param locations A list of {@link BusLocation} objects representing the buses.
     * @return A list of {@link BusLocation} objects that are not located in any depot.
     */
    public List<BusLocation> removeDepotedBuses(List<BusLocation> locations){
        System.out.println(locations.size()); // Print the size of the original list
        List<BusLocation> filtered = new ArrayList<>();
        // Iterate over the locations and add the ones outside depots to the filtered list
        for (BusLocation location : locations) {
            if (!isBusInDepot(location)) {
                filtered.add(location);
            }
        }
        System.out.println(filtered.size()); // Print the size of the filtered list
        return filtered;
    }
}
