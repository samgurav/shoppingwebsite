const connectDB=require('./config/db')
const express =require('express');
const cors=require('cors')
 const http=require('http')
const PORT=8000;
const app=express();
app.use(express.json())
app.use(cors());
 const httpServer=http.createServer(app);
 app.use(express.urlencoded({extended:false}))
 const postRoutes=require('./routes/Admin/PostRoutes');
 app.use("/api/posts",postRoutes)
 const productRoute=require('./routes/Admin/ProductRoutes');
 app.use("/api/posts",productRoute)
 const UserRoutes=require('./routes/User/UserRoutes');
 app.use("/api/posts",UserRoutes)
 const DashboardRoutes=require('./routes/Dashboard/DashboardRoutes');
 app.use("/api/posts",DashboardRoutes)
 app.use(express.static('./'));
 
connectDB()
httpServer.listen(PORT,(err)=>{
    if(err) throw err
    console.log("working on 8000")
})















