//Webcam stream code adapted from www.kirupa.com
//RecordRTC https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC

var video = document.querySelector('#vid-element'),
	recordButton = document.querySelector('#record'),
	stopButton = document.querySelector('#stop'),
	saveButton = document.querySelector('#save'),
	viewButton = document.querySelector('#view');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

if (navigator.getUserMedia) {
	navigator.getUserMedia({video: true, audio: true}, handleVideo, videoError);
}

function handleVideo(stream) {
	video.src = window.URL.createObjectURL(stream);
	var options = {
		type: 'video',
		frameInterval: 20
	};
	var recordRTC = RecordRTC(stream, options);

	recordButton.onclick = function() {
		recordButton.disabled = true;
		stopButton.disabled = false;
		recordRTC.clearRecordedData();
		recordRTC.startRecording();
	};

	stopButton.onclick = function() {
		saveButton.disabled = false;
		viewButton.disabled = false;
		stopButton.disabled = true;
		recordButton.disabled = false;
		recordRTC.stopRecording(function(videoURL) {

			var recordedBlob = recordRTC.getBlob();
			recordRTC.getDataURL(function(dataURL) {});

			viewButton.onclick = function() {
				window.open(videoURL, '_blank');
			}

			saveButton.onclick =function() {
				recordRTC.save('video');
			}
		});
	};
}

function videoError(e) {
	//Error handler
}