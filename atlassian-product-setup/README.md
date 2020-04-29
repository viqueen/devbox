## Atlassian Product Setup

This allows for configuring external database in place of H2

### postgres

* start postgres
```bash
docker-compose up
```

* start confluence
```bash
atlas-run -P postgres -Datlassian.product=confluence -Datlassian.product.version=7.4.0
```

