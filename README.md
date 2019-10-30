# ICMP-rai

Simple web app that use icmp protocol to check some devices if there are up or not.
In the app, you have 'Node' which is a single device or server that you want to capture status and the 'Area' which is a group of nodes for better separation

## Development

**1. Run all services in the containers**

Build:

```bash
docker-compose -f .\docker-compose.debug.yml build
```

Run:

```bash
docker-compose -f .\docker-compose.debug.yml up
```

> you can attach the debugger after running the entire app with the command above

Stop:

```bash
docker-compose -f .\docker-compose.debug.yml down
```

**2. Run services separately**

Run the database services:

```bash
docker-compose -f .\docker-compose.dev.yml up
```

Then you have to run API and the ui as well:

```bash
cd ./server
yarn run dev

cd ./www
yarn run serve
```

## Production

Build:

```bash
docker-compose build
```

Run:

```bash
docker-compose up
```

Stop:

```bash
docker-compose down
```

> A better solution may be Docker Swarm. Make sure you built the images first.

```bash
docker swarm init

docker stack deploy -c docker-compose.yml icmp
```

## Author

Milad bonakdar  
miladbonak@gmail.com

## License

MIT
