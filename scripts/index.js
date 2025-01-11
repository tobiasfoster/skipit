
const strings = {
  netflix: {
    skipIntro: 'Skip intro',
    continuePlaying: 'Continue playing',
  },
  disney: {
    skipIntro: 'SKIP INTRO',
  },
  amazon: {
    skipIntro: 'Skip Intro',
  },
}

let isNetflixEnabled = false
let isDisneyEnabled = false
let isAmazonEnabled = false
let clicked = false



chrome.storage.sync.get(["netflix", "disney", "amazon"]).then((result) => {
  isNetflixEnabled = result.netflix ?? true
  isDisneyEnabled = result.disney ?? true
  isAmazonEnabled = result.amazon ?? true
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.netflix) {
      isNetflixEnabled = changes.netflix.newValue ?? true;
    }
    if (changes.disney) {
      isDisneyEnabled = changes.disney.newValue ?? true;
    }
    if (changes.amazon) {
      isAmazonEnabled = changes.amazon.newValue ?? true;
    }
  }
});


function findElementByText(searchText) {
  const xpath = `//*[contains(text(),'${searchText}')]`;
  const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  return element;
}

// Modify the existing observer to also check for the button
const observer = new MutationObserver(() => {
  if (window.location.hostname.includes("netflix") && location.pathname.includes("watch") && isNetflixEnabled) {
    const skipIntroElement = findElementByText(strings.netflix.skipIntro);
    const continuePlayingElement = findElementByText(strings.netflix.continuePlaying);

    if (!skipIntroElement) {
      clicked = false
    }

    if (skipIntroElement && !clicked) {
      skipIntroElement.click();
      clicked = true
      console.log('%c[Intro Skipper] Intro skipped!', 'color: #2ecc71;');
    }

    if (continuePlayingElement) {
      continuePlayingElement.click();
      console.log('%c[Intro Skipper] Continue playing clicked!', 'color: #2ecc71;');
    }
  }

  if (window.location.hostname.includes("disneyplus") && isDisneyEnabled) {
    const skipIntroElement = findElementByText(strings.disney.skipIntro);

    if (!skipIntroElement) {
      clicked = false
    }

    if (skipIntroElement && !clicked) {
      skipIntroElement.click();
      clicked = true
      console.log('%c[Intro Skipper] Intro skipped!', 'color: #2ecc71;');
    }

  }

  if (window.location.hostname.includes("amazon") && isAmazonEnabled) {
    const skipIntroElement = findElementByText(strings.amazon.skipIntro);

    if (!skipIntroElement) {
      clicked = false
    }

    if (skipIntroElement && !clicked) {
      skipIntroElement.click();
      clicked = true
      console.log('%c[Intro Skipper] Intro skipped!', 'color: #2ecc71;');
    }
  }
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
