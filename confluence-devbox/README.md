### Confluence Devbox


#### build it

```
cd confluence-devbox
atlas build
```

#### install it

```
confluence start 7.0.5
atlas pi
```

#### setup data

* configure an smtp server
```
confdev post setup smtp-server
maildev
```

* create users
```
confdev post setup users
```

by default you get 20 users created, their usernames are `user-1`, `user-2`, `user-3` ... `user-20`

if you need more users created you can pass in a start param as follow

```
confdev post setup users -q start=30
```

* delete spaces

```
confdev delete spaces
```

