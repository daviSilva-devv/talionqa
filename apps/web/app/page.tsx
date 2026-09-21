import { Brand } from "../components/brand";
import { ScanEntry } from "../components/scan-entry";

const signals = [
  ["Runtime", "Console, requests, navigation"],
  ["Repository", "Stack, dependencies, structure"],
  ["Evidence", "Every finding keeps its proof"],
  ["X-Ray", "Problems live inside project context"],
];

export default function HomePage() {
  return (
    <main className="landing">
      <header className="site-header">
        <Brand />
        <div className="header-note">Private beta foundation</div>
      </header>

      <section className="hero">
        <div className="hero-kicker">
          <span className="pulse-dot" />
          Project intelligence, without another dead dashboard
        </div>

        <h1>
          See what your project
          <span> is hiding.</span>
        </h1>

        <p className="hero-copy">
          Drop a website or repository. TalionQA maps what it finds, keeps the evidence and
          shows problems where they actually live.
        </p>

        <ScanEntry />

        <div className="entry-caption">
          No signup for the first scan · Safe, bounded inspection · URL + repository direction
        </div>
      </section>

      <section className="signal-grid" aria-label="TalionQA product principles">
        {signals.map(([title, copy], index) => (
          <article className="signal-card" key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="preview-section">
        <div className="preview-copy">
          <span className="section-label">Talion X-Ray</span>
          <h2>Your architecture becomes the interface.</h2>
          <p>
            Healthy areas stay quiet. Findings create localized attention. You explore the
            path, evidence and impact without digging through a 40-page audit.
          </p>
        </div>

        <div className="preview-orbit" aria-hidden="true">
          <div className="preview-node preview-node-project">Project</div>
          <div className="preview-link preview-link-a" />
          <div className="preview-link preview-link-b" />
          <div className="preview-node preview-node-runtime">Runtime</div>
          <div className="preview-node preview-node-api">API</div>
          <div className="preview-finding">
            <span />
            Finding
          </div>
        </div>
      </section>
    </main>
  );
}
