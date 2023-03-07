FROM node:14-alpine
WORKDIR /index
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-optional
COPY . .
RUN yarn build
CMD ["node", "dist/index.js"]
