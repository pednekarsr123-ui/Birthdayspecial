import { useMemo, useState } from 'react';

const generatedArt = {
  heart: '/manus-storage/async-images/38sxjmqCll6cg5w20OlRgd/image-1.webp',
  gift: '/manus-storage/async-images/38sxjmqCll6cg5w20OlRgd/image-2.webp',
  letter: '/manus-storage/async-images/38sxjmqCll6cg5w20OlRgd/image-3.webp',
};

const fallbackArt = {
  heart: '/photos/heart-placeholder.svg',
  gift: '/photos/gift-placeholder.svg',
  letter: '/photos/letter-placeholder.svg',
};

function SafeImage({ src, fallback, alt, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      onError={(event) => {
        if (event.currentTarget.dataset.fallbackApplied) return;
        event.currentTarget.dataset.fallbackApplied = 'true';
        event.currentTarget.src = fallback;
      }}
    />
  );
}

const scenes = [
  { id: 'welcome', label: 'Start', icon: '✦' },
  { id: 'letter', label: 'Letter', icon: '♡' },
  { id: 'gift', label: 'Gift', icon: '⌁' },
  { id: 'memories', label: 'Memories', icon: '◌' },
  { id: 'game', label: 'Promise', icon: '∞' },
];

const birthdayMessage = [
  'Happiest Birthday to my dear princess Sharuu 😘💗🫂',
  'You are my happiness, my everything, and the absolute love of my life 🫶🏻🤍',
  'I hope your special day is filled with endless love, and I wish you all the success and joy in the world 😊✨',
  'Promise you’ll always stay by my side—I want us to last forever and never want to lose you 🥰🤞',
  'I love you so, so muchh 😘💋🫂',
  'Once again, Happy Birthday my dearest Sharuu! 🫶🏻🫀🌹😚',
];

const builtInMemories = [
  { title: 'The first kind of magic', note: 'Somewhere between the water and us, I knew you were home.', image: '/photos/memory-01.jpg', tone: 'rose' },
  { title: 'You make every view better', note: 'Even the prettiest places feel better when I am with you.', image: '/photos/memory-02.jpg', tone: 'gold' },
  { title: 'Two people, one little world', note: 'My favorite place is still right next to you.', image: '/photos/memory-03.jpg', tone: 'plum' },
  { title: 'My favorite smile', note: 'I would choose this smile in every lifetime.', image: '/photos/memory-04.jpg', tone: 'rose' },
  { title: 'Always this close', note: 'The calm in your eyes makes everything feel okay.', image: '/photos/memory-05.jpg', tone: 'gold' },
  { title: 'A day I would replay', note: 'More silly moments, more little adventures, more us.', image: '/photos/memory-06.jpg', tone: 'plum' },
  { title: 'My safest place', note: 'Your arms still feel like my favorite kind of home.', image: '/photos/memory-07.jpg', tone: 'rose' },
  { title: 'Soft sleepy moments', note: 'Even the quiet moments with you are beautiful to me.', image: '/photos/memory-08.jpg', tone: 'gold' },
  { title: 'Us, from every angle', note: 'I love every version of our little story.', image: '/photos/memory-09.jpg', tone: 'plum' },
  { title: 'Our little sunshine moment', note: 'Smiles, heart eyes, and my favorite person beside me.', image: '/photos/memory-10.png', tone: 'rose' },
  { title: 'The way you care for me', note: 'A little gesture I want to remember forever.', image: '/photos/memory-11.png', tone: 'gold' },
  { title: 'My favorite together', note: 'One more beautiful page in our story, just us.', image: '/photos/memory-12.png', tone: 'plum' },
];

