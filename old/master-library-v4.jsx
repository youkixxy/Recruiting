import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  PieChart, Pie, Cell,
} from "recharts";

// ═══════════════════════════════════════════════════════════
// §1  BULLET DATA (flat)
// ═══════════════════════════════════════════════════════════
const B = {
  dc1: { text:"Sourced investment opportunities, participated in 20+ company screenings, and conducted 5+ due diligence processes, supporting go/no-go decisions and resulting in $2M in deployed capital", roleLabels:["PE/VC","Investment Banking","Corporate Development","M&A"], hardSkills:["Due Diligence","Investment Screening","Financial Analysis","Capital Deployment"], softSkills:["Strategic Thinking","Decision Making","Analytical Thinking"] },
  dc2: { text:"Developed and implemented real-time portfolio performance dashboard in Power BI, integrating metric analytics and automated reporting, and streamlining reporting operations by 40%", roleLabels:["Data Analytics","FP&A","Investment","Corporate Finance","Business Intelligence"], hardSkills:["Power BI","Dashboard Development","Data Analytics","Automation","KPI Design"], softSkills:["Initiative","Problem Solving"] },
  eq1: { text:"Built multi-year financial forecasts and analyzed unit economics and cash burn to support strategic planning and resource allocation for an early-stage fintech startup", roleLabels:["FP&A","Startup/Fintech","PE/VC","Corporate Finance"], hardSkills:["Financial Modeling","Forecasting","Unit Economics","Cash Flow Analysis"], softSkills:["Analytical Thinking","Strategic Thinking"] },
  eq2: { text:"Collaborated with founders to define key business metrics, providing data-driven insights for upcoming fundraising rounds", roleLabels:["FP&A","Startup/Fintech","PE/VC","Business Development"], hardSkills:["Metrics Design","Financial Analysis","Fundraising Support"], softSkills:["Collaboration","Communication","Stakeholder Management"] },
  dsa1_std:  { text:"Supervised cross-functional team of ten from audit, tax, and valuation services in statutory audit for tech client; leveraged data analytics to identify a $2M profit overstatement, enhancing audit accuracy", roleLabels:["Audit","Consulting","Corporate Finance","Tech Finance"], hardSkills:["Audit","Data Analytics","Valuation","Financial Analysis","Statutory Audit"], softSkills:["Leadership","Team Management","Cross-functional Collaboration"] },
  dsa1_esg:  { text:"Led cross-functional teams of ten across audit, tax, and valuation to deliver financial insights and risk assessment for senior stakeholders, leveraging ESG data analytics to improve sustainability disclosures", roleLabels:["ESG/Sustainability","Audit","Consulting","Risk Management"], hardSkills:["ESG Analytics","Audit","Risk Assessment","Financial Reporting","Sustainability Disclosure"], softSkills:["Leadership","Stakeholder Management","Communication","Executive Presence"] },
  dsa1_esg2: { text:"Supervised cross-functional team of ten from audit, tax, and valuation services in audit for tech client; leveraged ESG data analytics to identify reporting gaps and improve corporate sustainability disclosures", roleLabels:["ESG/Sustainability","Audit","Tech Finance","Corporate Governance"], hardSkills:["ESG Analytics","Audit","Corporate Governance","Financial Reporting","Gap Analysis"], softSkills:["Leadership","Team Management","Analytical Thinking"] },
  dsa_agile: { isNew:true, text:"Led cross-border finance teams in Japan and Australia to enhance budgeting and forecasting accuracy for a $200M investment project, leveraging agile project tracking and stakeholder engagement to streamline planning", roleLabels:["FP&A","Project Management","Consulting","Corporate Finance","Operations"], hardSkills:["Budgeting","Forecasting","Agile","Project Management","Financial Planning"], softSkills:["Leadership","Cross-cultural Communication","Stakeholder Management","Adaptability"] },
  dsa2:      { text:"Pioneered audit innovation by developing two data-driven solutions using SQL and Python, automating processes and implementing KPI dashboards, enhancing efficiency by 30+% across 50+ projects", roleLabels:["Data Analytics","Audit","Consulting","Technology","Operations"], hardSkills:["SQL","Python","KPI Design","Dashboard Development","Process Automation"], softSkills:["Innovation","Initiative","Problem Solving"] },
  dsa2_analytics: { isNew:true, text:"Managed end-to-end audit analytics automation by structuring client datasets with SQL and delivering Power BI KPI dashboards with standardized reporting logic, reducing manual workload by 70% across 50+ engagements", roleLabels:["Data Analytics","Business Intelligence","Audit","Operations","FP&A"], hardSkills:["SQL","Power BI","Data Modeling","Dashboard Development","Process Automation","KPI Design"], softSkills:["Initiative","Problem Solving","Attention to Detail"] },
  dsa_lean:  { isNew:true, text:"Optimized audit workflows for high-tech and healthcare clients by applying Lean Six Sigma principles, identifying bottlenecks and eliminating redundancies, which cut reporting turnaround time by 30%", roleLabels:["Consulting","Operations","Process Improvement","Healthcare Finance","Manufacturing"], hardSkills:["Lean Six Sigma","Process Optimization","Workflow Analysis","Root Cause Analysis"], softSkills:["Analytical Thinking","Problem Solving","Attention to Detail"] },
  dsa3:      { text:"Led pre-IPO audit for tech firm, raising $10M and boosting investor confidence through optimizing capital structure, reporting compliance, and ROI-driven investment decisions", roleLabels:["Investment Banking","Capital Markets","Audit","Corporate Finance","Tech Finance"], hardSkills:["IPO","Capital Structure","Financial Reporting","Compliance","Valuation"], softSkills:["Strategic Thinking","Stakeholder Management","Communication"] },
  dsa4:      { text:"Identified $3.6M financial fraud in COGS (40% of operating profits) for a $20M revenue electronics manufacturing client, leading to enhanced internal controls and compliance reporting", roleLabels:["Audit","Risk Management","Forensic Accounting","Manufacturing Finance","Compliance"], hardSkills:["Fraud Detection","Internal Controls","Compliance","Risk Management","Forensic Accounting"], softSkills:["Analytical Thinking","Attention to Detail","Problem Solving"] },
  dsa_cfo:   { isNew:true, text:"Presented audit insights and process optimization recommendations to regional CFOs and finance executives, influencing strategic decisions on internal controls and investment risk assessment for multinational clients", roleLabels:["Consulting","Corporate Finance","Audit","Strategy","C-Suite Advisory"], hardSkills:["Financial Reporting","Internal Controls","Risk Assessment","Executive Presentations","Strategic Advisory"], softSkills:["Communication","Executive Presence","Influencing Skills","Presentation","Stakeholder Management"] },
  dsa5:      { text:"Rated as Top Performer (top 3%) for three years; co-led 10+ cross-functional teams for tech, manufacturing, and finance industry, with end-to-end involvement in budgeting to report issuance", roleLabels:["Consulting","Corporate Finance","Operations","General Management"], hardSkills:["Budgeting","Financial Reporting","Project Management","Cross-industry Experience"], softSkills:["Leadership","Cross-functional Collaboration","Performance Excellence","Team Management"] },
  dsa_aop:   { isNew:true, text:"Partnered with global finance teams (Japan, Australia) to improve Annual Operating Plan (AOP) and forecasting accuracy, specifically optimizing manufacturing variance analysis and capital allocation across sectors", roleLabels:["FP&A","Corporate Finance","Manufacturing Finance","Operations"], hardSkills:["FP&A","AOP","Variance Analysis","Capital Allocation","Financial Forecasting"], softSkills:["Cross-cultural Collaboration","Stakeholder Management","Communication"] },
  dsa_aop_analytics: { isNew:true, text:"Partnered with global finance teams (Japan, Australia) and client finance teams to improve budgeting and forecasting accuracy by standardizing reporting metrics and streamlining data validation processes across sectors", roleLabels:["Data Analytics","FP&A","Corporate Finance","Operations","Business Intelligence"], hardSkills:["Data Validation","Reporting Standardization","Financial Forecasting","Process Improvement","Metrics Design"], softSkills:["Cross-functional Collaboration","Communication","Stakeholder Management"] },
  da1_std:   { text:"Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; analyzed revenue streams, expense structures, and working capital to support investment decisions", roleLabels:["M&A","Investment Banking","Corporate Development","PE/VC","Audit"], hardSkills:["Due Diligence","M&A","Financial Analysis","Working Capital Analysis","Revenue Analysis"], softSkills:["Cross-functional Collaboration","Analytical Thinking","Teamwork"] },
  da1_esg:   { text:"Collaborated with cross-functional teams to conduct due diligence for $15M healthcare acquisition; incorporated ESG risk assessments to support sustainable investment decisions", roleLabels:["ESG/Sustainability","Healthcare Finance","M&A","Investment","PE/VC"], hardSkills:["ESG","Due Diligence","M&A","Risk Assessment","Healthcare Finance","Sustainable Investing"], softSkills:["Cross-functional Collaboration","Analytical Thinking"] },
  da1_esg2:  { text:"Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; incorporated ESG risk assessments and compliance reviews to support sustainable investment decisions", roleLabels:["ESG/Sustainability","M&A","Compliance","Corporate Development"], hardSkills:["ESG","Due Diligence","Compliance","Risk Assessment","Sustainable Investing"], softSkills:["Cross-functional Collaboration","Attention to Detail"] },
  da2:       { text:"Managed multi-national team for a coal client with $200M revenue, analyzing performance metrics and integrating data insights to accelerate decision-making, reducing project cycle from 12 to 8 weeks", roleLabels:["Consulting","Operations","Project Management","Corporate Finance","Energy"], hardSkills:["Performance Analytics","Project Management","Data Analytics","Financial Analysis","Process Improvement"], softSkills:["Leadership","Cross-cultural Management","Decision Making","Team Management"] },
  nec1:      { text:"Implemented customized IT solutions including Cloud SAP products with real-time dashboards, improving client's inventory forecasting accuracy by 35% and operational efficiency by 50%", roleLabels:["ERP/IT Systems","Operations","Supply Chain","Consulting","Technology"], hardSkills:["SAP","Cloud ERP","Dashboard Development","Inventory Management","Forecasting","IT Implementation"], softSkills:["Problem Solving","Client Management","Technical Communication"] },
  nec_erp:   { isNew:true, text:"Led the implementation and customization of ERP systems (SAP, IFS), translating cross-functional business needs into actionable system specifications supporting financial and inventory operations", roleLabels:["ERP/IT Systems","System Analyst","Operations","Supply Chain","Consulting"], hardSkills:["SAP","IFS","ERP","Requirements Analysis","System Design","Business Analysis"], softSkills:["Cross-functional Collaboration","Communication","Analytical Thinking","Stakeholder Management"] },
  nec_predictive: { isNew:true, text:"Coordinated delivery of predictive analytics solutions and automated dashboards across departments, improving stock visibility and reducing operational inefficiencies by 40%", roleLabels:["Data Analytics","Operations","Supply Chain","Business Intelligence","Consulting"], hardSkills:["Predictive Analytics","Dashboard Development","Process Automation","Supply Chain Analytics"], softSkills:["Cross-functional Collaboration","Project Coordination","Communication"] },
  nec_sapdash: { isNew:true, text:"Designed and deployed real-time SAP dashboards and reporting tools, improving forecasting accuracy by 35% and supporting data-driven inventory planning and executive decision-making", roleLabels:["ERP/IT Systems","Data Analytics","Operations","Supply Chain"], hardSkills:["SAP","Dashboard Development","Reporting Tools","Forecasting","Data-Driven Decision Making"], softSkills:["Attention to Detail","Problem Solving","Communication"] },
  nec2:      { text:"Analyzed end-to-end business operation processes and redesigned workflow for chemical client, eliminating 80 FTEs and saving $5M annually", roleLabels:["Operations","Consulting","Process Improvement","Manufacturing","Cost Optimization"], hardSkills:["Business Process Reengineering","Workflow Design","Operations Analysis","Cost Reduction","Process Automation"], softSkills:["Analytical Thinking","Problem Solving","Strategic Thinking"] },
  nec_training: { isNew:true, text:"Led end-user training and change management sessions following ERP system rollout across three client divisions; increased system adoption by 40% and reduced support tickets by 25% within the first quarter", roleLabels:["Change Management","ERP/IT Systems","Consulting","Operations","Project Management"], hardSkills:["Change Management","ERP Training","Project Management","Adoption Metrics","Program Design"], softSkills:["Leadership","Communication","Training & Development","Stakeholder Management","Empathy"] },
};

