const express = require('express');
const bodyParser = require('body-parser');
const configDB = require('./src/config/config');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

app.set('port', configDB.server.port);
app.use('/person', require('./src/controllers/PersonController'));
 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
