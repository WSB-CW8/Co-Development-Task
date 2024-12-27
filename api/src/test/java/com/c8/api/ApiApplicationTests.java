package com.c8.api;

import com.c8.api.controllers.BusInformationController;
import com.c8.api.models.BusLocation;
import com.c8.api.models.IncomingData;
import com.c8.api.services.DataRetrievalService;
import com.c8.api.services.DepotFiltrationService;
import com.c8.api.services.MaxDistanceFiltrationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = BusInformationController.class)
class BusInformationControllerTest {

	@MockBean
	private DataRetrievalService dataRetrievalService;

	@MockBean
	private DepotFiltrationService depotFiltrationService;

	@MockBean
	private MaxDistanceFiltrationService maxDistanceFiltrationService;

	@Autowired
	private MockMvc mockMvc;

	private List<BusLocation> mockBusLocations() {
		return Arrays.asList(
				new BusLocation()
						.setLines("213")
						.setVehiclenumber("1000")
						.setBrigade("3")
						.setLon(21.222504)
						.setLat(52.1609538)
						.setTime("2024-11-02 15:35:04"),
				new BusLocation()
						.setLines("214")
						.setVehiclenumber("1001")
						.setBrigade("2")
						.setLon(21.112504)
						.setLat(52.2609538)
						.setTime("2024-11-02 15:36:04")
		);
	}

	@Test
	void testGetBusLocation_NoMaxDistance_ReturnsAllFilteredBuses() throws Exception {
		List<BusLocation> busLocations = mockBusLocations();
		when(dataRetrievalService.fetchData()).thenReturn(new IncomingData().setResult(busLocations));
		when(depotFiltrationService.removeDepotedBuses(busLocations)).thenReturn(busLocations);

		mockMvc.perform(get("/buses")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.result").isArray())
				.andExpect(jsonPath("$.result.length()").value(2))
				.andExpect(jsonPath("$.result[0].lines").value("213"))
				.andExpect(jsonPath("$.result[0].vehiclenumber").value("1000"))
				.andExpect(jsonPath("$.result[0].time").value("2024-11-02 15:35:04"))
				.andExpect(jsonPath("$.result[1].lines").value("214"))
				.andExpect(jsonPath("$.result[1].vehiclenumber").value("1001"));

		verify(dataRetrievalService, times(1)).fetchData();
		verify(depotFiltrationService, times(1)).removeDepotedBuses(busLocations);
		verifyNoInteractions(maxDistanceFiltrationService);
	}

	@Test
	void testGetBusLocation_WithMaxDistanceAndCoordinates_ReturnsFilteredBuses() throws Exception {
		List<BusLocation> busLocations = mockBusLocations();
		List<BusLocation> filteredLocations = Collections.singletonList(busLocations.get(0));

		when(dataRetrievalService.fetchData()).thenReturn(new IncomingData().setResult(busLocations));
		when(depotFiltrationService.removeDepotedBuses(busLocations)).thenReturn(busLocations);
		when(maxDistanceFiltrationService.filterByDistance(busLocations, 52.1609538, 21.222504, 100))
				.thenReturn(filteredLocations);

		mockMvc.perform(get("/buses")
						.param("maxDistance", "100")
						.param("lat", "52.1609538")
						.param("lon", "21.222504")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.result").isArray())
				.andExpect(jsonPath("$.result.length()").value(1))
				.andExpect(jsonPath("$.result[0].lines").value("213"))
				.andExpect(jsonPath("$.result[0].vehiclenumber").value("1000"))
				.andExpect(jsonPath("$.result[0].time").value("2024-11-02 15:35:04"));

		verify(dataRetrievalService, times(1)).fetchData();
		verify(depotFiltrationService, times(1)).removeDepotedBuses(busLocations);
		verify(maxDistanceFiltrationService, times(1)).filterByDistance(busLocations, 52.1609538, 21.222504, 100);
	}

	@Test
	void testGetBusLocation_MissingCoordinates_ReturnsBadRequest() throws Exception {

		List<BusLocation> busLocations = mockBusLocations();
		when(dataRetrievalService.fetchData()).thenReturn(new IncomingData().setResult(busLocations));
		when(depotFiltrationService.removeDepotedBuses(busLocations)).thenReturn(busLocations);

		mockMvc.perform(get("/buses")
						.param("maxDistance", "100")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		verifyNoInteractions(maxDistanceFiltrationService);
	}
}