// ═══════════════════════════════════════════════════════════
// §2  LIBRARY HIERARCHY
// ═══════════════════════════════════════════════════════════
const LIBRARY = [
  { company:"Duke Capital Partners", location:"Durham, NC", color:"#2563eb",
    roles:[{ title:"Investment Associate", dates:"2025–Present",
      groups:[{ bullets:["dc1"] },{ bullets:["dc2"] }] }] },
  { company:"EQTY LYFE", location:"San Jose, CA (Remote)", color:"#db2777",
    note:"仅 fintech / startup / FP&A / PE 方向收录",
    roles:[{ title:"Finance Intern / MBA Summer Finance Intern", dates:"2025",
      groups:[{ bullets:["eq1"] },{ bullets:["eq2"] }] }] },
  { company:"Deloitte Touche Tohmatsu LLC.", location:"Tokyo, Japan / Sydney, Australia", color:"#059669",
    note:"SA (2022–2024) 与 Associate (2018–2021) 可按JD合并为 Senior Associate 2018–2024",
    roles:[
      { title:"Senior Associate", dates:"2022–2024", groups:[
        { concept:"Team Leadership & Audit Delivery", useWhen:"Slot-1 必选其一", bullets:["dsa1_std"],
          variants:[{id:"dsa1_esg",label:"ESG variant",useWhen:"JD明确提ESG/sustainability"},{id:"dsa1_esg2",label:"ESG v2",useWhen:"ESG+科技客户"}] },
        { concept:"Automation & Technology", useWhen:"Slot-2 按角度选一", bullets:["dsa2"],
          variants:[{id:"dsa2_analytics",label:"Analytics variant",useWhen:"BI/数据分析方向，强调Power BI"}] },
        { bullets:["dsa_agile"] },{ bullets:["dsa_lean"] },{ bullets:["dsa3"] },
        { bullets:["dsa4"] },{ bullets:["dsa_cfo"] },{ bullets:["dsa5"] },
        { concept:"Global Forecasting & AOP", useWhen:"FP&A/分析方向二选一", bullets:["dsa_aop"],
          variants:[{id:"dsa_aop_analytics",label:"Analytics variant",useWhen:"强调数据标准化"}] },
      ]},
      { title:"Associate", dates:"2018–2021", groups:[
        { concept:"Due Diligence & Acquisition Support", useWhen:"Slot-1 必选其一", bullets:["da1_std"],
          variants:[{id:"da1_esg",label:"ESG variant",useWhen:"医疗行业+ESG"},{id:"da1_esg2",label:"ESG v2",useWhen:"ESG+compliance"}] },
        { bullets:["da2"] },
      ]},
    ] },
  { company:"NEC Solution Innovators, Ltd.", location:"Tokyo, Japan", color:"#7c3aed",
    roles:[{ title:"System Analyst", dates:"2015–2018",
      groups:[{ bullets:["nec1"] },{ bullets:["nec_erp"] },{ bullets:["nec_predictive"] },{ bullets:["nec_sapdash"] },{ bullets:["nec2"] },{ bullets:["nec_training"] }] }] },
];

// ═══════════════════════════════════════════════════════════
// §3  COURSES (from official transcript)
// ═══════════════════════════════════════════════════════════
const ALL_COURSES = {
  "Corporate Finance":                                      { code:"FINANCE 646",   cat:"finance" },
  "Valuation and Fundamental Analysis":                     { code:"ACCOUNTG 598",  cat:"finance" },
  "Investment":                                             { code:"FINANCE 647",   cat:"finance" },
  "Entrepreneurial Finance & Venture Capital":              { code:"FINANCE 651",   cat:"finance,vc" },
  "Finance Data Analytics":                                 { code:"FINANCE 894",   cat:"finance,analytics" },
  "Corporate Restructuring":                                { code:"FINANCE 658",   cat:"finance" },
  "Global Asset Allocation":                                { code:"FINANCE 656",   cat:"finance" },
  "International Finance":                                  { code:"FINANCE 663",   cat:"finance" },
  "Raising Capital & FinTech":                              { code:"FINANCE 661",   cat:"finance,fintech" },
  "Real Estate Entrepreneurship":                           { code:"FINANCE 662",   cat:"finance" },
  "Financial Management":                                   { code:"FINANCE 645",   cat:"finance" },
  "Tax for Global Management":                              { code:"ACCOUNTG 601",  cat:"finance" },
  "Foundations of Business Analytics":                      { code:"DECISION 610",  cat:"analytics" },
  "Data Analytics for Business":                            { code:"DECISION 618",  cat:"analytics" },
  "Transforming Tech Analytics with Machine Intelligence":  { code:"DECISION 894",  cat:"analytics,tech" },
  "Information Management":                                 { code:"DECISION 617",  cat:"analytics" },
  "Forecasting":                                            { code:"DECISION 614",  cat:"analytics,finance" },
  "Software Tools for Analytics":                           { code:"DECISION 616",  cat:"analytics" },
  "Foundations of Strategy":                                { code:"STRATEGY 835",  cat:"strategy" },
  "Managerial Economics":                                   { code:"MGRECON 780",   cat:"strategy" },
  "Operations Management":                                  { code:"OPERATNS 820",  cat:"operations" },
  "Negotiation":                                            { code:"MANAGEMT 745",  cat:"strategy" },
  "Marketing Management":                                   { code:"MARKETNG 795",  cat:"strategy" },
  "Medical Device Strategy":                                { code:"HLTHMGMT 712",  cat:"healthcare" },
  "Biotech and Pharma Strategy":                            { code:"HLTHMGMT 717",  cat:"healthcare" },
  "Healthcare Institutions, Systems & Policy":              { code:"HLTHMGMT 710",  cat:"healthcare" },
  "Sustainability Reporting & Analysis":                    { code:"ACCOUNTG 894",  cat:"esg,healthcare" },
  "Innovation and Cryptoventures":                          { code:"FUQINTRD 697",  cat:"fintech,entrepreneurship" },
};
const COURSE_NAMES = Object.keys(ALL_COURSES);

// ═══════════════════════════════════════════════════════════
// §4  CONSTANTS
// ═══════════════════════════════════════════════════════════
const CONC = {
  decision: "Decision Sciences Concentration",
  HSM:      "Health Sector Management (HSM)",
  both:     "Decision Sciences Concentration, Health Sector Management (HSM)",
};
const SKILLS_TEXT = {
  standard:   "CFA Exam Level III candidate; Advanced Excel (Financial Modeling), Valuation (DCF, Comps), SQL, Tableau, Power BI, ERP automation – Expertise in corporate finance, data-driven decision-making, and real-time financial insights.",
  enterprise: "CFA Exam Level III candidate; Advanced Excel (Financial Modeling, DCF, Scenario Analysis), SQL, Tableau, Power BI, ERP automation – Expertise in enterprise software finance, data-driven decision-making, and real-time financial insights.",
  analytics:  "CFA Exam Level III candidate; Excel (advanced), Python, SQL, Tableau, Power BI (DAX, Modeling), ERP Automation (SAP) – Expertise in Data Analysis & Visualization, Financial Modeling & Forecasting, Process Optimization & Automation.",
};
const COMMUNITY = {
  full:  "Member of Japanese Liquor Export Consortium; developed go-to-market strategy for sake brand, aligning product positioning with market demand through SWOT analysis; successfully sold 20,000 bottles to 15+ restaurants",
  short: "Member of Japanese Liquor Export Consortium; developed GTM strategy for sake brand and supported sales of 20,000 bottles to 15+ restaurants.",
};
const BASELINE_CFG = {
  contact:"personal", dukeConcentration:"decision", gpa:"3.85",
  showCoursework:false, coursework:[],
  showWasedaDesc:true, showTianjinDesc:true,
  includeEqtyLyfe:false, eqtyLyfeRole:"intern", eqtyLyfeBullets:[],
  deloitteMerged:false,
  deloitteSABullets:["dsa1_std","dsa2","dsa3","dsa4","dsa5"],
  deloitteAssocBullets:["da1_std","da2"],
  necBullets:["nec1","nec2"],
  skillsVariant:"standard", showHobbies:true, communityVariant:"full", objective:"",
};

