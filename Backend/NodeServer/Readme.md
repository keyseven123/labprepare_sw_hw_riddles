# Backend Server

```npm install``` to install required modules

```node server.js```

Listens on port 2999 and following paths: 

 - POST ```http://localhost:2999/createRiddle```  
    Requires ```name```, ```description``` and a number as ```difficulty``` to be sent with json  
    Returns the riddleID  
    ```curl -d '{"name":"Test Riddle","description":"This Riddle serves as a Test","difficulty":4}' -H 'content-type:application/json' "localhost:2999/createRiddle"```

 - POST ```http://localhost:2999/addHint/:riddleID```  
    Requires a hint with ```name``` and ```description``` to be sent with json  
    Adds it to the riddle with the corresponding riddleID  
    ```curl -d ' {"id":0,"name":"Test Hint","description":"This is a useless Hint as a Test"}' -H 'content-type:application/json' "localhost:2999/addHint/0"```

- POST ```http://localhost:2999/completeRiddle/:riddleID```  
    Sets the completion flag for riddle with riddleID to true  

- GET ```http://localhost:2999/```  
    Returns a list of riddles as json ```{id, name, description, completion status, list of hints}``` with each hint as json ```{id, name, description}```

## Check exampleRiddle.py for examples in python