package org.viqueen.devbox.confluence.rest;

import org.apache.log4j.Level;
import org.apache.log4j.LogManager;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/logging")
public class LoggingResource {

    private static final String ROOT = "root";

    @POST
    @Path("{level:ALL|DEBUG|ERROR|FATAL|INFO|TRACE|WARN}/{name}")
    public Response set(@PathParam("level") String levelName, @PathParam("name") String entry) {
        Level level = Level.toLevel(levelName);
        if (ROOT.equals(entry)) {
            LogManager.getRootLogger().setLevel(level);
        } else {
            LogManager.getLogger(entry).setLevel(level);
        }
        return Response.status(Response.Status.CREATED).build();
    }

}
