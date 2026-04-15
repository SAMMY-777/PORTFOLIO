import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "Python", icon: "🐍", level: 92, color: "#3B82F6" },
  { name: "SQL", icon: "🗄️", level: 95, color: "#10B981" },
  { name: "Power BI", icon: "📊", level: 88, color: "#F59E0B" },
  { name: "Tableau", icon: "📈", level: 85, color: "#EF4444" },
  { name: "Excel", icon: "📋", level: 90, color: "#22C55E" },
  { name: "Statistics", icon: "📐", level: 82, color: "#8B5CF6" },
  { name: "Machine Learning", icon: "🤖", level: 78, color: "#EC4899" },
  { name: "R", icon: "📉", level: 72, color: "#06B6D4" },
];

const TOOLS = [
  { name: "Pandas", category: "Python" },
  { name: "NumPy", category: "Python" },
  { name: "Scikit-learn", category: "ML" },
  { name: "Matplotlib", category: "Viz" },
  { name: "Seaborn", category: "Viz" },
  { name: "PostgreSQL", category: "SQL" },
  { name: "BigQuery", category: "SQL" },
  { name: "dbt", category: "ETL" },
  { name: "Airflow", category: "ETL" },
  { name: "Snowflake", category: "Cloud" },
  { name: "AWS S3", category: "Cloud" },
  { name: "Git", category: "Dev" },
];

const EXPERIENCE = [
  {
    title: "Data Analyst trainee",
    company: "FinEdge Corp",
    period: "2020 – 2022",
    desc: "Developed automated ETL pipelines processing 5M+ daily transactions. Created Tableau dashboards for risk assessment adopted by 200+ stakeholders. Conducted A/B tests improving conversion rates by 12%.",
    tags: ["Tableau", "Python", "PostgreSQL", "dbt"],
  },
  {
    title: "Data Analyst Intern",
    company: "Retail Insights Ltd.",
    period: "2019 – 2020",
    desc: "Analyzed customer segmentation using K-Means clustering. Built weekly sales reports in Excel VBA. Supported marketing team with campaign performance analysis.",
    tags: ["Python", "Excel", "SQL", "R"],
  },
];

