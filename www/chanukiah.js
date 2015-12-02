var btAddress = "20:15:06:01:27:93";
/*
function connect() {
	bluetoothSerial.isConnected(function connected() {
			$("#connState").text("Disconnected");
		}, function disconnected() {
			bluetoothSerial.connect(btAddress,
				function connectSuccess() {
				  $("#connState").text("Connected");
				},
				function connectFailure() {
				  $("#connState").text("Failed to connect");
				});
		}
	);
}
*/
function send(rawData) {
	var data = rawData+"X";
	//Connect if necessary
	bluetoothSerial.isConnected(function success() {
		bluetoothSerial.write(data);
	}, function failure() {
			bluetoothSerial.connect(btAddress,
			function connectSuccess() {
			  $("#connState").text("Connected");
			  bluetoothSerial.write(data);
			},
			function connectFailure() {
			  $("#connState").text("Failed to connect");
			  $("#command").text("Failed: "+$("#command").text());
			});
		}
	);
}

function reset() {
	$("#command").text("Blowing them out...");
	send("r");
}

function lightAll() {
	var l = getLight();
	$("#command").text("Lighting for day "+l);
	send("L"+l);
}

function light() {
	var l = getLight();
	$("#command").text("Lighting candle "+l);
	send("l"+l);
}

function setMax() {
	var l = getLight();
	$("#command").text("Limit lighting for day "+l);
	send("m"+l);
}

function getLight() {
	return $("input[name='light']:checked").val();
}
