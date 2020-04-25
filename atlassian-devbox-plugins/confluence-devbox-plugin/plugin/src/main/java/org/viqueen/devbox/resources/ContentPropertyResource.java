package org.viqueen.devbox.resources;

import com.atlassian.confluence.api.model.JsonString;
import com.atlassian.confluence.api.model.content.Content;
import com.atlassian.confluence.api.model.content.JsonContentProperty;
import com.atlassian.confluence.api.model.content.id.ContentId;
import com.atlassian.confluence.api.service.content.ContentPropertyService;
import com.atlassian.confluence.api.service.exceptions.ServiceException;
import com.atlassian.confluence.user.AuthenticatedUserThreadLocal;
import com.atlassian.confluence.user.ConfluenceUser;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static com.atlassian.confluence.api.model.validation.ServiceExceptionSupplier.notFound;

// https://community.developer.atlassian.com/t/contentpropertyservice-is-null-in-thread/37300
@Path("/content-property")
public class ContentPropertyResource {

    private final ContentPropertyService contentPropertyService;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @Autowired
    public ContentPropertyResource(@ComponentImport ContentPropertyService contentPropertyService) {
        this.contentPropertyService = contentPropertyService;
    }

    @GET
    @Path("/{id}/docid")
    public Response getDocId(@PathParam("id") long contentId) throws ServiceException {
        return contentPropertyService.find()
                    .withContentId(ContentId.of(contentId))
                    .withPropertyKey("docid")
                    .fetch()
                    .map(property -> Response.ok(property).build())
                    .orElseThrow(notFound("not found for content : " + contentId));
    }

    @GET
    @Path("/thread/{id}/docid")
    public Response threadGetDocId(@PathParam("id") long contentId) throws ServiceException {
        Future<Response> responseFuture = executor.submit(() -> getDocId(contentId));
        try {
            return responseFuture.get();
        } catch (InterruptedException | ExecutionException exception) {
            return Response.
                    status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(exception.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/auth-thread/{id}/docid")
    public Response authThreadGetDocId(@PathParam("id") long contentId) {
        ConfluenceUser currentUser = AuthenticatedUserThreadLocal.get();
        Future<Response> responseFuture = executor.submit(() -> {
            AuthenticatedUserThreadLocal.set(currentUser);
            Response response = getDocId(contentId);
            AuthenticatedUserThreadLocal.reset();
            return response;
        });

        try {
            return responseFuture.get();
        } catch (InterruptedException | ExecutionException exception) {
            return Response.
                    status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(exception.getMessage())
                    .build();
        }
    }

    @POST
    @Path("/{id}/docid")
    public Response setDocId(@PathParam("id") long contentId) {
        JsonContentProperty property = contentPropertyService.create(
                JsonContentProperty.builder()
                        .content(Content.builder().id(ContentId.of(contentId)).build())
                        .key("docid")
                        .value(new JsonString("docid-" + contentId))
                        .build()
        );
        return Response.status(Response.Status.CREATED).entity(property).build();
    }

}
