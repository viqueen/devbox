package org.viqueen.devbox.confluence.rest;

import com.atlassian.mail.MailException;
import com.atlassian.mail.server.MailServerManager;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.permission.PermissionEnforcer;
import org.viqueen.devbox.confluence.util.Streams;

import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Objects;

@Path("/mail/servers")
public class MailServersResource {

    private final MailServerManager mailServerManager;
    private final PermissionEnforcer permissionEnforcer;

    public MailServersResource(
            @ComponentImport final MailServerManager mailServerManager,
            @ComponentImport PermissionEnforcer permissionEnforcer
    ) {
        this.mailServerManager = mailServerManager;
        this.permissionEnforcer = permissionEnforcer;
    }

    @DELETE
    @Path("/")
    public Response deleteAll() throws MailException {
        permissionEnforcer.enforceSystemAdmin();
        mailServerManager.getServerNames()
                .stream()
                .map(Streams.toValueOrNull(mailServerManager::getMailServer))
                .filter(Objects::nonNull)
                .forEach(server -> {
                    try {
                        mailServerManager.delete(server.getId());
                    } catch (MailException exception) {
                        throw new RuntimeException(exception);
                    }
                });
        return Response.noContent().build();
    }


}
