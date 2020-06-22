package org.viqueen.devbox.resources;

import com.atlassian.annotations.security.XsrfProtectionExcluded;
import com.atlassian.confluence.api.model.content.Space;
import com.atlassian.confluence.api.model.content.SpaceType;
import com.atlassian.confluence.api.model.longtasks.LongTaskSubmission;
import com.atlassian.confluence.api.model.pagination.SimplePageRequest;
import com.atlassian.confluence.api.service.content.SpaceService;
import com.atlassian.confluence.api.service.exceptions.ServiceException;
import com.atlassian.confluence.api.service.watch.WatchService;
import com.atlassian.confluence.user.AuthenticatedUserThreadLocal;
import com.atlassian.confluence.user.ConfluenceUser;
import com.atlassian.confluence.user.UserAccessor;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.user.EntityException;
import com.atlassian.user.User;
import com.atlassian.user.UserManager;
import com.atlassian.user.search.page.Pager;
import com.atlassian.user.search.query.AbstractBooleanQuery;

import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;
import static java.util.stream.Collectors.toList;

@Path("/spaces")
public class SpaceResource {

    private final SpaceService spaceService;
    private final WatchService watchService;
    private final UserAccessor userAccessor;
    private final UserManager userManager;

    public SpaceResource(
            final @ComponentImport SpaceService spaceService,
            final @ComponentImport WatchService watchService,
            final @ComponentImport UserAccessor userAccessor,
            final @ComponentImport UserManager userManager) {
        this.spaceService = spaceService;
        this.watchService = watchService;
        this.userAccessor = userAccessor;
        this.userManager = userManager;
    }

    @GET
    @Path("/ping")
    public Response ping() {
        return Response.ok(
                singletonMap(
                        "components",
                        singletonList(spaceService.toString())
                )
        ).build();
    }

    @GET
    @Path("/personal")
    public Response personal() {
        Optional<Space> space = spaceService.find()
                .withKeys(getSpaceKeyForCurrentUser())
                .withType(SpaceType.PERSONAL)
                .fetch();

        return space.map(Response::ok)
                    .orElse(Response.status(Response.Status.NOT_FOUND))
                    .build();
    }

    private static String getSpaceKeyForCurrentUser() {
        ConfluenceUser confluenceUser = AuthenticatedUserThreadLocal.get();
        return "~" + confluenceUser.getName();
    }

    @POST
    @Path("/{spaceKey}/watchers")
    public Response watchers(@PathParam("spaceKey") final String spaceKey) {
        try {
            Pager<User> users = userManager.getUsers();
            users.getCurrentPage()
                    .stream()
                    .map(user -> userAccessor.getUserByName(user.getName()))
                    .filter(Objects::nonNull)
                    .map(ConfluenceUser::getKey)
                    .forEach(userKey -> watchService.watchSpace(userKey, spaceKey));
            return Response.status(Response.Status.CREATED).build();
        } catch (EntityException exception) {
            throw new ServiceException(exception.getMessage(), exception);
        }
    }

    static class AllUsersQuery extends AbstractBooleanQuery<User> {
        protected AllUsersQuery() {
            super(true);
        }
    }

    @DELETE
    @Produces("application/json")
    @XsrfProtectionExcluded
    public Response deleteAll(
            @QueryParam("start") @DefaultValue("0") final int start,
            @QueryParam("limit") @DefaultValue("100") final int limit) {
        final List<LongTaskSubmission> tasks = spaceService.find()
                .fetchMany(new SimplePageRequest(start, limit))
                .getResults()
                .stream()
                .map(spaceService::delete)
                .collect(toList());
        return Response.status(Response.Status.ACCEPTED).entity(tasks).build();
    }
}
