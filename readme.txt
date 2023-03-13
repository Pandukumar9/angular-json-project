needs:

1.install angular project and install npm i

2.install angular material and bootstrap

ng add @angular/material

npm install ngx-bootstrap bootstrap@4.1.1 jquery popper.js --save

 after that we can Open Angular.json from project and add the following code.

"styles": [  
              "src/styles.css",  
              "./node_modules/bootstrap/dist/css/bootstrap.min.css"  
            ],  
            "scripts": [              
              "./node_modules/jquery/dist/jquery.min.js",  
              "./node_modules/popper.js/dist/umd/popper.min.js",  
              "./node_modules/bootstrap/dist/js/bootstrap.min.js"  
            ]   

-- later we can check the it will added or not

3.now we can json server in our angular project

npm install -g json-server

https://github.com/typicode/json-server - for referenc

-- after installation we can Create a mock-api/db.json file with some data then later we can start server
   by run this command -- > json-server --watch mock-api/db.json

-- bydefault server will run port 3000 like localhost:3000 but incase if u want to
   change port then we can run this commmand --> json-server --watch mock-api/db.json --port 5000 now it will run localhost:5000