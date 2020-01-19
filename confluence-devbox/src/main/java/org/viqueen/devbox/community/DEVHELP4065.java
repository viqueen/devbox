package org.viqueen.devbox.community;

import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DEVHELP4065 {

    public DEVHELP4065() {
    }

    public DataSource getDatasource() {
        return new SingleConnectionDataSource();
    }

}
