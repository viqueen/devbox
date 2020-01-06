package org.viqueen.devbox.resources;

import com.atlassian.annotations.security.XsrfProtectionExcluded;
import com.atlassian.confluence.jmx.JmxSMTPMailServer;
import com.atlassian.confluence.setup.settings.SettingsManager;
import com.atlassian.confluence.user.ConfluenceUser;
import com.atlassian.confluence.user.UserAccessor;
import com.atlassian.mail.MailConstants;
import com.atlassian.mail.MailException;
import com.atlassian.mail.server.MailServerManager;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.user.impl.DefaultUser;
import com.atlassian.user.security.password.Credential;
import com.github.javafaker.Faker;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.IntStream;

import static java.lang.String.format;

@Path("/setup")
public class SetupResource {

    private final MailServerManager mailServerManager;
    private final UserAccessor userAccessor;
    private final SettingsManager settingsManager;

    public SetupResource(
            @ComponentImport MailServerManager mailServerManager,
            @ComponentImport UserAccessor userAccessor,
            @ComponentImport SettingsManager settingsManager) {
        this.mailServerManager = mailServerManager;
        this.userAccessor = userAccessor;
        this.settingsManager = settingsManager;
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

    @POST
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    @XsrfProtectionExcluded
    public Response createUsers(@DefaultValue("1") @QueryParam("start") final int start,
                                @DefaultValue("20") @QueryParam("count") final int count) {

        final Map<String, Map<String, String>> users = new HashMap<>();

        IntStream.rangeClosed(start, count)
                .forEach(index -> {
                    final Faker faker = LOCALES[index % 23];
                    final String firstName = faker.name().firstName();
                    final String lastName = faker.name().lastName();
                    final String email = faker.internet().emailAddress();
                    final String userName = format("user-%d", index);

                    final DefaultUser defaultUser = new DefaultUser();
                    defaultUser.setFullName(format("%s %s", firstName, lastName));
                    defaultUser.setEmail(email);
                    defaultUser.setName(userName);

                    final ConfluenceUser confluenceUser = userAccessor.createUser(defaultUser, Credential.unencrypted("user"));

                    userAccessor.addMembership(settingsManager.getGlobalSettings().getDefaultUsersGroup(), userName);

                    final Map<String, String> user = new HashMap<>();
                    user.put("key", confluenceUser.getKey().getStringValue());
                    user.put("initials", format("%s%s", firstName.charAt(0), lastName.charAt(0)));

                    users.put(userName, user);
                });

        return Response.ok(users).build();
    }

    private static final Faker[] LOCALES = new Faker[] {
            Faker.instance(Locale.CANADA),
            Faker.instance(Locale.CANADA_FRENCH),
            Faker.instance(Locale.CHINA),
            Faker.instance(Locale.forLanguageTag("da-DK")),
            Faker.instance(Locale.forLanguageTag("de-AT")),
            Faker.instance(Locale.forLanguageTag("de-CH")),
            Faker.instance(Locale.ENGLISH),
            Faker.instance(Locale.forLanguageTag("es")),
            Faker.instance(Locale.forLanguageTag("es-MX")),
            Faker.instance(Locale.forLanguageTag("fi-FI")),
            Faker.instance(Locale.FRANCE),
            Faker.instance(Locale.GERMANY),
            Faker.instance(Locale.ITALY),
            Faker.instance(Locale.JAPANESE),
            Faker.instance(Locale.KOREA),
            Faker.instance(Locale.forLanguageTag("nb-NO")),
            Faker.instance(Locale.forLanguageTag("nl")),
            Faker.instance(Locale.forLanguageTag("pl")),
            Faker.instance(Locale.forLanguageTag("pt")),
            Faker.instance(Locale.forLanguageTag("ru")),
            Faker.instance(Locale.forLanguageTag("sk")),
            Faker.instance(Locale.forLanguageTag("sv-SE")),
            Faker.instance(Locale.TAIWAN),
            Faker.instance(Locale.UK)
    };
}
