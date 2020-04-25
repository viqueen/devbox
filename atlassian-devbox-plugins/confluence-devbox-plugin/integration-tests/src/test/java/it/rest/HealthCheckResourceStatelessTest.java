package it.rest;

import com.atlassian.confluence.test.rest.api.ConfluenceRestClient;
import com.atlassian.confluence.test.stateless.ConfluenceStatelessRestTestRunner;
import com.atlassian.confluence.test.stateless.fixtures.Fixture;
import com.atlassian.confluence.test.stateless.fixtures.UserFixture;
import com.sun.jersey.api.client.ClientResponse;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import static com.atlassian.confluence.test.stateless.fixtures.UserFixture.userFixture;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@RunWith(ConfluenceStatelessRestTestRunner.class)
public class HealthCheckResourceStatelessTest {

    @Inject
    private static ConfluenceRestClient restClient;

    @Fixture
    private static UserFixture user = userFixture().build();

    @Test
    public void testPing() {
        ClientResponse response = restClient.createSession(user.get())
                .resource("/rest/devbox/latest/ping")
                .get(ClientResponse.class);

        assertThat(response.getStatus(), is(Response.Status.OK.getStatusCode()));
    }
}
