package org.viqueen.devbox.confluence.rest;

import com.atlassian.sal.api.permission.PermissionEnforcer;
import com.google.common.collect.ImmutableMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.viqueen.devbox.confluence.services.SampleCommunityService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.lang.management.ManagementFactory;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;

@Path("/health")
public class HealthCheckResource {

    private static final Logger log = LoggerFactory.getLogger(HealthCheckResource.class);
    private final SampleCommunityService communityService;
    private final PermissionEnforcer permissionEnforcer;

    public HealthCheckResource(
            final SampleCommunityService communityService,
            final PermissionEnforcer permissionEnforcer
    ) {
        this.communityService = communityService;
        this.permissionEnforcer = permissionEnforcer;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/ping")
    public Response ping() {
        permissionEnforcer.enforceSystemAdmin();
        log.info("** health / ping");
        return Response.ok(
                singletonMap(
                        "components",
                        singletonList(
                                communityService.toString()
                        )
                )
        ).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/pid")
    public Response pid() {
        permissionEnforcer.enforceSystemAdmin();
        String name = ManagementFactory.getRuntimeMXBean().getName();
        return Response.ok(singletonMap(
                "pid", name.split("@")[0]
        )).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/report")
    public Response report() {
        permissionEnforcer.enforceSystemAdmin();
        Runtime instance = Runtime.getRuntime();
        long mB = 1024L * 1024L;
        return Response.ok(singletonMap(
                "memoryStats", ImmutableMap.of(
                        "totalMemory", instance.totalMemory() / mB,
                        "freeMemory", instance.freeMemory() / mB,
                        "maxMemory", instance.maxMemory() / mB
                )
        )).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/sysprop/{key}")
    public Response sysProp(@PathParam("key") String key) {
        permissionEnforcer.enforceSystemAdmin();
        String value = System.getProperty(key, "devbox-null");
        return Response.ok(
                singletonMap(key, value)
        ).build();
    }
}
