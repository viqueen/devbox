package org.viqueen.devbox.confluence.rest;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.scheduler.config.JobRunnerKey;
import com.atlassian.scheduler.core.LifecycleAwareSchedulerService;
import com.atlassian.scheduler.core.RunningJob;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static java.util.stream.Collectors.toSet;
import static org.apache.commons.lang3.StringUtils.isEmpty;

@Path("/scheduler")
public class SchedulerResource {

    private final LifecycleAwareSchedulerService serviceController;

    @Autowired
    public SchedulerResource(@ComponentImport LifecycleAwareSchedulerService serviceController) {
        this.serviceController = serviceController;
    }

    @GET
    @Path("/status")
    @Produces(MediaType.APPLICATION_JSON)
    public Response status(
            @QueryParam("filter") String filter
    ) {
        Collection<RunningJob> locallyRunningJobs = serviceController.getLocallyRunningJobs();
        Set<JobRunnerKey> registeredJobs = serviceController.getRegisteredJobRunnerKeys();
        Set<JobRunnerKey> scheduledJobs = serviceController.getJobRunnerKeysForAllScheduledJobs();
        Map<String, Object> data = new HashMap<>();

        Set<String> registered = registeredJobs.stream()
                .map(JobRunnerKey::toString)
                .filter(key -> isEmpty(filter) || key.contains(filter))
                .collect(toSet());

        Set<String> scheduled = scheduledJobs.stream()
                .map(JobRunnerKey::toString)
                .filter(key -> isEmpty(filter) || key.contains(filter))
                .collect(toSet());

        data.put("status", serviceController.getState().name());
        data.put("running", locallyRunningJobs);
        data.put("registered", registered);
        data.put("scheduled", scheduled);
        return Response.ok(data).build();
    }

}
