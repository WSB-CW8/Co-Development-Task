package com.c8.api;

import com.c8.api.models.IncomingData;
import com.c8.api.services.DataRetrievalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest(properties = {"spring.profiles.active=local"})
class ApiApplicationTests {

	@MockBean
	private RestTemplate restTemplate;

	@Autowired
	private DataRetrievalService dataRetrievalService;

	@Test
	void contextLoads() {
		String apiKey = "YourApiKeysGoesHereOnLocalOverrideFile";
		String mockResponse = "{\"result\":[]}";
		String mockUrl = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=" + apiKey + "&type=1";

		when(restTemplate.getForEntity(mockUrl, String.class))
				.thenReturn(ResponseEntity.ok(mockResponse));

		IncomingData data = dataRetrievalService.fetchData();

		assertNotNull(data, "Data should not be null");
		System.out.println("Fetched data: " + data.getResult());
	}

}
