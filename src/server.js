require('dotenv').config(); //config var environment

const app = require('./app');

const { db } = require('./database/config');

//config de la db

db.authenticate()
  .then(() => console.log('Database authenticated...👍'))
  .catch((err) => console.log(err));
db.sync()
  .then(() => console.log('Database synced...😃'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}...😃`);
});
