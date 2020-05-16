package org.viqueen.devbox.services;

import com.atlassian.confluence.api.model.content.id.ContentId;
import com.atlassian.confluence.api.model.link.Link;
import com.atlassian.confluence.api.model.link.LinkType;
import com.atlassian.confluence.api.service.content.ContentService;
import com.atlassian.plugin.PluginAccessor;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.ApplicationProperties;
import com.atlassian.sal.api.license.LicenseHandler;
import com.atlassian.sal.api.usersettings.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SampleCommunityService {

    private final ContentService contentService;

    // https://community.developer.atlassian.com/t/accessing-usersettingsservice-from-sal/38313
    private final ApplicationProperties applicationProperties;
    private final PluginAccessor pluginAccessor;
    private final LicenseHandler licenceHandler;
    private final UserSettingsService userSettingsService;

    @Autowired
    public SampleCommunityService(
            @ComponentImport ContentService contentService,
            @ComponentImport ApplicationProperties applicationProperties,
            @ComponentImport PluginAccessor pluginAccessor,
            @ComponentImport LicenseHandler licenceHandler,
            @ComponentImport UserSettingsService userSettingsService) {
        this.contentService = contentService;
        this.applicationProperties = applicationProperties;
        this.pluginAccessor = pluginAccessor;
        this.licenceHandler = licenceHandler;
        this.userSettingsService = userSettingsService;
    }

    // https://community.developer.atlassian.com/t/get-content-link-to-content-by-id-programmatically/34427
    @SuppressWarnings("unused")
    public Optional<Link> getWebUILink(long id) {
        return contentService.find()
                .withId(ContentId.of(id))
                .fetch()
                .map(content -> content.getLinks().get(LinkType.WEB_UI));
    }

    @Override
    public String toString() {
        return "SampleCommunityService{" +
                "contentService=" + contentService +
                ", applicationProperties=" + applicationProperties +
                ", pluginAccessor=" + pluginAccessor +
                ", licenceHandler=" + licenceHandler +
                ", userSettingsService=" + userSettingsService +
                '}';
    }
}
