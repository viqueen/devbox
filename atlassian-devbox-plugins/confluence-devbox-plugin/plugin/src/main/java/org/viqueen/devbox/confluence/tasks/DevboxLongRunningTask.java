package org.viqueen.devbox.confluence.tasks;

import com.atlassian.confluence.util.longrunning.ConfluenceAbstractLongRunningTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DevboxLongRunningTask extends ConfluenceAbstractLongRunningTask {

    private static final Logger LOG = LoggerFactory.getLogger(DevboxLongRunningTask.class);

    private final String name;
    private final Runnable runnable;

    public DevboxLongRunningTask(final String name, final Runnable runnable) {
        this.name = name;
        this.runnable = runnable;
    }


    @Override
    protected void runInternal() {
        try {
            this.runnable.run();
        } catch (Exception exception) {
            LOG.error(exception.getMessage(), exception);
        }
    }

    @Override
    public String getName() {
        return this.name;
    }
}
