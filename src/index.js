import "regenerator-runtime/runtime"
const start = document.getElementById("start")
const stop = document.getElementById("stop")
const video = document.querySelector("video")
const downloadButton = document.getElementById("downloadButton")
console.log(downloadButton)
let recorder,
  stream,
  chunks = []

async function startRecording() {
  // create video strem ---open dialog to record the screen
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
  })
  // record stream

  recorder = new MediaRecorder(stream)

  // pushing continous data into chuks array
  recorder.ondataavailable = (e) => chunks.push(e.data)
  // onstop create blob data pass to video attribute
  recorder.onstop = (e) => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type })
    video.src = URL.createObjectURL(completeBlob)
    const reader = new FileReader()
    downloadButton.href = video.src
    downloadButton.download = "RecordedVideo.webm"
  }
  recorder.start()
}
// adding on click event on the start button for record the screen
start.addEventListener("click", () => {
  start.setAttribute("disabled", true)
  stop.removeAttribute("disabled")

  startRecording()
})

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true)
  start.removeAttribute("disabled")
  recorder.stop()
  stream.getVideoTracks()[0].stop()
})
// downloadButton.addEventListener("click", () => {
//   downloadButton.href = video.src
// })
