/*
 * bufferLoaderAEx
 */
function bufferLoaderAEx(context, urlList) {
	this.context = context;
	this.urlList = urlList;
	this.bufferList = new Array();
	this.loadCount = 0;
}

/*
 * bufferLoaderAEx.load
 */
bufferLoaderAEx.prototype.load = function() {
	//console.log('bufferLoaderAEx.load');
	for (var i = 0; i < this.urlList.length; ++i) {
		//console.log('bufferLoaderAEx.load -> ' + this.urlList[i]);
		this.loadBuffer(this.urlList[i], i);
	}
};

/*
 * bufferLoaderAEx.loadBuffer
 */
bufferLoaderAEx.prototype.loadBuffer = function(url, index) {
	//console.log('bufferLoaderAEx.loadBuffer');
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	var loader = this;

	request.onload = function() {
		// Asynchronously decode the audio file data in request.response
		//console.log(request.response);
		loader.context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					alert('error decoding file data: ' + url);
					return;
				}
				loader.bufferList[index] = buffer;
			},
			function(error) {
				console.error('decodeAudioData error', error);
			}
		);
	}

	request.onerror = function() {
		alert('bufferLoaderAEx: XHR error');
	}

	request.send();
};

/*
 * bufferLoaderWithOffsetCallbackAEx
 */
function bufferLoaderWithOffsetCallbackAEx(context, urlList, OffsetFiles, callback) {
	this.context = context;
	this.urlList = urlList;
	this.OffsetFiles = OffsetFiles;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

/*
 * bufferLoaderWithOffsetCallbackAEx.load
 */
bufferLoaderWithOffsetCallbackAEx.prototype.load = function() {
	//console.log('bufferLoaderWithOffsetCallbackAEx.load');
	for (var i = 0; i < this.urlList.length; ++i) {
		//console.log('bufferLoaderWithOffsetCallbackAEx.load -> ' + this.urlList[i]);
		this.loadBuffer(this.urlList[i], i);
	}
};

/*
 * bufferLoaderWithOffsetCallbackAEx.loadBuffer
 */
bufferLoaderWithOffsetCallbackAEx.prototype.loadBuffer = function(url, index) {
	//console.log('bufferLoaderWithOffsetCallbackAEx.loadBuffer');
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	var loader = this;

	request.onload = function() {
		// Asynchronously decode the audio file data in request.response
		console.log(request.response);
		loader.context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					alert('error decoding file data: ' + url);
					return;
				}
				loader.bufferList[index] = buffer;
				if (++loader.loadCount == loader.urlList.length) {
					loader.onload(loader.bufferList);
					//console.log(loader.bufferList);
				}
			},
			function(error) {
				console.error('decodeAudioData error', error);
			}
		);
	}

	request.onerror = function() {
		alert('bufferLoaderWithOffsetCallbackAEx: XHR error');
	}

	request.send();
};
