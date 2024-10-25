import app from "./app.js"
import dbConnect from "./src/database/db.js"

const PORT = process.env.PORT|| 4000


dbConnect()

app.listen(PORT, ()=>(
    console.log(`Server is listening at PORT ${PORT}`)
))