package org.viqueen.devbox.services;

import com.atlassian.confluence.api.model.content.id.ContentId;
import com.atlassian.confluence.api.model.link.Link;
import com.atlassian.confluence.api.model.link.LinkType;
import com.atlassian.confluence.api.service.content.ContentService;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SampleContentService {

    private final ContentService contentService;

    public SampleContentService(@ComponentImport ContentService contentService) {
        this.contentService = contentService;
    }

    public Optional<Link> getWebUILink(long id) {
        return contentService.find()
                .withId(ContentId.of(id))
                .fetch()
                .map(content -> content.getLinks().get(LinkType.WEB_UI));
    }

}
