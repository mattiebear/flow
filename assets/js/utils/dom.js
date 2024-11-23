export function waitForElement(selector) {
  return new Promise((resolve) => {
    let el = document.querySelector(selector);

    if (el) {
      return resolve(el);
    }

    let observer = new MutationObserver(() => {
      let el = document.querySelector(selector);

      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
