import { useState } from "react";

// ══════════════════════════════════════════════════════════════════
//  MASTER BULLET LIBRARY
// ══════════════════════════════════════════════════════════════════
const B = {
  dc1:       { text: "Sourced investment opportunities, participated in 20+ company screenings, and conducted 5+ due diligence processes, supporting go/no-go decisions and resulting in $2M in deployed capital",                                                         tags:["investment","due diligence","VC","PE","private equity","portfolio","sourcing","capital deployment"] },
  dc2:       { text: "Developed and implemented real-time portfolio performance dashboard in Power BI, integrating metric analytics and automated reporting, and streamlining reporting operations by 40%",                                                                   tags:["Power BI","dashboard","data analytics","reporting","automation","KPI","visualization","business intelligence"] },
  eq1:       { text: "Built multi-year financial forecasts and analyzed unit economics and cash burn to support strategic planning and resource allocation for an early-stage fintech startup",                                                                               tags:["financial modeling","forecasting","FP&A","startup","fintech","cash flow","unit economics","strategic planning","resource allocation"] },
  eq2:       { text: "Collaborated with founders to define key business metrics, providing data-driven insights for upcoming fundraising rounds",                                                                                                                             tags:["fundraising","metrics","startup","VC","growth","business development","data-driven","investor"] },
  dsa1_std:  { text: "Supervised cross-functional team of ten from audit, tax, and valuation services in statutory audit for tech client; leveraged data analytics to identify a $2M profit overstatement, enhancing audit accuracy",                                       tags:["audit","leadership","data analytics","finance","tech","valuation","statutory audit","team management"] },
  dsa1_esg:  { text: "Led cross-functional teams of ten across audit, tax, and valuation to deliver financial insights and risk assessment for senior stakeholders, leveraging ESG data analytics to improve sustainability disclosures",                                    tags:["ESG","sustainability","leadership","audit","risk","reporting","stakeholder management","disclosure"] },
  dsa1_esg2: { text: "Supervised cross-functional team of ten from audit, tax, and valuation services in audit for tech client; leveraged ESG data analytics to identify reporting gaps and improve corporate sustainability disclosures",                                  tags:["ESG","sustainability","audit","reporting","tech","corporate governance","disclosure"] },
  dsa2:      { text: "Pioneered audit innovation by developing two data-driven solutions using SQL and Python, automating processes and implementing KPI dashboards, enhancing efficiency by 30+% across 50+ projects",                                                      tags:["SQL","Python","automation","KPI","data analytics","technology","efficiency","programming","process improvement"] },
  dsa3:      { text: "Led pre-IPO audit for tech firm, raising $10M and boosting investor confidence through optimizing capital structure, reporting compliance, and ROI-driven investment decisions",                                                                       tags:["IPO","capital markets","equity","finance","audit","investor relations","capital structure","compliance"] },
  dsa4:      { text: "Identified $3.6M financial fraud in COGS (40% of operating profits) for a $20M revenue electronics manufacturing client, leading to enhanced internal controls and compliance reporting",                                                              tags:["fraud","risk","manufacturing","internal controls","compliance","forensic","COGS","risk management"] },
  dsa5:      { text: "Rated as Top Performer (top 3%) for three years; co-led 10+ cross-functional teams for tech, manufacturing, and finance industry, with end-to-end involvement in budgeting to report issuance",                                                      tags:["leadership","performance","cross-functional","budgeting","team management","budget management"] },
  da1_std:   { text: "Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; analyzed revenue streams, expense structures, and working capital to support investment decisions",                                                            tags:["due diligence","M&A","finance","investment","valuation","working capital","acquisition","revenue analysis"] },
  da1_esg:   { text: "Collaborated with cross-functional teams to conduct due diligence for $15M healthcare acquisition; incorporated ESG risk assessments to support sustainable investment decisions",                                                                    tags:["ESG","healthcare","M&A","sustainability","risk","due diligence","acquisition"] },
  da1_esg2:  { text: "Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; incorporated ESG risk assessments and compliance reviews to support sustainable investment decisions",                                                        tags:["ESG","compliance","M&A","sustainability","risk","acquisition"] },
  da2:       { text: "Managed multi-national team for a coal client with $200M revenue, analyzing performance metrics and integrating data insights to accelerate decision-making, reducing project cycle from 12 to 8 weeks",                                               tags:["project management","multinational","data analytics","energy","process improvement","efficiency","performance metrics","cycle time"] },
  nec1:      { text: "Implemented customized IT solutions including Cloud SAP products with real-time dashboards, improving client's inventory forecasting accuracy by 35% and operational efficiency by 50%",                                                                tags:["SAP","ERP","IT","forecasting","operations","supply chain","cloud","inventory","implementation"] },
  nec2:      { text: "Analyzed end-to-end business operation processes and redesigned workflow for chemical client, eliminating 80 FTEs and saving $5M annually",                                                                                                            tags:["process optimization","automation","operations","cost savings","reengineering","efficiency","workflow","FTE reduction"] },
};