function App() {
  const [scene, setScene] = useState('welcome');
  const [giftStage, setGiftStage] = useState(0);
  const [noOffset, setNoOffset] = useState(112);
  const [saidYes, setSaidYes] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentIndex = scene === 'celebrate' ? scenes.length : Math.max(0, scenes.findIndex((item) => item.id === scene));
  const floatingHearts = useMemo(() => Array.from({ length: 13 }, (_, index) => index), []);

  const goTo = (nextScene) => {
    setScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCelebration = () => {
    setScene('celebrate');
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const moveNo = () => {
    const direction = noOffset > 0 ? -1 : 1;
    const isSmallScreen = window.innerWidth <= 420;
    const distance = isSmallScreen ? 104 + Math.round(Math.random() * 14) : 215 + Math.round(Math.random() * 30);
    setNoOffset(direction * distance);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(birthdayMessage.join('\n\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="grain" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="heart-field" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <span key={heart} className={`floating-heart heart-${heart}`}>♡</span>
        ))}
      </div>

      <header className="site-header">
        <button className="brand" onClick={() => goTo('welcome')} aria-label="Back to the start">
          <span className="brand-mark">♥</span>
          <span><b>for Sharuu</b><small>a tiny love story</small></span>
        </button>
        <div className="header-note"><span className="live-dot" /> made with all my heart</div>
      </header>

      <nav className="journey-nav" aria-label="Birthday story navigation">
        <div className="journey-track" />
        {scenes.map((item, index) => (
          <button
            key={item.id}
            className={`journey-step ${scene === item.id ? 'is-active' : ''} ${index <= currentIndex ? 'is-visited' : ''}`}
            onClick={() => index <= currentIndex && goTo(item.id)}
            disabled={index > currentIndex}
            aria-current={scene === item.id ? 'page' : undefined}
          >
            <span className="step-icon">{item.icon}</span>
            <span className="step-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <section className="scene-wrap" key={scene}>
        {scene === 'welcome' && (
          <section className="scene hero-scene">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> for the birthday girl <span className="eyebrow-line" /></p>
              <h1>Happy birthday,<br /><em>my princess.</em></h1>
              <p className="hero-subtitle">A little world made just for you, Sharuu — filled with the words I sometimes cannot say enough.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => goTo('letter')}>Open your story <span>↗</span></button>
              </div>
              <div className="hero-signature"><span className="signature-heart">♡</span><span>one more year of loving you<br /><b>and I still choose you.</b></span></div>
            </div>
            <div className="hero-art-wrap">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="art-card hero-art-card">
                <SafeImage src={generatedArt.heart} fallback={fallbackArt.heart} alt="A glowing glass heart floating in warm light" />
                <div className="art-shine" />
              </div>
              <div className="hero-sticker sticker-top">for my <b>favorite</b> person</div>
              <div className="hero-sticker sticker-bottom"><span>♥</span> you make life softer</div>
              <div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✧</div><div className="sparkle sparkle-c">·</div>
            </div>
            <div className="scroll-cue"><span /> scroll to begin</div>
          </section>
        )}

        {scene === 'letter' && (
          <section className="scene letter-scene">
            <div className="section-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> a note from my heart</p>
              <h2>For the girl who makes<br /><em>ordinary days glow.</em></h2>
              <p>Read this slowly. It is simple, but every word is true.</p>
            </div>
            <div className="letter-layout">
              <div className="letter-visual art-card"><SafeImage src={generatedArt.letter} fallback={fallbackArt.letter} alt="A rose beside a blank love letter" /><div className="photo-caption">a little love, wrapped in words</div></div>
              <article className="letter-card">
                <div className="letter-card-top"><span>24 / forever</span><span>♡</span></div>
                <p className="letter-salutation">My dearest Sharuu,</p>
                <div className="birthday-message">
                  {birthdayMessage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <p className="letter-extra">You make my world feel warmer just by being in it. I hope this year brings you gentle mornings, loud laughs, and every dream you are quietly carrying.</p>
                <div className="letter-signoff"><span>Always yours,</span><b>with all my love <i>♥</i></b></div>
                <button className="copy-button" onClick={copyMessage}>{copied ? 'Copied with love ✓' : 'Copy this message'}</button>
              </article>
            </div>
            <div className="scene-footer"><span>01 / 05</span><button className="button button-dark" onClick={() => goTo('gift')}>There is a gift for you <span>→</span></button></div>
          </section>
        )}

        {scene === 'gift' && (
          <section className="scene gift-scene">
            <div className="section-intro center-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> unwrap a little happiness <span className="eyebrow-line" /></p>
              <h2>I saved a surprise<br /><em>just for you.</em></h2>
              <p>Tap the box. It has a few things to say.</p>
            </div>
            <div className={`gift-stage ${giftStage > 0 ? 'is-open' : ''}`}>
              <div className="gift-halo" />
              <div className="art-card gift-art-card"><SafeImage src={generatedArt.gift} fallback={fallbackArt.gift} alt="An open ivory gift box with a pink ribbon" /></div>
              <button className="gift-hotspot" onClick={() => setGiftStage((stage) => Math.min(stage + 1, 3))} aria-label="Open the gift">
                <span className="gift-click-label">{giftStage === 0 ? 'tap to open' : giftStage === 3 ? 'all yours' : 'keep opening'}</span>
              </button>
              <div className="gift-ribbon ribbon-left" /><div className="gift-ribbon ribbon-right" />
            </div>
            <div className="gift-reveal" aria-live="polite">
              {giftStage === 0 && <><span className="reveal-number">01</span><h3>Something soft is waiting inside.</h3><p>Go on. I promise it is better than socks.</p></>}
              {giftStage === 1 && <><span className="reveal-number">02</span><h3>You are my favorite gift.</h3><p>Every day with you is something I never want to take for granted.</p></>}
              {giftStage === 2 && <><span className="reveal-number">03</span><h3>One wish, coming true.</h3><p>More tiny adventures, more silly laughs, and a lot more us.</p></>}
              {giftStage === 3 && <><span className="reveal-number">♡</span><h3>Surprise: my whole heart.</h3><p>Keep it safe, princess. It has been yours for a long time.</p></>}
            </div>
            <div className="gift-dots">{[0, 1, 2, 3].map((dot) => <span key={dot} className={giftStage >= dot ? 'is-on' : ''} />)}</div>
            <div className="scene-footer center-footer"><span>02 / 05</span><button className="button button-dark" onClick={() => goTo('memories')}>See our little memories <span>→</span></button></div>
          </section>
        )}

        {scene === 'memories' && (
          <section className="scene memories-scene">
            <div className="section-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> little pieces of us</p>
              <h2>Some moments are<br /><em>worth keeping close.</em></h2>
              <p>I tucked a few of our favorite moments in here, including three memories made just for us.</p>
            </div>
            <div className="memory-grid">
              {builtInMemories.map((memory, index) => (
                <article className={`memory-card memory-${memory.tone}`} key={`${memory.title}-${index}`}>
                  <div className="memory-image"><SafeImage src={memory.image} fallback={fallbackArt.heart} alt={memory.title} /><span className="memory-index">0{index + 1}</span><span className="memory-heart">♡</span></div>
                  <div className="memory-copy"><h3>{memory.title}</h3><p>{memory.note}</p></div>
                </article>
              ))}
            </div>
            <div className="scene-footer"><span>03 / 05</span><button className="button button-dark" onClick={() => goTo('game')}>One question for you <span>→</span></button></div>
          </section>
        )}

        {scene === 'game' && (
          <section className="scene game-scene">
            <div className="game-sparkles" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span></div>
            <div className="section-intro center-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> just one tiny promise <span className="eyebrow-line" /></p>
              <h2>Will you stay with me<br /><em>forever and ever?</em></h2>
              <p>Choose carefully, Sharuu. One button is feeling a little shy.</p>
            </div>
            <div className={`promise-card ${saidYes ? 'said-yes' : ''}`}>
              <div className="promise-seal">∞</div>
              {!saidYes ? (
                <>
                  <p className="promise-kicker">our favorite answer</p>
                  <h3>Promise you’ll always<br />stay by my side?</h3>
                  <div className="promise-actions">
                    <button className="button button-primary yes-button" onClick={openCelebration}>Yes, always <span>♥</span></button>
                    <button className="no-button" style={{ '--no-offset': `${noOffset}px` }} onClick={moveNo}>No</button>
                  </div>
                  <p className="promise-hint">(the “no” button is taking this personally)</p>
                </>
              ) : (
                <div className="yes-response"><div className="big-heart">♥</div><p className="promise-kicker">I knew it</p><h3>That is my favorite<br /><em>answer in the world.</em></h3><p>Then it is settled. You and me, through every silly, soft, beautiful day ahead.</p><a className="button button-dark" href="#birthday-wish" onClick={openCelebration}>Open your birthday wish <span>→</span></a></div>
              )}
            </div>
            <div className="scene-footer center-footer"><span>04 / 05</span><span className="tiny-love-note">no pressure, just love <i>♡</i></span></div>
          </section>
        )}

        {scene === 'celebrate' && (
          <section id="birthday-wish" className="scene celebration-scene">
            <div className="celebration-visual">
              <div className="celebration-ring ring-one" /><div className="celebration-ring ring-two" />
              <div className="art-card celebration-art"><SafeImage src={generatedArt.heart} fallback={fallbackArt.heart} alt="A glowing pink heart for Sharuu" /></div>
              <div className="celebration-badge">made for<br /><b>Sharuu</b></div>
              <span className="celebrate-spark spark-one">✦</span><span className="celebrate-spark spark-two">✧</span><span className="celebrate-spark spark-three">♥</span>
            </div>
            <div className="celebration-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> final little note</p>
              <h2>Keep smiling,<br /><em>my birthday girl.</em></h2>
              <p className="celebration-lede">Happy birthday again, Sharuu. You are my happiness, my everything, and the absolute love of my life. I love you so, so muchh.</p>
              <div className="celebration-quote">“If I had to choose again,<br /><b>I would still choose you.</b>”</div>
              <div className="final-actions"><button className="button button-primary" onClick={() => goTo('welcome')}>Read our story again <span>↻</span></button><button className="text-button" onClick={copyMessage}>{copied ? 'Message copied ✓' : 'Save the birthday wish'} <span>♡</span></button></div>
              <p className="final-wish">Wishing you again a very Happy Birthday, Sharuu. I love you soo much, Sharuu. 😘💗🫂</p>
              <span className="closing-signature">forever yours, <b>♥</b></span>
            </div>
            <div className="scene-footer center-footer"><span>05 / 05</span><span className="tiny-love-note">made with every bit of love</span></div>
          </section>
        )}
      </section>

      <footer className="site-footer"><span>Sharuu’s birthday love story</span><span>built from a very full heart <b>♥</b></span></footer>
    </main>
  );
}

export default App;
