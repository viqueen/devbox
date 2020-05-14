package it.rest;

import com.atlassian.confluence.test.api.model.person.UserWithDetails;
import com.atlassian.confluence.test.rest.api.ConfluenceRestClient;

public class DevboxRestClient {

    private final ConfluenceRestClient restClient;

    public DevboxRestClient(final ConfluenceRestClient restClient) {
        this.restClient = restClient;
    }

    public DevboxRestSession createSession(final UserWithDetails user) {
        return new DevboxRestSession(this.restClient.createSession(user));
    }

}
