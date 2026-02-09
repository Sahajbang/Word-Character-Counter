let popup; 

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) {
    if (popup) {
      popup.remove();
      popup = null;
    }
    return;
  }

  const wordCount = selectedText.split(/\s+/).filter(word => word).length;
  const charCount = selectedText.length;

  // Remove existing popup
  if (popup) popup.remove();

  // Create a new popup
  popup = document.createElement("div");
  popup.className = "word-count-popup";
  popup.innerText = `📝 Words: ${wordCount} | 🔡 Chars: ${charCount}`;

  document.body.appendChild(popup);

  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  popup.style.top = `${window.scrollY + rect.bottom + 5}px`;
  popup.style.left = `${window.scrollX + rect.left}px`;

  setTimeout(() => {
    if (popup) {
      popup.remove();
      popup = null;
    }
  }, 4000);
});
