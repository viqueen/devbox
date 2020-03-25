package org.viqueen.devbox.macros;

import com.atlassian.confluence.content.render.xhtml.ConversionContext;
import com.atlassian.confluence.macro.CustomHtmlEditorPlaceholder;
import com.atlassian.confluence.macro.Macro;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.soy.renderer.SoyTemplateRenderer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

import static java.util.Collections.singletonMap;

public class SampleMacro implements Macro, CustomHtmlEditorPlaceholder {

    private final SoyTemplateRenderer soyTemplateRenderer;

    @Autowired
    public SampleMacro(@ComponentImport SoyTemplateRenderer soyTemplateRenderer) {
        this.soyTemplateRenderer = soyTemplateRenderer;
    }

    @Override
    public String execute(
            final Map<String, String> parameters,
            final String body,
            final ConversionContext conversionContext) {
        final Map<String, Object> data = singletonMap("content", "Devbox");
        return soyTemplateRenderer.render(
                "org.viqueen.devbox.confluence-devbox:soy-templates",
                "Confluence.Templates.Macros.Devbox.viewMacro",
                data
        );
    }

    @Override
    public String getCustomPlaceholder(
            final Map<String, String> parameters,
            final String body,
            final ConversionContext conversionContext) {
        final Map<String, Object> data = singletonMap("content", "Devbox");
        return soyTemplateRenderer.render(
                "org.viqueen.devbox.confluence-devbox:soy-templates",
                "Confluence.Templates.Macros.Devbox.editMacro",
                data
        );
    }

    @Override
    public BodyType getBodyType() {
        return BodyType.NONE;
    }

    @Override
    public OutputType getOutputType() {
        return OutputType.BLOCK;
    }
}