const SKILLS = {
  standard:   "CFA Exam Level III candidate; Advanced Excel (Financial Modeling), Valuation (DCF, Comps), SQL, Tableau, Power BI, ERP automation – Expertise in corporate finance, data-driven decision-making, and real-time financial insights.",
  enterprise: "CFA Exam Level III candidate; Advanced Excel (Financial Modeling, DCF, Scenario Analysis), SQL, Tableau, Power BI, ERP automation – Expertise in enterprise software finance, data-driven decision-making, and real-time financial insights.",
};
const COMMUNITY = {
  full:  "Member of Japanese Liquor Export Consortium; developed go-to-market strategy for sake brand, aligning product positioning with market demand through SWOT analysis; successfully sold 20,000 bottles to 15+ restaurants",
  short: "Member of Japanese Liquor Export Consortium; developed GTM strategy for sake brand and supported sales of 20,000 bottles to 15+ restaurants.",
};
const CONC = {
  financeDecision: "Corporate Finance & Decision Sciences Concentration",
  decisionHSM:     "Decision Science Concentration, Health Sector Management (HSM)",
  HSMonly:         "Health Sector Management (HSM)",
};

// ── Baseline = 202603 PDF ──────────────────────────────────────────
const BASELINE = {
  contact:"personal", dukeConcentration:"financeDecision", gpa:"3.85",
  showCoursework:false, showWasedaDesc:true, showTianjinDesc:true,
  includeEqtyLyfe:false, eqtyLyfeRole:"intern", eqtyLyfeBullets:[],
  deloitteMerged:false,
  deloitteSABullets:["dsa1_std","dsa2","dsa3","dsa4","dsa5"],
  deloitteAssocBullets:["da1_std","da2"],
  necBullets:["nec1","nec2"],
  skillsVariant:"standard", showHobbies:true, communityVariant:"full",
};

// ══════════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════════
function getAllBulletIds(cfg) {
  if (!cfg) return [];
  return [
    "dc1","dc2",
    ...(cfg.includeEqtyLyfe ? (cfg.eqtyLyfeBullets||[]) : []),
    ...(cfg.deloitteSABullets||[]),
    ...(cfg.deloitteAssocBullets||[]),
    ...(cfg.necBullets||[]),
  ];
}

function getResumeText(cfg) {
  if (!cfg) return "";
  return [
    ...getAllBulletIds(cfg).map(id => B[id]?.text||""),
    SKILLS[cfg.skillsVariant]||"",
    COMMUNITY[cfg.communityVariant]||"",
  ].join(" ").toLowerCase();
}

function computeMatch(cfg, kws) {
  if (!cfg||!kws?.length) return { matched:[], missing:[], score:0 };
  const txt = getResumeText(cfg);
  const matched = kws.filter(k => txt.includes(k.toLowerCase()));
  const missing = kws.filter(k => !txt.includes(k.toLowerCase()));
  return { matched, missing, score: Math.round(matched.length/kws.length*100) };
}

function findBulletsForKeyword(kw) {
  const k = kw.toLowerCase();
  return Object.entries(B)
    .filter(([,b]) => b.tags.some(t=>t.toLowerCase().includes(k)) || b.text.toLowerCase().includes(k))
    .map(([id,b]) => ({id,...b}));
}

function renderWithHighlight(text, kws=[]) {
  if (!kws.length) return text;
  const escaped = kws.map(k => k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = []; let last = 0; let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={last}>{text.slice(last,m.index)}</span>);
    parts.push(<mark key={m.index} style={{background:"#ffe44d",color:"#111",borderRadius:2,padding:"0 1px"}}>{m[0]}</mark>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return parts.length ? parts : text;
}

// ══════════════════════════════════════════════════════════════════
//  AI API
// ══════════════════════════════════════════════════════════════════
async function tailorResume(jd, apiKey="") {
  const headers = { "Content-Type":"application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;

  const bulletList = Object.entries(B)
    .map(([id,b]) => `${id}: "${b.text}"\n   tags:[${b.tags.join(",")}]`)
    .join("\n");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers,
      signal: controller.signal,
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:1400,
        messages:[{ role:"user", content:
`You are a resume coach. Analyze this JD and return the optimal configuration as JSON.

JOB DESCRIPTION:
${jd}

CANDIDATE: Xi (Shawn) Yang, CPA | Duke MBA GPA 3.85 | 10+ yrs: Deloitte (audit/analytics/SQL/Python), NEC (SAP/ERP), Duke Capital Partners | CFA III | EN/ZH/JA

BULLET LIBRARY:
${bulletList}

RULES:
1. deloitteSABullets 4-5 items: slot-1 ONE of [dsa1_std,dsa1_esg,dsa1_esg2] (ESG only if JD explicitly says ESG/sustainability); rest from [dsa2,dsa3,dsa4,dsa5]
2. deloitteAssocBullets 1-2 items: slot-1 ONE of [da1_std,da1_esg,da1_esg2]; optional da2
3. includeEqtyLyfe: true only for startup/fintech/FP&A/VC/PE
4. deloitteMerged: true if includeEqtyLyfe=true OR JD values long tenure
5. jdKeywords: 12-16 key phrases (1-3 words) from JD
6. dukeConcentration: financeDecision/decisionHSM/HSMonly
7. gpa: 3.87 IBD/MBB only else 3.85
8. objective: 2 sentences max 55 words, mirror JD role title, top 2 matching credentials, value prop

Return ONLY this JSON (no markdown):
{"contact":"personal","dukeConcentration":"financeDecision","gpa":"3.85","showCoursework":false,"showWasedaDesc":true,"showTianjinDesc":true,"includeEqtyLyfe":false,"eqtyLyfeRole":"intern","eqtyLyfeBullets":[],"deloitteMerged":false,"deloitteSABullets":["dsa1_std","dsa2","dsa3","dsa4","dsa5"],"deloitteAssocBullets":["da1_std","da2"],"necBullets":["nec1","nec2"],"skillsVariant":"standard","showHobbies":true,"communityVariant":"full","jdKeywords":["financial modeling","SQL"],"objective":"Objective text here.","notes":"brief explanation"}`
        }],
      }),
    });
  } finally {
    clearTimeout(timeoutId);
  }
  if (!res || !res.ok) {
    const t = res ? await res.text().catch(()=>"") : "Request aborted (timeout)";
    throw new Error(`HTTP ${res?.status||"—"}: ${t.slice(0,140)}`);
  }
  const data = await res.json();
  if (data.error) throw new Error(`API: ${data.error.message}`);
  const raw = data.content.map(c=>c.text||"").join("");
  return JSON.parse(raw.replace(/```json|```/g,"").trim());
}

