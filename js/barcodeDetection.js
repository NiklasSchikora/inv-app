import { dataURItoBlob } from "./helpers.js";
import { getItemFromDb } from "./database.js";

(function () {
  var width = 520;
  var height = 0;

  var streaming = false;

  var video = null;
  var canvas = null;
  var startbutton = null;

  function startup() {
    console.log("asdas RUN");
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  async function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");

      var detectCode = dataURItoBlob(data);
      console.log(detectCode);

      const barcodeDetector = new BarcodeDetector({
        // (Optional) A series of barcode formats to search for.
        // Not all formats may be supported on all platforms
        formats: [
          "aztec",
          "code_128",
          "code_39",
          "code_93",
          "codabar",
          "data_matrix",
          "ean_13",
          "ean_8",
          "itf",
          "pdf417",
          "qr_code",
          "upc_a",
          "upc_e",
        ],
      });
      try {
        const barcodes = await barcodeDetector.detect(canvas);
        barcodes.forEach(async (barcode) => {
          console.log(barcode);
          console.log(barcode.rawValue);
          console.log(barcode.format);
          document.getElementById("scan-result").innerHTML =
            "Scanned item: " + barcode.rawValue;
          let data = await getItemFromDb(barcode.rawValue);
          document.getElementById("sc-name").innerHTML = data.name;
          document.getElementById("sc-snum").innerHTML = data.serialNumber;
          document.getElementById("sc-pnum").innerHTML = data.productNumber;
          document.getElementById("sc-dep").innerHTML = data.department;
          document.getElementById("sc-cat").innerHTML = data.category;
        });
      } catch (e) {
        console.error("Barcode detection failed:", e);
      }
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  startup();
  // window.addEventListener("load", () => startup(), false);
  console.log("Run");
})();
