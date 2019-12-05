package org.viqueen.devbox.macro;

import com.atlassian.confluence.macro.Macro;
import com.atlassian.confluence.macro.xhtml.MacroManager;
import com.atlassian.confluence.macro.xhtml.RichTextMacroMigration;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.stereotype.Component;

@Component
public class SampleMacroMigration extends RichTextMacroMigration {

    private final MacroManager xhtmlMacroManager;

    public SampleMacroMigration(@ComponentImport MacroManager xhtmlMacroManager) {
        super(xhtmlMacroManager);
        this.xhtmlMacroManager = xhtmlMacroManager;
    }

    public MacroManager getXhtmlMacroManager() {
        return xhtmlMacroManager;
    }

    public String stuff() {
        Macro macro = xhtmlMacroManager.getMacroByName("status");
        return macro != null ? macro.getBodyType().name() : "stuff";
    }
}
