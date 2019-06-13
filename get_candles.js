var bittrex = require('node.bittrex.api');
var fs = require('fs');

bittrex.options({
  'apikey' : 'd4124914b9fc4f01b3031bc4513151d2',
  'apisecret' : 'a94272a778bb49c6ba791d2cbadeb39c',
  'verbose' : true,
  'cleartext' : false,
//  'baseUrlv2' : 'https://bittrex.com/Api/v2.0',
});

/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/

var startTimestamp = (new Date().getTime() / 1000 | 0);

console.log(startTimestamp);

bittrex.getmarketsummaries( function( data, err ) {
  if (err) {
    return console.error(err);
  }
//  var timeout = 0;
  for( var i in data.result ) {
//    await sleep(1000);														// setTimeout + bind
//	yield setTimeout(suspend.resume(), 1000);
//    bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
//    sleep(1000);
//    setTimeout(function() {bittrex.getcandles( { marketName : data.result[i].MarketName, tickInterval : 'oneMin', _ : startTimestamp }, function( data, err) {
    bittrex.getcandles( { marketName : data.result[i].MarketName, tickInterval : 'oneMin', _ : startTimestamp }, function( data, err) {

//      console.log( JSON.stringify(this) );
      var fn = this.MarketName + '--' + startTimestamp;

      if (err) return console.error(err);

      fs.appendFile(fn, JSON.stringify(data), function (err) {
        if (err) throw err;

        console.log( "saved " + fn );
      });
    }.bind(data.result[i]));
//    timeout += 1000;
  }
});
