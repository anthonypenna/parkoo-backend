FROM node:14.17.6
WORKDIR /app
COPY . .
RUN yarn
ENV PORT=3000
EXPOSE $PORT
CMD ["yarn", "start"]
