import express from 'express';
import {create} from 'express-handlebars';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helpers from 'handlebars-helpers';
import 'dotenv/config';

import AppRoutes from "./appRoutes";
import CommonDataHandler from "./middlewares/CommonDataHandler";

const app = express();

const hbs = create({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + "/../views/layout/v1",
    partialsDir: __dirname + "/../views/partials/v1",
    helpers: {
        resourceUrl(resourcePath) {
            return `${process.env.RESOURCE_DOMAIN}${resourcePath}`
        },
        nl2br(text, isXhtml) {
            let breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
            return (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        },
        moment(text, format) {
            return helpers("date").date(text, format);
        },
        compare(a, operator, b, options) {
            return helpers().compare(a, operator, b, options);
        }
    }
});
// view engine setup
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(`${__dirname}/../public`));

// I18nRegister(app);
CommonDataHandler(app);
AppRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
