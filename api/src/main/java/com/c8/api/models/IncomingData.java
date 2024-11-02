package com.c8.api.models;

import java.util.List;

public class IncomingData {
    private List<BusLocation> result;

    public List<BusLocation> getResult() {
        return result;
    }

    public IncomingData setResult(List<BusLocation> result) {
        this.result = result;
        return this;
    }
}
