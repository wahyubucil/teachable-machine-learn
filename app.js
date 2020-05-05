let model, maxPredictions;

const labelContainer = document.getElementById("label-container");
const confidence = document.getElementById("confidence");

(async () => {
  const URL = "/models/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
})();

const imageUpload = document.getElementById("image-upload");
const imageEl = document.getElementById("image");
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file.type.match("image.*")) {
    const reader = new FileReader();
    reader.onload = async function () {
      imageEl.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(imageEl);
  const predictionSort = prediction.sort(
    (a, b) => b.probability - a.probability
  );
  const bestPredict = predictionSort[0];
  labelContainer.textContent = `${bestPredict.className}`;
  confidence.innerHTML = `Confidence : <strong>${
    bestPredict.probability.toFixed(2) * 100
  }%</strong>`;
}
