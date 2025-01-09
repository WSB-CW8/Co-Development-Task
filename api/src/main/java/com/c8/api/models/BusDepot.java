package com.c8.api.models;

/**
 * Represents a bus depot with its name and bounding coordinates.
 *
 * A bus depot is defined by its name and its geographical boundaries, specified
 * by the northern and southern latitudes, and the western and eastern longitudes.
 */
public class BusDepot {

    /** Name of the bus depot. */
    private String name;

    /** Northern latitude boundary of the bus depot. */
    private double northLat;

    /** Southern latitude boundary of the bus depot. */
    private double southLat;

    /** Western longitude boundary of the bus depot. */
    private double westLon;

    /** Eastern longitude boundary of the bus depot. */
    private double eastLon;

    /**
     * Constructs a {@link BusDepot} object with specified name and coordinates.
     *
     * @param name The name of the bus depot.
     * @param northLat The northern latitude boundary of the bus depot.
     * @param southLat The southern latitude boundary of the bus depot.
     * @param westLon The western longitude boundary of the bus depot.
     * @param eastLon The eastern longitude boundary of the bus depot.
     */
    public BusDepot(String name, double northLat, double southLat, double westLon, double eastLon) {
        this.name = name;
        this.northLat = northLat;
        this.southLat = southLat;
        this.westLon = westLon;
        this.eastLon = eastLon;
    }

    /**
     * Returns the name of the bus depot.
     *
     * @return A {@link String} representing the name of the bus depot.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the northern latitude boundary of the bus depot.
     *
     * @return A {@link double} representing the northern latitude.
     */
    public double getNorthLat() {
        return northLat;
    }

    /**
     * Returns the southern latitude boundary of the bus depot.
     *
     * @return A {@link double} representing the southern latitude.
     */
    public double getSouthLat() {
        return southLat;
    }

    /**
     * Returns the western longitude boundary of the bus depot.
     *
     * @return A {@link double} representing the western longitude.
     */
    public double getWestLon() {
        return westLon;
    }

    /**
     * Returns the eastern longitude boundary of the bus depot.
     *
     * @return A {@link double} representing the eastern longitude.
     */
    public double getEastLon() {
        return eastLon;
    }
}
