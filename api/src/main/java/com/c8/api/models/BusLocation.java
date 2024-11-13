package com.c8.api.models;

public class BusLocation {
    private String lines;
    private String vehiclenumber;
    private String brigade;
    private double lon;
    private double lat;
    private String time;

    public String getLines() {
        return lines;
    }

    public BusLocation setLines(String lines) {
        this.lines = lines;
        return this;
    }

    public String getVehiclenumber() {
        return vehiclenumber;
    }

    public BusLocation setVehiclenumber(String vehiclenumber) {
        this.vehiclenumber = vehiclenumber;
        return this;
    }

    public String getBrigade() {
        return brigade;
    }

    public BusLocation setBrigade(String brigade) {
        this.brigade = brigade;
        return this;
    }

    public double getLon() {
        return lon;
    }

    public BusLocation setLon(double lon) {
        this.lon = lon;
        return this;
    }

    public double getLat() {
        return lat;
    }

    public BusLocation setLat(double lat) {
        this.lat = lat;
        return this;
    }

    public String getTime() {
        return time;
    }

    public BusLocation setTime(String time) {
        this.time = time;
        return this;
    }
}
// {
// "Lines": "213",
// "Lon": 21.222504,
// "VehicleNumber": "1000",
// "Time": "2024-11-02 15:35:04",
// "Lat": 52.1609538,
// "Brigade": "3"
// }
