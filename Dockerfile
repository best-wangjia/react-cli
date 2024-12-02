FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./dist
COPY docs/.vuepress/dist/ ./dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8090
CMD ["nginx", "-g", "daemon off;"]
