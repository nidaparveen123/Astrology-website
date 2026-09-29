const counters = document.querySelectorAll('.counter-number');
    
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // total time to count in ms
          const stepTime = Math.max(Math.floor(duration / target), 20);
          let count = 0;
    
          const updateCount = () => {
            count++;
            counter.innerText = count;
            if (count < target) {
              setTimeout(updateCount, stepTime);
            } else {
              counter.innerText = target;
            }
          };
    
          updateCount();
        });


       window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  let rotation = scrollY / 5; // divide by 5 → 5x slower
  document.querySelector(".circle-img").style.transform =
    `rotate(${rotation}deg)`;
});


/* ---------- Know your Zodiac Sign ---------- */
const zodiacForm = document.getElementById("zodiac-form");
const zodiacResult = document.getElementById("zodiac-result");
const zodiacRecheck = document.getElementById("zodiac-recheck");

if (zodiacForm) {
  zodiacForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dobValue = document.getElementById("dob").value; // "YYYY-MM-DD"
    if (!dobValue) return;

    const [, month, day] = dobValue.split("-").map(Number);
    const sign = getZodiacSign(month, day);

    zodiacResult.textContent = `Your zodiac sign is ${sign.name} ${sign.symbol}`;
    zodiacRecheck.hidden = false; // show the recheck button
  });

  zodiacRecheck.addEventListener("click", () => {
    zodiacForm.reset();             // clear the fields
    zodiacResult.textContent = "";  // clear the result
    zodiacRecheck.hidden = true;    // hide the button again
    document.getElementById("dob").focus();
  });
}

function getZodiacSign(month, day) {
  // Each sign starts on this date; the sign holds until the next start date.
  const starts = [
    { name: "Capricorn",   symbol: "♑", m: 1,  d: 1  }, // Jan 1 – Jan 19 (Capricorn continues from Dec 22)
    { name: "Aquarius",    symbol: "♒", m: 1,  d: 20 },
    { name: "Pisces",      symbol: "♓", m: 2,  d: 19 },
    { name: "Aries",       symbol: "♈", m: 3,  d: 21 },
    { name: "Taurus",      symbol: "♉", m: 4,  d: 20 },
    { name: "Gemini",      symbol: "♊", m: 5,  d: 21 },
    { name: "Cancer",      symbol: "♋", m: 6,  d: 21 },
    { name: "Leo",         symbol: "♌", m: 7,  d: 23 },
    { name: "Virgo",       symbol: "♍", m: 8,  d: 23 },
    { name: "Libra",       symbol: "♎", m: 9,  d: 23 },
    { name: "Scorpio",     symbol: "♏", m: 10, d: 23 },
    { name: "Sagittarius", symbol: "♐", m: 11, d: 22 },
    { name: "Capricorn",   symbol: "♑", m: 12, d: 22 },
  ];

  let result = starts[0];
  for (const s of starts) {
    if (month > s.m || (month === s.m && day >= s.d)) result = s;
  }
  return result;
}


// Zodiac Modal Functionality
const zodiacInfo = {
  Aries: { dates: "March 21 – April 19", text: "Aries kicks off the zodiac year with bold, fast-moving energy. Ruled by Mars, Aries natives are natural initiators — confident, competitive, and quick to act on instinct." },
  Taurus: { dates: "April 20 – May 20", text: "Taurus is grounded and steady, ruled by Venus. This earth sign values comfort, loyalty, and the finer things in life, and tends to move at its own unhurried pace." },
  Gemini: { dates: "May 21 – June 20", text: "Gemini is curious, quick-witted, and ruled by Mercury. Represented by the twins, Geminis are adaptable communicators who thrive on variety and new ideas." },
  Cancer: { dates: "June 21 – July 22", text: "Cancer is deeply intuitive and emotionally attuned, ruled by the Moon. This water sign values home, family, and close emotional bonds above almost everything else." },
  Leo: { dates: "July 23 – August 22", text: "Leo is warm, expressive, and ruled by the Sun. Natural performers, Leos love to lead, create, and be seen, and they bring generosity and loyalty to those close to them." },
  Virgo: { dates: "August 23 – September 22", text: "Virgo is precise, analytical, and ruled by Mercury. This earth sign has a sharp eye for detail and a strong drive to be genuinely useful and improve things around them." },
  Libra: { dates: "September 23 – October 22", text: "Libra seeks balance and harmony, ruled by Venus. Diplomatic and fair-minded, Libras are drawn to partnership, beauty, and finding the middle ground." },
  Scorpio: { dates: "October 23 – November 21", text: "Scorpio is intense and deeply perceptive, ruled by Mars and Pluto. This water sign is known for its emotional depth, determination, and ability to see beneath the surface." },
  Sagittarius: { dates: "November 22 – December 21", text: "Sagittarius is adventurous and optimistic, ruled by Jupiter. Freedom-loving and philosophical, Sagittarians are drawn to travel, big ideas, and honest conversation." },
  Capricorn: { dates: "December 22 – January 19", text: "Capricorn is disciplined and ambitious, ruled by Saturn. This earth sign plays the long game, valuing structure, responsibility, and hard-earned achievement." },
  Aquarius: { dates: "January 20 – February 18", text: "Aquarius is independent and forward-thinking, ruled by Uranus and Saturn. Known for original ideas and a strong sense of fairness, Aquarians often march to their own beat." },
  Pisces: { dates: "February 19 – March 20", text: "Pisces is imaginative and empathetic, ruled by Neptune and Jupiter. This water sign is deeply intuitive, artistic, and attuned to the feelings of others." },
};

const modalOverlay = document.getElementById("zodiacModalOverlay");
const modalTitle = document.getElementById("zodiacModalTitle");
const modalDates = document.getElementById("zodiacModalDates");
const modalText = document.getElementById("zodiacModalText");
const modalClose = document.getElementById("zodiacModalClose");

if (modalOverlay) {
  document.querySelectorAll(".know-more").forEach((el) => {
    el.addEventListener("click", () => {
      const sign = el.getAttribute("data-sign");
      const info = zodiacInfo[sign];
      if (!info) return;

      modalTitle.textContent = sign;
      modalDates.textContent = info.dates;
      modalText.textContent = info.text;
      modalOverlay.classList.add("active");
    });
  });

  const closeZodiacModal = () => modalOverlay.classList.remove("active");

  modalClose.addEventListener("click", closeZodiacModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeZodiacModal(); // clicked the dark backdrop, not the box
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeZodiacModal();
  });
}