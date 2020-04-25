package it.webdriver;

import com.atlassian.confluence.test.stateless.ConfluenceStatelessTestRunner;
import com.atlassian.confluence.test.stateless.fixtures.Fixture;
import com.atlassian.confluence.test.stateless.fixtures.PageFixture;
import com.atlassian.confluence.test.stateless.fixtures.SpaceFixture;
import com.atlassian.confluence.test.stateless.fixtures.UserFixture;
import com.atlassian.confluence.webdriver.pageobjects.ConfluenceTestedProduct;
import com.atlassian.confluence.webdriver.pageobjects.page.content.ViewPage;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;

import static com.atlassian.confluence.test.rpc.api.permissions.SpacePermission.REGULAR_PERMISSIONS;
import static com.atlassian.confluence.test.stateless.fixtures.PageFixture.pageFixture;
import static com.atlassian.confluence.test.stateless.fixtures.SpaceFixture.spaceFixture;
import static com.atlassian.confluence.test.stateless.fixtures.UserFixture.userFixture;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@RunWith(ConfluenceStatelessTestRunner.class)
public class DevboxStatelessTest {

    @Inject
    private static ConfluenceTestedProduct product;

    @Fixture
    private static UserFixture user = userFixture().build();
    @Fixture
    private static SpaceFixture space = spaceFixture()
            .permission(user, REGULAR_PERMISSIONS)
            .build();
    @Fixture
    private static PageFixture page = pageFixture()
            .space(space)
            .author(user)
            .title("Devbox")
            .build();

    @Test
    public void testDevbox() {
        ViewPage viewPage = product.loginAndView(user.get(), page.get());
        assertThat(viewPage.getTitle(), is(page.get().getTitle()));
    }
}
