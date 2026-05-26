// tdp-sections.jsx — TruckDispatch Pro landing sections (refined / quiet)

// ─── Reveal primitives ────────────────────────────────────────────
function useRevealObserver() {
  React.useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    targets.forEach((t) => t.classList.add("tdp-pre-reveal"));

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
      targets.forEach((t) => observer.observe(t));
    }

    const safety = setTimeout(() => {
      targets.forEach((t) => t.classList.add("in"));
    }, 1500);

    return () => { clearTimeout(safety); if (observer) observer.disconnect(); };
  }, []);
}

// ─── Typewriter highlight ─────────────────────────────────────────
function useInView(ref) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function TypewriterHighlight({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const words = String(children).split(" ").filter(Boolean);
  return (
    <span ref={ref}>
      {words.map((word, i) => (
        <span
          key={i}
          className={"tdp-tw-word" + (inView ? " tdp-tw-play" : "")}
          style={{ "--tw-delay": `${delay + i * 220}ms` }}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────
function Logo() {
  return (
    <a href="#" className="tdp-logo">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" fill="currentColor" />
      </svg>
      <span>TruckDispatch <em>Pro</em></span>
    </a>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="tdp-nav">
      <div className="tdp-nav-inner">
        <Logo />
        <nav className="tdp-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="tdp-nav-cta">
          <a href="#" className="tdp-link-quiet">Sign in</a>
          <a href="#contact" className="tdp-btn tdp-btn-sm">Book a demo</a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="tdp-hero">
      <img src="assets/hero-bg.jpg" alt="" className="tdp-hero-bg-img" aria-hidden="true" />
      <div className="tdp-container">
        <div className="tdp-status" data-reveal>
          <span className="tdp-status-dot" />
          <span className="tdp-mono">Bella AI · Online</span>
        </div>

        <h1 className="tdp-hero-h">
          <TypewriterHighlight delay={300}>Dispatch, run by AI.</TypewriterHighlight>
          <span className="tdp-hero-aside">Bella AI works 24/7. So you don't have to.</span>
        </h1>

        <p className="tdp-hero-sub" data-reveal>
          Bella AI — your AI dispatch agent — negotiates rates, handles every conversation, coordinates drivers, and monitors every load from lead to delivery. Deployed across your Dispatch and Last Mile operations.
        </p>

        <div className="tdp-hero-cta" data-reveal>
          <a href="#contact" className="tdp-btn">Book a demo</a>
          <a href="#bella" className="tdp-btn-text">Meet Bella AI <span className="tdp-arrow">→</span></a>
        </div>

        <div className="tdp-hero-tags" data-reveal>
          <span>AI Negotiation</span>
          <span className="tdp-tag-dot" />
          <span>AI Communication</span>
          <span className="tdp-tag-dot" />
          <span>AI Monitoring</span>
          <span className="tdp-tag-dot" />
          <span>AI Routing</span>
        </div>
      </div>

      <div className="tdp-hero-stage" data-reveal>
        <HeroDashboard />
      </div>
    </section>
  );
}

// ─── Hero dashboard + Bella AI floating card ─────────────────────────
function HeroDashboard() {
  const [idx, setIdx] = React.useState(0);
  const actions = [
    { tag: "Negotiation", msg: "Load #AB01 secured at $2,450 — above target rate", type: "ok" },
    { tag: "Last Mile", msg: "14 delivery routes optimized — 52 min saved today", type: "ok" },
    { tag: "Alert resolved", msg: "Load #WJ19 rerouted via Birmingham — ETA restored", type: "warn" },
    { tag: "Communication", msg: "ETA update sent to AKS Logistics automatically", type: "info" },
  ];
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % actions.length), 3200);
    return () => clearInterval(t);
  }, []);
  const a = actions[idx];
  return (
    <div className="tdp-hero-visual">
      <div className="tdp-screen">
        <div className="tdp-screen-chrome">
          <div className="tdp-chrome-dots"><i /><i /><i /></div>
          <div className="tdp-chrome-url tdp-mono">app.truckdispatch.pro · operations</div>
          <div className="tdp-chrome-actions tdp-mono">
            <span className="tdp-live-dot" />
            <span>LIVE</span>
          </div>
        </div>
        <img src="assets/load-dashboard.png" alt="TruckDispatch Pro operations dashboard" style={{ width: "100%", display: "block" }} />
      </div>
      <div className="tdp-hero-bella" key={idx}>
        <div className="tdp-hero-bella-h">
          <span className="tdp-mono tdp-dim">Bella AI · {a.tag}</span>
          <span className={"tdp-tag tdp-mono " + (a.type === "ok" ? "tdp-tag-ok" : a.type === "warn" ? "tdp-tag-warn" : "")}>{a.type === "ok" ? "DONE" : a.type === "warn" ? "FIXED" : "SENT"}</span>
        </div>
        <p className="tdp-hero-bella-msg">{a.msg}</p>
      </div>
    </div>
  );
}

// ─── AI stats bar ─────────────────────────────────────────────────
function AIStats() {
  const stats = [
    { n: "94%",  label: "of communications handled by Bella AI" },
    { n: "+14%", label: "average rate above negotiation floor" },
    { n: "2.1s", label: "AI response time to inbound messages" },
    { n: "24/7", label: "active load monitoring, no gaps" },
  ];
  return (
    <section className="tdp-aistats">
      <div className="tdp-container">
        <div className="tdp-aistats-grid">
          {stats.map(s => (
            <div key={s.n} className="tdp-aistat" data-reveal>
              <b>{s.n}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Two AI systems ────────────────────────────────────────────────
function TwoProducts() {
  return (
    <section className="tdp-twopr">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>Two AI systems. One platform.</div>
        <h2 className="tdp-section-h" data-reveal>Bella AI, deployed across<br />your entire operation.</h2>
        <div className="tdp-twopr-grid">
          <div className="tdp-twopr-card" data-reveal>
            <div className="tdp-twopr-label tdp-mono">Dispatch System</div>
            <h3>AI dispatch for any haul,<br />any distance.</h3>
            <p>Bella AI manages the full dispatch lifecycle — negotiating rates, coordinating carriers and drivers, handling communications, and monitoring every load regardless of haul type or distance.</p>
            <ul>
              <li><span className="tdp-bullet" />AI-driven lead & load lifecycle</li>
              <li><span className="tdp-bullet" />Autonomous rate negotiation</li>
              <li><span className="tdp-bullet" />Carrier & driver AI coordination</li>
              <li><span className="tdp-bullet" />Real-time P&amp;L and margin tracking</li>
            </ul>
          </div>
          <div className="tdp-twopr-card tdp-twopr-card-alt" data-reveal>
            <div className="tdp-twopr-label tdp-mono">Last Mile System</div>
            <h3>AI-powered last mile,<br />optimized at every stop.</h3>
            <p>Bella AI plans routes, coordinates drivers in real time, and handles every customer notification automatically — so your last mile operation runs without manual intervention.</p>
            <ul>
              <li><span className="tdp-bullet" />AI dynamic route optimization</li>
              <li><span className="tdp-bullet" />Live driver AI coordination</li>
              <li><span className="tdp-bullet" />Automated delivery communications</li>
              <li><span className="tdp-bullet" />AI-verified proof of delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problems ─────────────────────────────────────────────────────
function Problems() {
  const items = [
    { n: "01", problem: "Hours lost chasing loads", detail: "Dispatchers spend most of their day on the phone — negotiating, following up, and repeating themselves. That time could be running more loads." },
    { n: "02", problem: "Communication scattered everywhere", detail: "Emails, WhatsApp, phone calls, texts — no single view of what's been said, promised, or missed." },
    { n: "03", problem: "Operations don't scale with volume", detail: "Every new load requires more headcount. Growth hits a ceiling because the work is manual, not systematic." },
    { n: "04", problem: "Visibility only when things go wrong", detail: "Delays, stuck loads, missed deliveries — caught too late to fix. Reactive is the default mode." },
  ];
  return (
    <section className="tdp-problems">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>Why TruckDispatch Pro exists</div>
        <h2 className="tdp-section-h" data-reveal>The problems we're solving.</h2>
        <div className="tdp-problems-grid">
          {items.map(it => (
            <div key={it.n} className="tdp-problem-item" data-reveal>
              <span className="tdp-mono tdp-dim">{it.n}</span>
              <h4>{it.problem}</h4>
              <p>{it.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bella AI ─────────────────────────────────────────────────────
function BellaAI() {
  const caps = [
    "Negotiates rates within your defined floor, target, and ceiling",
    "Communicates with clients, carriers, and drivers automatically",
    "Monitors every load for delays, issues, and opportunities",
    "Surfaces critical alerts before they become problems",
    "Coordinates driver assignments based on HOS and proximity",
    "Handles follow-ups, confirmations, and document delivery",
  ];
  return (
    <section className="tdp-bella-section" id="bella">
      <div className="tdp-container">
        <div className="tdp-bella-inner">
          <div className="tdp-bella-copy" data-reveal>
            <div className="tdp-eyebrow tdp-mono">Meet your AI dispatch agent</div>
            <h2 className="tdp-section-h" style={{ marginBottom: 16 }}>Bella AI.</h2>
            <p className="tdp-section-sub" style={{ marginBottom: 32 }}>
              Bella AI is at the core of TruckDispatch Pro. She operates around the clock — handling negotiation, communication, coordination, and monitoring — so your team can focus on growth, not admin.
            </p>
            <ul className="tdp-bella-caps">
              {caps.map(c => (
                <li key={c}><span className="tdp-bullet" />{c}</li>
              ))}
            </ul>
          </div>
          <div className="tdp-bella-demo" data-reveal>
            <BellaChat />
          </div>
        </div>
      </div>
    </section>
  );
}

function BellaChat() {
  const [count, setCount] = React.useState(0);
  const msgs = [
    { from: "system", text: "Load #8624 needs rate negotiation — AKS Logistics" },
    { from: "bella",  text: "Initiating negotiation. Contacting AKS Logistics now." },
    { from: "client", text: "Best offer: $1,900 for Chicago → Atlanta." },
    { from: "bella",  text: "Counteroffer sent: $2,200. Within approved range ✓" },
    { from: "client", text: "Accepted at $2,150. Sending confirmation." },
    { from: "bella",  text: "Confirmed. Load #8624 locked at $2,150. Rate is $34 above floor. Documents sent to driver." },
  ];
  React.useEffect(() => {
    if (count >= msgs.length) {
      const t = setTimeout(() => setCount(0), 2500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount(c => c + 1), count === 0 ? 600 : 1400);
    return () => clearTimeout(t);
  }, [count]);
  return (
    <div className="tdp-bchat">
      <div className="tdp-bchat-head">
        <div className="tdp-bchat-id">
          <span className="tdp-bchat-avatar">B</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Bella AI</div>
            <div className="tdp-mono tdp-dim" style={{ fontSize: 10 }}>AI Dispatch Agent</div>
          </div>
        </div>
        <span className="tdp-tag tdp-tag-ok tdp-mono">ACTIVE</span>
      </div>
      <div className="tdp-bchat-msgs">
        {msgs.slice(0, count).map((m, i) => (
          <div key={i} className={"tdp-bchat-msg tdp-bchat-" + m.from}>
            <div className="tdp-mono tdp-dim tdp-bchat-sender">
              {m.from === "bella" ? "Bella AI" : m.from === "client" ? "AKS Logistics" : "System"}
            </div>
            <div className="tdp-bchat-bubble">{m.text}</div>
          </div>
        ))}
        {count < msgs.length && count > 0 && (
          <div className="tdp-bchat-typing"><span /><span /><span /></div>
        )}
      </div>
    </div>
  );
}

// ─── Lead & load lifecycle ─────────────────────────────────────────
function LoadLifecycle() {
  const stages = [
    { n: "01", label: "Lead capture",  desc: "Bella AI identifies and qualifies inbound load opportunities from brokers and direct clients." },
    { n: "02", label: "Negotiation",   desc: "AI negotiates rates automatically — floor, target, ceiling all set by you." },
    { n: "03", label: "Assignment",    desc: "Driver assigned based on HOS compliance, location, and load requirements." },
    { n: "04", label: "In transit",    desc: "Real-time tracking with proactive alerts for delays, issues, and ETA changes." },
    { n: "05", label: "Delivery",      desc: "POD captured, customer notified, and load closed automatically." },
    { n: "06", label: "Invoicing",     desc: "Invoice generated and sent with all supporting documents attached." },
  ];
  return (
    <section className="tdp-lifecycle">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>End-to-end automation</div>
        <h2 className="tdp-section-h" data-reveal>Lead to delivery.<br /><span className="tdp-section-aside">Every step, handled.</span></h2>
        <p className="tdp-section-sub" data-reveal>Every stage of the load lifecycle — automated, tracked, and optimized by Bella AI so nothing falls through the cracks.</p>
        <div className="tdp-lifecycle-flow" data-reveal>
          {stages.map((s, i) => (
            <div key={s.n} className="tdp-lifecycle-stage">
              {i < stages.length - 1 && <div className="tdp-lifecycle-connector" />}
              <div className="tdp-lifecycle-node">
                <span className="tdp-mono">{s.n}</span>
              </div>
              <h4 className="tdp-lifecycle-label">{s.label}</h4>
              <p className="tdp-lifecycle-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Paradigm shift (manual vs AI) ────────────────────────────────
function ParadigmShift() {
  const manual = [
    "Chasing brokers",
    "Switching between tools",
    "Reacting to issues late",
    "Losing time in follow-ups",
  ];
  const ai = [
    "Automated negotiation",
    "Unified single platform",
    "Proactive issue resolution",
    "Instant communication",
  ];
  return (
    <section className="tdp-paradigm">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>The paradigm shift</div>
        <h2 className="tdp-section-h">
          <TypewriterHighlight>Dispatch hasn't evolved. Until now.</TypewriterHighlight>
        </h2>
        <p className="tdp-section-sub" data-reveal>
          TruckDispatch Pro doesn't just help you manage loads. It actively moves them forward.
        </p>

        <div className="tdp-shift-grid">
          <div className="tdp-shift-col" data-reveal>
            <div className="tdp-shift-label tdp-mono">The manual era</div>
            <ul>
              {manual.map((m) => (
                <li key={m}><span className="tdp-shift-mark">×</span>{m}</li>
              ))}
            </ul>
          </div>
          <div className="tdp-shift-col on" data-reveal>
            <div className="tdp-shift-label tdp-mono">The AI-powered system era</div>
            <ul>
              {ai.map((a) => (
                <li key={a}><span className="tdp-shift-mark good">✓</span>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tdp-shift-caption" data-reveal>A system that runs your operations for you.</p>
      </div>
    </section>
  );
}

// ─── Redefining dispatch ──────────────────────────────────────────
function RedefiningDispatch() {
  return (
    <section className="tdp-redefine">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>Redefining dispatch</div>
        <h2 className="tdp-section-h" data-reveal>
          An operating system for modern dispatch.
        </h2>
        <p className="tdp-redefine-lede" data-reveal>
          This is not a dashboard. This is not a TMS. This is a decision-making engine that runs your operations end-to-end.
        </p>

        <div className="tdp-redefine-grid">
          <RedefineItem n="01" label="Tracks every load" />
          <RedefineItem n="02" label="Communicates automatically" />
          <RedefineItem n="03" label="Resolves bottlenecks" />
          <RedefineItem n="04" label="Optimizes outcomes in real time" />
        </div>
      </div>
    </section>
  );
}

function RedefineItem({ n, label }) {
  return (
    <div className="tdp-redefine-item" data-reveal>
      <span className="tdp-mono tdp-dim">{n}</span>
      <p>{label}</p>
    </div>
  );
}

// ─── Product in action — sticky scroll ────────────────────────────
function ProductInAction() {
  const features = [
    {
      n: "01",
      label: "AI command center",
      h: "Bella AI's live brain. Every load, every risk.",
      body: "A real-time AI view of your entire operation — Bella AI surfaces what needs attention, flags risks before they escalate, and keeps every load moving without you having to ask.",
      img: "assets/load-dashboard.png",
    },
    {
      n: "02",
      label: "AI communication",
      h: "Bella AI reads, writes, and sends. Zero manual work.",
      body: "Every channel — email, WhatsApp, SMS — unified and handled by Bella AI. She understands context, drafts responses, and communicates with clients and drivers automatically.",
      img: "assets/communication.png",
    },
    {
      n: "03",
      label: "AI execution engine",
      h: "Bella AI negotiates, schedules, and moves loads forward.",
      body: "Set your rules once. Bella AI executes — negotiating rates, assigning drivers, triggering follow-ups, and resolving issues autonomously based on live conditions.",
      img: "assets/scheduling.png",
    },
  ];

  const [active, setActive] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const scrollable = sectionH - vh;
      if (scrollable <= 0) return;
      const progress = Math.min(1, scrolled / scrollable);
      const idx = Math.min(features.length - 1, Math.floor(progress * features.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const f = features[active];

  return (
    <section
      ref={sectionRef}
      className="tdp-sf-section"
      id="features"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div className="tdp-sf-sticky">
        <div className="tdp-sf-imgs">
          {features.map((feat, i) => (
            <img
              key={i}
              src={feat.img}
              alt={feat.label}
              className={"tdp-sf-img" + (i === active ? " tdp-sf-img-on" : "")}
            />
          ))}
          <div className="tdp-sf-counter">
            <div className="tdp-sf-counter-line" />
            <span className="tdp-mono">{String(active + 1).padStart(2, "0")}</span>
          </div>
          <div className="tdp-sf-dots">
            {features.map((_, i) => (
              <span key={i} className={"tdp-sf-dot" + (i === active ? " on" : "")} />
            ))}
          </div>
        </div>
        <div className="tdp-sf-foot">
          <div className="tdp-sf-foot-inner">
            <div className="tdp-sf-left" key={active}>
              <div className="tdp-mono tdp-dim">Feature {f.n}</div>
              <h3 className="tdp-sf-h">{f.h}</h3>
            </div>
            <p className="tdp-sf-body" key={"b" + active}>{f.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Cap UI previews ──────────────────────────────────────────────
function CapLoadMgmt() {
  const stages = [
    { l: "REC", n: 3, w: 40 },
    { l: "NEG", n: 5, w: 65, on: true },
    { l: "ASS", n: 2, w: 80 },
    { l: "TRN", n: 8, w: 55 },
    { l: "DEL", n: 12, w: 90 },
  ];
  return (
    <div className="tdp-cpv">
      <div className="tdp-cpv-pipeline">
        {stages.map(s => (
          <div key={s.l} className={"tdp-cpv-stage" + (s.on ? " on" : "")}>
            <div className="tdp-cpv-bar"><i style={{ width: s.w + "%" }} /></div>
            <b>{s.n}</b>
            <span className="tdp-mono">{s.l}</span>
          </div>
        ))}
      </div>
      {[
        { id: "AB01", route: "Chicago → Atlanta", rate: "$1,700", ok: true },
        { id: "WJ19", route: "Topeka → Dallas", rate: "$1,038", ok: false },
        { id: "SK04", route: "El Paso → Glendale", rate: "$2,140", ok: true },
      ].map(r => (
        <div key={r.id} className={"tdp-cpv-row" + (!r.ok ? " warn" : "")}>
          <span className="tdp-mono tdp-dim">{r.id}</span>
          <span>{r.route}</span>
          <b>{r.rate}</b>
        </div>
      ))}
    </div>
  );
}

function CapDetails() {
  return (
    <div className="tdp-cpv">
      <div className="tdp-cpv-card">
        <div className="tdp-cpv-card-h">
          <span className="tdp-mono tdp-dim">#AB01 · Chicago → Atlanta</span>
          <span className="tdp-tag tdp-tag-ok tdp-mono">ACTIVE</span>
        </div>
        <div className="tdp-cpv-metrics">
          <div className="tdp-cpv-metric"><span className="tdp-mono tdp-dim">Revenue</span><b>$2,140</b></div>
          <div className="tdp-cpv-metric"><span className="tdp-mono tdp-dim">Fuel est.</span><b>$340</b></div>
          <div className="tdp-cpv-metric"><span className="tdp-mono tdp-dim">Net margin</span><b className="tdp-pos">$1,800</b></div>
          <div className="tdp-cpv-metric"><span className="tdp-mono tdp-dim">Rate/mi</span><b>$2.53</b></div>
        </div>
        <div className="tdp-cpv-progress-row">
          <div className="tdp-cpv-progress-bar">
            <div style={{ width: "62%" }} />
          </div>
          <span className="tdp-mono tdp-dim">847 mi · stop 2 of 3</span>
        </div>
      </div>
    </div>
  );
}

function CapLoadCreate() {
  return (
    <div className="tdp-cpv">
      <div className="tdp-cpv-form">
        {[
          { label: "Origin", val: "Chicago, IL" },
          { label: "Destination", val: "Atlanta, GA" },
          { label: "Rate", val: "$2,200" },
          { label: "Equipment", val: "Dry Van ▾" },
        ].map(f => (
          <div key={f.label} className="tdp-cpv-field">
            <span className="tdp-mono tdp-dim">{f.label}</span>
            <span className="tdp-cpv-val">{f.val}</span>
          </div>
        ))}
        <div className="tdp-cpv-submit tdp-mono">+ Create Load</div>
      </div>
    </div>
  );
}

function CapDocs() {
  return (
    <div className="tdp-cpv">
      {[
        { name: "Bill of Lading #8821", status: "SIGNED", ok: true },
        { name: "Proof of Delivery", status: "PENDING", ok: false },
        { name: "Rate Confirmation #4821", status: "READY", ok: true },
        { name: "Invoice #INV-0042", status: "SENT", ok: true },
      ].map(d => (
        <div key={d.name} className="tdp-cpv-doc">
          <span className="tdp-cpv-doc-icon tdp-mono">▤</span>
          <span className="tdp-cpv-doc-name">{d.name}</span>
          <span className={"tdp-tag tdp-mono " + (d.ok ? "tdp-tag-ok" : "tdp-tag-warn")}>{d.status}</span>
        </div>
      ))}
    </div>
  );
}

function CapRouting() {
  const stops = [
    { city: "Chicago, IL", note: "Origin" },
    { city: "Memphis, TN", note: "290 mi" },
    { city: "Birmingham, AL", note: "503 mi" },
    { city: "Atlanta, GA", note: "658 mi" },
  ];
  return (
    <div className="tdp-cpv">
      <div className="tdp-cpv-stops">
        {stops.map((s, i) => (
          <div key={s.city} className="tdp-cpv-stop">
            <div className="tdp-cpv-stop-track">
              <div className={"tdp-cpv-stop-dot" + (i === 0 || i === stops.length - 1 ? " end" : "")} />
              {i < stops.length - 1 && <div className="tdp-cpv-stop-line" />}
            </div>
            <div className="tdp-cpv-stop-info">
              <span>{s.city}</span>
              <span className="tdp-mono tdp-dim">{s.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="tdp-cpv-route-foot">
        <span className="tdp-mono tdp-dim">658 mi total</span>
        <span className="tdp-mono tdp-pos">$0.89/mi</span>
        <span className="tdp-mono tdp-dim">Best route ✓</span>
      </div>
    </div>
  );
}

function CapAlerts() {
  return (
    <div className="tdp-cpv">
      {[
        { level: "URGENT", msg: "Load #WJ19 delayed 3h at Memphis", warn: true },
        { level: "ACTION", msg: "Rate below floor on AB01 — review", warn: true },
        { level: "INFO",   msg: "Driver ETA updated to 2:30 PM", ok: true },
        { level: "OPP",    msg: "High-rate load available nearby", ok: true },
      ].map(a => (
        <div key={a.msg} className="tdp-cpv-alert">
          <span className={"tdp-tag tdp-mono " + (a.warn ? "tdp-tag-warn" : "tdp-tag-ok")}>{a.level}</span>
          <span className="tdp-cpv-alert-msg">{a.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── More capabilities (6 cards) ──────────────────────────────────
function MoreCapabilities() {
  const caps = [
    { h: "Load management",    preview: <CapLoadMgmt />,    points: ["Track stages from discovery to delivery", "Detect bottlenecks instantly", "Take action without switching screens"] },
    { h: "Details & insights", preview: <CapDetails />,     points: ["Route and stop-level visibility", "Profit and cost insights", "Lifecycle progress tracking"] },
    { h: "Load creation",      preview: <CapLoadCreate />,  points: ["Structured setup in minutes", "AI-powered recommendations", "Workflow starts immediately"] },
    { h: "Document management",preview: <CapDocs />,        points: ["BOLs, PODs, invoices, contracts", "Status tracking & quick access", "Load-linked documentation"] },
    { h: "Route optimization", preview: <CapRouting />,     points: ["Route visualization", "Fuel and profit insights", "Smarter routing decisions"] },
    { h: "AI alerts",          preview: <CapAlerts />,      points: ["Stuck load detection", "Priority alerts", "Revenue opportunities"] },
  ];
  return (
    <section className="tdp-caps">
      <div className="tdp-container">
        <h2 className="tdp-section-h" data-reveal>More capabilities, built for speed.</h2>
        <div className="tdp-caps-grid">
          {caps.map((c, i) => (
            <article key={c.h} className="tdp-cap" data-reveal>
              {c.preview}
              <div className="tdp-cap-n tdp-mono">{String(i + 1).padStart(2, "0")}</div>
              <h3>{c.h}</h3>
              <ul>{c.points.map(p => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    "Loads enter the system",
    "AI initiates communication",
    "Documents & approvals handled",
    "Drivers are assigned intelligently",
    "Loads move in real time",
    "Insights optimize every step",
  ];
  return (
    <section className="tdp-how" id="how">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>System execution</div>
        <h2 className="tdp-section-h" data-reveal>How it works.</h2>

        <ol className="tdp-steps">
          {steps.map((s, i) => (
            <li key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="tdp-step-n tdp-mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <p className="tdp-how-caption" data-reveal>
          Every step automated. Every decision optimized. Every load moving forward.
        </p>
      </div>
    </section>
  );
}

// ─── Why this wins (comparison) ───────────────────────────────────
function WhyThisWins() {
  const rows = [
    ["Manual workflows", "Automated execution"],
    ["Disconnected tools", "One unified system"],
    ["Reactive decisions", "Real-time intelligence"],
    ["Data visibility", "Actionable outcomes"],
  ];
  return (
    <section className="tdp-why">
      <div className="tdp-container">
        <h2 className="tdp-section-h" data-reveal>
          Why this wins.
          <span className="tdp-section-aside">Built to execute, not just manage.</span>
        </h2>

        <div className="tdp-compare" data-reveal>
          <div className="tdp-compare-head">
            <span className="tdp-mono tdp-dim">Others</span>
            <span className="tdp-mono">TruckDispatch Pro</span>
          </div>
          {rows.map(([a, b], i) => (
            <div key={i} className="tdp-compare-row">
              <span>{a}</span>
              <span className="tdp-compare-divider" />
              <b>{b}</b>
            </div>
          ))}
        </div>

        <p className="tdp-why-caption" data-reveal>The difference is execution. Every time.</p>
      </div>
    </section>
  );
}

// ─── Impact ───────────────────────────────────────────────────────
function Impact() {
  const items = [
    { h: "Reduce manual work and follow-ups", body: "Eliminate repetitive tasks and let AI handle communication." },
    { h: "Increase speed of operations", body: "Move loads faster with automated workflows and instant decisions." },
    { h: "Improve load profitability", body: "Optimize routes, reduce delays, and capture more margin." },
    { h: "Scale without increasing team size", body: "Handle more volume with the same resources through automation." },
  ];
  return (
    <section className="tdp-impact" id="impact">
      <div className="tdp-container">
        <div className="tdp-eyebrow tdp-mono" data-reveal>Real results</div>
        <h2 className="tdp-section-h" data-reveal>Impact.</h2>

        <div className="tdp-impact-grid">
          {items.map((it, i) => (
            <article key={i} className="tdp-impact-card" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <h3>{it.h}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="tdp-cta" id="contact">
      <div className="tdp-container">
        <h2 className="tdp-cta-h" data-reveal>
          Stop managing dispatch.<br />
          <span className="tdp-cta-soft">Start running it like a system.</span>
        </h2>
        <p data-reveal>See how TruckDispatch Pro transforms your operations from day one.</p>
        <div className="tdp-cta-actions" data-reveal>
          <a href="#" className="tdp-btn">Book a demo</a>
          <a href="#" className="tdp-btn tdp-btn-ghost">Start free trial</a>
        </div>
        <div className="tdp-cta-meta tdp-mono" data-reveal>
          <span>No credit card required</span>
          <span className="tdp-tag-dot" />
          <span>14-day free trial</span>
          <span className="tdp-tag-dot" />
          <span>Setup in minutes</span>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function TDPFooter() {
  const cols = [
    { h: "Product", links: ["Features", "Pricing", "Security", "Roadmap"] },
    { h: "Company", links: ["About", "Customers", "Careers", "Contact"] },
    { h: "Resources", links: ["Documentation", "API Reference", "Support", "Status"] },
    { h: "Legal", links: ["Privacy", "Terms", "Compliance"] },
  ];
  return (
    <footer className="tdp-footer">
      <div className="tdp-container">
        <div className="tdp-footer-grid">
          <div className="tdp-footer-brand">
            <Logo />
            <p>The operating system for modern dispatch operations. Built for scale, designed for execution.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="tdp-footer-col">
              <div className="tdp-mono tdp-dim">{c.h}</div>
              {c.links.map((l) => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="tdp-footer-bottom">
          <span className="tdp-mono tdp-dim">© 2026 TruckDispatch Pro. All rights reserved.</span>
          <span className="tdp-mono tdp-dim">v4.2 · Status: operational</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  useRevealObserver, Nav, Hero, AIStats, TwoProducts, Problems, BellaAI,
  LoadLifecycle, ProductInAction, MoreCapabilities, Impact, FinalCTA, TDPFooter,
});
