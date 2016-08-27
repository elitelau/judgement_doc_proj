
var url = require('url')
  , querystring = require('querystring')
  , express = require('express')
  , bodyParser = require('body-parser')
  , routes = require('./routes')
  , methodOverride = require('method-override')
  , swig = require('swig')
  , less = require('less-middleware')
  , session = require('express-session')
  , clusterJudge = require('./thrift/gen-nodejs/ClusterJudge')
  , ttypes = require('./thrift/gen-nodejs/grouping_shared_types')
  , thrift = require('thrift')
  , group = require('./routes/group.js');

var app = module.exports = express();

var thrift_transport = thrift.TBufferedTransport()
var thrift_protocol = thrift.TBinaryProtocol()

var thrift_connection = thrift.createConnection("localhost", 9090, {
  transport : thrift_transport,
  protocol : thrift_protocol
});

thrift_connection.on('error', function(err) {
  console.log('cannot connect to thrift server');
  process.exit(1);
});
var thrift_client = thrift.createClient(clusterJudge, thrift_connection);

// Configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

// Swig will cache templates for you, so disable express's caching
//app.locals.cache = "memory";   // workaround, enable both express cache and swig cache
app.set('view cache', false);
swig.setDefaults({ cache: false });   

app.use(bodyParser());
app.use(methodOverride());
// open debug info, by "debug: true"
app.use(less(__dirname + '/public', {force: true, dest: __dirname + '/public', debug: true}));  
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'keyboard cat', 
                  resave: false,
                  saveUninitialized: true,
                  cookie: { maxAge: 60000 }}))

/*
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
*/

app.use(function(err, req, res, next) {console.error(err.stack)});

app.get('/', routes.index);
app.get('/error', function(req, res) {
   res.render('error', {title: req.session.title, message: req.session.message, error: req.session.error});
   req.session.title = null;
   req.session.message = null;
   req.session.error = null;
});

app.get('/doc/:docid', function(req, res) {
   console.log("hostname=" + req.get('host'));
   res.render('doc', { hostname: req.protocol + '://' + req.get('host') });
});

app.get('/abc', routes.test);

app.get('/about', routes.about);

app.get('/docs', function(req, res) {
   console.log(req.url);
   var qry_str = url.parse(req.url).query;
   var page_no = 1;
   var param_array = querystring.parse(qry_str);
   console.log(param_array['q']);

   if (param_array['q'] === undefined || param_array['d1'] === undefined ||
       param_array['d2'] === undefined) 
   {
      console.log('非法的参数');
      return;
   }

   if (param_array['p'] !== undefined) {
      page_no = parseInt(param_array['p']);
   }

   group.retrieve_docs(req, res, thrift_client, param_array['q'], param_array['d1'], param_array['d2'], page_no); 
});

app.post('/search', function(req, res) {
   var qry_str = "";
   var page_no = 1;
   if (req.body.query_string) {
      qry_str = req.body.query_string;
      
      if (req.body.page_no) {
         page_no = parseInt(req.body.page_no);
      }
      group.group(req, res, thrift_client, qry_str, page_no);
   }
   else {
      req.session.title = "错误提示";
      req.session.error = "输入条件错误";
      req.session.message = "罪名不能为空";
      res.redirect('/error');
   }
});

app.get('/search', function(req, res) {
   // var pathname = url.parse(req.url).pathname;
   console.log(req.url);
   var qry_str = url.parse(req.url).query;
   var page_no = 1;
   var param_array = querystring.parse(qry_str);
   console.log(param_array['q']);

   if (param_array['q'] === undefined) {
      console.log('please specify a crime name');
      return;
   }
   qry_str = param_array['q'];
   if (param_array['p'] !== undefined) { 
      page_no = parseInt(param_array['p']);
   }
   group.group(res, thrift_client, qry_str, page_no);
   
});

app.listen(8080);
