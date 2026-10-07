// Futuristic Tactile Web Audio Synthesizer for MIHORA.TECH
// Completely self-contained using HTML5 Web Audio API (Zero external assets, zero lag)
// Default state is OFF (respecting user preference, never automatically uninvited)

let audioCtx: AudioContext | null = null;
let sfxEnabled = false;

// Initialize state from storage safely
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('mihora_sfx_enabled');
    sfxEnabled = saved === 'true';
  } catch {
    sfxEnabled = false;
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return sfxEnabled;
}

export function toggleSound(): boolean {
  sfxEnabled = !sfxEnabled;
  try {
    localStorage.setItem('mihora_sfx_enabled', String(sfxEnabled));
  } catch {
    // Ignore storage restrictions
  }

  // Broadcast change to any listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mihora-sfx-state', { detail: { enabled: sfxEnabled } }));
  }

  if (sfxEnabled) {
    // Immediate satisfying futuristic boot chime
    playUiChime('enable');
  } else {
    // Gentle power-down blip
    playUiChime('disable', true);
  }

  return sfxEnabled;
}

export function subscribeSoundChange(callback: (enabled: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ enabled: boolean }>;
    callback(custom.detail?.enabled ?? sfxEnabled);
  };
  window.addEventListener('mihora-sfx-state', handler);
  return () => window.removeEventListener('mihora-sfx-state', handler);
}

export type SoundType = 
  | 'click' 
  | 'nav'
  | 'tab'
  | 'action'
  | 'close'
  | 'hover' 
  | 'switch' 
  | 'ping' 
  | 'trace' 
  | 'success' 
  | 'enable' 
  | 'disable' 
  | 'terminal';

// Round-robin index and dynamic pitch scale to avoid mechanical repetition
let clickRoundRobin = 0;
let lastSoundTimestamp = 0;
const PITCH_VARIATIONS = [0.93, 0.97, 1.0, 1.03, 1.07, 1.10];

export function playUiChime(type: SoundType = 'click', bypassMuteCheck = false) {
  if (!bypassMuteCheck && !sfxEnabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    lastSoundTimestamp = performance.now();
    const now = ctx.currentTime;

    // Micro-pitch variation factor (never flat or monotone)
    const pitchMod = PITCH_VARIATIONS[Math.floor(Math.random() * PITCH_VARIATIONS.length)];

    switch (type) {
      case 'enable': {
        // Futuristic boot power-up sequence: dual arpeggiated harmonics
        const notes = [440, 659.25, 880, 1318.5]; // A4, E5, A5, E6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const start = now + idx * 0.06;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);

          noteGain.gain.setValueAtTime(0.0001, start);
          noteGain.gain.linearRampToValueAtTime(0.10, start + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);

          osc.connect(noteGain);
          noteGain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + 0.35);
        });
        break;
      }

      case 'disable': {
        // Soft descending power-down blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.16);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.17);
        break;
      }

      case 'nav': {
        // High-tech aerodynamic dual-tone navigation pulse (airy, sleek)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        const base = 987.77 * pitchMod; // B5 approx
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(base, now);
        osc1.frequency.exponentialRampToValueAtTime(base * 1.5, now + 0.045);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(base * 0.5, now);
        osc2.frequency.exponentialRampToValueAtTime(base * 0.75, now + 0.045);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.055);
        osc2.stop(now + 0.055);
        break;
      }

      case 'tab': {
        // Snappy mechanical detent / notch tick for filters & tab switchers
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        const freq = 1800 * pitchMod;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq, now);
        filter.Q.value = 6;

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'action': {
        // Punchy, affirmative tactile impact for primary CTAs and dispatch buttons
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        const f1 = 1200 * pitchMod;
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(f1, now);
        osc1.frequency.exponentialRampToValueAtTime(280, now + 0.06);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(220 * pitchMod, now);
        osc2.frequency.exponentialRampToValueAtTime(65, now + 0.07);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.08);
        osc2.stop(now + 0.08);
        break;
      }

      case 'close': {
        // Soft descending acoustic release blip (modal dismissal, cancel, esc)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startFreq = 680 * pitchMod;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.055);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.065);
        break;
      }

      case 'click': {
        // Multi-timbre round-robin to eliminate monotone sound repetition
        const timbre = clickRoundRobin % 4;
        clickRoundRobin = (clickRoundRobin + 1) % 4;

        if (timbre === 0) {
          // Timbre 0: Crisp dual-stage micro-switch
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          const f1 = 1350 * pitchMod;
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(f1, now);
          osc1.frequency.exponentialRampToValueAtTime(320, now + 0.035);

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(400 * pitchMod, now);
          osc2.frequency.exponentialRampToValueAtTime(90, now + 0.045);

          gain.gain.setValueAtTime(0.065, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.05);
          osc2.stop(now + 0.05);
        } else if (timbre === 1) {
          // Timbre 1: Ceramic damped acoustic pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const f = 880 * pitchMod;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.045);
        } else if (timbre === 2) {
          // Timbre 2: Optical glass micro-tick (ultra-crisp, high transient)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const f = 2400 * pitchMod;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(750, now + 0.025);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.03);
        } else {
          // Timbre 3: Precision magnetic relay impulse
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const f = 1600 * pitchMod;
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

          gain.gain.setValueAtTime(0.035, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.04);
        }
        break;
      }

      case 'hover': {
        // Ultra-subtle high-frequency mechanical glass micro-tap (3200Hz, 16ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(3200 * pitchMod, now);

        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.022);
        break;
      }

      case 'switch': {
        // Sci-fi console mode glide (dual tone resonant sweep)
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        const base = 340 * pitchMod;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(base, now);
        osc.frequency.exponentialRampToValueAtTime(base * 2.6, now + 0.10);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + 0.10);
        filter.Q.value = 4;

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
        break;
      }

      case 'ping': {
        // High-tech crystalline telemetry pulse with harmonic overtone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        const f = 1046.5 * pitchMod; // C6
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(f, now);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(f * 2, now); // Octave overtone

        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.34);
        osc2.stop(now + 0.34);
        break;
      }

      case 'trace': {
        // Fast laser-like packet trace step
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const startFreq = (800 + Math.random() * 350) * pitchMod;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 1.45, now + 0.07);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'success': {
        // Triumphant uplifting crystal chime: C5 -> G5 -> C6
        const freqs = [523.25, 783.99, 1046.5];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + i * 0.07;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f * pitchMod, start);

          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.08, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + 0.40);
        });
        break;
      }

      case 'terminal': {
        // Soft tactile terminal keystroke / blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime((580 + Math.random() * 120) * pitchMod, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.032);
        break;
      }
    }
  } catch {
    // Gracefully handle browser policy or muted audio context
  }
}

