import { useEffect } from "react";
import "./WeddingInvite.css"; // Import CSS below in this file

export default function WeddingInvite() {
  useEffect(() => {
    // ---- Music toggle ----
    const music = document.getElementById("bgMusic");
    const chk = document.getElementById("musicChk");

    if (chk) {
      chk.addEventListener("change", () => {
        if (chk.checked) music.play().catch(() => { });
        else music.pause();
      });
    }

    // ---- Share button ----
    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        if (navigator.share) {
          navigator
            .share({
              title: document.title,
              text: "You are invited!",
              url: window.location.href,
            })
            .catch(() => { });
        } else {
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => alert("Link Copied!"));
        }
      });
    }

    // ---- Countdown (23 April 2026) ----
    const target = new Date("2026-04-23T00:00:00");
    const cdEl = document.getElementById("countdown");

    function tick() {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        cdEl.textContent = "Today is the Day! 🎉";
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      cdEl.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
    }

    tick();
    setInterval(tick, 1000);

    // ---- Floating hearts & flowers ----
    const heartsContainer = document.querySelector(".hearts-container");
    const flowersContainer = document.querySelector(".flowers-container");

    function createHeart(x = null, y = null) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = x !== null ? x + "px" : Math.random() * window.innerWidth + "px";
      heart.style.top = y !== null ? y + "px" : window.innerHeight + "px";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";
      heart.style.width = 10 + Math.random() * 15 + "px";
      heart.style.height = heart.style.width;
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    }

    function createFlower(x = null, y = null) {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.left = x !== null ? x + "px" : Math.random() * window.innerWidth + "px";
      flower.style.top = y !== null ? y + "px" : window.innerHeight + "px";
      flower.style.animationDuration = 5 + Math.random() * 4 + "s";
      flower.style.width = 12 + Math.random() * 20 + "px";
      flower.style.height = flower.style.width;
      flowersContainer.appendChild(flower);
      setTimeout(() => flower.remove(), 9000);
    }

    // Spawn continuously
    const heartsInterval = setInterval(createHeart, 300);
    const flowersInterval = setInterval(createFlower, 500);

    // Mouse follow effect
    window.addEventListener("mousemove", (e) => {
      if (Math.random() < 0.05) createHeart(e.clientX, e.clientY);
      if (Math.random() < 0.03) createFlower(e.clientX, e.clientY);
    });

    // Cleanup on unmount
    return () => {
      clearInterval(heartsInterval);
      clearInterval(flowersInterval);
    };
  }, []);

  return (
    <>
      <div className="wrap">
        {/* Floating hearts & flowers */}
        <div className="hearts-container"></div>
        <div className="flowers-container"></div>

        <div className="nav fadeUp" style={{ "--d": "0s" }}>
          <div className="brand">[S.Monisha] ❤ [R.Naveen]</div>
          <div className="music-toggle">
            <label style={{ fontSize: "13px" }}>Play music</label>
            <input id="musicChk" type="checkbox" />
          </div>
        </div>

        {/* HERO */}
        <header className="hero fadeUp" style={{ "--d": "0.1s" }}>
          <div className="left stagger">
            <h1 className="title">You are invited to the wedding of</h1>
            <h2 className="subtitle">
              S.Monisha & R.Naveen
            </h2>
            <p className="event-meta">
              📅 <strong>23 April 2026</strong>   |   🕒{" "}
              <strong>[TIME]</strong>
            </p>
            <p className="event-meta">
              📍 <strong>Santharaghuram Kalyana Mandapam, Kattamanchi, Chittoor</strong>
            </p>
            <p style={{ marginTop: "14px", lineHeight: "1.5" }}>
              With love and happiness,we invite you and your family to our wedding.please join us and bless us
            </p>
            <button
              id="shareBtn"
              className="btn"
              style={{
                marginTop: "16px",
                background: "transparent",
                color: "var(--accent)",
                border: "2px solid rgba(181,137,0,0.12)",
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Share
            </button>
          </div>

          <div>
            <div className="photo-card fadeUp" style={{ "--d": "0.2s" }}>
              <img id="heroPhoto" src="/pic.png" alt="Couple" /> {/* UPDATED TO .jpg */}
              <div className="motif"></div>
              <div className="blossom"></div>
            </div>
          </div>
        </header>

        {/* VENUE */}
        <section className="card fadeUp" style={{ "--d": "0.25s" }}>
          <h3 style={{ marginTop: 0 }}>
            Venue Location <span>📍</span>
          </h3>
          <iframe
            src="https://maps.app.goo.gl/LQpTxt62BGARKU91A"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            title="venue"
          ></iframe>
        </section>

        {/* COUNTDOWN */}
        <section className="card fadeUp" style={{ "--d": "0.3s" }}>
          <h3 style={{ marginTop: 0 }}>Countdown to the Big Day</h3>
          <div
            id="countdown"
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#3b2b24",
              marginTop: "10px",
            }}
          >
            —
          </div>
        </section>

        {/* BLESSINGS */}
        <section className="card fadeUp" style={{ "--d": "0.35s" }}>
          <h3 style={{ marginTop: 0 }}>Blessings</h3>
          <p style={{ lineHeight: 1.6 }}>Your blessings mean the world to us.</p>
        </section>

        {/* PARENTS */}
        <section className="card fadeUp" style={{ "--d": "0.4s" }}>
          <h3 style={{ marginTop: 0 }}>Parents</h3>
          <p><strong>Bride’s Parents:</strong> [S.Sudhakar , S.Sangeetha]</p>
          <p><strong>Groom’s Parents:</strong> [Ravi , R.Lakshmi]</p>
        </section>

        {/* CONTACT */}
        <section className="card fadeUp" style={{ "--d": "0.45s" }}>
          <h3 style={{ marginTop: 0 }}>Contact</h3>
          <a
            href="tel:[9347157442]"
            className="btn"
            style={{
              padding: "12px 18px",
              background: "linear-gradient(90deg,var(--accent),#d49a02)",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Call for Venue Help
          </a>
        </section>

        {/* GALLERY */}
        <section className="card fadeUp" style={{ "--d": "0.5s" }}>
          <h3 style={{ marginTop: 0 }}>Gallery</h3>
          <div className="gallery">
            <img src="/gallery1.jpg" alt="" />
            <img src="/gallery2.jpg" alt="" />
            <img src="/gallery3.jpg" /> {/* UPDATED TO .jpg */}
          </div>
        </section>

        <footer className="fadeUp" style={{ "--d": "0.55s" }}>
          <p>Looking forward to celebrating with you ✨</p>
        </footer>
      </div>

      <audio id="bgMusic" loop src="/music.mp3"></audio>
    </>
  );
}