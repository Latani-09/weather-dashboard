
# weather app 
Technologies : react @18.2.0 , bootstrap,
# How to run : 
Npm i 
assign weather api key to the env variable REACT_APP_WEATHERAPPID( in .env file )
npm start

#  build image and pass API key when  running image
build dockerfile
docker run -e REACT_APP_WEATHERAPPID=[apikey] -p 3000:3000 [imageName]