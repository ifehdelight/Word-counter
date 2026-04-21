const textarea = document.getElementById('input');
const wordsEl = document.getElementById('words');
const charsEl = document.getElementById('chars');
const charsNoSpaceEl = document.getElementById('chars-nospace');
const readingEl = document.getElementById('reading-time');
const clearBtn = document.getElementById('clear');
const copyBtn = document.getElementById('copy');
const selectBtn = document.getElementById('select');

    // Helper: count words robustly by splitting on whitespace
function countWords(text) {
      // trim so leading/trailing whitespace doesn't create empty tokens
      // split on one-or-more whitespace characters and filter out empty strings
    if (!text) return 0;
      return text.trim().split(/\s+/).filter(Boolean).length;
}

function countCharsWithSpaces(text) {
      return text.length;
}

function countCharsNoSpaces(text) {
      return text.replace(/\s+/g, '').length;
}

    // Estimate reading time (words per minute)
function readingTimeMinutes(wordCount, wpm = 200) {
  if (wordCount === 0) return '0 min';
  const mins = wordCount / wpm;
  if (mins < 1) return '< 1 min';
  return Math.ceil(mins) + ' min';
}

    // Update UI
function update() {
  const text = textarea.value;
  const words = countWords(text);
  const chars = countCharsWithSpaces(text);
  const charsNoSpace = countCharsNoSpaces(text);

  wordsEl.textContent = `Words: ${words}`;
  charsEl.textContent = `Characters (with spaces): ${chars}`;
  charsNoSpaceEl.textContent = `Characters (no spaces): ${charsNoSpace}`;
  readingEl.textContent = `Reading time: ${readingTimeMinutes(words)}`;
    }

    // Events
textarea.addEventListener('input', update);

clearBtn.addEventListener('click', () => {
  textarea.value = '';
  textarea.focus();
  update();
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textarea.value);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy text', 1200);
  } catch (err) {
        // fallback
    textarea.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy text', 1200);
  }
});

selectBtn.addEventListener('click', () => {
  textarea.select();
  textarea.focus();
});
update();