// ══════════════════════════════════════════════════════════════════
//  RESUME RENDERER COMPONENTS
// ══════════════════════════════════════════════════════════════════
const rs = {
  fontFamily:"'Georgia','Times New Roman',serif",
  background:"#fff", padding:"32px 40px",
  fontSize:10.5, color:"#111", lineHeight:1.35,
};

function RRow({ left, right, bold=true, italic=false, mt=0 }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:mt}}>
      <span style={{fontWeight:bold?700:400,fontStyle:italic?"italic":"normal",fontSize:bold?10.5:10}}>{left}</span>
      <span style={{fontSize:9.5,color:"#333",flexShrink:0,marginLeft:6}}>{right}</span>
    </div>
  );
}
function RSecHeader({title}) {
  return (
    <div style={{borderBottom:"1.5px solid #111",margin:"9px 0 3px",paddingBottom:1}}>
      <span style={{fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{title}</span>
    </div>
  );
}

// Bullet rendering with diff coloring + keyword highlight
function BItem({ id, text, kws=[], diffStatus="same" }) {
  const colors = { new:"rgba(40,180,40,.1)", variant:"rgba(240,160,0,.1)", removed:"rgba(220,60,60,.08)", same:"transparent" };
  const borders = { new:"2px solid #2ab42a", variant:"2px solid #e08000", removed:"2px solid #dc3c3c", same:"none" };
  return (
    <li style={{
      fontSize:9.7, marginBottom:1.5, lineHeight:1.33,
      background:colors[diffStatus], borderLeft:borders[diffStatus],
      paddingLeft: diffStatus!=="same" ? 5 : 0,
    }}>
      {renderWithHighlight(text, kws)}
    </li>
  );
}

function BList({ ids=[], kws=[], baselineIds=[], diffMode=false }) {
  const baseSet = new Set(baselineIds);
  return (
    <ul style={{margin:"2px 0 0",paddingLeft:15}}>
      {ids.map(id => {
        const text = B[id]?.text; if(!text) return null;
        let status = "same";
        if (diffMode) {
          if (!baseSet.has(id)) {
            const conceptBase = id.replace(/_std|_esg|_esg2/,"");
            const hasVariant = baselineIds.some(bid=>bid.replace(/_std|_esg|_esg2/,"")=== conceptBase && bid!==id);
            status = hasVariant ? "variant" : "new";
          }
        }
        return <BItem key={id} id={id} text={text} kws={kws} diffStatus={status} />;
      })}
    </ul>
  );
}

function PlainBList({ items=[], kws=[] }) {
  return (
    <ul style={{margin:"2px 0 0",paddingLeft:15}}>
      {items.filter(Boolean).map((t,i)=>(
        <li key={i} style={{fontSize:9.7,marginBottom:1.5,lineHeight:1.33}}>{renderWithHighlight(t,kws)}</li>
      ))}
    </ul>
  );
}

function ResumeDoc({ cfg, kws=[], diffMode=false }) {
  const contact = cfg.contact==="duke"
    ? "xi.yang@duke.edu  •  (984) 335-0494  •  Durham, NC"
    : "Durham, NC 27708  |  (984) 335-0494  |  xyang.career@gmail.com  |  linkedin.com/in/xyang0";
  const allBaseIds = [...BASELINE.deloitteSABullets,...BASELINE.deloitteAssocBullets,...BASELINE.necBullets,"dc1","dc2"];

  return (
    <div id="resume-print" style={rs}>
      <div style={{textAlign:"center",marginBottom:6}}>
        <div style={{fontSize:16,fontWeight:700,letterSpacing:1.2}}>XI (SHAWN) YANG, CPA</div>
        <div style={{fontSize:9.3,marginTop:3,color:"#444"}}>{contact}</div>
      </div>

      {cfg.objective && <>
        <RSecHeader title="OBJECTIVE" />
        <div style={{fontSize:9.7,lineHeight:1.5,color:"#111",paddingBottom:2}}>{renderWithHighlight(cfg.objective, kws)}</div>
      </>}

      <RSecHeader title="EDUCATION" />
      <RRow left="DUKE UNIVERSITY, The Fuqua School of Business" right="Durham, NC" />
      <RRow left={`Master of Business Administration, ${CONC[cfg.dukeConcentration]}`} right="May 2026" bold={false} />
      <div style={{fontSize:9.5}}>GPA: {cfg.gpa}/4; Merit-based scholarship; Dean's list; Finance Club; Tech Club; Consulting Club</div>
      {cfg.showCoursework && <div style={{fontSize:9.5}}>Relevant Coursework: Corporate Finance, Valuation and Modeling, Investment, Financial Analytics</div>}

      <RRow left="WASEDA UNIVERSITY" right="Tokyo, Japan" mt={4} />
      <RRow left="Master of Arts in Economics" right="Mar 2015" bold={false} />
      {cfg.showWasedaDesc && <div style={{fontSize:9.5}}>Applied econometric models to analyze cross-cultural market trends; Active member of Intercultural Communication Center; planned 10+ cross-culture-exchange events, engaging 10+ sponsors</div>}

      <RRow left="TIANJIN UNIVERSITY OF FINANCE AND ECONOMICS" right="Tianjin, China" mt={4} />
      <RRow left="Bachelor of Arts in Japanese Language & Accounting" right="Jun 2012" bold={false} />
      {cfg.showTianjinDesc && <div style={{fontSize:9.5}}>Awarded first-honor academic-based scholarship (top 5%); Outstanding student leader scholarship</div>}

      <RSecHeader title="EXPERIENCE" />

      <RRow left="Duke Capital Partners" right="Durham, NC" />
      <RRow left="Investment Associate" right="2025–Present" bold={false} italic />
      <BList ids={["dc1","dc2"]} kws={kws} baselineIds={allBaseIds} diffMode={diffMode} />

      {cfg.includeEqtyLyfe && cfg.eqtyLyfeBullets?.length>0 && <>
        <RRow left="EQTY LYFE" right="San Jose, CA (Remote)" mt={5} />
        <RRow left={cfg.eqtyLyfeRole==="mba"?"MBA Summer Finance Intern":"Finance Intern"} right="2025" bold={false} italic />
        <BList ids={cfg.eqtyLyfeBullets} kws={kws} baselineIds={[]} diffMode={diffMode} />
      </>}

      <RRow left="Deloitte Touche Tohmatsu LLC." right="Tokyo, Japan / Sydney, Australia" mt={5} />
      {cfg.deloitteMerged ? <>
        <RRow left="Senior Associate" right="2018–2024" bold={false} italic />
        <BList ids={[...(cfg.deloitteSABullets||[]),...(cfg.deloitteAssocBullets||[])]} kws={kws} baselineIds={allBaseIds} diffMode={diffMode} />
      </> : <>
        <RRow left="Senior Associate" right="2022–2024" bold={false} italic />
        <BList ids={cfg.deloitteSABullets||[]} kws={kws} baselineIds={allBaseIds} diffMode={diffMode} />
        <RRow left="Associate" right="2018–2021" bold={false} italic mt={3} />
        <BList ids={cfg.deloitteAssocBullets||[]} kws={kws} baselineIds={allBaseIds} diffMode={diffMode} />
      </>}

      <RRow left="NEC Solution Innovators, Ltd." right="Tokyo, Japan" mt={5} />
      <RRow left="System Analyst" right="2015–2018" bold={false} italic />
      <BList ids={cfg.necBullets||[]} kws={kws} baselineIds={allBaseIds} diffMode={diffMode} />

      <RSecHeader title="ADDITIONAL INFORMATION" />
      <PlainBList kws={kws} items={[
        `Skills: ${SKILLS[cfg.skillsVariant]||SKILLS.standard}`,
        "Languages: Chinese (Native), Japanese (Fluent)",
        `Community Involvement: ${COMMUNITY[cfg.communityVariant]||COMMUNITY.full}`,
        cfg.showHobbies ? "Hobbies: Developed tools such as real estate analytics app that saved 30+ hours in property research" : null,
      ]} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MATCH ANALYSIS TAB
// ══════════════════════════════════════════════════════════════════
function MatchTab({ cfg, jdKeywords, matched, missing, score }) {
  const [activeKw, setActiveKw] = useState(null);
  const currentIds = new Set(getAllBulletIds(cfg));
  const suggestions = activeKw ? findBulletsForKeyword(activeKw) : [];

  const scoreColor = score>=70 ? "#4ade80" : score>=50 ? "#fbbf24" : "#f87171";
  const scoreLabel = score>=70 ? "优秀匹配" : score>=50 ? "基本匹配" : "需要优化";

  return (
    <div style={{padding:"20px 28px",color:"#e0e0ff",maxWidth:860}}>
      {/* Score ring */}
      <div style={{display:"flex",alignItems:"center",gap:28,marginBottom:28,background:"#0d0d1a",border:"1px solid #1e1e35",borderRadius:14,padding:"20px 24px"}}>
        <div style={{position:"relative",width:96,height:96,flexShrink:0}}>
          <svg viewBox="0 0 36 36" style={{transform:"rotate(-90deg)",width:"100%",height:"100%"}}>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#1e1e35" strokeWidth="3.5" />
            <circle cx="18" cy="18" r="14" fill="none" stroke={scoreColor} strokeWidth="3.5"
              strokeDasharray={`${score*.879} ${87.9-score*.879}`} strokeLinecap="round" />
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:24,fontWeight:800,color:scoreColor,lineHeight:1}}>{score}</span>
            <span style={{fontSize:9,color:"#666"}}>分</span>
          </div>
        </div>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:scoreColor}}>{scoreLabel}</div>
          <div style={{fontSize:13,color:"#888",marginTop:4}}>{matched.length}/{jdKeywords.length} 个JD关键词已覆盖</div>
          <div style={{fontSize:11,color:"#555",marginTop:6,lineHeight:1.6}}>
            点击红色关键词 → 查看母版库中可补充的bullet point<br/>
            绿色bullet = 已收录 · 灰色bullet = 未收录（可手动添加）
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        {/* Matched */}
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:"#4ade80",textTransform:"uppercase",marginBottom:10}}>✓ 已覆盖 ({matched.length})</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {matched.map(kw=>(
              <span key={kw} style={{background:"rgba(74,222,128,.12)",border:"1px solid rgba(74,222,128,.3)",borderRadius:20,padding:"4px 11px",fontSize:11,color:"#4ade80"}}>{kw}</span>
            ))}
          </div>
        </div>

        {/* Missing */}
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:"#f87171",textTransform:"uppercase",marginBottom:10}}>✗ 缺失 ({missing.length}) — 点击查看建议</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {missing.map(kw=>(
              <span key={kw} onClick={()=>setActiveKw(activeKw===kw?null:kw)}
                style={{
                  background:activeKw===kw?"rgba(248,113,113,.25)":"rgba(248,113,113,.1)",
                  border:`1px solid ${activeKw===kw?"#f87171":"rgba(248,113,113,.3)"}`,
                  borderRadius:20, padding:"4px 11px", fontSize:11, color:"#f87171",
                  cursor:"pointer", transition:"all .15s",
                  transform: activeKw===kw?"scale(1.05)":"scale(1)",
                }}>{kw} ↗</span>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestion panel */}
      {activeKw && (
        <div style={{background:"#080812",border:"1px solid #2a2a50",borderRadius:12,padding:"18px 20px",animation:"fadeIn .2s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#a0a0ff",marginBottom:14}}>
            「{activeKw}」— 母版库中可补充的bullet
          </div>
          {suggestions.length===0 ? (
            <div style={{fontSize:12,color:"#555",padding:"12px 0"}}>母版库中暂无直接匹配。建议在现有bullet结尾手动插入此关键词，或联系我升级母版库。</div>
          ) : (
            suggestions.map(s => {
              const inCurrent = currentIds.has(s.id);
              return (
                <div key={s.id} style={{
                  background:inCurrent?"rgba(74,222,128,.07)":"rgba(255,255,255,.03)",
                  border:`1px solid ${inCurrent?"rgba(74,222,128,.25)":"#1e1e35"}`,
                  borderRadius:8, padding:"10px 14px", marginBottom:8,
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <code style={{fontSize:10,color:"#666"}}>[{s.id}]</code>
                    <span style={{fontSize:10,fontWeight:700,color:inCurrent?"#4ade80":"#555"}}>
                      {inCurrent ? "✓ 已收录在当前简历" : "未收录 — 可替换现有bullet"}
                    </span>
                  </div>
                  <div style={{fontSize:11.5,color:"#c0c0e0",lineHeight:1.55}}>{s.text}</div>
                </div>
              );
            })
          )}
        </div>
      )}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  BENCHMARK DIFF TAB
// ══════════════════════════════════════════════════════════════════
function DiffTab({ cfg }) {
  const allBaseIds = [...BASELINE.deloitteSABullets,...BASELINE.deloitteAssocBullets,...BASELINE.necBullets,"dc1","dc2"];
  const baseSet = new Set(allBaseIds);
  const tailoredIds = getAllBulletIds(cfg);
  const tailoredSet = new Set(tailoredIds);

  const added = tailoredIds.filter(id => !baseSet.has(id) && !["dc1","dc2"].includes(id));
  const removed = allBaseIds.filter(id => {
    if (tailoredSet.has(id)) return false;
    const base = id.replace(/_std|_esg|_esg2/,"");
    return !tailoredIds.some(tid => tid.replace(/_std|_esg|_esg2/,"")=== base);
  });
  const variantSwapped = allBaseIds.filter(id => {
    if (tailoredSet.has(id)) return false;
    const base = id.replace(/_std|_esg|_esg2/,"");
    return tailoredIds.some(tid => tid.replace(/_std|_esg|_esg2/,"")=== base && tid!==id);
  });

  const structural = [];
  if (cfg.deloitteMerged!==BASELINE.deloitteMerged)     structural.push({ icon:"🔀", label:`Deloitte职级结构`, from: "分开 (SA 22-24 / Assoc 18-21)", to: cfg.deloitteMerged?"合并为 Senior Associate 2018–2024":"分开" });
  if (cfg.includeEqtyLyfe!==BASELINE.includeEqtyLyfe)   structural.push({ icon:"🏢", label:`EQTY LYFE`, from:"未收录", to:cfg.includeEqtyLyfe?`✅ ${cfg.eqtyLyfeRole==="mba"?"MBA Summer Finance Intern":"Finance Intern"}`:"移除" });
  if (cfg.dukeConcentration!==BASELINE.dukeConcentration) structural.push({ icon:"🎓", label:"Duke Concentration", from:BASELINE.dukeConcentration, to:cfg.dukeConcentration });
  if (cfg.gpa!==BASELINE.gpa)                            structural.push({ icon:"📊", label:"GPA", from:BASELINE.gpa, to:cfg.gpa });
  if (cfg.skillsVariant!==BASELINE.skillsVariant)        structural.push({ icon:"🛠", label:"Skills描述变体", from:BASELINE.skillsVariant, to:cfg.skillsVariant });
  if (cfg.showHobbies!==BASELINE.showHobbies)            structural.push({ icon:"🎯", label:"Hobbies", from:BASELINE.showHobbies?"显示":"隐藏", to:cfg.showHobbies?"显示":"隐藏" });
  if (cfg.communityVariant!==BASELINE.communityVariant)  structural.push({ icon:"🍶", label:"Community描述", from:BASELINE.communityVariant, to:cfg.communityVariant });

  const noChange = added.length===0 && removed.length===0 && variantSwapped.length===0 && structural.length===0;

  return (
    <div style={{padding:"20px 28px",color:"#e0e0ff",maxWidth:860}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,background:"#0d0d1a",border:"1px solid #1e1e35",borderRadius:10,padding:"12px 16px"}}>
        <div style={{fontSize:11,color:"#555"}}>基准：</div>
        <div style={{fontSize:12,fontWeight:700,color:"#888"}}>202603 PDF (master版 — xyang.career@gmail.com)</div>
      </div>

      {/* Legend */}
      <div style={{display:"flex",gap:16,marginBottom:20,fontSize:11,color:"#888"}}>
        <span><span style={{color:"#2ab42a",fontWeight:700}}>█</span> 新增</span>
        <span><span style={{color:"#e08000",fontWeight:700}}>█</span> 变体替换（同概念不同措辞）</span>
        <span><span style={{color:"#f87171",fontWeight:700}}>█</span> 移除</span>
        <span><span style={{color:"#a78bfa",fontWeight:700}}>█</span> 结构变化</span>
      </div>

      {noChange && (
        <div style={{background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.3)",borderRadius:10,padding:"16px 20px",color:"#4ade80",fontSize:13}}>
          ✓ 与基准版本完全一致，无任何改动
        </div>
      )}

      {structural.length>0 && (
        <Section title="结构性变化" color="#a78bfa">
          {structural.map((s,i)=>(
            <div key={i} style={{background:"rgba(167,139,250,.07)",border:"1px solid rgba(167,139,250,.2)",borderRadius:8,padding:"10px 14px",marginBottom:7}}>
              <span style={{marginRight:8}}>{s.icon}</span>
              <span style={{fontWeight:700,color:"#a78bfa",marginRight:8}}>{s.label}</span>
              <span style={{color:"#f87171",textDecoration:"line-through",marginRight:8,fontSize:11}}>{s.from}</span>
              <span style={{color:"#999",marginRight:8}}>→</span>
              <span style={{color:"#4ade80",fontSize:11}}>{s.to}</span>
            </div>
          ))}
        </Section>
      )}

      {variantSwapped.length>0 && (
        <Section title="变体替换（同概念，不同表达角度）" color="#fbbf24">
          {variantSwapped.map(id=>{
            const base = id.replace(/_std|_esg|_esg2/,"");
            const newId = tailoredIds.find(tid=>tid.replace(/_std|_esg|_esg2/,"")=== base);
            return (
              <div key={id} style={{marginBottom:12}}>
                <div style={{background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.25)",borderRadius:"8px 8px 0 0",padding:"8px 14px",fontSize:11,color:"#f87171"}}>
                  <span style={{fontWeight:700,marginRight:8}}>−</span><code style={{marginRight:8}}>[{id}]</code>{B[id]?.text}
                </div>
                {newId && <div style={{background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.25)",borderTop:"none",borderRadius:"0 0 8px 8px",padding:"8px 14px",fontSize:11,color:"#4ade80"}}>
                  <span style={{fontWeight:700,marginRight:8}}>+</span><code style={{marginRight:8}}>[{newId}]</code>{B[newId]?.text}
                </div>}
              </div>
            );
          })}
        </Section>
      )}

      {added.length>0 && (
        <Section title="新增 Bullets" color="#4ade80">
          {added.map(id=>(
            <div key={id} style={{background:"rgba(74,222,128,.07)",border:"1px solid rgba(74,222,128,.2)",borderRadius:8,padding:"9px 14px",marginBottom:6,fontSize:11,color:"#4ade80"}}>
              <span style={{fontWeight:700,marginRight:8}}>+</span><code style={{marginRight:8}}>[{id}]</code>{B[id]?.text}
            </div>
          ))}
        </Section>
      )}

      {removed.length>0 && (
        <Section title="移除 Bullets（基准有，此版无）" color="#f87171">
          {removed.map(id=>(
            <div key={id} style={{background:"rgba(248,113,113,.07)",border:"1px solid rgba(248,113,113,.2)",borderRadius:8,padding:"9px 14px",marginBottom:6,fontSize:11,color:"#f87171"}}>
              <span style={{fontWeight:700,marginRight:8}}>−</span><code style={{marginRight:8}}>[{id}]</code>{B[id]?.text}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{marginBottom:22}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color,textTransform:"uppercase",marginBottom:10}}>{title}</div>
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [jd, setJd]               = useState("");
  const [loading, setLoading]     = useState(false);
  const [cfg, setCfg]             = useState(null);
  const [notes, setNotes]         = useState("");
  const [err, setErr]             = useState("");
  const [tab, setTab]             = useState("preview");
  const [showKwHl, setShowKwHl]   = useState(false);
  const [showDiff, setShowDiff]   = useState(false);
  const [jdKws, setJdKws]         = useState([]);
  const [matchData, setMatchData] = useState(null);
  const [elapsed, setElapsed]     = useState(0);

  const generate = async () => {
    if (!jd.trim()) { setErr("请先粘贴JD内容"); return; }
    setErr(""); setLoading(true); setCfg(null); setMatchData(null); setElapsed(0);
    const timer = setInterval(() => setElapsed(s => s + 1), 1000);
    try {
      const result = await tailorResume(jd);
      const kws = result.jdKeywords || [];
      const match = computeMatch(result, kws);
      setCfg(result); setNotes(result.notes||"");
      setJdKws(kws); setMatchData(match);
      setTab("preview"); setShowKwHl(false); setShowDiff(false);
    } catch(e) { setErr("❌ " + e.message); }
    finally { setLoading(false); clearInterval(timer); }
  };

  const downloadResume = () => {
    if (!cfg) return;
    const el = document.getElementById("resume-print");
    const html = el ? el.outerHTML : "<p>无法获取简历内容</p>";
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Xi (Shawn) Yang Resume</title>
<style>
  body{margin:0;padding:18mm;font-family:'Georgia','Times New Roman',serif;font-size:10.5pt;color:#111;line-height:1.35}
  mark{background:transparent!important;color:inherit}
  @page{margin:15mm;size:Letter}
</style></head><body>${html}</body></html>`;
    const blob = new Blob([fullHtml], {type:"text/html"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "Shawn_Yang_Resume.html";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const TABS = [
    { id:"preview", label:"📄 简历预览" },
    { id:"match",   label:`🎯 关键词匹配${matchData ? ` · ${matchData.score}%` : ""}` },
    { id:"diff",    label:"🔄 Benchmark对比" },
  ];

  const activeKws = showKwHl ? (matchData?.matched||[]) : [];

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',system-ui,sans-serif",background:"#08080f",overflow:"hidden"}}>

      {/* ── LEFT PANEL ─────────────────────────────────────────── */}
      <div style={{width:295,display:"flex",flexDirection:"column",padding:"18px 15px",gap:11,background:"#0d0d1a",borderRight:"1px solid #1a1a2d",overflowY:"auto",flexShrink:0}}>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,letterSpacing:2.5,color:"#5b8dee",textTransform:"uppercase"}}>Resume Tailor</div>
          <div style={{fontSize:18,fontWeight:800,color:"#eeeeff",lineHeight:1.15,marginTop:2}}>Shawn Yang</div>
          <div style={{fontSize:10,color:"#3a3a5a",marginTop:2}}>claude-sonnet-4 · 母版库统一管理</div>
        </div>

        <div style={{height:1,background:"#1a1a2d"}} />

        <label style={{fontSize:9.5,fontWeight:700,color:"#555",letterSpacing:1.5,textTransform:"uppercase"}}>粘贴 JD</label>
        <textarea value={jd} onChange={e=>setJd(e.target.value)}
          placeholder={"Paste job description here...\n\nAI将自动：\n• 从母版库挑选最佳bullets\n• 决定Deloitte职级合并/分开\n• 判断是否加EqtyLyfe\n• 选ESG/标准措辞\n• 提取关键词 + 匹配度分析"}
          style={{flex:1,minHeight:260,background:"#080812",border:"1px solid #1a1a2d",borderRadius:8,padding:"10px 12px",color:"#b0b0cc",fontSize:11,resize:"none",lineHeight:1.5,outline:"none",fontFamily:"inherit"}}
        />

        <button onClick={generate} disabled={loading} style={{
          background:loading?"#1a1a2d":"linear-gradient(135deg,#5b8dee,#3a6ac8)",
          color:loading?"#444":"#fff",border:"none",borderRadius:8,
          padding:"12px 0",fontWeight:700,fontSize:13,cursor:loading?"not-allowed":"pointer",
        }}>{loading?"⏳  分析中…":"✨  生成定制简历"}</button>

        {err && <div style={{background:"#180808",border:"1px solid #5a1a1a",borderRadius:8,padding:"8px 11px",fontSize:11,color:"#ff7070"}}>{err}</div>}

        {notes && !loading && (
          <div style={{background:"#080f1a",border:"1px solid #142040",borderRadius:8,padding:"10px 12px"}}>
            <div style={{fontSize:8.5,fontWeight:700,letterSpacing:1.5,color:"#5b8dee",textTransform:"uppercase",marginBottom:5}}>AI 选择说明</div>
            <div style={{fontSize:11,color:"#7a9fcc",lineHeight:1.6}}>{notes}</div>
          </div>
        )}

        {cfg && !loading && (
          <div style={{background:"#080f08",border:"1px solid #142014",borderRadius:8,padding:"10px 12px",fontSize:10.5,color:"#5a9a5a",lineHeight:1.7}}>
            <div style={{fontWeight:700,color:"#6db86d",marginBottom:3}}>📋 配置摘要</div>
            <div>Deloitte: {cfg.deloitteMerged?"合并 2018–24":"分开 SA/Assoc"}</div>
            <div>EqtyLyfe: {cfg.includeEqtyLyfe?`✅ ${cfg.eqtyLyfeRole==="mba"?"MBA":"Intern"}`:"❌"}</div>
            <div>ESG模式: {(cfg.deloitteSABullets||[]).some(id=>id.includes("esg"))?"✅":"❌ 标准版"}</div>
            <div>GPA {cfg.gpa} · {cfg.dukeConcentration}</div>
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Tab bar */}
        <div style={{display:"flex",alignItems:"center",borderBottom:"1px solid #1a1a2d",background:"#0b0b17",padding:"0 16px",flexShrink:0,gap:2}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              background:"none",border:"none",padding:"11px 16px",
              color:tab===t.id?"#5b8dee":"#444",fontSize:12,fontWeight:tab===t.id?700:400,
              borderBottom:`2px solid ${tab===t.id?"#5b8dee":"transparent"}`,
              cursor:"pointer",transition:"all .15s",fontFamily:"inherit",whiteSpace:"nowrap",
            }}>{t.label}</button>
          ))}
          <div style={{flex:1}} />
          {cfg && tab==="preview" && (
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button onClick={()=>setShowKwHl(h=>!h)} style={{
                background:showKwHl?"rgba(255,228,77,.15)":"rgba(255,255,255,.04)",
                border:`1px solid ${showKwHl?"rgba(255,228,77,.4)":"#1e1e35"}`,
                borderRadius:6,padding:"5px 12px",
                color:showKwHl?"#ffe44d":"#666",
                fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,
              }}>🔍 关键词高亮 {showKwHl?"ON":"OFF"}</button>
              <button onClick={()=>setShowDiff(d=>!d)} style={{
                background:showDiff?"rgba(167,139,250,.15)":"rgba(255,255,255,.04)",
                border:`1px solid ${showDiff?"rgba(167,139,250,.4)":"#1e1e35"}`,
                borderRadius:6,padding:"5px 12px",
                color:showDiff?"#c4b5fd":"#666",
                fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,
              }}>🔄 差异对比 {showDiff?"ON":"OFF"}</button>
              <button onClick={downloadResume} style={{
                background:"rgba(91,141,238,.12)",border:"1px solid rgba(91,141,238,.3)",
                borderRadius:6,padding:"5px 12px",color:"#5b8dee",
                fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,
              }}>⬇ 下载 HTML（浏览器打印→PDF）</button>
            </div>
          )}
        </div>

        {/* Content area */}
        <div style={{flex:1,overflowY:"auto"}}>
          {loading && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:16}}>
              <div style={{width:44,height:44,border:"3px solid #1a1a2d",borderTop:`3px solid ${elapsed>30?"#f87171":"#5b8dee"}`,borderRadius:"50%",animation:"spin .8s linear infinite"}} />
              <div style={{fontSize:15,fontWeight:700,color:elapsed>30?"#f87171":"#eeeeff"}}>
                {elapsed>30 ? "⚠️  响应超时，即将报错…" : elapsed>15 ? "即将完成，稍候…" : "AI 分析 JD 中…"}
              </div>
              <div style={{fontSize:12,color:elapsed>30?"#f87171":"#555"}}>
                已等待 {elapsed} 秒 · 正常约需 20–35 秒
              </div>
              {elapsed>30 && <div style={{fontSize:11,color:"#888",maxWidth:300,textAlign:"center",lineHeight:1.6}}>
                如果持续卡住，请刷新页面重试。若反复超时，可能是网络问题。
              </div>}
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}

          {!loading && !cfg && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:10}}>
              <div style={{fontSize:52,opacity:.3}}>📄</div>
              <div style={{fontSize:14,color:"#2a2a4a"}}>粘贴JD → 点击生成</div>
            </div>
          )}

          {!loading && cfg && tab==="preview" && (
            <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",alignItems:"center"}}>
              {showDiff && (
                <div style={{marginBottom:14,background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.3)",borderRadius:8,padding:"8px 16px",fontSize:11,color:"#c4b5fd",width:"100%",maxWidth:740,boxSizing:"border-box"}}>
                  🔄 差异对比模式开启：<span style={{color:"#2ab42a"}}>绿色左边框</span> = 相对基准新增  ·  <span style={{color:"#e08000"}}>橙色左边框</span> = 变体替换
                </div>
              )}
              <div style={{width:"100%",maxWidth:740,boxShadow:"0 8px 48px rgba(0,0,0,.7)",borderRadius:3}}>
                <ResumeDoc cfg={cfg} kws={activeKws} diffMode={showDiff} />
              </div>
            </div>
          )}

          {!loading && cfg && tab==="match" && matchData && (
            <MatchTab cfg={cfg} jdKeywords={jdKws} matched={matchData.matched} missing={matchData.missing} score={matchData.score} />
          )}

          {!loading && cfg && tab==="diff" && (
            <DiffTab cfg={cfg} />
          )}
        </div>
      </div>
    </div>
  );
}
