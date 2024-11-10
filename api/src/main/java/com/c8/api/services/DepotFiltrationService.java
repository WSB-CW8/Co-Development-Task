package com.c8.api.services;

import com.c8.api.globals.DepotCoordinates;
import com.c8.api.models.BusDepot;
import com.c8.api.models.BusLocation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepotFiltrationService {
    private final DepotCoordinates depotCoordinates = new DepotCoordinates();

    public boolean isBusInDepot(BusLocation bus){
        for (BusDepot depot : depotCoordinates.getDepots()){
            if ((depot.getNorthLat() > bus.getLat()) && (depot.getSouthLat() < bus.getLat())){
                if ((depot.getWestLon() < bus.getLon()) && (depot.getEastLon() > bus.getLon())){
                    return true;
                }
            }
        }
        return false;
    }

    public List<BusLocation> removeDepotedBuses(List<BusLocation>locations){
        System.out.println(locations.size());
        List<BusLocation> filtered =new ArrayList<>();
        for(BusLocation location: locations) {
            if(!isBusInDepot(location))  {
                filtered.add(location);
            }
        }
        System.out.println(filtered.size());
        return filtered;
    }
}
