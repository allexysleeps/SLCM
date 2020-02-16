import mongoose from 'mongoose'

export function mongooseConnect(onConnect: (...args: any[]) => void = () => null) {
  console.info('connecting to mongodb')
  mongoose.connection
    .on('error', (e) => console.error(e))
    .on('disconnected', (e) => {
      console.error(e)
    })
    .once('open', onConnect)
  return mongoose.connect('mongodb://localhost/snippets', {
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
  })
}