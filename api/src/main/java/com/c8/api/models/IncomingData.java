package com.c8.api.models;

import java.util.List;

/**
 * Represents the incoming data containing a list of bus locations.
 */
public class IncomingData {

    /**
     * The list of {@link BusLocation} objects representing the retrieved bus locations.
     */
    private List<BusLocation> result;

    /**
     * Returns the list of bus locations.
     *
     * @return A {@link List} of {@link BusLocation} objects.
     */
    public List<BusLocation> getResult() {
        return result;
    }

    /**
     * Sets the list of bus locations.
     *
     * @param result A {@link List} of {@link BusLocation} objects.
     * @return The current instance of {@link IncomingData}.
     */
    public IncomingData setResult(List<BusLocation> result) {
        this.result = result;
        return this;
    }
}
