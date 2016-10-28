// The application show in the browser how many times you opened the link.
// Different sessions for different browsers.

var express      = require('express')
, session        = require('express-session')
, cookieParser   = require('cookie-parser')
, http           = require('http')
, app            = express()
, MemcachedStore = require('connect-memcached')(session);

app.use(cookieParser());
app.use(session({
      secret  : 'CatOnKeyboard'
    , key     : 'test'
    , proxy   : 'true'
    , store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211'],
        secret: '123, easy as ABC. ABC, easy as 123' // Optionally use transparent encryption for memcache session data
    })
    // Other options: cookie, cookie.domain, cookie.expires (cookie maxAge prefered)
    // cookie.httpOnly, cookie.maxAge, cookie.path, cookie.sameSite
    // cookie.secure
}));

app.get('/', function(req, res){
    if(req.session.views) {
        ++req.session.views;
    } else {
        req.session.views = 1;
    }
    res.send('Viewed <strong>' + req.session.views + '</strong> times.');
});

http.createServer(app).listen(9341, function() {
    console.log("Listening on %d", this.address().port);
});