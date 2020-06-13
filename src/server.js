import * as sapper from '@sapper/server';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import polka from 'polka';
import sirv from 'sirv';
import config from './config';
import './styles/index.css';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(config.COOKIE_SECRET),
    (req, res, next) => {
      let parsed;
      if (req.cookies[config.COOKIE_NAME])
        parsed = JSON.parse(
          Buffer.from(req.cookies[config.COOKIE_NAME], 'base64').toString()
        );
      const token = parsed ? parsed.jwt : undefined;
      const profile = token ? jwt.decode(token) : false;
      return sapper.middleware({
        session: (req, res) => ({
          user: profile,
          host: req.headers.host.split(':')[0],
        }),
      })(req, res, next);
    }
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