const PROJECTS = [
  {
    title: "E-Commerce Revenue Dashboard",
    desc: "End-to-end Power BI dashboard tracking real-time sales, inventory, and customer KPIs across 12 product categories.",
    tools: ["Power BI", "SQL", "Python"],
    impact: "+34% faster decision-making",
    type: "Dashboard",
    color: "#F59E0B",
  },
  {
    title: "Customer Churn Prediction Model",
    desc: "ML pipeline using Random Forest & XGBoost on 500K+ records to predict churn 30 days in advance with 89% accuracy.",
    tools: ["Python", "Scikit-learn", "SQL"],
    impact: "Saved $2.1M annually",
    type: "Machine Learning",
    color: "#8B5CF6",
  },
  {
    title: "Marketing Attribution Analysis",
    desc: "Multi-touch attribution model across 8 channels using Markov chains. Tableau dashboard for CMO.",
    tools: ["Python", "Tableau", "BigQuery"],
    impact: "21% better ROAS",
    type: "Analytics",
    color: "#EF4444",
  },
  {
    title: "Supply Chain Optimization",
    desc: "Identified $800K inventory inefficiencies via SQL-based demand forecasting. Automated weekly reorder reports via Airflow.",
    tools: ["SQL", "Python", "Airflow", "Excel"],
    impact: "$800K cost reduction",
    type: "Case Study",
    color: "#10B981",
  },
  {
    title: "HR Analytics Dashboard",
    desc: "People analytics platform tracking attrition risk, hiring funnel health, and DEI metrics. Integrated with HRIS via API.",
    tools: ["Power BI", "Python", "PostgreSQL"],
    impact: "35% attrition reduction",
    type: "Dashboard",
    color: "#3B82F6",
  },
  {
    title: "Sentiment Analysis – Product Reviews",
    desc: "NLP pipeline on 200K+ Amazon reviews using BERT embeddings. Results surfaced in an interactive Streamlit dashboard.",
    tools: ["Python", "NLP", "Streamlit", "SQL"],
    impact: "Guided Q3 product roadmap",
    type: "Machine Learning",
    color: "#EC4899",
  },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = end / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        padding: "100px 0",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────

function SkillBar({ skill, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(skill.level), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 500 }}>
          {skill.icon} {skill.name}
        </span>
        <span style={{ color: skill.color, fontWeight: 700, fontFamily: "monospace", fontSize: 14 }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: 6, background: "#1e293b", borderRadius: 99 }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
            transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: `0 0 12px ${skill.color}66`,
          }}
        />
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#131c2e" : "#0d1526",
        border: `1px solid ${hovered ? project.color + "66" : "#1e293b"}`,
        borderRadius: 16,
        padding: 28,
        cursor: "default",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${project.color}22` : "none",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: project.color,
            textTransform: "uppercase",
            fontFamily: "monospace",
            background: project.color + "22",
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          {project.type}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#10B981",
            fontWeight: 700,
            background: "#10B98122",
            padding: "4px 10px",
            borderRadius: 6,
            fontFamily: "monospace",
          }}
        >
          {project.impact}
        </span>
      </div>
      <h3 style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, margin: 0 }}>
        {project.title}
      </h3>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
        {project.tools.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              color: "#cbd5e1",
              background: "#1e293b",
              border: "1px solid #334155",
              padding: "3px 10px",
              borderRadius: 99,
              fontFamily: "monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── TYPEWRITER ──────────────────────────────────────────────────────────────

function Typewriter({ strings }) {
  const [text, setText] = useState("");
  const [sIdx, setSIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[sIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1800);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setText(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setSIdx((s) => (s + 1) % strings.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, sIdx, strings]);

  return (
    <span style={{ color: "#06B6D4" }}>
      {text}
      <span
        style={{
          borderRight: "2px solid #06B6D4",
          marginLeft: 2,
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #060b14; color: #e2e8f0; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
    ::selection { background: #06B6D466; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #060b14; }
    ::-webkit-scrollbar-thumb { background: #06B6D4; border-radius: 3px; }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px #06B6D444; } 50% { box-shadow: 0 0 40px #06B6D488; } }
    @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .nav-link { color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; transition: color 0.2s; cursor: pointer; }
    .nav-link:hover { color: #06B6D4; }
    .tag-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #06B6D4; background: #06B6D411; border: 1px solid #06B6D433; padding: 4px 12px; border-radius: 99px; }
    .btn-primary { background: linear-gradient(135deg, #06B6D4, #8B5CF6); color: white; border: none; padding: 14px 36px; border-radius: 99px; font-size: 15px; font-weight: 600; font-family: 'Space Grotesk', sans-serif; cursor: pointer; transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px #06B6D444; }
    .btn-outline { background: transparent; color: #06B6D4; border: 1px solid #06B6D4; padding: 13px 34px; border-radius: 99px; font-size: 15px; font-weight: 600; font-family: 'Space Grotesk', sans-serif; cursor: pointer; transition: all 0.3s; }
    .btn-outline:hover { background: #06B6D411; transform: translateY(-2px); }
    .container { max-width: 1160px; margin: 0 auto; padding: 0 28px; }
    .section-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 3px; color: #06B6D4; text-transform: uppercase; margin-bottom: 12px; }
    .section-title { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 800; color: #f1f5f9; margin-bottom: 16px; }
    .grid-bg { background-image: linear-gradient(#06B6D408 1px, transparent 1px), linear-gradient(90deg, #06B6D408 1px, transparent 1px); background-size: 60px 60px; }
    input, textarea { background: #0d1526; border: 1px solid #1e293b; color: #e2e8f0; border-radius: 10px; padding: 14px 18px; width: 100%; font-family: 'Space Grotesk', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
    input:focus, textarea:focus { border-color: #06B6D4; }
    textarea { resize: vertical; min-height: 130px; }
    .exp-card { background: #0d1526; border: 1px solid #1e293b; border-radius: 16px; padding: 28px; transition: all 0.3s; }
    .exp-card:hover { border-color: #06B6D433; background: #111d30; transform: translateX(6px); }
    .tool-pill { background: #0d1526; border: 1px solid #1e293b; padding: 8px 18px; border-radius: 99px; font-size: 13px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; transition: all 0.2s; cursor: default; }
    .tool-pill:hover { border-color: #06B6D4; color: #06B6D4; background: #06B6D408; }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s",
          background: navScrolled ? "rgba(6,11,20,0.92)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottom: navScrolled ? "1px solid #1e293b" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              background: "linear-gradient(90deg, #06B6D4, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            DA.
          </span>
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>
            ))}
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => scrollTo("Contact")}>
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="grid-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle, #06B6D422 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, #8B5CF622 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div className="tag-badge" style={{ marginBottom: 24 }}>Available for work · Remote / Hybrid</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(42px, 6vw, 68px)", lineHeight: 1.08, color: "#f1f5f9", marginBottom: 20 }}>
                Hi, I'm <br />
                <span style={{ background: "linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradient-shift 4s ease infinite" }}>
                  Alex Morgan
                </span>
              </h1>
              <h2 style={{ fontSize: 22, color: "#94a3b8", fontWeight: 400, marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
                <Typewriter strings={["Data Analyst", "Dashboard Builder", "Insight Engineer", "SQL Expert", "ML Enthusiast"]} />
              </h2>
              <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}>
                I transform raw data into actionable insights that drive real business outcomes. Specialising in Python, SQL, and BI tools to build dashboards, models, and stories from data.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("Projects")}>View My Work</button>
                <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: 40, marginTop: 56 }}>
                {[["2+", "Years Experience"], ["40+", "Projects Delivered"], ["$3M+", "Revenue Impacted"]].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "#06B6D4" }}>{val}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right – avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", animation: "float 6s ease-in-out infinite" }}>
                <div
                  style={{
                    width: 340,
                    height: 340,
                    borderRadius: "60% 40% 55% 45% / 50% 45% 55% 50%",
                    background: "linear-gradient(135deg, #06B6D422, #8B5CF622)",
                    border: "2px solid #06B6D433",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 120,
                    animation: "pulse-glow 4s ease-in-out infinite",
                  }}
                >
                  📊
                </div>
                {/* Floating badges */}
                {[
                  { top: -20, right: -20, text: "Python", color: "#3B82F6" },
                  { bottom: 20, left: -30, text: "SQL", color: "#10B981" },
                  { top: "50%", right: -50, text: "Power BI", color: "#F59E0B" },
                ].map((b) => (
                  <div
                    key={b.text}
                    style={{
                      position: "absolute",
                      top: b.top,
                      bottom: b.bottom,
                      left: b.left,
                      right: b.right,
                      background: "#0d1526",
                      border: `1px solid ${b.color}55`,
                      color: b.color,
                      padding: "8px 16px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      boxShadow: `0 0 20px ${b.color}33`,
                    }}
                  >
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <Section id="about">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, #06B6D411, #8B5CF611)",
                  borderRadius: 20,
                  border: "1px solid #1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 90,
                  flexDirection: "column",
                  gap: 16,
                  padding: 32,
                }}
              >
                <div style={{ fontSize: 70 }}>🔍</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#94a3b8", textAlign: "center", lineHeight: 2 }}>
                  {`data.describe()`}<br />
                  {`→ insights.shape`}<br />
                  {`→ decisions.value`}
                </div>
              </div>
            </div>
            <div>
              <p className="section-label">About Me</p>
              <h2 className="section-title">Turning Data Into Business Intelligence</h2>
              <p style={{ color: "#64748b", lineHeight: 1.9, marginBottom: 20, fontSize: 15 }}>
                I'm a Data Analyst with 5+ years of experience helping organisations make smarter decisions through data. My background spans e-commerce, fintech, and retail — giving me a broad lens on how data drives growth.
              </p>
              <p style={{ color: "#64748b", lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
                I specialise in building end-to-end analytical pipelines: from wrangling messy data with Python and SQL, to delivering polished Power BI or Tableau dashboards that stakeholders actually use. I'm passionate about statistical rigour and communicating insight clearly.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["📍 Remote-Ready", "🎓 BSc Statistics", "🏆 Certified in Power BI", "🌐 Open to Freelance"].map((t) => (
                  <span key={t} className="tag-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ─────────────────────────────────────────────────────── */}
      <Section id="skills" style={{ background: "#06060f" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label">My Toolkit</p>
            <h2 className="section-title">Skills & Expertise</h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              A data-first skill set covering the full analytics stack — from raw data to published insight.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              {SKILLS.slice(0, 4).map((s, i) => (
                <SkillBar key={s.name} skill={s} delay={i * 120} />
              ))}
            </div>
            <div>
              {SKILLS.slice(4).map((s, i) => (
                <SkillBar key={s.name} skill={s} delay={i * 120} />
              ))}
            </div>
          </div>
          {/* Tools grid */}
          <div style={{ marginTop: 60 }}>
            <p style={{ color: "#475569", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>Also proficient with</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {TOOLS.map((t) => (
                <span key={t.name} className="tool-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
      <Section id="experience">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label">Work History</p>
            <h2 className="section-title">Experience</h2>
          </div>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: -32, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #06B6D4, #8B5CF6, transparent)", opacity: 0.4 }} />
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-card" style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -40, top: 30, width: 16, height: 16, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 12px #06B6D4" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, color: "#f1f5f9" }}>{e.title}</h3>
                    <p style={{ color: "#06B6D4", fontWeight: 600, fontSize: 14, marginTop: 2 }}>{e.company}</p>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#475569", background: "#1e293b", padding: "6px 14px", borderRadius: 8, height: "fit-content" }}>
                    {e.period}
                  </span>
                </div>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>{e.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {e.tags.map((t) => (
                    <span key={t} className="tag-badge">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ───────────────────────────────────────────────────── */}
      <Section id="projects" style={{ background: "#06060f" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Featured Projects</h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Real-world analytics projects spanning dashboards, ML models, and data case studies.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      <Section id="contact">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <p className="section-label">Let's Talk</p>
              <h2 className="section-title">Ready to Turn Your Data Into Decisions?</h2>
              <p style={{ color: "#64748b", lineHeight: 1.9, marginBottom: 40, fontSize: 15 }}>
                I'm available for freelance projects, full-time roles, and consulting engagements. If you have a data problem, I'd love to help solve it.
              </p>
              {[
                ["📧", "Email", "alex.morgan@email.com"],
                ["💼", "LinkedIn", "linkedin.com/in/alexmorgan-da"],
                ["🐱", "GitHub", "github.com/alexmorgan-data"],
                ["📍", "Location", "Remote · Open to UK/EU"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                    <div style={{ color: "#94a3b8", fontSize: 14 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                placeholder="Tell me about your project or role..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ fontSize: 16, padding: "16px", marginTop: 8, opacity: formSent ? 0.7 : 1 }}
              >
                {formSent ? "✓ Message Sent!" : "Send Message"}
              </button>
              {formSent && (
                <p style={{ color: "#10B981", fontSize: 14, textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}>
                  Thanks! I'll be in touch within 24h.
                </p>
              )}
            </form>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid #1e293b",
          padding: "32px 0",
          textAlign: "center",
          background: "#060b14",
        }}
      >
        <div className="container">
          <p style={{ color: "#475569", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 Sameer Khan · Built with React · Data-driven by nature
          </p>
        </div>
      </footer>
    </>
  );
}