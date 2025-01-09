package com.c8.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple REST controller for testing purposes.
 *
 * This controller provides a basic "Hello World" endpoint
 * to verify that the application is running correctly.
 */
@RestController
@RequestMapping("/test")
public class TestController {

    /**
     * Returns a simple "Hello World!" message.
     *
     * **Endpoint:**
     * `GET /test`
     *
     * **Response:**
     * Returns the string "Hello World!" with a `200 OK` status.
     *
     * @return A {@link String} containing "Hello World!".
     */
    @GetMapping
    public String HelloWorld() {
        return "Hello World!";
    }
}