// ═══════════════════════════════════════════════════════════
// §5  PRESET POSITION CONFIGS
// ═══════════════════════════════════════════════════════════
const PRESETS = {
  "FP&A": {
    ...BASELINE_CFG,
    dukeConcentration:"decision", showCoursework:true,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Finance Data Analytics","Forecasting","Operations Management","Foundations of Strategy"],
    deloitteSABullets:["dsa1_std","dsa_agile","dsa2","dsa_aop","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    skillsVariant:"standard",
    objective:"CFA Level III candidate, CPA, and Duke MBA (Decision Sciences) with 10+ years of international experience in financial planning, budgeting, and cross-functional reporting. Bringing proven expertise in AOP, variance analysis, and automation to drive data-driven FP&A excellence.",
  },
  "Investment Banking": {
    ...BASELINE_CFG,
    dukeConcentration:"decision", showCoursework:true, showWasedaDesc:false,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Investment","Corporate Restructuring","Global Asset Allocation","Entrepreneurial Finance & Venture Capital"],
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    showHobbies:false, communityVariant:"short",
    objective:"CFA Level III candidate, CPA, and Duke MBA with 10+ years of financial analysis and audit across tech, manufacturing, and healthcare. Demonstrated expertise in pre-IPO audit, capital structure optimization, and M&A due diligence supporting investment decisions.",
  },
  "Consulting": {
    ...BASELINE_CFG,
    dukeConcentration:"decision", showCoursework:true,
    coursework:["Foundations of Strategy","Managerial Economics","Operations Management","Data Analytics for Business","Negotiation","Corporate Finance"],
    deloitteSABullets:["dsa1_std","dsa_lean","dsa_cfo","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec2","nec_training"],
    objective:"CPA, CFA III candidate, and Duke MBA with 10+ years of management consulting and audit experience at Deloitte. Proven track record in Lean Six Sigma process optimization, C-suite advisory, and cross-functional team leadership across tech, healthcare, and manufacturing clients.",
  },
  "Data Analytics": {
    ...BASELINE_CFG,
    dukeConcentration:"decision", showCoursework:true, showTianjinDesc:false,
    coursework:["Data Analytics for Business","Transforming Tech Analytics with Machine Intelligence","Forecasting","Finance Data Analytics","Information Management","Foundations of Business Analytics"],
    deloitteSABullets:["dsa1_std","dsa2_analytics","dsa4","dsa_aop_analytics","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec_predictive"],
    skillsVariant:"analytics",
    objective:"Duke MBA (Decision Sciences), USCPA, and CFA III candidate with 10+ years of analytics and finance transformation experience. Expert in SQL, Power BI, and Python-driven automation; proven at reducing manual workload and delivering data-driven insights that accelerate decision-making.",
  },
  "Healthcare Finance": {
    ...BASELINE_CFG,
    dukeConcentration:"HSM", showCoursework:true,
    coursework:["Medical Device Strategy","Biotech and Pharma Strategy","Healthcare Institutions, Systems & Policy","Corporate Finance","Sustainability Reporting & Analysis","Finance Data Analytics"],
    deloitteSABullets:["dsa1_esg","dsa_lean","dsa3","dsa4","dsa5"],
    deloitteAssocBullets:["da1_esg","da2"], necBullets:["nec1","nec2"],
    skillsVariant:"enterprise", showHobbies:false, communityVariant:"short",
    objective:"USCPA, CFA III candidate, and Duke MBA with Health Sector Management certificate and 10+ years of financial analysis in healthcare and high-tech sectors. Specialized in healthcare acquisition due diligence, ESG reporting, and data-driven process optimization.",
  },
  "PE / VC": {
    ...BASELINE_CFG,
    dukeConcentration:"decision", showCoursework:true, showWasedaDesc:false,
    coursework:["Investment","Entrepreneurial Finance & Venture Capital","Corporate Finance","Valuation and Fundamental Analysis","Global Asset Allocation","Raising Capital & FinTech"],
    includeEqtyLyfe:true, eqtyLyfeRole:"mba", eqtyLyfeBullets:["eq1","eq2"],
    deloitteMerged:true,
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std"], necBullets:["nec1","nec2"],
    showHobbies:false, communityVariant:"short",
    objective:"CFA Level III candidate, CPA, and Duke MBA with experience deploying $2M in capital across 20+ company screenings as an Investment Associate at Duke Capital Partners. Brings 10+ years of financial due diligence, audit analytics, and ERP expertise to support portfolio management and deal execution.",
  },
  "ESG / Sustainability": {
    ...BASELINE_CFG,
    dukeConcentration:"HSM", showCoursework:true,
    coursework:["Sustainability Reporting & Analysis","Healthcare Institutions, Systems & Policy","Foundations of Strategy","Data Analytics for Business","Operations Management","International Finance"],
    deloitteSABullets:["dsa1_esg","dsa2_analytics","dsa_lean","dsa4","dsa5"],
    deloitteAssocBullets:["da1_esg2","da2"], necBullets:["nec1","nec2"],
    skillsVariant:"enterprise", showHobbies:false,
    objective:"CPA, CFA III candidate, and Duke MBA with Health Sector Management certificate bringing 10+ years of ESG analytics, sustainability reporting, and audit expertise. Experienced in leveraging data-driven insights to improve corporate sustainability disclosures and support responsible investment decisions.",
  },
};

// ═══════════════════════════════════════════════════════════
// §6  DERIVED DATA
// ═══════════════════════════════════════════════════════════
const ALL_IDS   = Object.keys(B);
const ALL_ROLES = [...new Set(ALL_IDS.flatMap(id => B[id].roleLabels))].sort();
const ALL_HARD  = [...new Set(ALL_IDS.flatMap(id => B[id].hardSkills))].sort();
const ALL_SOFT  = [...new Set(ALL_IDS.flatMap(id => B[id].softSkills))].sort();
const ALL_CO    = [...new Set(LIBRARY.map(c => c.company))];
const CO_COLOR  = {
  "Duke Capital Partners":         "#2563eb",
  "EQTY LYFE":                     "#db2777",
  "Deloitte Touche Tohmatsu LLC.": "#059669",
  "NEC Solution Innovators, Ltd.": "#7c3aed",
};
const newCount = ALL_IDS.filter(id => B[id].isNew).length;

function getAllBulletIds(cfg) {
  if (!cfg) return [];
  const eq = cfg.includeEqtyLyfe ? (cfg.eqtyLyfeBullets || []) : [];
  return ["dc1","dc2",...eq,...(cfg.deloitteSABullets||[]),...(cfg.deloitteAssocBullets||[]),...(cfg.necBullets||[])];
}
function getResumeText(cfg) {
  const ids = getAllBulletIds(cfg);
  return [...ids.map(id => B[id]?.text || ""), SKILLS_TEXT[cfg.skillsVariant] || "", COMMUNITY[cfg.communityVariant] || ""].join(" ").toLowerCase();
}
function computeMatch(cfg, kws) {
  if (!cfg || !kws?.length) return { matched:[], missing:[], score:0 };
  const txt = getResumeText(cfg);
  const matched = kws.filter(k => txt.includes(k.toLowerCase()));
  const missing  = kws.filter(k => !txt.includes(k.toLowerCase()));
  return { matched, missing, score: Math.round(matched.length / kws.length * 100) };
}
function findBulletsForKw(kw) {
  const k = kw.toLowerCase();
  return ALL_IDS.filter(id =>
    B[id].hardSkills.some(s => s.toLowerCase().includes(k)) ||
    B[id].roleLabels.some(r => r.toLowerCase().includes(k)) ||
    B[id].text.toLowerCase().includes(k)
  );
}
function hlSearch(text, search) {
  if (!search?.trim()) return text;
  const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === search.toLowerCase()
      ? <mark key={i} style={{ background:"#fde68a", color:"#713f12", borderRadius:2, padding:"0 1px" }}>{p}</mark>
      : <span key={i}>{p}</span>
  );
}
function hlKws(text, kws) {
  if (!kws || kws.length === 0) return text;
  const esc = kws.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${esc.join("|")})`, "gi");
  const parts = [];
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={`t${last}`}>{text.slice(last, m.index)}</span>);
    parts.push(<mark key={`m${m.index}`} style={{ background:"#fde68a", color:"#713f12", borderRadius:2 }}>{m[0]}</mark>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={`e${last}`}>{text.slice(last)}</span>);
  return parts.length > 0 ? parts : text;
}

// ═══════════════════════════════════════════════════════════
// §7  DESIGN + ATOMS
// ═══════════════════════════════════════════════════════════
const T = {
  bg:"#f5f6fa", surface:"#ffffff", border:"#e3e5ef",
  text:"#111827", text2:"#374151", text3:"#9ca3af",
  accent:"#2563eb", accentBg:"#eff4ff",
  new:"#d97706", newBg:"#fffbeb",
};
const SEP = <div style={{ height:1, background:"#f0f1f5", margin:"6px 0" }} />;

function Chip({ label, bg, color, bd }) {
  return (
    <span style={{ background:bg, border:`1px solid ${bd||bg}`, color, borderRadius:4,
      padding:"1px 7px", fontSize:10.5, fontWeight:600, lineHeight:1.7, whiteSpace:"nowrap", display:"inline-block" }}>
      {label}
    </span>
  );
}
const RoleChip = ({ l }) => <Chip label={l} bg="#f0fdf4" color="#166534" bd="#bbf7d0" />;
const HardChip = ({ l }) => <Chip label={l} bg="#eff6ff" color="#1e40af" bd="#bfdbfe" />;
const SoftChip = ({ l }) => <Chip label={l} bg="#fff7ed" color="#9a3412" bd="#fed7aa" />;
const NewBadge  = () => <Chip label="NEW ✦" bg="#fffbeb" color="#d97706" bd="#fde68a" />;
function IdBadge({ id }) {
  return (
    <code style={{ fontSize:10, color:T.text3, background:"#f3f4f6",
      border:`1px solid ${T.border}`, borderRadius:4, padding:"1px 6px" }}>
      {id}
    </code>
  );
}
function TagStack({ bullet }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <div style={{ display:"flex", gap:4, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:9.5, color:T.text3, width:28, flexShrink:0 }}>岗位</span>
        {bullet.roleLabels.map(r => <RoleChip key={r} l={r} />)}
      </div>
      <div style={{ display:"flex", gap:4, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:9.5, color:T.text3, width:28, flexShrink:0 }}>Hard</span>
        {bullet.hardSkills.map(s => <HardChip key={s} l={s} />)}
      </div>
      <div style={{ display:"flex", gap:4, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:9.5, color:T.text3, width:28, flexShrink:0 }}>Soft</span>
        {bullet.softSkills.map(s => <SoftChip key={s} l={s} />)}
      </div>
    </div>
  );
}
function Card({ children, style }) {
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
      padding:"16px 20px", marginBottom:10, boxShadow:"0 1px 4px rgba(0,0,0,.05)", ...style }}>
      {children}
    </div>
  );
}
function SectionTitle({ children }) {
  return (
    <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.8, color:T.text3,
      textTransform:"uppercase", marginBottom:14, marginTop:4 }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §8  LIBRARY TAB — left-right layout with separators
// ═══════════════════════════════════════════════════════════
function BulletRowLR({ id, isVariant, variantLabel, variantUseWhen, isLast, search }) {
  const bullet = B[id];
  if (!bullet) return null;
  const [open, setOpen] = useState(!isVariant);

  const leftStyle = {
    flex:"0 0 56%",
    borderRight:`1px solid ${T.border}`,
    paddingRight:14,
    paddingBottom:10,
  };
  const rightStyle = { flex:1, paddingLeft:14, paddingBottom:10 };

  if (isVariant) {
    return (
      <div>
        <div style={{ display:"flex" }}>
          <div style={leftStyle}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:0 }}>
              <div style={{ width:24, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:2 }}>
                <div style={{ width:1, height:8, background:T.border }} />
                <span style={{ fontSize:12, color:T.border, lineHeight:1 }}>{isLast ? "└" : "├"}</span>
                {!isLast && <div style={{ width:1, flex:1, background:T.border }} />}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:4 }}>
                  <IdBadge id={id} />
                  <Chip label={variantLabel} bg="#f5f3ff" color="#6d28d9" bd="#ddd6fe" />
                  {bullet.isNew && <NewBadge />}
                  {variantUseWhen && <span style={{ fontSize:10.5, color:T.text3, fontStyle:"italic" }}>→ {variantUseWhen}</span>}
                </div>
                <div style={{ fontSize:12.5, color:T.text2, lineHeight:1.6, cursor:"pointer" }}
                  onClick={() => setOpen(o => !o)}>
                  {hlSearch(bullet.text, search)}
                </div>
              </div>
            </div>
          </div>
          <div style={rightStyle}>{open && <TagStack bullet={bullet} />}</div>
        </div>
        {SEP}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display:"flex" }}>
        <div style={leftStyle}>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:5 }}>
            <span style={{ fontSize:14, color:T.text3, lineHeight:1 }}>•</span>
            <IdBadge id={id} />
            {bullet.isNew && <NewBadge />}
          </div>
          <div style={{ fontSize:13.5, color:T.text, lineHeight:1.65, fontWeight:500, paddingLeft:22, cursor:"pointer" }}
            onClick={() => setOpen(o => !o)}>
            {hlSearch(bullet.text, search)}
          </div>
        </div>
        <div style={rightStyle}>{open && <TagStack bullet={bullet} />}</div>
      </div>
      {SEP}
    </div>
  );
}

function BulletGroup({ group, search }) {
  const hasConcept = !!group.concept;
  const hasVariants = group.variants?.length > 0;
  const [varOpen, setVarOpen] = useState(true);

  return (
    <div style={{ marginBottom: hasConcept ? 12 : 0 }}>
      {hasConcept && (
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <div style={{ flex:1, height:1, background:"#e9eaf0" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"#6b7280", background:"#f3f4f6",
              border:`1px solid ${T.border}`, borderRadius:20, padding:"2px 12px", whiteSpace:"nowrap" }}>
              {group.concept}
            </span>
            <div style={{ flex:1, height:1, background:"#e9eaf0" }} />
          </div>
          {group.useWhen && (
            <div style={{ fontSize:11, color:T.text3, fontStyle:"italic", marginBottom:8 }}>
              💡 {group.useWhen}
            </div>
          )}
        </div>
      )}
      {(group.bullets || []).map(id => <BulletRowLR key={id} id={id} search={search} />)}
      {hasVariants && (
        <div style={{ paddingLeft:20 }}>
          <button onClick={() => setVarOpen(o => !o)}
            style={{ fontSize:11, color:"#6d28d9", background:"#f5f3ff", border:"1px solid #ddd6fe",
              borderRadius:6, padding:"3px 10px", cursor:"pointer", fontFamily:"inherit",
              fontWeight:600, marginBottom:varOpen ? 6 : 0 }}>
            {varOpen ? `▼ 收起 ${group.variants.length} 个变体` : `▶ 展开 ${group.variants.length} 个变体`}
          </button>
          {varOpen && group.variants.map((v, i) => (
            <BulletRowLR key={v.id} id={v.id} isVariant
              variantLabel={v.label} variantUseWhen={v.useWhen}
              isLast={i === group.variants.length - 1} search={search} />
          ))}
        </div>
      )}
    </div>
  );
}

function RoleSection({ role, companyColor, search, filterNew }) {
  const [collapsed, setCollapsed] = useState(false);
  const visibleGroups = useMemo(() => {
    if (!filterNew && !search) return role.groups;
    return role.groups.filter(g => {
      const ids = [...(g.bullets || []), ...(g.variants || []).map(v => v.id)];
      if (filterNew) return ids.some(id => B[id]?.isNew);
      if (search) return ids.some(id =>
        B[id]?.text.toLowerCase().includes(search.toLowerCase()) ||
        id.includes(search.toLowerCase())
      );
      return true;
    });
  }, [role.groups, filterNew, search]);

  if (visibleGroups.length === 0) return null;

  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10,
        cursor:"pointer", userSelect:"none" }} onClick={() => setCollapsed(c => !c)}>
        <span style={{ fontSize:13, fontWeight:700, color:companyColor }}>{role.title}</span>
        <span style={{ fontSize:12, color:T.text3 }}>{role.dates}</span>
        <span style={{ fontSize:10, color:T.text3, marginLeft:"auto" }}>{collapsed ? "▶" : "▼"}</span>
      </div>
      {!collapsed && (
        <div style={{ border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden" }}>
          <div style={{ display:"flex", padding:"7px 14px 4px",
            borderBottom:`1px solid ${T.border}`, background:"#fafafa" }}>
            <div style={{ flex:"0 0 56%", fontSize:10, fontWeight:700, color:T.text3,
              letterSpacing:1, textTransform:"uppercase", paddingRight:14,
              borderRight:`1px solid ${T.border}` }}>
              Bullet 内容（点击展开/折叠标签）
            </div>
            <div style={{ flex:1, fontSize:10, fontWeight:700, color:T.text3,
              letterSpacing:1, textTransform:"uppercase", paddingLeft:14 }}>
              岗位 / Hard Skills / Soft Skills
            </div>
          </div>
          <div style={{ padding:"10px 14px 4px" }}>
            {visibleGroups.map((g, i) => <BulletGroup key={i} group={g} search={search} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function CompanySection({ co, search, filterNew }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`,
      borderLeft:`4px solid ${co.color}`, borderRadius:12, marginBottom:14,
      boxShadow:"0 1px 4px rgba(0,0,0,.04)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px",
        cursor:"pointer", background:`${co.color}08`,
        borderBottom: collapsed ? "none" : `1px solid ${T.border}` }}
        onClick={() => setCollapsed(c => !c)}>
        <span style={{ fontSize:17, fontWeight:800, color:co.color }}>{co.company}</span>
        <span style={{ fontSize:11.5, color:T.text3 }}>{co.location}</span>
        <span style={{ fontSize:11, color:T.text3, marginLeft:"auto" }}>{collapsed ? "▶ 展开" : "▼ 收起"}</span>
      </div>
      {!collapsed && (
        <div style={{ padding:"14px 18px 6px" }}>
          {co.note && (
            <div style={{ fontSize:11.5, color:"#92400e", background:"#fffbeb",
              border:"1px solid #fde68a", borderRadius:6, padding:"6px 12px", marginBottom:12 }}>
              💡 {co.note}
            </div>
          )}
          {co.roles.map(r => (
            <RoleSection key={r.title} role={r} companyColor={co.color}
              search={search} filterNew={filterNew} />
          ))}
        </div>
      )}
    </div>
  );
}

