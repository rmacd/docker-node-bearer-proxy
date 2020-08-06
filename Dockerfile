FROM        node:10
WORKDIR     /usr/src/app
COPY        package*.json ./
RUN         npm install

COPY        . .
RUN         chmod +x wrapper.sh

EXPOSE      5050
ENTRYPOINT  [ "/usr/src/app/wrapper.sh" ]
