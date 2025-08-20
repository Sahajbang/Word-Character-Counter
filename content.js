let popup; // Holds the current popup so we can remove it before adding a new one

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  // If nothing is selected, remove existing popup if any
  if (!selectedText) {
    if (popup) {
      popup.remove();
      popup = null;
    }
    return;
  }

  // Calculate word and character count
  const wordCount = selectedText.split(/\s+/).filter(word => word).length;
  const charCount = selectedText.length;

  // Remove existing popup
  if (popup) popup.remove();

  // Create a new popup
  popup = document.createElement("div");
  popup.className = "word-count-popup";
  popup.innerText = `📝 Words: ${wordCount} | 🔡 Chars: ${charCount}`;

  // Append popup to body
  document.body.appendChild(popup);

  // Get position of selected text to place the popup
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  popup.style.top = `${window.scrollY + rect.bottom + 5}px`;
  popup.style.left = `${window.scrollX + rect.left}px`;

  // Optional: auto-remove after 3 seconds
  setTimeout(() => {
    if (popup) {
      popup.remove();
      popup = null;
    }
  }, 4000);
});
