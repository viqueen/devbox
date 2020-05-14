package it.rest;

import com.atlassian.confluence.test.rest.api.ConfluenceRestSession;
import com.atlassian.confluence.test.rest.api.RestComponent;

import java.util.Map;

public class DevboxRestSession {

    private static final String DEVBOX_RESOURCE_BASE = "/rest/devbox/latest";

    private final ConfluenceRestSession restSession;
    private final HealthCheckRest healthCheckRest;

    public DevboxRestSession(final ConfluenceRestSession restSession) {
        this.restSession = restSession;
        this.healthCheckRest = new HealthCheckRest(restSession);
    }

    // you can still refer to confluence's rest session if needed
    public ConfluenceRestSession confluence() {
        return restSession;
    }

    // define your resources ,
    // this code can arguably be auto generated ...
    // ... yet another thing on my plate/buffet of improvements
    public HealthCheckRest healthCheck() {
        return healthCheckRest;
    }

    public static class HealthCheckRest extends RestComponent {

        private static final String HEALTH_CHECK_RESOURCE = DEVBOX_RESOURCE_BASE + "/health";

        public HealthCheckRest(ConfluenceRestSession session) {
            super(session);
        }

        public Map<String, String> ping() {
            return getResourceProvider().newJsonResource(HEALTH_CHECK_RESOURCE + "/ping")
                    .get(Map.class);
        }
    }
}
