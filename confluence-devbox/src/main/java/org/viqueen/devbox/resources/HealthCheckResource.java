package org.viqueen.devbox.resources;

import org.viqueen.devbox.services.SampleContentService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;

@Path("/ping")
public class HealthCheckResource {

    private final SampleContentService sampleContentService;

    public HealthCheckResource(final SampleContentService sampleContentService) {
        this.sampleContentService = sampleContentService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response ping() {
        return Response.ok(
                singletonMap(
                        "components",
                        singletonList(
                                sampleContentService.toString()
                        )
                )
        ).build();
    }

}
