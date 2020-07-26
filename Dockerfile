FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install --production
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
