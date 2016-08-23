var thrift = require('thrift');
//var ThriftTransports = require('thrift/transport');
//var ThriftProtocols = require('thrift/protocol');
var ClusterJudge = require('./gen-nodejs/ClusterJudge');
var ttypes = require('./gen-nodejs/grouping_shared_types');

//transport = ThriftTransports.TBufferedTransport()
//protocol = ThriftProtocols.TBinaryProtocol()
transport = thrift.TBufferedTransport()
protocol = thrift.TBinaryProtocol()

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  console.assert(false, err);
});

var client = thrift.createClient(ClusterJudge, connection);

/*
var scenarios = new ttypes.PunishmentScenarios({first: 524288, second: 75497472});
var bases = new ttypes.JudgeBases({scenarios: scenarios});
*/

client.get_judge_bases([103, 104], function(err, response) {
   console.log(response);
});

client.get_sentences([101, 102], function (err, response) {
   if (err) {
      console.log(err);
   }
   else {
      console.log(response);
   }
});

client.group_scenarios('故意伤害罪', function(err, response) {
   if (err) {
      console.log(err);
   }
   else {
      if (response.constructor === Array) {
         for (var i = 0; i < response.length; ++i) {
            var str = "[" + response[i].scenarios[0];
            for (var j = 1; j < response[i].scenarios.length; ++j) {
                str += ", " + response[i].scenarios[j];
            }
            str += "] "  + response[i].doc_count;
            console.log(str);
         }
         //console.log(response);
      }
      connection.end();
   }
});
