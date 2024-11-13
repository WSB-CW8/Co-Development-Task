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

@Service
public class DataRetrievalService {

    private final RestTemplate restTemplate;

    // ApiKey z application-local.properties
    @Value("${api.key}")
    private String apiKey;

    @Autowired
    public DataRetrievalService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private ObjectMapper mapper = new ObjectMapper();

    // Not scheduling for now
    // @Scheduled(fixedRate = 10000)
    public IncomingData fetchData() {
        String url = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey="
                + apiKey + "&type=1";

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String jsonResponse = Objects.requireNonNull(response.getBody()).toLowerCase(Locale.ROOT);

            // Parse or use the data as needed
            return mapper.readValue(jsonResponse, IncomingData.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
