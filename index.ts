import {problemsRoutes} from "./src/routes/api/v1/admin/problems";

require('dotenv').config()

import express from 'express';
import mongoose from 'mongoose';
import {tickersRoutes} from "./src/routes/api/v1/tickers";
import {mainRoutes} from "./src/routes";

// setup Routs
const app = express();

app.use('/', mainRoutes);
app.use('/api/v1/tickers', tickersRoutes);
app.use('/api/v1/admin/problems', problemsRoutes);


// connect to DB and Start Server;
mongoose.connect(process.env.DB_URI || '', {useUnifiedTopology: true, useNewUrlParser: true}, async () => {
        console.log('DB       : Connected')

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server   : Running on port ${PORT}`));
    }
);


