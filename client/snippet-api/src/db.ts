import mongoose from 'mongoose'

export function mongooseConnect(onConnect: (...args: any[]) => void = () => {}) {
  console.log('connecting to mongodb')
  mongoose.connection
    .on('error', (e) => console.log(e))
    .on('disconnected', (e) => {
      console.log(e)
      console.log('HERE')
      // mongooseConnect
    })
    .once('open', onConnect)
  return mongoose.connect('mongodb://localhost/snippets', {
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
  })
}