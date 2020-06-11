## Confluence Devbox Plugin


### run it

* using Java 8

```bash
cd plugin
jenv shell 1.8
atlas-run
# in debug mode
atlas-debug
```

* using Java 11

```bash
cd plugin
jenv shell 11.0.5
atlas-run
# in debug mode
atlas-debug
```

### install it on an already existing instance

```
cd plugin
mvn confluence:install -Dhttp.port=8080
```

### use it to setup data

* configure an smtp server
```
confdev post setup smtp-server
maildev
```

* create users
```
confdev post setup users
```

by default you get 20 users created, their userNames are `user 1`, `user-2`, `user 3` ... `user-20`

notice the subtle space in username with an odd number !! this is to emulate the possibility of creating users with "special" characters through LDAP for instance

if you need more users created you can pass in a start param as follow

```
confdev post setup users -q start=30
```

* delete spaces

```
confdev delete spaces
```

