var Paginator = require("../routes/paginator.js");

var pgr = new Paginator(40, 1000); 
for (var i = 1; i <= 13; ++i) {
   for (var j = 1; j <= i; ++j) {
      pgr.set_param(j, i);
      pgr.build();
   }
   console.log("");
}

// case: 64
for (var j = 1; j <=10; ++j) {
   pgr.set_param(j, 64);
   pgr.build();
}
console.log("");

for (var j = 54; j <=64; ++j) {
   pgr.set_param(j, 64);
   pgr.build();
}