// Global Automated Audio Dispatcher
// Automatically attaches interactive audio to ALL buttons, links, tabs, and clickable elements across the site!
let globalListenerInitialized = false;

export function initGlobalAudioListener() {
  if (typeof window === 'undefined' || globalListenerInitialized) return;
  globalListenerInitialized = true;

  window.addEventListener(
    'click',
    (event) => {
      if (!sfxEnabled) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Avoid double-firing if an explicit handler already triggered a sound within 45ms
      const now = performance.now();
      if (now - lastSoundTimestamp < 45) return;

      // Locate nearest interactive element
      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="button"], input[type="submit"], [role="tab"], summary, [data-interactive="true"], .cursor-pointer'
      ) as HTMLElement | null;

      if (!interactiveEl) return;

      // Extract context from element properties
      const ariaLabel = (interactiveEl.getAttribute('aria-label') || '').toLowerCase();
      const id = (interactiveEl.id || '').toLowerCase();
      const className = (typeof interactiveEl.className === 'string' ? interactiveEl.className : '').toLowerCase();
      const tagName = interactiveEl.tagName.toLowerCase();
      const text = (interactiveEl.textContent || '').trim().toLowerCase();

      // 1. Close / Dismiss actions
      if (
        ariaLabel.includes('close') || 
        ariaLabel.includes('dismiss') || 
        text === '×' || 
        text === 'x' || 
        id.includes('close') ||
        className.includes('close')
      ) {
        playUiChime('close');
        return;
      }

      // 2. Theme or Switch toggles
      if (
        id.includes('theme') || 
        id.includes('sfx') || 
        interactiveEl.getAttribute('role') === 'switch' ||
        (tagName === 'input' && (interactiveEl as HTMLInputElement).type === 'checkbox')
      ) {
        playUiChime('switch');
        return;
      }

      // 3. Copy, Share, or Code clipboard actions
      if (
        ariaLabel.includes('copy') || 
        text.includes('copy') || 
        id.includes('copy') ||
        text.includes('share') ||
        className.includes('copy')
      ) {
        playUiChime('ping');
        return;
      }

      // 4. Tabs, Filter pills, and category switchers
      if (
        interactiveEl.getAttribute('role') === 'tab' || 
        className.includes('filter') || 
        className.includes('tab') ||
        id.includes('filter') ||
        id.includes('tab')
      ) {
        playUiChime('tab');
        return;
      }

      // 5. Navigation links & routing anchors
      if (
        tagName === 'a' || 
        className.includes('nav') || 
        interactiveEl.closest('nav') ||
        interactiveEl.closest('header')
      ) {
        playUiChime('nav');
        return;
      }

      // 6. Action / CTA / Submit / Dispatch
      if (
        className.includes('btn-primary') || 
        className.includes('primary') ||
        text.includes('apply') || 
        text.includes('dispatch') || 
        text.includes('submit') ||
        text.includes('launch') ||
        text.includes('consult') ||
        (tagName === 'input' && (interactiveEl as HTMLInputElement).type === 'submit')
      ) {
        playUiChime('action');
        return;
      }

      // 7. General button or interactive container
      playUiChime('click');
    },
    { capture: true, passive: true }
  );
}

// Auto-initialize when running in browser
if (typeof window !== 'undefined') {
  initGlobalAudioListener();
}
