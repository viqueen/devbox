package it.rest;

import com.atlassian.confluence.test.rpc.api.ConfluenceRpcClient;
import com.atlassian.confluence.test.stateless.ConfluenceStatelessRestTestRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;

@RunWith(ConfluenceStatelessRestTestRunner.class)
public class DevboxPlaygroundStatelessTest {

    @Inject
    private static ConfluenceRpcClient rpcClient;

    @Test
    public void synchroniseUserDirectories() {
        rpcClient.getAdminSession()
                .getFunctestComponent()
                .synchroniseUserDirectories();
    }
}
