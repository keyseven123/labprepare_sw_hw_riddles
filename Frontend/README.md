# How to build and run project

## --BUILD APPLICATION--

docker build -t myquiz .

## --RUN APPLICATION--

docker run --publish 3000:3000 myquiz