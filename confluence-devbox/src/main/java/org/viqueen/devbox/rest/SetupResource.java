package org.viqueen.devbox.rest;

import com.atlassian.annotations.security.XsrfProtectionExcluded;
import com.atlassian.confluence.jmx.JmxSMTPMailServer;
import com.atlassian.mail.MailConstants;
import com.atlassian.mail.MailException;
import com.atlassian.mail.server.MailServerManager;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/setup")
public class SetupResource {

    private final MailServerManager mailServerManager;

    public SetupResource(@ComponentImport MailServerManager mailServerManager) {
        this.mailServerManager = mailServerManager;
    }

    @POST
    @Path("/smtp-server")
    @Produces(MediaType.APPLICATION_JSON)
    @XsrfProtectionExcluded
    public Response mailServer(@DefaultValue("confluence-devbox") @QueryParam("name") final String name,
                               @DefaultValue("localhost") @QueryParam("hostname") final String hostname,
                               @DefaultValue("1025") @QueryParam("port") final String port,
                               @DefaultValue("noreply@confluence-devbox.org") @QueryParam("from") final String from,
                               @DefaultValue("[local]") @QueryParam("prefix") final String prefix) throws MailException {

        if (mailServerManager.getMailServer(name) != null) {
            return Response.noContent().build();
        }

        final JmxSMTPMailServer smtpMailServer = new JmxSMTPMailServer();
        smtpMailServer.setName(name);
        smtpMailServer.setHostname(hostname);
        smtpMailServer.setPort(port);
        smtpMailServer.setMailProtocol(MailConstants.DEFAULT_SMTP_PROTOCOL);
        smtpMailServer.setDefaultFrom(from);
        smtpMailServer.setPrefix(prefix);
        mailServerManager.create(smtpMailServer);

        return Response.ok(smtpMailServer).build();
    }
}
