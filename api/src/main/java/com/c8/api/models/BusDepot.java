package com.c8.api.models;

public class BusDepot {
    private String name;
    private double northLat;
    private double southLat;
    private double westLon;
    private double eastLon;

    public BusDepot(String name, double northLat, double southLat, double westLon, double eastLon){
        this.name = name;
        this.northLat = northLat;
        this.southLat = southLat;
        this.westLon = westLon;
        this.eastLon = eastLon;
    }

    public String getName() {
        return name;
    }

    public double getNorthLat() {
        return northLat;
    }

    public double getSouthLat() {
        return southLat;
    }

    public double getWestLon() {
        return westLon;
    }

    public double getEastLon() {
        return eastLon;
    }
}
