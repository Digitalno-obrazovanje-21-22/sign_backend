import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as dotenv from 'dotenv'
var cors = require('cors')

async function bootstrap() {

  dotenv.config()
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  app.use(cors());
  const port = process.env.NODE_PORT || 3001
  await app.listen(port, () => {
    console.log(`App started on port ${port}`)
  })
}
bootstrap()
