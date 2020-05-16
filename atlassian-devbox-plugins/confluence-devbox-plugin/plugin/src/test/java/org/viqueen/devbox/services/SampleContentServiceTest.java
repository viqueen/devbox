package org.viqueen.devbox.services;

import com.atlassian.confluence.api.model.content.Content;
import com.atlassian.confluence.api.model.content.id.ContentId;
import com.atlassian.confluence.api.model.link.Link;
import com.atlassian.confluence.api.model.link.LinkType;
import com.atlassian.confluence.api.service.content.ContentService;
import com.atlassian.plugin.PluginAccessor;
import com.atlassian.sal.api.ApplicationProperties;
import com.atlassian.sal.api.license.LicenseHandler;
import com.atlassian.sal.api.usersettings.UserSettingsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static java.util.Collections.singletonMap;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SampleContentServiceTest {

    private static final Link webUILink = new Link(LinkType.WEB_UI, "/web_ui");

    private SampleCommunityService sampleContentService;

    @BeforeEach
    public void setup(
            @Mock final ContentService contentService,
            @Mock final ApplicationProperties applicationProperties,
            @Mock final PluginAccessor pluginAccessor,
            @Mock final LicenseHandler licenceHandler,
            @Mock final UserSettingsService userSettingsService,
            @Mock final ContentService.ContentFinder contentFinder,
            @Mock final Content content) {
        sampleContentService = new SampleCommunityService(
                contentService, applicationProperties, pluginAccessor, licenceHandler, userSettingsService
        );
        when(contentService.find()).thenReturn(contentFinder);
        when(contentFinder.withId(any(ContentId.class))).thenReturn(contentFinder);
        when(contentFinder.fetch()).thenReturn(Optional.of(content));
        when(content.getLinks()).thenReturn(singletonMap(LinkType.WEB_UI, webUILink));
    }

    @Test
    public void test() {
        Optional<Link> link = sampleContentService.getWebUILink(10L);
        assertTrue(link.isPresent());
        assertEquals(SampleContentServiceTest.webUILink, link.get());
    }
}
