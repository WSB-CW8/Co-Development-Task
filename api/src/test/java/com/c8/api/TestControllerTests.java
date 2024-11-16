package com.c8.api;

import com.c8.api.controllers.TestController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TestController.class)
public class TestControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetTestEndpoint() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk());
    }
}
