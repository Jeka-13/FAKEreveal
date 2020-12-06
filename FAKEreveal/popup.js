let button_start = document.getElementById("start");
let button_upload = document.getElementById("upload");
let video = document.getElementById("video");
let mediaRecorder;
let answer;


button_start.onclick = function () {
    document.body.style.width = "593px";
    document.body.style.height = "500px";
    navigator.mediaDevices.getDisplayMedia()
        .then(stream => {
            video.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream);
            document.body.style.display = "none";

            mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    console.log("Check ", e.data);
                }

                const form = new FormData();

                form.append("file", e.data);
                fetch('http://127.0.0.1:5000/api', {
                    method: 'POST',
                    body: form
                }).then(response => {
                    answer = response.json().then(function(result) {
                        console.log(result.status)
                        document.body.style.display = "block";
                        let text = document.getElementById('answer');
                        text.innerHTML = result.status;
                    });

                })
            };
            mediaRecorder.start();
            console.log(mediaRecorder);
            setTimeout(stop, 10000);
        });
};


function stop() {
    mediaRecorder.stop();
}
