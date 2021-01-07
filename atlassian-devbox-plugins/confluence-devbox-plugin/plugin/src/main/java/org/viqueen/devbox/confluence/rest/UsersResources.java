package org.viqueen.devbox.confluence.rest;

import com.atlassian.confluence.user.UserAccessor;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.user.UserKey;
import com.atlassian.user.Entity;
import com.atlassian.user.User;
import com.atlassian.user.search.page.Pager;
import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toMap;

@Path("/users")
public class UsersResources {

    private final UserAccessor userAccessor;

    @Autowired
    public UsersResources(
            @ComponentImport final UserAccessor userAccessor
    ) {
        this.userAccessor = userAccessor;
    }

    @GET
    @Path("/initials")
    public Response getInitials(
            @QueryParam("count") @DefaultValue("0") final int count
    ) {
        final Pager<User> users = userAccessor.getUsers();
        final Map<String, Object> initials = users.getCurrentPage()
                .stream()
                .limit(count == 0 ? Long.MAX_VALUE : count)
                .map(user -> userAccessor.getUserByName(user.getName()))
                .collect(toMap(
                        Entity::getName,
                        u -> {
                            UserKey key = u.getKey();
                            String fullName = u.getFullName();
                            String[] userInitials = stream(fullName.split(" "))
                                    .map(name -> String.valueOf(name.charAt(0)))
                                    .toArray(String[]::new);

                            return ImmutableMap.of(
                                    "key", key.getStringValue(),
                                    "initials", String.join("", userInitials)
                            );
                        }
                ));
        return Response.ok(initials).build();
    }

}
