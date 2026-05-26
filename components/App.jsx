'use client'

import { useEffect } from 'react'
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakToggle,
  TweakColor,
} from './TweaksPanel'
import {
  useRevealObserver,
  Nav,
  Hero,
  AIStats,
  BellaAI,
  TwoProducts,
  LoadLifecycle,
  Problems,
  ProductInAction,
  MoreCapabilities,
  Impact,
  FinalCTA,
  TDPFooter,
} from './sections'

const TDP_DEFAULTS = {
  dark: false,
  accent: '#1E3160',
  spotlight: '#6B9FFF',
}

export default function App() {
  const [t, setTweak] = useTweaks(TDP_DEFAULTS)
  useRevealObserver()

  useEffect(() => {
    document.documentElement.dataset.theme = t.dark ? 'dark' : 'light'
    document.documentElement.style.setProperty('--accent', t.accent)
    document.documentElement.style.setProperty('--spotlight', t.spotlight)
  }, [t.dark, t.accent, t.spotlight])

  useEffect(() => {
    const setNavH = () => {
      const nav = document.querySelector('.tdp-nav')
      if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px')
    }
    setNavH()
    window.addEventListener('resize', setNavH)
    return () => window.removeEventListener('resize', setNavH)
  }, [])

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
          <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
          <TweakColor
            label="Ink"
            value={t.accent}
            options={['#1E3160', '#243875', '#1A2E5A', '#2A3F80']}
            onChange={(v) => setTweak('accent', v)}
          />
          <TweakColor
            label="Accent"
            value={t.spotlight}
            options={['#6B9FFF', '#7EB3FF', '#5B8FF0', '#84AAFF', '#93C5FD']}
            onChange={(v) => setTweak('spotlight', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  )
}
