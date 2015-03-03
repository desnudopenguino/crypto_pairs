/**
	* This file is built to do magic with javascript 
	* Requires jquery to work correctly
	*/
function getCryptsyPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid="+ pair_string) + '%22&format=json', function (data) {
		for (var i in data['query'].results.json.return.markets) {
			json = data['query'].results.json.return.markets[i];
			var market = setMarket(json.lasttradeprice, json.buyorders[0].price, json.sellorders[0].price);
		}
	market = callback(market);
	return market;
	});
}

function getCexPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://cex.io/api/ticker/"+ pair_string) + '%22&format=json', function (data) {
		json = data['query'].results.json;
		var market = setMarket(json.last, json.bid, json.ask);

		market = callback(market);
		return market;
	});
}

function getBittrexPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://bittrex.com/api/v1.1/public/getticker?market="+pair_string) + '%22&format=json', function (data) {
		json = data['query'].results.json.result;
		var market = setMarket(json.Last, json.Bid, json.Ask);

		market = callback(market);
		return market;
	});

}

function getVircurexPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://api.vircurex.com/api/get_info_for_1_currency.json?base="+pair_string+"&alt=BTC") + '%22&format=json', function (data) {
		json = data['query'].results.json;		
		var market = setMarket(json.last_trade, json.highest_bid, json.lowest_ask);

		market = callback(market);
		return market;
	});
}

function getComkortPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://api.comkort.com/v1/public/market/summary?market_alias="+pair_string) + '%22&format=json', function (data) {
		for (var i in data['query'].results.markets) {
			json = data['jquery'].results.markets[i];
			var market = setMarket(json.last_price, json.buy_orders[0].price, json.sell_orders[0].price);

			market = callback(market);
			return market;
		}
	});
}

function getAllcoinPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://www.allcoin.com/api2/pair/"+pair_string) + '%22&format=json', function (data) {
		json = data['query'].results.json.data;
		var market = setMarket(json.trade_price, json.top_bid, json.top_ask);

		market = callback(market);
		return market;
	});
}

function getCCexPair(pair_string, callback) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://c-cex.com/t/"+pair_string+".json") + '%22&format=json', function (data) {
		json = data['query'].results.ticker;
		var market = setMarket(json.lastprice, json.lastbuy, json.lastsell);

		market = callback(market);
		return market;
	});
}

function standardNumbers(items) {
	items['last'] = Number(items['last']).toFixed(8);
	items['sell'] = Number(items['sell']).toFixed(8);
	items['buy'] = Number(items['buy']).toFixed(8);
	return items;
}

function calcProfitability(start, p1buy, p2sell, p3sell, fee) {
	p1 = ((start - (start*fee))/p1buy)*p2sell;
	p2 = p1 - (p1*fee);
	p3 = p2*p3sell;
	p4 = p3 - (p3*fee);
	return p4.toFixed(8);
}

function calcAltProfitability(start, p1buy, p2buy, p3sell, fee) {
	p1 = ((start - (start*fee))/p1buy)/p2buy;
	p2 = p1 - (p1*fee);
	p3 = p2*p3sell;
	p4 = p3 - (p3*fee);
	return p4.toFixed(8);
}

function setMarket(last, buy, sell) {
	var market = new Array()
	market['last'] = last;
	market['buy'] = buy;
	market['sell'] = sell;
	
	return standardNumbers(market);
}

