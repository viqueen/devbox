package org.viqueen.devbox.resources;

import org.viqueen.devbox.community.DEVHELP4065;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/community")
public class CommunityResource {

    private final DEVHELP4065 devhelp4065;

    public CommunityResource(DEVHELP4065 devhelp4065) {
        this.devhelp4065 = devhelp4065;
    }

    @Path("/devhelp4065")
    @GET
    public Response devhelp4065() {
        return Response.ok(
                devhelp4065.getDatasource().toString()
        ).build();
    }
}
