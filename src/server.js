import express from "express" ;
import { ServerConfig } from "./config.js";
import { mainRouter } from "./routes/main.routes.js";


const app = express() ;
app.use(express.json()) ;

app.use('/api', mainRouter) ;

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running on port ${ServerConfig.PORT}`); 
});


