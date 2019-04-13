FROM keymetrics/pm2:latest-alpine

COPY package.json .

RUN npm install --production

COPY pm2.json .

EXPOSE 3000

VOLUME [ "/database", "/public" ]

COPY . .

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production"]