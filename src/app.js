const express=require("express")
const cors=require('cors')

//routes
const userRouter=require('./routes/user.routes')
const repairRouter=require('./routes/repairs.routes')
//const router = require("./routes/user.routes")

const app=express()
//Permite enviar formato json al servidor
app.use(express.json())
app.use(cors())

//rutas

app.use('/api/v1/users', userRouter)
app.use('/api/v1/repairs', repairRouter)


module.exports=app