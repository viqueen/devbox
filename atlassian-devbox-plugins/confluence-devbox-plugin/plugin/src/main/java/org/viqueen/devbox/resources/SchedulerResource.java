package org.viqueen.devbox.resources;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.scheduler.core.LifecycleAwareSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import static java.util.Collections.singletonMap;

@Path("/scheduler")
public class SchedulerResource {

    private final LifecycleAwareSchedulerService serviceController;

    @Autowired
    public SchedulerResource(@ComponentImport LifecycleAwareSchedulerService serviceController) {
        this.serviceController = serviceController;
    }

    @GET
    @Path("/status")
    public Response status() {
        return Response.ok(singletonMap("status", serviceController.getState().name())).build();
    }

}
