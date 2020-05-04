package org.viqueen.devbox.resources;

import org.viqueen.devbox.services.SampleContentService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.lang.management.ManagementFactory;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;

@Path("/health")
public class HealthCheckResource {

    private final SampleContentService sampleContentService;

    public HealthCheckResource(final SampleContentService sampleContentService) {
        this.sampleContentService = sampleContentService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/ping")
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/pid")
    public Response pid() {
        String name = ManagementFactory.getRuntimeMXBean().getName();
        return Response.ok(singletonMap(
                "pid", name.split("@")[0]
        )).build();
    }
}
