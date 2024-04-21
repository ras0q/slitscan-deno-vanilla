const framesCount = 500;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <canvas id="canvas"></canvas>
  <div class="container">
    <div>
      <video
      id="video"
      src="/AdobeStock_255856560.mp4"
      muted
      loop
      ></video>
    </div>
    <div id="frames">
      ${`<img class="frame" />`.repeat(framesCount)}
    </div>
  </div>
  <style>
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    #video {
      margin: 0;
      width: 100%;
      height: auto;
    }

    #canvas {
      display: none;
    }

    #frames {
      position: relative;
      width: 100%;
      height: 100%;
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
    const imgTag = frames.children[i % framesCount] as HTMLImageElement;
    imgTag.className = "frame";
    imgTag.src = canvas.toDataURL("image/png");
    // @ts-ignore object-view-box is now generally supported
    imgTag.style.objectViewBox = `inset(0px ${
      (i * (canvas.width / framesCount)) % canvas.width
    }px 0px 0px)`;

    i++;

    requestAnimationFrame(loop);
  };
  frameID = requestAnimationFrame(loop);
});

video.play();
