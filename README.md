# ICMP-rai

simple web app that use icmp protocol to check some devices if there are up or not

## development

Build:

```bash
docker-compose -f .\docker-compose.debug.yml build
```

Run

```bash
docker-compose -f .\docker-compose.debug.yml up
```

> you can attach the debugger after running the entire app with the command above

Stop

```bash
docker-compose -f .\docker-compose.debug.yml down
```

## production

Build:

```bash
docker-compose build
```

Run

```bash
docker-compose up
```

Stop

```bash
docker-compose down
```
