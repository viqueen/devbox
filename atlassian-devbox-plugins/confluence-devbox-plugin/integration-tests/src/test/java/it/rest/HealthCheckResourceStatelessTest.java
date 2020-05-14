package it.rest;

import com.atlassian.confluence.test.rest.api.ConfluenceRestClient;
import com.atlassian.confluence.test.stateless.ConfluenceStatelessRestTestRunner;
import com.atlassian.confluence.test.stateless.fixtures.Fixture;
import com.atlassian.confluence.test.stateless.fixtures.UserFixture;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;
import java.util.Map;

import static com.atlassian.confluence.test.stateless.fixtures.UserFixture.userFixture;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasKey;

@RunWith(ConfluenceStatelessRestTestRunner.class)
public class HealthCheckResourceStatelessTest {

    @Inject
    private static ConfluenceRestClient restClient;

    @Fixture
    private static UserFixture user = userFixture().build();

    private static DevboxRestClient devboxRestClient;

    @BeforeClass
    public static void initialise() {
        devboxRestClient = new DevboxRestClient(restClient);
    }

    @Test
    public void testPing() {
        Map<String, String> response = devboxRestClient.createSession(user.get())
                .healthCheck()
                .ping();

        assertThat(response, hasKey("components"));
    }
}
