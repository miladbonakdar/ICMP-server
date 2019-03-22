FROM keymetrics/pm2:latest-alpine

COPY package.json .

RUN npm install --production

COPY pm2.json .

COPY . .

EXPOSE 3000

VOLUME [ "/database", "/public" ]

CMD [ "pm2-runtime", "start", "pm2.json" ]
