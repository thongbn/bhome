import express from 'express';
import { create } from 'express-handlebars';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import IndexRouter from './routes';

const app = express();

const hbs = create({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + "/../views/layout/v1",
  partialsDir: __dirname + "/../views/partials/v1"
});
// view engine setup
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/../public`));

app.use('/', IndexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
