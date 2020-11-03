package org.viqueen.devbox.confluence.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.function.Function;

public class Streams {

    private static final Logger LOG = LoggerFactory.getLogger(Streams.class);

    public static <TYPE, RETURN> Function<TYPE, RETURN> toValueOrNull(CheckedExceptionFunction<TYPE, RETURN> function) {
        return item -> {
            try {
                return function.apply(item);
            } catch (Exception exception) {
                LOG.error(exception.getMessage(), exception);
                return null;
            }
        };
    }

    @FunctionalInterface
    public interface CheckedExceptionFunction<TYPE, RETURN> {
        RETURN apply(TYPE item) throws Exception;
    }

}
