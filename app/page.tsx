"use client";

import { useEffect, useRef, useState } from "react";

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.6" r="1" className="fill" />
    </svg>
  );
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className="fill" d="M14.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8.4v3h2.7v8h3.1Z" />
    </svg>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showMobileConnect, setShowMobileConnect] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    let frame = 0;
    const updateScrollProgress = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 1.25, 1), 1);
      document.documentElement.style.setProperty("--scroll-progress", progress.toString());
      document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const inView = bounds.top < window.innerHeight * 0.88 && bounds.bottom > window.innerHeight * 0.12;
        element.classList.toggle("visible", inView);
      });
      document.querySelectorAll<HTMLElement>(".scroll-panel").forEach((panel) => {
        const bounds = panel.getBoundingClientRect();
        const panelProgress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
        panel.style.setProperty("--panel-progress", panelProgress.toString());
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 1.1 && bounds.bottom > 0) {
        element.classList.add("visible");
      }
      observer.observe(element);
    });
    document.documentElement.classList.add("motion-ready");
    updateScrollProgress();
    const socialSection = document.getElementById("connect");
    const socialObserver = socialSection
      ? new IntersectionObserver(
          ([entry]) => setShowMobileConnect(!entry.isIntersecting),
          { threshold: 0.18 },
        )
      : null;
    if (socialSection && socialObserver) socialObserver.observe(socialSection);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      socialObserver?.disconnect();
    };
  }, []);

  function tiltCard(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card || window.innerWidth < 701) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
  }

  return (
    <>
      <div className={`loader ${loading ? "" : "loaded"}`} role="status" aria-live="polite" aria-label="Loading profile">
        <div className="loader-mark">J<span>.</span></div>
        <div className="loader-line"><i /></div>
        <p>LOADING PROFILE</p>
      </div>
      <div className="noise" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <main className="page-shell" id="top">
        <nav className="topbar scroll-panel" aria-label="Main navigation">
          <a className="brand" href="#top"><span className="brand-dot" />JACOB / SOCIAL</a>
        </nav>

        <section className="hero scroll-panel">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> CREATIVE ENERGY / 01</p>
            <h1>Say hello<br /><em>to Jacob.</em></h1>
            <p className="intro">Visual storyteller. Creative mind. Let’s connect.</p>
          </div>
          <div className="portrait-wrap reveal reveal-delay">
            <div className="portrait-card" ref={cardRef} onMouseMove={tiltCard} onMouseLeave={() => { if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)"; }}>
              <div className="album-sleeve" aria-hidden="true" />
              <div className="album-disc" aria-hidden="true"><span>J.</span></div>
              <div className="card-shine" />
              <div className="card-top"><span className="card-label">SOCIAL PROFILE</span><span className="card-number">0001 / 26</span></div>
              <div className="portrait">
                <img className="profile-image" src="/jacob-profile.jfif" alt="Jacob Escaño" />
                <div className="portrait-caption">CREATIVE<br />DIRECTOR</div>
              </div>
              <div className="card-bottom"><span className="mini-mark">J<span>.</span></span><span className="card-name"><b>JACOB ESCAÑO</b><small>CREATIVE DIRECTOR</small></span><span className="signal">)))</span></div>
            </div>
            <a className="album-connect" href="#connect" aria-label="Tap to connect with Jacob"><b className="album-play" aria-hidden="true" /><span><small>NOW PLAYING</small>TAP TO CONNECT WITH ME</span><i aria-hidden="true" /></a>
          </div>
        </section>

        <section className="social-section scroll-panel" id="connect">
          <div className="section-heading reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> CHOOSE A PLATFORM / 02</p>
            <h2>Let’s keep<br /><em>in touch.</em></h2>
          </div>
          <div className="social-grid">
            <a className="social-link reveal" href="https://www.instagram.com/vs_rmr?psln=Yzg4Yjc1c3VzdDIz" target="_blank" rel="noreferrer"><span className="social-icon instagram"><Instagram /></span><span className="social-info"><b>Instagram</b><small>@vs_rmr</small></span><span className="arrow">↗</span></a>
            <a className="social-link reveal reveal-delay" href="https://www.facebook.com/share/1JsT9B5S6o/" target="_blank" rel="noreferrer"><span className="social-icon facebook"><Facebook /></span><span className="social-info"><b>Facebook</b><small>Jacob Escaño</small></span><span className="arrow">↗</span></a>
            <a className="social-link reveal reveal-delay-2" href="mailto:jacobromar310@gmail.com"><span className="social-icon email">@</span><span className="social-info"><b>Say hello</b><small>jacobromar310@gmail.com</small></span><span className="arrow">↗</span></a>
          </div>
        </section>

        <section className="quote-section scroll-panel reveal">
          <span className="quote-mark">“</span>
          <p><span>Good things happen when</span><br /><em>you make the first move.</em></p>
          <span className="quote-author">— JACOB ESCAÑO</span>
        </section>
        <footer className="scroll-panel"><span>© 2026 JACOB ESCAÑO</span><span className="footer-center">MADE TO BE <b>REMEMBERED</b></span><a href="#top">BACK TO TOP ↑</a></footer>
      </main>
      <a className={`mobile-connect scroll-panel ${showMobileConnect ? "" : "mobile-connect-hidden"}`} href="#connect"><span className="mobile-connect-dot" /> TAP TO CONNECT WITH ME <span>↗</span></a>
    </>
  );
}
