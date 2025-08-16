function getFormData() {
  const result = [];
  const questionBlocks = document.querySelectorAll('[role="listitem"]');

  questionBlocks.forEach((block) => {
    const questionText =
      block.querySelector('span.M7eMe')?.innerText?.trim() ||
      block.querySelector('.freebirdFormviewerComponentsQuestionBaseTitle')?.innerText?.trim() ||
      "";

    if (!questionText) return;

    const options = [];
    block.querySelectorAll('[role="radio"], [role="checkbox"]').forEach((opt) => {
      const text =
        opt.getAttribute('aria-label')?.trim() ||
        opt.querySelector('span.aDTYNe')?.innerText?.trim() ||
        opt.innerText?.trim();
      if (text) options.push(text);
    });

    result.push({ question: questionText, options });
  });

  return result;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getForm") {
    sendResponse(getFormData());
  }
});
