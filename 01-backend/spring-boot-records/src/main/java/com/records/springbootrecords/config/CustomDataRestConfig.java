package com.records.springbootrecords.config;

import com.records.springbootrecords.entity.Messages;
import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration //for making records carousel read-only, prevent the client from making updates to our entities
public class CustomDataRestConfig implements RepositoryRestConfigurer {

    private String sharedOriginURL = "https://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

        //gather all http request we want to prevent in array
        HttpMethod[] unsupportedRequests = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };

        config.exposeIdsFor(Record.class); // expose all Records.class id entities
        config.exposeIdsFor(Review.class); // expose all Review.class id entities
        config.exposeIdsFor(Messages.class); // expose all Messages.class id entities

        disableHttpRequests(Record.class, config, unsupportedRequests);
        disableHttpRequests(Review.class, config, unsupportedRequests);
        disableHttpRequests(Messages.class, config, unsupportedRequests);

        /* configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(sharedOriginURL);
    }

    private void disableHttpRequests(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedRequests) {

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedRequests))
                .withCollectionExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedRequests));
    }

}

/*
 * make the record entity read-only, disable the option for POST, PUT, DELETE, PATCH http request calls for path /records
 * */
