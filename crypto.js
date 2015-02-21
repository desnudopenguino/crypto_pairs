/**
	* This file is built to do magic with javascript 
	* Requires jquery to work correctly
	*/
function getCryptsyPair(pair_string, callback) {
	var market = new Array();
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid="+ pair_string) + '%22&format=json', function (data) {
		for (var i in data['query'].results.json.return.markets) {
			market['last'] = data['query'].results.json.return.markets[i].lasttradeprice;
			market['sell'] = data['query'].results.json.return.markets[i].sellorders[0].price;
			market['buy'] = data['query'].results.json.return.markets[i].buyorders[0].price;
		}
console.log(market);

	market = callback(market);
	return market;
	});
}
