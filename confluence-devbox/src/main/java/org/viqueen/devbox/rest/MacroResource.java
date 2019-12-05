package org.viqueen.devbox.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.viqueen.devbox.macro.SampleMacroMigration;

import javax.annotation.Generated;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/macros")
public class MacroResource {

    private final SampleMacroMigration macroMigration;

    @Autowired
    public MacroResource(SampleMacroMigration macroMigration) {
        this.macroMigration = macroMigration;
    }

    @GET
    public Response get() {
        return Response.ok(
                macroMigration.toString() +
                        " " +
                        macroMigration.getXhtmlMacroManager().toString() +
                        " " +
                        macroMigration.stuff()
                ).build();
    }
}
