package org.viqueen.devbox.confluence.rest;

import com.atlassian.crowd.embedded.api.CrowdDirectoryService;
import com.atlassian.crowd.embedded.api.Directory;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.ImmutableMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toSet;

@Path("/directory")
public class DirectoryResource {

    private final CrowdDirectoryService directoryService;

    public DirectoryResource(
            @ComponentImport final CrowdDirectoryService directoryService
    ) {
        this.directoryService = directoryService;
    }

    @GET
    @Path("/")
    public Response getStatus() {
        Set<ImmutableMap<Object, Object>> directories = directoryService.findAllDirectories()
                .stream()
                .map(directory -> ImmutableMap.builder()
                        .put("id", directory.getId())
                        .put("name", directory.getName())
                        .put("attributes", directory.getAttributes())
                        .put("encryption_type", directory.getEncryptionType())
                        .put("allowed_operations", directory.getAllowedOperations())
                        .build())
                .collect(toSet());
        return Response.ok(directories).build();
    }
}
