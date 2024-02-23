leftwristX = 0
leftwristY = 0
rightwristX = 0
rightwristY = 0
song = ""
volume = 0
scoreleftwrist = 0
scorerightwrist=0
function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    pn = ml5.poseNet(video, model_loaded)
    pn.on("pose", got_poses)
}
function draw() {
    image(video, 0, 0, 500, 500)
    fill("red")
    stroke("red")
    if (scorerightwrist>0.05) {
        
    
    circle(rightwristX, rightwristY)
    if (rightwristY > 0 && rightwristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed=0.5x"
        song.rate(0.5)
    }
    else if (rightwristY > 100 && rightwristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed=1x"
        song.rate(1)
    }
    else if (rightwristY > 200 && rightwristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed=1.5x"
        song.rate(1.5)
    }
    else if (rightwristY > 300 && rightwristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed=2x"
        song.rate(2)
    }
    else if (rightwristY > 400 && rightwristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed=2.5x"
        song.rate(2.5)
    }
}
    if (scoreleftwrist > 0.05) {
        fill("blue")
        stroke("blue")
        circle(leftwristX, leftwristY, 20)
        n = Number(leftwristY)
        n1 = floor(n)
        volume = n1 / 500
        document.getElementById("volume").innerHTML = "Volume= " + volume
        song.setVolume(volume)
    }
}

function preload() {
    song = loadSound("music.mp3")
}
function play() {
    song.play()
    song.setVolume(0.8)
    song.rate(1)
}
function stop() {
    song.stop()
}
function model_loaded() {
    console.log("poseNet has been loaded")
}
function got_poses(results) {
    if (results.length > 0) {
        console.log(results)
        leftwristX = results[0].pose.leftWrist.x
        leftwristY = results[0].pose.leftWrist.y
        scoreleftwrist = results[0].pose.keypoints[9].score
        rightwristX = results[0].pose.rightWrist.x
        rightwristY = results[0].pose.rightWrist.y
        scorerightwrist = results[0].pose.keypoints[10].score
        console.log(leftwristX, leftwristY)
        console.log(rightwristX, rightwristY)
    }
}