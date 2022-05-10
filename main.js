// copy to clipboard
var btns = document.querySelectorAll(".copy-text-button");
var clipboard = new ClipboardJS(btns);

clipboard.on("success", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
});

clipboard.on("error", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
});

// function to find the nth instance of character in string
function nthIndex(str, pat, n) {
  var L = str.length,
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

// this function takes a string and split string list as parameters and slices off entirely after that character
function splitSliceFunc(splitStr, splitStrList) {
  for (i = 0; i < splitStrList.length; i++) {
    splitStr = splitStr.split(splitStrList[i])[0];
  }
  return splitStr;
}

function minifyAmzUrl(params) {
  try {
    console.log(params);
    let sliceUptoAsinList = ["/dp/", "/gp/product/"]; // list for slice occurrence before asin
    let sliceAfterAsinList = ["/", "?"]; // list for slice occurrence after the asin
    let sliceUptoAsin; // variable to store index of slice occurrence before asin
    let shortenedUrl;
    // if else statements for all the possible slice occurrences before asin
    if (params.includes(sliceUptoAsinList[0])) {
      sliceUptoAsin = nthIndex(params, "/dp/", 1);
      shortenedUrl = params.slice(sliceUptoAsin + 4);
      console.log(sliceUptoAsin, shortenedUrl);
    } else if (params.includes(sliceUptoAsinList[1])) {
      sliceUptoAsin = nthIndex(params, "/gp/product/", 1);
      shortenedUrl = params.slice(sliceUptoAsin + 12);
      console.log(sliceUptoAsin, shortenedUrl);
    } else {
      throw "url format not supported";
    }
    if (sliceUptoAsin === -1) {
      throw "url format not supported";
    } else {
    }
    // removes everything after the asin following 'sliceAfterAsinList'
    shortenedUrl = splitSliceFunc(shortenedUrl, sliceAfterAsinList);
    console.log(shortenedUrl);
    document.querySelector(
      "#amzoutput"
    ).innerHTML = `https://www.amazon.com/dp/${shortenedUrl}/`;
    document.querySelector(
      "#amzoutputasin"
    ).innerHTML = `${shortenedUrl}`;
  } catch (error) {
    document
      .querySelectorAll("#amzoutput, #amzoutputasin")
      .forEach((item) => {
        item.innerHTML = "url format not supported";
      });
    // logMyErrors(error);
    console.log(error);
  }
}

// form handling amz url
// this functions gets the input values
document.getElementById("getamzform").onsubmit = function values() {
  const formValues = document.getElementById("amzurl").value;
  if (formValues.startsWith("https://www.amazon.com/")) {
    minifyAmzUrl(formValues);
  } else {
    document
      .querySelectorAll("#amzoutput, #amzoutputasin")
      .forEach((item) => {
        item.innerHTML = "not a valid amz url";
      });
  }
  return false; // prevents reload on form submit
};

// reset the outputs on clicking reset
document.querySelectorAll(".reset-output").forEach((item) => {
  item.addEventListener("click", (event) => {
    document
      .querySelectorAll("#amzoutput, #amzoutputasin")
      .forEach((item) => {
        item.innerHTML = "output";
      });
  });
});