## Atlassian Product Setup

This allows for configuring external database in place of H2

### postgres

* start postgres
```bash
PRODUCT=confluence docker-compose -f postgres.yml up
PRODUCT=jira docker-compose -f postgres.yml up
```

* start confluence
```bash
atlas-run -P postgres -Datlassian.product=confluence -Datlassian.product.version=7.4.0
```

* start jira
```bash
atlas-run -P postgres -Datlassian.product=jira -Datlassian.product.version=8.10.0
```