function LibraryTab() {
  const [search, setSearch] = useState("");
  const [filterNew, setFilterNew] = useState(false);
  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 搜索 bullet 文字 / id…"
          style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:8,
            padding:"7px 13px", color:T.text, fontSize:12.5, outline:"none",
            width:230, fontFamily:"inherit" }} />
        <button onClick={() => setFilterNew(n => !n)}
          style={{ background: filterNew ? "#fffbeb" : "none",
            border:`1px solid ${filterNew ? "#fde68a" : T.border}`, borderRadius:8,
            padding:"7px 13px", color: filterNew ? "#92400e" : T.text3,
            fontSize:12.5, cursor:"pointer", fontFamily:"inherit", fontWeight: filterNew ? 700 : 400 }}>
          ✦ 仅看 NEW ({newCount})
        </button>
        {(search || filterNew) && (
          <button onClick={() => { setSearch(""); setFilterNew(false); }}
            style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:8,
              padding:"7px 10px", color:T.text3, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
            ✕
          </button>
        )}
        <span style={{ fontSize:11.5, color:T.text3 }}>
          点击 bullet 文字 → 展开/折叠右侧标签 · 紫色按钮 → 展开变体
        </span>
      </div>
      {LIBRARY.map(co => (
        <CompanySection key={co.company} co={co} search={search} filterNew={filterNew} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §9  RESUME CONTENT TAB
// ═══════════════════════════════════════════════════════════
function ResumeContentTab() {
  function Row({ label, children }) {
    return (
      <div style={{ display:"flex", gap:12, marginBottom:8, alignItems:"flex-start" }}>
        <span style={{ fontSize:11, color:T.text3, fontWeight:600, width:120, flexShrink:0, paddingTop:2 }}>{label}</span>
        <span style={{ fontSize:13, color:T.text, lineHeight:1.55, flex:1 }}>{children}</span>
      </div>
    );
  }
  return (
    <div style={{ maxWidth:860 }}>
      <SectionTitle>👤 个人信息</SectionTitle>
      <Card>
        <Row label="姓名">Xi (Shawn) Yang, CPA</Row>
        <Row label="电话">(984) 335-0494</Row>
        <Row label="地址">Durham, NC 27708</Row>
        <Row label="LinkedIn">linkedin.com/in/xyang0</Row>
        <div style={{ display:"flex", gap:8, marginTop:6, flexWrap:"wrap" }}>
          {[{v:"xyang.career@gmail.com",l:"personal",n:"主要投递"},{v:"xi.yang@duke.edu",l:"duke",n:"Duke/学术岗"}].map(e => (
            <div key={e.v} style={{ background:T.accentBg, border:"1px solid #bfdbfe", borderRadius:8, padding:"8px 14px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.accent, fontFamily:"monospace" }}>{e.v}</div>
              <div style={{ fontSize:10.5, color:T.text3, marginTop:2 }}>{e.l} · {e.n}</div>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle>🎓 学历</SectionTitle>
      <Card>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:6 }}>Duke University, The Fuqua School of Business</div>
        <div style={{ fontSize:12.5, color:T.text2, marginBottom:8 }}>Master of Business Administration · 07/2024–05/2026</div>
        <Row label="GPA">3.85/4.0（统一使用此版本）</Row>
        <Row label="荣誉">Merit-based scholarship; Dean's list</Row>
        <Row label="社团">Finance Club; Tech Club; Consulting Club</Row>
        <div style={{ fontSize:11, fontWeight:700, color:T.text3, marginTop:12, marginBottom:6 }}>Concentration（按岗位选择性披露）</div>
        {[
          { v:CONC.decision, u:"金融/银行/咨询/数据分析（通用）" },
          { v:CONC.HSM,      u:"医疗行业岗位" },
          { v:CONC.both,     u:"医疗+分析双重相关岗位" },
        ].map(c => (
          <div key={c.v} style={{ display:"flex", gap:10, marginBottom:5, alignItems:"baseline", flexWrap:"wrap" }}>
            <span style={{ fontSize:12.5, color:T.text, fontWeight:600, flex:1 }}>"{c.v}"</span>
            <span style={{ fontSize:11, color:T.text3, flexShrink:0 }}>{c.u}</span>
          </div>
        ))}
        <div style={{ fontSize:11, fontWeight:700, color:T.text3, marginTop:12, marginBottom:8 }}>课程全录（按岗位选择性披露，共 {COURSE_NAMES.length} 门）</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {COURSE_NAMES.map(n => (
            <div key={n} style={{ background:"#f8faff", border:`1px solid ${T.border}`, borderRadius:6, padding:"4px 9px" }}>
              <span style={{ fontSize:11, color:T.text, fontWeight:500 }}>{n}</span>
              <span style={{ fontSize:9.5, color:T.text3, marginLeft:5 }}>{ALL_COURSES[n].code}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:4 }}>Waseda University</div>
        <div style={{ fontSize:12.5, color:T.text2, marginBottom:6 }}>Master of Arts in Economics · 04/2013–03/2015 · Tokyo, Japan</div>
        <Row label="描述">Applied econometric models to analyze cross-cultural market trends; Active member of Intercultural Communication Center; planned 10+ cross-culture-exchange events, engaging 10+ sponsors</Row>
      </Card>
      <Card>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:4 }}>Tianjin University of Finance and Economics</div>
        <div style={{ fontSize:12.5, color:T.text2, marginBottom:6 }}>Bachelor of Arts in Japanese Language & Accounting · 09/2008–06/2012 · Tianjin, China</div>
        <Row label="描述">Awarded first-honor academic-based scholarship (top 5%); Outstanding student leader scholarship</Row>
      </Card>

      <SectionTitle>📜 证书</SectionTitle>
      <Card>
        {[
          { n:"CFA Exam Level III Candidate", t:"Finance", u:"全部岗位" },
          { n:"U.S. Certified Public Accountant (USCPA), Licensed January 2022", t:"Finance", u:"全部岗位" },
          { n:"AWS Certified Solutions Architect – Associate", t:"Tech", u:"Tech/IT/Cloud" },
          { n:"Oracle Certified Professional, Oracle Master Gold 11g", t:"Tech", u:"ERP/IT Systems" },
          { n:"Fundamental & Applied IT Engineer (IPA Japan) – Passed", t:"Tech", u:"日企/IT方向" },
        ].map(c => (
          <div key={c.n} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8,
            paddingBottom:8, borderBottom:`1px solid ${T.border}` }}>
            <span style={{ fontSize:13, color:T.text, flex:1, fontWeight:500 }}>{c.n}</span>
            <Chip label={c.t} bg={c.t==="Finance"?"#eff6ff":"#f5f3ff"}
              color={c.t==="Finance"?"#1e40af":"#6d28d9"}
              bd={c.t==="Finance"?"#bfdbfe":"#ddd6fe"} />
            <span style={{ fontSize:11, color:T.text3, width:120, flexShrink:0, textAlign:"right" }}>{c.u}</span>
          </div>
        ))}
      </Card>

      <SectionTitle>🛠 Skills 变体</SectionTitle>
      {Object.entries(SKILLS_TEXT).map(([key, text]) => (
        <Card key={key}>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6 }}>{key}</div>
          <div style={{ fontSize:12.5, color:T.text2, lineHeight:1.6 }}>{text}</div>
        </Card>
      ))}

      <SectionTitle>🌐 语言 · 📅 时间线 · 💼 附加</SectionTitle>
      <Card>
        <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap" }}>
          {[{lang:"Chinese",lv:"Native"},{lang:"Japanese",lv:"Fluent"},{lang:"English",lv:"Fluent",n:"部分版本显式列出"}].map(l => (
            <div key={l.lang} style={{ background:T.accentBg, border:"1px solid #bfdbfe", borderRadius:8, padding:"8px 14px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{l.lang}</div>
              <div style={{ fontSize:11.5, color:T.accent, fontWeight:600 }}>{l.lv}</div>
              {l.n && <div style={{ fontSize:10, color:T.text3 }}>{l.n}</div>}
            </div>
          ))}
        </div>
        <div style={{ height:1, background:T.border, margin:"10px 0" }} />
        <Row label="Community（完整）">{COMMUNITY.full}</Row>
        <Row label="Community（精简）">{COMMUNITY.short}</Row>
        <Row label="Hobbies">Developed tools such as real estate analytics app that saved 30+ hours in property research</Row>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §10  ROLE INDEX TAB
// ═══════════════════════════════════════════════════════════
function RoleIndexTab() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth:860 }}>
      <div style={{ fontSize:12, color:T.text3, marginBottom:16 }}>
        共 <strong style={{ color:T.text }}>{ALL_ROLES.length}</strong> 个岗位标签
      </div>
      {ALL_ROLES.map(role => {
        const ids = ALL_IDS.filter(id => B[id].roleLabels.includes(role));
        const isOpen = open === role;
        return (
          <div key={role} style={{ marginBottom:6 }}>
            <button onClick={() => setOpen(isOpen ? null : role)}
              style={{ width:"100%", background: isOpen ? "#f0fdf4" : "#fafafa",
                border:`1px solid ${isOpen ? "#bbf7d0" : T.border}`,
                borderRadius: isOpen ? "10px 10px 0 0" : 10,
                padding:"10px 16px", display:"flex", alignItems:"center",
                gap:10, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
              <RoleChip l={role} />
              <span style={{ fontSize:12, color:T.text3 }}>{ids.length} bullets</span>
              <span style={{ marginLeft:"auto", fontSize:11, color:T.text3 }}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div style={{ border:"1px solid #bbf7d0", borderTop:"none",
                borderRadius:"0 0 10px 10px", padding:"12px 16px", background:"#f0fdf4" }}>
                {ids.map(id => (
                  <div key={id} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                    <IdBadge id={id} />
                    <div style={{ fontSize:12.5, color:T.text, lineHeight:1.55 }}>{B[id].text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §11  SKILL INDEX TAB
// ═══════════════════════════════════════════════════════════
function SkillRow({ skill, ids, type }) {
  const [open, setOpen] = useState(false);
  const color = type === "hard" ? "#1e40af" : "#9a3412";
  const bg    = type === "hard" ? "#eff6ff" : "#fff7ed";
  const bd    = type === "hard" ? "#bfdbfe" : "#fed7aa";
  return (
    <div style={{ marginBottom:5 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", background: open ? bg : "#fafafa",
          border:`1px solid ${open ? bd : T.border}`,
          borderRadius: open ? "8px 8px 0 0" : 8,
          padding:"7px 13px", display:"flex", alignItems:"center",
          cursor:"pointer", fontFamily:"inherit" }}>
        <span style={{ fontSize:12, color, fontWeight:600 }}>{skill}</span>
        <span style={{ fontSize:11, color:T.text3, marginLeft:"auto" }}>{ids.length}个 {open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ border:`1px solid ${bd}`, borderTop:"none",
          borderRadius:"0 0 8px 8px", padding:"10px 12px", background:bg }}>
          {ids.map(id => (
            <div key={id} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
              <IdBadge id={id} />
              <div style={{ fontSize:11.5, color:T.text, lineHeight:1.5 }}>{B[id].text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function SkillIndexTab() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, alignItems:"start", maxWidth:1000 }}>
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:"#1e40af", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
          Hard Skills ({ALL_HARD.length})
        </div>
        {ALL_HARD.map(s => (
          <SkillRow key={s} skill={s} ids={ALL_IDS.filter(id => B[id].hardSkills.includes(s))} type="hard" />
        ))}
      </div>
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:"#9a3412", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
          Soft Skills ({ALL_SOFT.length})
        </div>
        {ALL_SOFT.map(s => (
          <SkillRow key={s} skill={s} ids={ALL_IDS.filter(id => B[id].softSkills.includes(s))} type="soft" />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §12  DASHBOARD TAB
// ═══════════════════════════════════════════════════════════
function DashboardTab() {
  const PIE_COLORS = ["#2563eb","#db2777","#059669","#7c3aed"];
  const tt = { contentStyle:{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, fontSize:12 } };

  const byCompany = ALL_CO.map(c => {
    const co = LIBRARY.find(l => l.company === c);
    const count = co ? co.roles.flatMap(r => r.groups.flatMap(g =>
      [...(g.bullets||[]),...(g.variants||[]).map(v=>v.id)]
    )).length : 0;
    return { name: c.split(" ")[0], count };
  });
  const roleFreq = ALL_ROLES
    .map(r => ({ name:r, count: ALL_IDS.filter(id => B[id].roleLabels.includes(r)).length }))
    .sort((a,b) => b.count - a.count).slice(0,12);
  const hardFreq = ALL_HARD
    .map(s => ({ name:s, count: ALL_IDS.filter(id => B[id].hardSkills.includes(s)).length }))
    .sort((a,b) => b.count - a.count).slice(0,14);
  const softFreq = ALL_SOFT
    .map(s => ({ name:s, count: ALL_IDS.filter(id => B[id].softSkills.includes(s)).length }))
    .sort((a,b) => b.count - a.count);
  const radarData = [
    { subject:"Finance",    A: ALL_IDS.filter(id => B[id].roleLabels.some(r => ["Corporate Finance","FP&A","Investment Banking"].includes(r))).length },
    { subject:"Analytics",  A: ALL_IDS.filter(id => B[id].hardSkills.some(s => ["SQL","Power BI","Data Analytics","Python"].includes(s))).length },
    { subject:"Audit/Risk", A: ALL_IDS.filter(id => B[id].roleLabels.some(r => ["Audit","Risk Management","Compliance"].includes(r))).length },
    { subject:"Ops/Process",A: ALL_IDS.filter(id => B[id].roleLabels.some(r => ["Operations","Process Improvement"].includes(r))).length },
    { subject:"Leadership", A: ALL_IDS.filter(id => B[id].softSkills.includes("Leadership")).length },
    { subject:"M&A/PE",     A: ALL_IDS.filter(id => B[id].roleLabels.some(r => ["M&A","PE/VC"].includes(r))).length },
    { subject:"ESG",        A: ALL_IDS.filter(id => B[id].roleLabels.some(r => r.includes("ESG"))).length },
    { subject:"Tech/ERP",   A: ALL_IDS.filter(id => B[id].roleLabels.some(r => ["ERP/IT Systems","Technology"].includes(r))).length },
  ];

  function StatCard({ label, value, sub, color }) {
    return (
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
        padding:"16px 20px", flex:1, minWidth:120, boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
        <div style={{ fontSize:30, fontWeight:800, color: color||"#2563eb", lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:12, fontWeight:700, color:T.text, marginTop:6 }}>{label}</div>
        {sub && <div style={{ fontSize:10.5, color:T.text3, marginTop:2 }}>{sub}</div>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth:1000 }}>
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <StatCard label="总 Bullets" value={ALL_IDS.length} sub={`含 ${newCount} 条 NEW`} />
        <StatCard label="岗位标签" value={ALL_ROLES.length} color="#059669" />
        <StatCard label="Hard Skills" value={ALL_HARD.length} color="#7c3aed" />
        <StatCard label="Soft Skills" value={ALL_SOFT.length} color="#d97706" />
        <StatCard label="证书" value={5} color="#0891b2" />
        <StatCard label="课程总数" value={COURSE_NAMES.length} color="#be185d" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:12 }}>能力覆盖雷达图</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={T.border} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize:11, fill:T.text2 }} />
              <Radar dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.18} strokeWidth={2} />
              <Tooltip {...tt} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:12 }}>Bullets 分布（按公司）</div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byCompany} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85}
                label={({ name, count }) => `${name} ${count}`}>
                {byCompany.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % 4]} />)}
              </Pie>
              <Tooltip {...tt} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card style={{ marginBottom:20 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:12 }}>岗位标签覆盖度 Top 12</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={roleFreq} layout="vertical" margin={{ left:20, right:20 }}>
            <XAxis type="number" tick={{ fontSize:11, fill:T.text3 }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize:11, fill:T.text2 }} width={170} tickLine={false} axisLine={false} interval={0} />
            <Tooltip {...tt} />
            <Bar dataKey="count" fill="#2563eb" radius={[0,4,4,0]} barSize={13} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:12 }}>Hard Skills 频次 Top 14</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={hardFreq} layout="vertical" margin={{ left:10, right:10 }}>
              <XAxis type="number" tick={{ fontSize:10, fill:T.text3 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize:10, fill:T.text2 }} width={155} tickLine={false} axisLine={false} interval={0} />
              <Tooltip {...tt} />
              <Bar dataKey="count" fill="#1e40af" radius={[0,4,4,0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:12 }}>Soft Skills 全览 ({ALL_SOFT.length})</div>
          <ResponsiveContainer width="100%" height={Math.max(320, ALL_SOFT.length * 22)}>
            <BarChart data={softFreq} layout="vertical" margin={{ left:10, right:10 }}>
              <XAxis type="number" tick={{ fontSize:10, fill:T.text3 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize:10, fill:T.text2 }} width={195} tickLine={false} axisLine={false} interval={0} />
              <Tooltip {...tt} />
              <Bar dataKey="count" fill="#d97706" radius={[0,4,4,0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §13  RESUME TAILOR — ResumeDoc
// ═══════════════════════════════════════════════════════════
function RRow({ left, right, bold, italic, mt }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginTop: mt||0 }}>
      <span style={{ fontWeight: bold===false ? 400 : 700, fontStyle: italic ? "italic" : "normal", fontSize: bold===false ? 10 : 10.5 }}>
        {left}
      </span>
      <span style={{ fontSize:9.5, color:"#333", flexShrink:0, marginLeft:6 }}>{right}</span>
    </div>
  );
}
function RSH({ title }) {
  return (
    <div style={{ borderBottom:"1.5px solid #111", margin:"9px 0 3px", paddingBottom:1 }}>
      <span style={{ fontSize:10.5, fontWeight:700, letterSpacing:.4 }}>{title}</span>
    </div>
  );
}
function BulletList({ ids, kws, baselineIds, diffMode }) {
  const baseSet = new Set(baselineIds || []);
  const diffBg = { new:"rgba(40,180,40,.08)", variant:"rgba(240,160,0,.08)", same:"transparent" };
  const diffBd = { new:"2px solid #2ab42a", variant:"2px solid #e08000", same:"none" };
  return (
    <ul style={{ margin:"2px 0 0", paddingLeft:15 }}>
      {(ids||[]).map(id => {
        const text = B[id]?.text;
        if (!text) return null;
        let status = "same";
        if (diffMode && !baseSet.has(id)) {
          const cb = id.replace(/_std|_esg|_esg2|_analytics/g, "");
          const hasVar = (baselineIds||[]).some(bid =>
            bid.replace(/_std|_esg|_esg2|_analytics/g,"") === cb && bid !== id
          );
          status = hasVar ? "variant" : "new";
        }
        return (
          <li key={id} style={{ fontSize:9.7, marginBottom:1.5, lineHeight:1.33,
            background: diffBg[status], borderLeft: diffBd[status],
            paddingLeft: status !== "same" ? 5 : 0 }}>
            {hlKws(text, kws||[])}
          </li>
        );
      })}
    </ul>
  );
}
function PlainList({ items, kws }) {
  return (
    <ul style={{ margin:"2px 0 0", paddingLeft:15 }}>
      {(items||[]).filter(Boolean).map((t, i) => (
        <li key={i} style={{ fontSize:9.7, marginBottom:1.5, lineHeight:1.33 }}>
          {hlKws(t, kws||[])}
        </li>
      ))}
    </ul>
  );
}

function ResumeDoc({ cfg, kws, diffMode }) {
  const kwsArr = kws || [];
  const contact = cfg.contact === "duke"
    ? "xi.yang@duke.edu  •  (984) 335-0494  •  Durham, NC"
    : "Durham, NC 27708  |  (984) 335-0494  |  xyang.career@gmail.com  |  linkedin.com/in/xyang0";
  const concStr = cfg.dukeConcentration ? `, ${CONC[cfg.dukeConcentration] || ""}` : "";
  const allBaseIds = [...BASELINE_CFG.deloitteSABullets, ...BASELINE_CFG.deloitteAssocBullets, ...BASELINE_CFG.necBullets, "dc1","dc2"];

  return (
    <div id="resume-print" style={{ fontFamily:"Georgia, 'Times New Roman', serif", background:"#fff",
      padding:"32px 40px", fontSize:10.5, color:"#111", lineHeight:1.35 }}>
      <div style={{ textAlign:"center", marginBottom:6 }}>
        <div style={{ fontSize:16, fontWeight:700, letterSpacing:1.2 }}>XI (SHAWN) YANG, CPA</div>
        <div style={{ fontSize:9.3, marginTop:3, color:"#444" }}>{contact}</div>
      </div>
      {cfg.objective && (
        <div>
          <RSH title="OBJECTIVE" />
          <div style={{ fontSize:9.7, lineHeight:1.5, color:"#111", paddingBottom:2 }}>
            {hlKws(cfg.objective, kwsArr)}
          </div>
        </div>
      )}
      <RSH title="EDUCATION" />
      <RRow left="DUKE UNIVERSITY, The Fuqua School of Business" right="Durham, NC" />
      <RRow left={`Master of Business Administration${concStr}`} right="May 2026" bold={false} />
      <div style={{ fontSize:9.5 }}>
        GPA: 3.85/4; Merit-based scholarship; Dean's list; Finance Club; Tech Club; Consulting Club
      </div>
      {cfg.showCoursework && cfg.coursework && cfg.coursework.length > 0 && (
        <div style={{ fontSize:9.5 }}>
          Relevant Coursework: {cfg.coursework.join(", ")}
        </div>
      )}
      <RRow left="WASEDA UNIVERSITY" right="Tokyo, Japan" mt={4} />
      <RRow left="Master of Arts in Economics" right="Mar 2015" bold={false} />
      {cfg.showWasedaDesc && (
        <div style={{ fontSize:9.5 }}>
          Applied econometric models to analyze cross-cultural market trends; Active member of Intercultural Communication Center; planned 10+ cross-culture-exchange events, engaging 10+ sponsors
        </div>
      )}
      <RRow left="TIANJIN UNIVERSITY OF FINANCE AND ECONOMICS" right="Tianjin, China" mt={4} />
      <RRow left="Bachelor of Arts in Japanese Language & Accounting" right="Jun 2012" bold={false} />
      {cfg.showTianjinDesc && (
        <div style={{ fontSize:9.5 }}>
          Awarded first-honor academic-based scholarship (top 5%); Outstanding student leader scholarship
        </div>
      )}
      <RSH title="EXPERIENCE" />
      <RRow left="Duke Capital Partners" right="Durham, NC" />
      <RRow left="Investment Associate" right="2025–Present" bold={false} italic />
      <BulletList ids={["dc1","dc2"]} kws={kwsArr} baselineIds={allBaseIds} diffMode={diffMode} />
      {cfg.includeEqtyLyfe && cfg.eqtyLyfeBullets?.length > 0 && (
        <div>
          <RRow left="EQTY LYFE" right="San Jose, CA (Remote)" mt={5} />
          <RRow left={cfg.eqtyLyfeRole === "mba" ? "MBA Summer Finance Intern" : "Finance Intern"} right="2025" bold={false} italic />
          <BulletList ids={cfg.eqtyLyfeBullets} kws={kwsArr} baselineIds={[]} diffMode={diffMode} />
        </div>
      )}
      <RRow left="Deloitte Touche Tohmatsu LLC." right="Tokyo, Japan / Sydney, Australia" mt={5} />
      {cfg.deloitteMerged ? (
        <div>
          <RRow left="Senior Associate" right="2018–2024" bold={false} italic />
          <BulletList ids={[...(cfg.deloitteSABullets||[]),...(cfg.deloitteAssocBullets||[])]} kws={kwsArr} baselineIds={allBaseIds} diffMode={diffMode} />
        </div>
      ) : (
        <div>
          <RRow left="Senior Associate" right="2022–2024" bold={false} italic />
          <BulletList ids={cfg.deloitteSABullets||[]} kws={kwsArr} baselineIds={allBaseIds} diffMode={diffMode} />
          <RRow left="Associate" right="2018–2021" bold={false} italic mt={3} />
          <BulletList ids={cfg.deloitteAssocBullets||[]} kws={kwsArr} baselineIds={allBaseIds} diffMode={diffMode} />
        </div>
      )}
      <RRow left="NEC Solution Innovators, Ltd." right="Tokyo, Japan" mt={5} />
      <RRow left="System Analyst" right="2015–2018" bold={false} italic />
      <BulletList ids={cfg.necBullets||[]} kws={kwsArr} baselineIds={allBaseIds} diffMode={diffMode} />
      <RSH title="ADDITIONAL INFORMATION" />
      <PlainList kws={kwsArr} items={[
        `Skills: ${SKILLS_TEXT[cfg.skillsVariant] || SKILLS_TEXT.standard}`,
        "Languages: Chinese (Native), Japanese (Fluent)",
        `Community Involvement: ${COMMUNITY[cfg.communityVariant] || COMMUNITY.full}`,
        cfg.showHobbies ? "Hobbies: Developed tools such as real estate analytics app that saved 30+ hours in property research" : null,
      ]} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §14  MATCH TAB
// ═══════════════════════════════════════════════════════════
function MatchTab({ cfg, jdKeywords, matched, missing, score }) {
  const [activeKw, setActiveKw] = useState(null);
  const currentIds = new Set(getAllBulletIds(cfg));
  const sc = score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  const suggestions = activeKw ? findBulletsForKw(activeKw) : [];
  return (
    <div style={{ padding:"20px 24px", maxWidth:800 }}>
      <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:24,
        background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
        padding:"16px 20px", boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
        <div style={{ position:"relative", width:80, height:80, flexShrink:0 }}>
          <svg viewBox="0 0 36 36" style={{ transform:"rotate(-90deg)", width:"100%", height:"100%" }}>
            <circle cx="18" cy="18" r="14" fill="none" stroke={T.border} strokeWidth="3.5" />
            <circle cx="18" cy="18" r="14" fill="none" stroke={sc} strokeWidth="3.5"
              strokeDasharray={`${score * .879} ${87.9 - score * .879}`} strokeLinecap="round" />
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:20, fontWeight:800, color:sc, lineHeight:1 }}>{score}</span>
            <span style={{ fontSize:9, color:T.text3 }}>分</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:800, color:sc }}>
            {score >= 70 ? "优秀匹配" : score >= 50 ? "基本匹配" : "需要优化"}
          </div>
          <div style={{ fontSize:12, color:T.text3, marginTop:3 }}>{matched.length}/{jdKeywords.length} 个关键词已覆盖</div>
          <div style={{ fontSize:11, color:T.text3, marginTop:4 }}>点击红色关键词 → 查看母版库可补充的bullet</div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:"#16a34a", textTransform:"uppercase", marginBottom:8 }}>
            ✓ 已覆盖 ({matched.length})
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {matched.map(kw => (
              <span key={kw} style={{ background:"#f0fdf4", border:"1px solid #bbf7d0",
                borderRadius:20, padding:"3px 11px", fontSize:11, color:"#166534" }}>{kw}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:"#dc2626", textTransform:"uppercase", marginBottom:8 }}>
            ✗ 缺失 ({missing.length}) — 点击补充
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {missing.map(kw => (
              <span key={kw} onClick={() => setActiveKw(activeKw === kw ? null : kw)}
                style={{ background: activeKw === kw ? "#fef2f2" : "#fff",
                  border:"1px solid #fca5a5", borderRadius:20, padding:"3px 11px",
                  fontSize:11, color:"#dc2626", cursor:"pointer" }}>{kw} ↗</span>
            ))}
          </div>
        </div>
      </div>
      {activeKw && (
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
          padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:10 }}>
            「{activeKw}」— 母版库可补充的bullet
          </div>
          {suggestions.length === 0
            ? <div style={{ fontSize:12, color:T.text3 }}>暂无直接匹配，建议手动插入此关键词</div>
            : suggestions.map(id => (
              <div key={id} style={{ background: currentIds.has(id) ? "#f0fdf4" : "#fafafa",
                border:`1px solid ${currentIds.has(id) ? "#bbf7d0" : T.border}`,
                borderRadius:8, padding:"10px 14px", marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <IdBadge id={id} />
                  <span style={{ fontSize:10, fontWeight:700, color: currentIds.has(id) ? "#16a34a" : T.text3 }}>
                    {currentIds.has(id) ? "✓ 已收录" : "未收录 — 可替换现有bullet"}
                  </span>
                </div>
                <div style={{ fontSize:12, color:T.text, lineHeight:1.55 }}>{B[id].text}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §15  DIFF TAB
// ═══════════════════════════════════════════════════════════
function DiffTab({ cfg }) {
  const allBaseIds = [...BASELINE_CFG.deloitteSABullets,...BASELINE_CFG.deloitteAssocBullets,...BASELINE_CFG.necBullets,"dc1","dc2"];
  const baseSet = new Set(allBaseIds);
  const tailoredIds = getAllBulletIds(cfg);
  const tailoredSet = new Set(tailoredIds);
  const strip = id => id.replace(/_std|_esg|_esg2|_analytics/g, "");

  const added   = tailoredIds.filter(id => !baseSet.has(id) && !["dc1","dc2"].includes(id));
  const removed = allBaseIds.filter(id => {
    if (tailoredSet.has(id)) return false;
    return !tailoredIds.some(tid => strip(tid) === strip(id));
  });
  const swapped = allBaseIds.filter(id => {
    if (tailoredSet.has(id)) return false;
    return tailoredIds.some(tid => strip(tid) === strip(id) && tid !== id);
  });

  const struct = [];
  if (cfg.deloitteMerged !== BASELINE_CFG.deloitteMerged) struct.push({ icon:"🔀", label:"Deloitte职级结构", from:"分开 (SA 22-24 / Assoc 18-21)", to: cfg.deloitteMerged ? "合并 2018–2024" : "分开" });
  if (cfg.includeEqtyLyfe !== BASELINE_CFG.includeEqtyLyfe) struct.push({ icon:"🏢", label:"EQTY LYFE", from:"未收录", to: cfg.includeEqtyLyfe ? `✅ ${cfg.eqtyLyfeRole === "mba" ? "MBA Intern" : "Finance Intern"}` : "移除" });
  if (cfg.dukeConcentration !== BASELINE_CFG.dukeConcentration) struct.push({ icon:"🎓", label:"Concentration", from: CONC[BASELINE_CFG.dukeConcentration]||"—", to: CONC[cfg.dukeConcentration]||"未披露" });
  if (cfg.skillsVariant !== BASELINE_CFG.skillsVariant) struct.push({ icon:"🛠", label:"Skills变体", from: BASELINE_CFG.skillsVariant, to: cfg.skillsVariant });
  if (cfg.showCoursework !== BASELINE_CFG.showCoursework) struct.push({ icon:"📚", label:"Coursework", from: BASELINE_CFG.showCoursework ? "显示" : "隐藏", to: cfg.showCoursework ? `显示 (${(cfg.coursework||[]).length} 门)` : "隐藏" });

  const noChange = added.length===0 && removed.length===0 && swapped.length===0 && struct.length===0;

  function Sec({ title, color, children }) {
    return (
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color, textTransform:"uppercase", marginBottom:8 }}>{title}</div>
        {children}
      </div>
    );
  }

  return (
    <div style={{ padding:"20px 24px", maxWidth:800 }}>
      <div style={{ fontSize:11.5, color:T.text3, marginBottom:16, background:"#f8faff",
        border:`1px solid ${T.border}`, borderRadius:8, padding:"8px 14px" }}>
        基准：202603 PDF — xyang.career@gmail.com · master版
      </div>
      <div style={{ display:"flex", gap:14, marginBottom:16, fontSize:11, color:T.text3, flexWrap:"wrap" }}>
        <span><span style={{ color:"#16a34a", fontWeight:700 }}>█</span> 新增</span>
        <span><span style={{ color:"#d97706", fontWeight:700 }}>█</span> 变体替换</span>
        <span><span style={{ color:"#dc2626", fontWeight:700 }}>█</span> 移除</span>
        <span><span style={{ color:"#7c3aed", fontWeight:700 }}>█</span> 结构变化</span>
      </div>
      {noChange && (
        <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"14px 18px", color:"#166534", fontSize:13 }}>
          ✓ 与基准版本完全一致，无任何改动
        </div>
      )}
      {struct.length > 0 && (
        <Sec title="结构性变化" color="#7c3aed">
          {struct.map((s, i) => (
            <div key={i} style={{ background:"#faf5ff", border:"1px solid #ddd6fe", borderRadius:8, padding:"9px 14px", marginBottom:6 }}>
              {s.icon} <strong style={{ color:"#6d28d9" }}>{s.label}</strong>
              {" "}<span style={{ color:"#dc2626", textDecoration:"line-through", fontSize:11 }}>{s.from}</span>
              {" → "}<span style={{ color:"#16a34a", fontSize:11 }}>{s.to}</span>
            </div>
          ))}
        </Sec>
      )}
      {swapped.length > 0 && (
        <Sec title="变体替换（同概念，不同表达角度）" color="#d97706">
          {swapped.map(id => {
            const newId = tailoredIds.find(tid => strip(tid) === strip(id));
            return (
              <div key={id} style={{ marginBottom:10 }}>
                <div style={{ background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:"8px 8px 0 0", padding:"8px 14px", fontSize:11, color:"#92400e" }}>
                  <strong>−</strong> <IdBadge id={id} /> {B[id]?.text}
                </div>
                {newId && (
                  <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderTop:"none", borderRadius:"0 0 8px 8px", padding:"8px 14px", fontSize:11, color:"#166534" }}>
                    <strong>+</strong> <IdBadge id={newId} /> {B[newId]?.text}
                  </div>
                )}
              </div>
            );
          })}
        </Sec>
      )}
      {added.length > 0 && (
        <Sec title="新增 Bullets" color="#16a34a">
          {added.map(id => (
            <div key={id} style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"9px 14px", marginBottom:6, fontSize:11, color:"#166534" }}>
              <strong>+</strong> <IdBadge id={id} /> {B[id]?.text}
            </div>
          ))}
        </Sec>
      )}
      {removed.length > 0 && (
        <Sec title="移除 Bullets" color="#dc2626">
          {removed.map(id => (
            <div key={id} style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:8, padding:"9px 14px", marginBottom:6, fontSize:11, color:"#dc2626" }}>
              <strong>−</strong> <IdBadge id={id} /> {B[id]?.text}
            </div>
          ))}
        </Sec>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §16  RESUME TAILOR TAB
// ═══════════════════════════════════════════════════════════
async function callAI(jd) {
  const bulletList = ALL_IDS.map(id =>
    `${id}: "${B[id].text}"\n   roles:[${B[id].roleLabels.join(",")}]`
  ).join("\n");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", signal:controller.signal,
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:1400,
        messages:[{ role:"user", content:
`Resume coach. Analyze JD, return optimal config JSON.

JOB DESCRIPTION:\n${jd}

CANDIDATE: Xi (Shawn) Yang, CPA | Duke MBA GPA 3.85 | 10+ yrs: Deloitte, NEC, Duke Capital | CFA III | EN/ZH/JA

BULLETS:\n${bulletList}

RULES:
1. deloitteSABullets 4-5: slot-1 ONE of [dsa1_std,dsa1_esg,dsa1_esg2] (ESG only if JD says ESG/sustainability explicitly); rest from remaining SA bullets
2. deloitteAssocBullets 1-2: slot-1 ONE of [da1_std,da1_esg,da1_esg2]; optional da2
3. necBullets 2-3: always nec1 + nec2; optionally add nec_erp, nec_predictive, nec_sapdash, or nec_training
4. includeEqtyLyfe: true only startup/fintech/FP&A/VC/PE
5. deloitteMerged: true if includeEqtyLyfe=true OR JD values long tenure
6. jdKeywords: 12-16 key phrases (1-3 words) from JD
7. dukeConcentration: "decision" for analytics/finance/consulting | "HSM" for healthcare | "both" for healthcare+analytics | null to omit
8. skillsVariant: standard | enterprise | analytics
9. showCoursework: true if role is technical/academic; coursework = array of 4-6 relevant course names from: ${COURSE_NAMES.join(", ")}
10. objective: 2 sentences max 55 words, mirror JD role title, top 2 credentials, value prop

Return ONLY valid JSON:
{"contact":"personal","dukeConcentration":"decision","showCoursework":false,"coursework":[],"showWasedaDesc":true,"showTianjinDesc":true,"includeEqtyLyfe":false,"eqtyLyfeRole":"intern","eqtyLyfeBullets":[],"deloitteMerged":false,"deloitteSABullets":["dsa1_std","dsa2","dsa3","dsa4","dsa5"],"deloitteAssocBullets":["da1_std","da2"],"necBullets":["nec1","nec2"],"skillsVariant":"standard","showHobbies":true,"communityVariant":"full","jdKeywords":["financial modeling","SQL"],"objective":"Objective here.","notes":"brief explanation"}`
        }],
      }),
    });
  } finally {
    clearTimeout(timeoutId);
  }
  if (!res || !res.ok) {
    const t = res ? await res.text().catch(() => "") : "Request aborted (timeout)";
    throw new Error(`HTTP ${res?.status || "—"}: ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  if (data.error) throw new Error(`API: ${data.error.message}`);
  const raw = data.content.map(c => c.text || "").join("");
  const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
  return { ...parsed, gpa:"3.85" };
}

function TailorTab() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [cfg, setCfg] = useState(null);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [subTab, setSubTab] = useState("preview");
  const [showKwHl, setShowKwHl] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [jdKws, setJdKws] = useState([]);
  const [matchData, setMatchData] = useState(null);

  function loadPreset(name) {
    const p = PRESETS[name];
    if (!p) return;
    setCfg({ ...p, gpa:"3.85" });
    setNotes(`预设方向：${name}`);
    setJdKws([]);
    setMatchData(null);
    setSubTab("preview");
    setShowKwHl(false);
    setShowDiff(false);
    setErr("");
  }

  async function generate() {
    if (!jd.trim()) { setErr("请先粘贴JD内容"); return; }
    setErr(""); setLoading(true); setCfg(null); setMatchData(null); setElapsed(0);
    const timer = setInterval(() => setElapsed(s => s + 1), 1000);
    try {
      const result = await callAI(jd);
      const kws = result.jdKeywords || [];
      setCfg(result);
      setNotes(result.notes || "");
      setJdKws(kws);
      setMatchData(computeMatch(result, kws));
      setSubTab("preview");
      setShowKwHl(false);
      setShowDiff(false);
    } catch(e) {
      setErr("❌ " + e.message);
    } finally {
      setLoading(false);
      clearInterval(timer);
    }
  }

  function download() {
    if (!cfg) return;
    const el = document.getElementById("resume-print");
    const html = el ? el.outerHTML : "";
    const full = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Xi Shawn Yang Resume</title><style>body{margin:0;padding:18mm;font-family:Georgia,'Times New Roman',serif;font-size:10.5pt;color:#111;line-height:1.35}mark{background:transparent!important;color:inherit}@page{margin:15mm;size:Letter}</style></head><body>${html}</body></html>`;
    const blob = new Blob([full], { type:"text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Shawn_Yang_Resume.html";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  const activeKws = showKwHl ? (matchData?.matched || []) : [];
  const subTabs = [
    { id:"preview", label:"📄 预览" },
    { id:"match",   label:`🎯 匹配${matchData ? ` · ${matchData.score}%` : ""}` },
    { id:"diff",    label:"🔄 Benchmark对比" },
  ];

  return (
    <div style={{ display:"flex", height:"100%", gap:0, overflow:"hidden" }}>
      {/* Left panel */}
      <div style={{ width:292, flexShrink:0, display:"flex", flexDirection:"column",
        gap:10, paddingRight:16, borderRight:`1px solid ${T.border}`, overflowY:"auto" }}>
        {/* Presets */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:T.text3, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>
            预设方向（一键生成）
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {Object.keys(PRESETS).map(name => (
              <button key={name} onClick={() => loadPreset(name)}
                style={{ background: cfg && notes === `预设方向：${name}` ? T.accentBg : T.surface,
                  border:`1px solid ${cfg && notes === `预设方向：${name}` ? "#bfdbfe" : T.border}`,
                  borderRadius:8, padding:"5px 11px",
                  color: cfg && notes === `预设方向：${name}` ? T.accent : T.text2,
                  fontSize:11.5, cursor:"pointer", fontFamily:"inherit",
                  fontWeight: cfg && notes === `预设方向：${name}` ? 700 : 400 }}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height:1, background:T.border }} />
        <div style={{ fontSize:10, fontWeight:700, color:T.text3, letterSpacing:1.5, textTransform:"uppercase" }}>
          或 粘贴JD → AI生成
        </div>
        <textarea value={jd} onChange={e => setJd(e.target.value)}
          placeholder={"Paste job description...\n\nAI将从完整母版库选择最佳bullets，包括所有NEW bullets，自动决定职级/EqtyLyfe/ESG/课程等"}
          style={{ height:220, background:"#fafafa", border:`1px solid ${T.border}`, borderRadius:8,
            padding:"10px 12px", color:T.text, fontSize:11.5, resize:"vertical",
            lineHeight:1.5, outline:"none", fontFamily:"inherit" }} />
        <button onClick={generate} disabled={loading}
          style={{ background: loading ? "#e5e7eb" : `linear-gradient(135deg, ${T.accent}, #1d4ed8)`,
            color: loading ? T.text3 : "#fff", border:"none", borderRadius:8,
            padding:"11px 0", fontWeight:700, fontSize:13, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? `⏳ AI分析中… ${elapsed}s` : "✨ AI生成定制简历"}
        </button>
        {err && (
          <div style={{ background:"#fef2f2", border:"1px solid #fca5a5",
            borderRadius:8, padding:"8px 11px", fontSize:11.5, color:"#dc2626" }}>
            {err}
          </div>
        )}
        {loading && elapsed > 15 && (
          <div style={{ fontSize:11, color: elapsed > 30 ? "#dc2626" : T.text3, textAlign:"center" }}>
            {elapsed > 30 ? "⚠️ 即将超时，请刷新重试" : "即将完成，稍候…"}
          </div>
        )}
        {notes && !loading && (
          <div style={{ background:T.accentBg, border:"1px solid #bfdbfe", borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:T.accent, textTransform:"uppercase", marginBottom:4 }}>
              说明
            </div>
            <div style={{ fontSize:11.5, color:"#1e40af", lineHeight:1.6 }}>{notes}</div>
          </div>
        )}
        {cfg && !loading && (
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0",
            borderRadius:8, padding:"10px 12px", fontSize:11, color:"#166534", lineHeight:1.7 }}>
            <div style={{ fontWeight:700, marginBottom:3 }}>📋 配置摘要</div>
            <div>Deloitte: {cfg.deloitteMerged ? "合并 2018–24" : "分开 SA/Assoc"}</div>
            <div>EqtyLyfe: {cfg.includeEqtyLyfe ? `✅ ${cfg.eqtyLyfeRole === "mba" ? "MBA" : "Intern"}` : "❌"}</div>
            <div>ESG: {(cfg.deloitteSABullets||[]).some(id => id.includes("esg")) ? "✅" : "❌ 标准版"}</div>
            <div>Concentration: {CONC[cfg.dukeConcentration] || "未披露"}</div>
            <div>Coursework: {cfg.showCoursework ? `✅ ${(cfg.coursework||[]).length}门` : "❌"}</div>
            <div>Skills: {cfg.skillsVariant}</div>
          </div>
        )}
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", paddingLeft:16 }}>
        <div style={{ display:"flex", alignItems:"center", borderBottom:`1px solid ${T.border}`, flexShrink:0, flexWrap:"wrap", gap:2 }}>
          {subTabs.map(t => (
            <button key={t.id} onClick={() => setSubTab(t.id)}
              style={{ background:"none", border:"none", padding:"8px 14px",
                color: subTab === t.id ? T.accent : T.text3, fontSize:12,
                fontWeight: subTab === t.id ? 700 : 400,
                borderBottom:`2px solid ${subTab === t.id ? T.accent : "transparent"}`,
                cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
              {t.label}
            </button>
          ))}
          <div style={{ flex:1 }} />
          {cfg && subTab === "preview" && (
            <div style={{ display:"flex", gap:6, alignItems:"center", paddingBottom:4 }}>
              <button onClick={() => setShowKwHl(h => !h)}
                style={{ background: showKwHl ? "#fefce8" : "none",
                  border:`1px solid ${showKwHl ? "#fde047" : T.border}`,
                  borderRadius:6, padding:"4px 10px",
                  color: showKwHl ? "#713f12" : T.text3, fontSize:11,
                  cursor:"pointer", fontFamily:"inherit", fontWeight: showKwHl ? 600 : 400 }}>
                🔍 关键词高亮 {showKwHl ? "ON" : "OFF"}
              </button>
              <button onClick={() => setShowDiff(d => !d)}
                style={{ background: showDiff ? "#faf5ff" : "none",
                  border:`1px solid ${showDiff ? "#ddd6fe" : T.border}`,
                  borderRadius:6, padding:"4px 10px",
                  color: showDiff ? "#6d28d9" : T.text3, fontSize:11,
                  cursor:"pointer", fontFamily:"inherit", fontWeight: showDiff ? 600 : 400 }}>
                🔄 差异对比 {showDiff ? "ON" : "OFF"}
              </button>
              <button onClick={download}
                style={{ background:T.accentBg, border:"1px solid #bfdbfe",
                  borderRadius:6, padding:"4px 10px", color:T.accent,
                  fontSize:11, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>
                ⬇ 下载 HTML
              </button>
            </div>
          )}
        </div>
        <div style={{ flex:1, overflowY:"auto", paddingTop:12 }}>
          {loading && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", height:"80%", gap:14 }}>
              <div style={{ width:40, height:40, border:`3px solid ${T.border}`,
                borderTop:`3px solid ${T.accent}`, borderRadius:"50%",
                animation:"spin .8s linear infinite" }} />
              <div style={{ fontSize:13, color:T.text2 }}>AI 分析 JD 并配置简历… {elapsed}s</div>
              <div style={{ fontSize:11, color:T.text3 }}>通常 20–35 秒</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          {!loading && !cfg && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", height:"80%", gap:10 }}>
              <div style={{ fontSize:48, opacity:.2 }}>📄</div>
              <div style={{ fontSize:13, color:T.text3 }}>点击预设方向或粘贴JD → AI生成</div>
            </div>
          )}
          {!loading && cfg && subTab === "preview" && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:20 }}>
              {showDiff && (
                <div style={{ marginBottom:10, background:"#faf5ff", border:"1px solid #ddd6fe",
                  borderRadius:8, padding:"6px 14px", fontSize:11, color:"#6d28d9",
                  width:"100%", maxWidth:720, boxSizing:"border-box" }}>
                  🔄 差异模式：<span style={{ color:"#16a34a" }}>绿色左边框</span> = 新增 · <span style={{ color:"#d97706" }}>橙色左边框</span> = 变体替换（相对202603基准）
                </div>
              )}
              <div style={{ width:"100%", maxWidth:720, boxShadow:"0 4px 24px rgba(0,0,0,.12)", borderRadius:3 }}>
                <ResumeDoc cfg={cfg} kws={activeKws} diffMode={showDiff} />
              </div>
            </div>
          )}
          {!loading && cfg && subTab === "match" && matchData && (
            <MatchTab cfg={cfg} jdKeywords={jdKws} matched={matchData.matched} missing={matchData.missing} score={matchData.score} />
          )}
          {!loading && cfg && subTab === "diff" && (
            <DiffTab cfg={cfg} />
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// §17  MAIN APP
// ═══════════════════════════════════════════════════════════
const MAIN_TABS = [
  { id:"library", label:"📋 母版库" },
  { id:"content", label:"📄 完整内容" },
  { id:"roles",   label:"🎯 岗位索引" },
  { id:"skills",  label:"🛠 技能索引" },
  { id:"dash",    label:"📊 Dashboard" },
  { id:"tailor",  label:"✨ Resume Tailor" },
];

export default function App() {
  const [tab, setTab] = useState("library");
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh",
      background:T.bg, fontFamily:"Inter, 'DM Sans', system-ui, sans-serif",
      color:T.text, overflow:"hidden" }}>
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`,
        padding:"0 24px", flexShrink:0, boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{ padding:"12px 0", marginRight:24 }}>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:2, color:T.accent, textTransform:"uppercase" }}>
              Master Library
            </div>
            <div style={{ fontSize:15, fontWeight:800, color:T.text, lineHeight:1.2 }}>Xi (Shawn) Yang</div>
          </div>
          <div style={{ display:"flex", flex:1, overflowX:"auto" }}>
            {MAIN_TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ background:"none", border:"none",
                  borderBottom:`3px solid ${tab === t.id ? T.accent : "transparent"}`,
                  padding:"0 16px", height:52, color: tab === t.id ? T.accent : T.text3,
                  fontSize:12.5, fontWeight: tab === t.id ? 700 : 400,
                  cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize:11, color:T.text3, flexShrink:0, marginLeft:16,
            paddingLeft:16, borderLeft:`1px solid ${T.border}` }}>
            <span style={{ color:T.accent, fontWeight:700 }}>{ALL_IDS.length}</span> bullets ·{" "}
            <span style={{ color:"#d97706", fontWeight:700 }}>{newCount}</span> NEW
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflow: tab === "tailor" ? "hidden" : "auto", padding:"20px 24px" }}>
        {tab === "library" && <LibraryTab />}
        {tab === "content" && <ResumeContentTab />}
        {tab === "roles"   && <RoleIndexTab />}
        {tab === "skills"  && <SkillIndexTab />}
        {tab === "dash"    && <DashboardTab />}
        {tab === "tailor"  && <TailorTab />}
      </div>
    </div>
  );
}
