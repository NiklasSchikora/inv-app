if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/serviceworker.js");
  });
}

if (
  "BarcodeDetector" in window &&
  (await BarcodeDetector.getSupportedFormats()).includes("qr_code") &&
  window.location.pathname == "/"
) {
  console.log("QR code scanning is supported.");
  import("./barcodeDetection.js");
}
