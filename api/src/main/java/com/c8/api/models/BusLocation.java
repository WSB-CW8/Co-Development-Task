package com.c8.api.models;

/**
 * Represents the current location and status of a bus.
 *
 * A bus location includes details such as the bus line, vehicle number, brigade,
 * latitude, longitude, and the timestamp of the location report.
 */
public class BusLocation {

    /** The bus line number. */
    private String lines;

    /** The unique vehicle number of the bus. */
    private String vehiclenumber;

    /** The brigade (shift or crew) number of the bus. */
    private String brigade;

    /** The longitude of the bus location. */
    private double lon;

    /** The latitude of the bus location. */
    private double lat;

    /** The timestamp indicating when the bus location was recorded. */
    private String time;

    /**
     * Returns the bus line number.
     *
     * @return A {@link String} representing the bus line number.
     */
    public String getLines() {
        return lines;
    }

    /**
     * Sets the bus line number.
     *
     * @param lines A {@link String} representing the bus line number.
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setLines(String lines) {
        this.lines = lines;
        return this;
    }

    /**
     * Returns the vehicle number of the bus.
     *
     * @return A {@link String} representing the vehicle number.
     */
    public String getVehiclenumber() {
        return vehiclenumber;
    }

    /**
     * Sets the vehicle number of the bus.
     *
     * @param vehiclenumber A {@link String} representing the vehicle number.
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setVehiclenumber(String vehiclenumber) {
        this.vehiclenumber = vehiclenumber;
        return this;
    }

    /**
     * Returns the brigade number of the bus.
     *
     * @return A {@link String} representing the brigade number.
     */
    public String getBrigade() {
        return brigade;
    }

    /**
     * Sets the brigade number of the bus.
     *
     * @param brigade A {@link String} representing the brigade number.
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setBrigade(String brigade) {
        this.brigade = brigade;
        return this;
    }

    /**
     * Returns the longitude of the bus location.
     *
     * @return A {@link double} representing the longitude of the bus location.
     */
    public double getLon() {
        return lon;
    }

    /**
     * Sets the longitude of the bus location.
     *
     * @param lon A {@link double} representing the longitude of the bus location.
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setLon(double lon) {
        this.lon = lon;
        return this;
    }

    /**
     * Returns the latitude of the bus location.
     *
     * @return A {@link double} representing the latitude of the bus location.
     */
    public double getLat() {
        return lat;
    }

    /**
     * Sets the latitude of the bus location.
     *
     * @param lat A {@link double} representing the latitude of the bus location.
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setLat(double lat) {
        this.lat = lat;
        return this;
    }

    /**
     * Returns the timestamp when the bus location was recorded.
     *
     * @return A {@link String} representing the timestamp in the format "yyyy-MM-dd HH:mm:ss".
     */
    public String getTime() {
        return time;
    }

    /**
     * Sets the timestamp when the bus location was recorded.
     *
     * @param time A {@link String} representing the timestamp in the format "yyyy-MM-dd HH:mm:ss".
     * @return The current instance of {@link BusLocation}.
     */
    public BusLocation setTime(String time) {
        this.time = time;
        return this;
    }
}
