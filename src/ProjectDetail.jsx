import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { PROJECTS } from './projects';
import Nav from './Nav';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const prev = PROJECTS[index - 1] || null;
  const next = PROJECTS[index + 1] || null;

  useEffect(() => {
    topRef.current?.scrollIntoView();
  }, [slug]);

  if (!project) {
    return (
      <div className="detail-not-found">
        <Nav />
        <h1>Project not found.</h1>
        <Link to="/portfolio">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="detail-page" ref={topRef}>
      <Nav />

      {/* Hero */}
      <section className="detail-hero">
        <div className="detail-hero-text">
          <div className="detail-overline">{project.category}</div>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>
          <div className="detail-tags">
            {project.tags.map((t) => (
              <span key={t} className="detail-tag">{t}</span>
            ))}
          </div>
          <div className="detail-links">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-live-link"
              >
                View Live Site ↗
              </a>
            )}
            {project.externalUrlSecondary && (
              <a
                href={project.externalUrlSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-live-link detail-live-link--secondary"
              >
                {project.externalUrlSecondaryLabel || 'View Project'} ↗
              </a>
            )}
          </div>
        </div>
        <div className="detail-hero-img">
          <img src={project.coverImg} alt={project.title} />
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="detail-ps">
        <div className="detail-ps-col">
          <div className="detail-ps-label">The Challenge</div>
          <p>{project.problem}</p>
        </div>
        <div className="detail-ps-col">
          <div className="detail-ps-label">The Solution</div>
          <p>{project.solution}</p>
        </div>
      </section>

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <section className="detail-stats">
          {project.stats.map((s) => (
            <div key={s.label} className="detail-stat">
              <div className="detail-stat-value">{s.value}</div>
              <div className="detail-stat-label">{s.label}</div>
            </div>
          ))}
        </section>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="detail-gallery">
          {project.images.map((src, i) => (
            <div key={i} className="detail-gallery-item">
              <img src={src} alt={`${project.title} ${i + 1}`} />
            </div>
          ))}
        </section>
      )}

      {/* Prev / Next */}
      <nav className="detail-nav">
        {prev ? (
          <Link to={`/portfolio/${prev.slug}`} className="detail-nav-link detail-nav-prev">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        <Link to="/portfolio" className="detail-nav-all">
          All Projects
        </Link>
        {next ? (
          <Link to={`/portfolio/${next.slug}`} className="detail-nav-link detail-nav-next">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
