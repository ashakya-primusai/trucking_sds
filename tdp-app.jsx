// tdp-app.jsx

const TDP_DEFAULTS = {
  "dark": false,
  "accent": "#1F2937",
  "spotlight": "#9CCB8C"
};

function App() {
  const [t, setTweak] = useTweaks(TDP_DEFAULTS);
  useRevealObserver();

  React.useEffect(() => {
    document.documentElement.dataset.theme = t.dark ? "dark" : "light";
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--spotlight", t.spotlight);
  }, [t.dark, t.accent, t.spotlight]);

  React.useEffect(() => {
    const setNavH = () => {
      const nav = document.querySelector(".tdp-nav");
      if (nav) document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
    };
    setNavH();
    window.addEventListener("resize", setNavH);
    return () => window.removeEventListener("resize", setNavH);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AIStats />
        <BellaAI />
        <TwoProducts />
        <LoadLifecycle />
        <Problems />
        <ProductInAction />
        <MoreCapabilities />
        <Impact />
        <FinalCTA />
      </main>
      <TDPFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={t.dark}
                       onChange={(v) => setTweak("dark", v)} />
          <TweakColor label="Ink" value={t.accent}
                      options={["#1F2937", "#0B1A2A", "#1A1A1A", "#1E3A2B"]}
                      onChange={(v) => setTweak("accent", v)} />
          <TweakColor label="Accent" value={t.spotlight}
                      options={["#9CCB8C", "#C8F560", "#FFB95A", "#82A8E8", "#B79BE8"]}
                      onChange={(v) => setTweak("spotlight", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
