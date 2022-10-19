FROM node:18-slim as dev
RUN apt update
RUN apt install -y python3 build-essential
RUN mkdir "app"
WORKDIR app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm i -f
CMD ["npm", "start"]

FROM dev as prod
COPY ./ .
RUN npm run build
CMD ["npm", "run", "start"]
