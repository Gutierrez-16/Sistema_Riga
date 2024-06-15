# Fase de construcción
FROM maven:3.8.5-openjdk-17 AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN mvn clean package -DskipTests

# Fase de producción
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /usr/src/app/target/sistema_riga_backend-0.0.1-SNAPSHOT.jar sistema_riga_backend.jar
EXPOSE 8080

# Agregar script para debugging
CMD echo "SPRING_DATASOURCE_URL: $SPRING_DATASOURCE_URL" && \
    echo "SPRING_DATASOURCE_USERNAME: $SPRING_DATASOURCE_USERNAME" && \
    echo "SPRING_DATASOURCE_PASSWORD: $SPRING_DATASOURCE_PASSWORD" && \
    echo "SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE: $SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE" && \
    echo "SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE: $SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE" && \
    echo "SPRING_JACKSON_TIME_ZONE: $SPRING_JACKSON_TIME_ZONE" && \
    echo "FRONTEND_URL: $FRONTEND_URL" && \
    java -jar sistema_riga_backend.jar

# Para producción, usar solo ENTRYPOINT
ENTRYPOINT ["java","-jar","sistema_riga_backend.jar"]