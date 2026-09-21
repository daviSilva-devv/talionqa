import type { Metadata } from "next";
import { Brand } from "../../components/brand";
import { XRayCanvas } from "../../components/xray/xray-canvas";
import { demoProjectGraph } from "../../data/demo-graph";

export const metadata: Metadata = {
  title: "X-Ray",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function XRayPage({
  searchParams,
}: {
  searchParams: Promise<{ target?: string | string[] }>;
}) {
  const params = await searchParams;
  const target = firstValue(params.target)?.trim() || "your-project";

  return (
    <main className="workspace">
      <header className="workspace-header">
        <Brand />
        <div className="workspace-actions">
          <span className="prototype-badge">Prototype data</span>
          <button className="quiet-button" type="button">
            Scan again
          </button>
        </div>
      </header>

      <section className="workspace-intro">
        <div>
          <span className="section-label">X-Ray</span>
          <h1>{target}</h1>
          <p>
            Spatial project view. The current graph is UI prototype data; TAL-001 provides the
            real scanner contract that will feed this surface.
          </p>
        </div>

        <div className="health-orb" aria-label="Prototype project health">
          <span>Preview</span>
          <strong>—</strong>
        </div>
      </section>

      <section className="xray-layout">
        <div className="xray-stage">
          <div className="xray-stage-bar">
            <div>
              <span className="live-dot" />
              Project map
            </div>
            <span>6 nodes · 2 prototype findings</span>
          </div>
          <XRayCanvas graph={demoProjectGraph} target={target} />
        </div>

        <aside className="finding-panel">
          <span className="panel-eyebrow">Selected anomaly</span>
          <h2>Failed request</h2>
          <p className="panel-summary">
            This panel demonstrates how evidence will sit beside the affected project path,
            instead of opening a disconnected audit report.
          </p>

          <div className="finding-severity">
            <span className="severity-dot" />
            <div>
              <small>Severity</small>
              <strong>High</strong>
            </div>
            <div>
              <small>Confidence</small>
              <strong>98%</strong>
            </div>
          </div>

          <div className="evidence-block">
            <div className="evidence-label">Evidence</div>
            <code>GET /api/session → request failed</code>
          </div>

          <div className="path-block">
            <span>Project</span>
            <i>→</i>
            <span>Network</span>
            <i>→</i>
            <strong>Finding</strong>
          </div>

          <button className="diagnose-button" disabled type="button">
            Diagnose · coming later
          </button>
        </aside>
      </section>
    </main>
  );
}
