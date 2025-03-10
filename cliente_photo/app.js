const express = require('express');

const app = express();

app.use(express.json());

app.use("/client", express.static("front1/public"));

if (require.main == module){
    const PORT = 1235;
    app.listen(PORT, ()=> console.log(`servinit port: ${PORT}`))
}

