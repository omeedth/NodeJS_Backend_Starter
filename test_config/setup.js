/* External Import Statements */

/* Constants */
const whitelist = ['http://localhost:3000']; // port 3000 -> Frontend, Calls on same orgin will have an origin of 'undefined'

/* Exported Setup Code */
module.exports = {
    cors: {       
        corsOptions: {            
            origin: function (origin, callback) {
                if (origin === undefined || whitelist.indexOf(origin) !== -1) {
                    console.log('Allowed Call From Origin:',origin)
                    callback(null, true)
                } else {
                    console.log('Not Allowing Call From Origin:',origin)
                    callback(new Error('Not allowed by CORS'))
                }
            },
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true // allow session cookie from browser to pass through            
        }
    }
}