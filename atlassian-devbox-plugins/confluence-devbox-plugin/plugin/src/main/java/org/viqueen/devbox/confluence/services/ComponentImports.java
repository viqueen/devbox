package org.viqueen.devbox.confluence.services;

import com.atlassian.confluence.security.PermissionManager;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;

public class ComponentImports {

    @ComponentImport
    private static PermissionManager permissionManager;

}
