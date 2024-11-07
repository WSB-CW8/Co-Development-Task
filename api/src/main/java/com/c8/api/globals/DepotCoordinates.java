package com.c8.api.globals;

import com.c8.api.models.BusDepot;

import java.util.ArrayList;
import java.util.List;

public class DepotCoordinates {
    private List<BusDepot> depots = new ArrayList<BusDepot>();
    public DepotCoordinates(){
        depots.add(new BusDepot("Ostrobramska", 52.235241, 52.232805, 21.113718, 21.118523));
    }

    public List<BusDepot> getDepots() {
        return depots;
    }
}
