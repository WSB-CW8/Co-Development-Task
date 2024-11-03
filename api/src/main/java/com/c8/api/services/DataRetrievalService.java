package com.c8.api.services;

import org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration;
import com.c8.api.models.IncomingData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DataRetrievalService {

    private final RestTemplate restTemplate;
    // TODO: move outside
    final String API_KEY = "&apikey=dd856223-f8b7-49da-ba3f-6d9aef10eade";

    @Autowired
    public DataRetrievalService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    @Scheduled(fixedRate = 10000)
    public IncomingData fetchData(){
        String url = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&type=1" + API_KEY;

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String jsonResponse = response.getBody();

            // Parse or use the data as needed
            System.out.println(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
