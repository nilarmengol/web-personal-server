const mongoose = require("mongoose")
const app = require("./app")
const port = process.env.PORT || 3977
constportDb = 27017
const {IP_SERVER, API_VERSION,PORT_DB} = require('./config')

mongoose.set("useFindAndModify", false)


mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/nilarmengol`, {useNewUrlParser: true, useUnifiedTopology: true}, (err,res) => {
    if(err) {
        throw err
    } else {
console.log("La conexion con la base de datos es correcta")

app.listen(port, () => {
    console.log('########API_REST########')
    console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`)
})
    }
    
});
