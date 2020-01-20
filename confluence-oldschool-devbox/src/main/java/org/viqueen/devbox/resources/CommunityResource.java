package org.viqueen.devbox.resources;

import com.atlassian.sal.api.rdbms.TransactionalExecutorFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/community")
public class CommunityResource {

    private final TransactionalExecutorFactory transactionalExecutorFactory;

    public CommunityResource(TransactionalExecutorFactory transactionalExecutorFactory) {
        this.transactionalExecutorFactory = transactionalExecutorFactory;
    }

    @GET
    @Path("/build-number")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buildNumber() {
        List<Integer> buildNumber = transactionalExecutorFactory.createReadOnly()
                .execute(connection -> {
                    SingleConnectionDataSource dataSource = new SingleConnectionDataSource(connection, true);
                    return new JdbcTemplate(dataSource)
                            .query("select BUILDNUMBER from CONFVERSION order by LASTMODDATE DESC LIMIT 1",
                                    (resultSet, rowNum) -> resultSet.getInt("BUILDNUMBER"));
                });
        if (buildNumber.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(buildNumber.get(0)).build();
    }
}
