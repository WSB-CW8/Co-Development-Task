package com.c8.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration class for setting up CORS (Cross-Origin Resource Sharing) in the application.
 * This class implements {@link WebMvcConfigurer} to customize web-related configurations.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS mappings to allow cross-origin requests from any origin.
     *
     * The configuration allows:
     * - Any origin pattern (`allowedOriginPatterns("*")`)
     * - Only GET methods (`allowedMethods("GET")`)
     * - Any headers (`allowedHeaders("*")`)
     * - Credentials to be included in the request (`allowCredentials(true)`)
     *
     * **Note:**
     * This is a permissive CORS configuration intended for local development purposes.
     * In production, it is recommended to restrict allowed origins to known domains.
     *
     * @param registry The {@link CorsRegistry} to which CORS mappings are added.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // Allows requests from any origin pattern
                .allowedMethods("GET")      // Restricts allowed methods to GET
                .allowedHeaders("*")        // Allows any headers in requests
                .allowCredentials(true);    // Allows credentials (cookies, authorization headers, etc.)
    }
}
