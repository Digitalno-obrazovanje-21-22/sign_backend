import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv'
const cors = require('cors')

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  const domains = ['http://localhost:3000']

  const corsOptions = {
    origin: new RegExp(`(${domains.join('|')})`),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }

  app.enableCors(corsOptions)
  const port = process.env.NODE_PORT || 3001
  await app.listen(port, () => {
    console.log(`App started on port ${port}`)
  })
}
bootstrap()
