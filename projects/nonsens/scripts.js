const part1 = [
  "don't",
  "please",
  "Expect to",
  "Be happy to",
  "help others",
  "Be grateful to",
  "Try to",
  "Remember to",
  "Never forget to",
  "Always",
  "Feel free to",
  "Strive to",
  "Encourage others to",
  "Seek to",
  "Be prepared to",
  "Make sure to",
  "Consider to",
  "Be mindful to",
  "Stay ready to",
  "Promise to",
  "Be willing to",
];

const part2 = [
  "do",
  "run",
  "jump",
  "swim",
  "fly",
  "walk",
  "speak",
  "live",
  "exist",
  "sleep",
  "exercise",
  "tweet",
  "learn",
  "explore",
  "create",
  "dream",
  "love",
  "grow",
  "change",
  "imagine",
  "share",
  "listen",
  "believe",
  "achieve",
  "focus",
  "play",
  "work",
  "give",
  "receive",
  "build",
  "observe",
  "remember",
  "appreciate",
  "celebrate",
  "understand",
  "connect",
  "inspire",
  "trust",
  "help",
  "support",
  "lead",
  "follow",
];

const part3 = [
  "ahead",
  "back",
  "forever",
  "today",
  "tomorrow",
  "always",
  "now",
  "freely",
  "gently",
  "wholeheartedly",
  "completely",
  "together",
  "apart",
  "joyfully",
  "gracefully",
  "confidently",
  "bravely",
  "boldly",
  "happily",
  "mindfully",
  "thoughtfully",
  "kindly",
  "lovingly",
  "passionately",
  "intently",
  "eagerly",
  "deliberately",
];

const setMessage = () => {
  const messageElement = document.querySelector("p");
  const message =
    part1[Math.floor(Math.random() * part1.length)] +
    " " +
    part2[Math.floor(Math.random() * part2.length)] +
    " " +
    part3[Math.floor(Math.random() * part3.length)];
  messageElement.innerHTML = `"${message}"`;
};

document.addEventListener("click", setMessage);
document.addEventListener("keydown", setMessage);
