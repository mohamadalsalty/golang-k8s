# Use the official HTTPD image based on Alpine
FROM httpd:alpine

COPY ./index.html /usr/local/apache2/htdocs/

EXPOSE 80
