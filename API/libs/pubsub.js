const Rascal = require('rascal')
const defaultConfig = require('./config_rascal.json')


// AULA 9 HORA 1:45:00

defaultConfig.vhosts['/'].connection.url = process.env.AMQP_URL || defaultConfig.vhosts['/'].connection.url

const config = Rascal.withDefaultConfig(defaultConfig)

// strings
const publisher = Object.keys(defaultConfig.vhosts['/'].publications)[0]
const consumer = Object.keys(defaultConfig.vhosts['/'].subscriptions)[0]


module.exports = {
    pub: (req, res, next) => Rascal.Broker.create(config, (err, broker) => {
        if (err) next(err)

        req.publish = (type, keys, value) => new Promise((resolve, reject) => {
            const msg = {
                type,
                payload: value,
                keys
            }

            broker.publish(publisher, msg, (err, publication) => {
                if (err) reject(err)
                publication.on('error', (err) => {
                    console.error('Publisher error', err)
                    reject
                })
                resolve(value)
            })
        })

        next()
    }),
    sub: () => Promise.resolve(Rascal.withDefaultConfig(config))
        .then((conf) => new Promise((resolve, reject) => Rascal.Broker.create(conf, (err, broker) => {
            if (err) {
                if (err.code === 'ECONNREFUSED') {
                    console.error(err)
                    process.exit(1)
                } else {
                    reject(err)
                }
            }
            resolve(broken)
        })))
        .then(broken => new Promise((resolve, reject) => broken.subscribe(consumer, (err, subscription) => {
            if (err) reject(err)
            resolve(subscription)
        })))
        .then(subscription => {
            subscription.on('error', err => {
                console.error('Subscriber error', err)
                throw err
            })
            subscription.on('cancel', err => {
                console.error('Subscriber error', err)
                throw err
            })
            return subscription
        })
}