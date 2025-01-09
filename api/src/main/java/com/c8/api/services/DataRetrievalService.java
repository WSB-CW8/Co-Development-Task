package com.c8.api.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.c8.api.models.IncomingData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Locale;
import java.util.Objects;

/**
 * Service for retrieving bus and tram data from an external API.
 *
 * This service fetches real-time data about buses and trams in Warsaw, Poland,
 * from the specified public API endpoint. The data is returned as a parsed
 * {@link IncomingData} object.
 */
@Service
public class DataRetrievalService {

    /** The {@link RestTemplate} used to make HTTP requests. */
    private final RestTemplate restTemplate;

    /**
     * The API key retrieved from the {@code application-local.properties} file.
     * This key is used to authenticate requests to the external API.
     */
    @Value("${api.key}")
    private String apiKey;

    /**
     * The Jackson {@link ObjectMapper} used for JSON parsing.
     */
    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * Constructs a new {@link DataRetrievalService} instance.
     *
     * @param restTemplate The {@link RestTemplate} to be used for making HTTP requests.
     */
    @Autowired
    public DataRetrievalService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Fetches bus and tram data from the external API.
     *
     * Sends a GET request to the external API endpoint to retrieve the latest
     * bus and tram location data. The response is parsed into an {@link IncomingData} object.
     *
     * @return An instance of {@link IncomingData} containing the bus and tram location data, or {@code null} if an error occurs.
     */
    public IncomingData fetchData() {
        String url = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey="
                + apiKey + "&type=1";

        try {
            // Sends the GET request to the API
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // Converts the response body to lowercase and parses it into IncomingData
            String jsonResponse = Objects.requireNonNull(response.getBody()).toLowerCase(Locale.ROOT);

            // Parses the JSON response into an IncomingData object
            return mapper.readValue(jsonResponse, IncomingData.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
