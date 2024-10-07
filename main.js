document.getElementById("btn").addEventListener("click", testGS);
document.getElementById("btn2").addEventListener("click", addGS);
const suraResultTextElement = document.querySelector("#suraResult");
const loadingElement = document.querySelector("#loading");

async function addGS() {
  const sura = document.querySelector("#suraName").value;
  const category = document.querySelector("#suraCategory").value;
  const apiURL =
    "https://script.google.com/macros/s/AKfycbwphM9eOskP_RpmH94voH3zfmWbt5BYj9ojd2bAwYYzuAPD6_t-_JNl1ty10hNpmmoW/exec";

  if (sura && category) {
    const dataClient = {
      name: sura,
      category: category,
    };

    const response = await fetch(apiURL, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(dataClient),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    const result = await response.json();
    alert(result.success);
    location.reload();
  }
}

function testGS() {
  const apiURL =
    "https://script.google.com/macros/s/AKfycbwphM9eOskP_RpmH94voH3zfmWbt5BYj9ojd2bAwYYzuAPD6_t-_JNl1ty10hNpmmoW/exec";
  loadingElement.style.display = "block";
  suraResultTextElement.textContent = "";

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const suraListData = data.data;
      const suraList = suraListData.map((item) => item.name);
      const randomIndex = Math.floor(Math.random() * suraList.length);
      const randomSura = suraList[randomIndex];
      suraResultTextElement.textContent = randomSura;
    })
    .catch((error) => {
      suraResultTextElement.textContent = "Error fetching sura.";
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
}
