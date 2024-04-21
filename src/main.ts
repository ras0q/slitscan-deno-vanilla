document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div class="container">
    <video
      id="video"
      src="/AdobeStock_255856560.mp4"
      width="40%"
      height="auto"
      muted
    ></video>
    <div id="frames"></div>
  </div>
  <canvas id="canvas"></canvas>
  <style>
    #canvas {
      display: none;
    }

    #frames {
      position: relative;
    }

    .frame {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
`;

const video = document.getElementById("video") as HTMLVideoElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas?.getContext("2d");
const frames = document.getElementById("frames") as HTMLDivElement;

let frameID = 0;
video.addEventListener("play", () => {
  let i = 0;
  const loop = () => {
    if (video.paused || video.ended) {
      cancelAnimationFrame(frameID);
      return;
    }
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgTag = document.createElement("img");
    imgTag.className = "frame";
    imgTag.src = canvas.toDataURL("image/png");
    imgTag.style.zIndex = `${i}`;
    // @ts-ignore object-view-box is now generally supported
    imgTag.style.objectViewBox = `inset(0px ${i % canvas.width}px 0px 0px)`;
    frames.appendChild(imgTag);
    i++;

    requestAnimationFrame(loop);
  };
  frameID = requestAnimationFrame(loop);
});

video.play();
