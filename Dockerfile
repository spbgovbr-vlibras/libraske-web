# ---------- Build stage ----------
FROM node:24-alpine3.23 AS build

WORKDIR /app

# Copia apenas manifests para aproveitar cache
COPY package.json yarn.lock ./
RUN yarn install

# Copia o restante do código
COPY . .
RUN yarn build

# ---------- Runtime stage ----------
FROM nginx:1.29-alpine3.23-perl

# Copia sua configuração
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build
COPY --from=build /app/build /usr/share/nginx/html

# Copia script de geração de config
COPY gen-config.sh /usr/local/bin/gen-config.sh
RUN chmod +x /usr/local/bin/gen-config.sh

ENV CONFIG_PATH=/usr/share/nginx/html/config.js

EXPOSE 80

ENTRYPOINT ["gen-config.sh"]
CMD ["nginx", "-g", "daemon off;"]
