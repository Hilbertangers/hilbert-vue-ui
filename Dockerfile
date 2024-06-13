FROM openresty/openresty:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD examples/dist /usr/local/openresty/nginx/html
RUN chmod 777 -R /usr/local/openresty/nginx
