import React from "react";
import { useState, useMemo, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell } from "recharts";

// ═══════════════════════════════════════════════════════════════
// §1  BULLET DATA  — 27 bullets with impact + strength scores
// ═══════════════════════════════════════════════════════════════
const B = {
  dc1:{ text:"Sourced investment opportunities, participated in 20+ company screenings, and conducted 5+ due diligence processes, supporting go/no-go decisions and resulting in $2M in deployed capital", roleLabels:["PE/VC","Investment Banking","Corporate Development","M&A"], hardSkills:["Due Diligence","Investment Screening","Financial Analysis","Capital Deployment"], softSkills:["Strategic Thinking","Decision Making","Analytical Thinking"], impact:{type:"capital",label:"Capital Deployed",value:"$2M",icon:"💰"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dc2:{ text:"Developed and implemented real-time portfolio performance dashboard in Power BI, integrating metric analytics and automated reporting, and streamlining reporting operations by 40%", roleLabels:["Data Analytics","FP&A","Investment","Corporate Finance","Business Intelligence"], hardSkills:["Power BI","Dashboard Development","Data Analytics","Automation","KPI Design"], softSkills:["Initiative","Problem Solving"], impact:{type:"efficiency",label:"Reporting Efficiency",value:"+40%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  eq1:{ text:"Built multi-year financial forecasts and analyzed unit economics and cash burn to support strategic planning and resource allocation for an early-stage fintech startup", roleLabels:["FP&A","Startup/Fintech","PE/VC","Corporate Finance"], hardSkills:["Financial Modeling","Forecasting","Unit Economics","Cash Flow Analysis"], softSkills:["Analytical Thinking","Strategic Thinking"], impact:{type:"planning",label:"Strategic Finance",value:"Multi-year",icon:"📈"}, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  eq2:{ text:"Collaborated with founders to define key business metrics, providing data-driven insights for upcoming fundraising rounds", roleLabels:["FP&A","Startup/Fintech","PE/VC","Business Development"], hardSkills:["Metrics Design","Financial Analysis","Fundraising Support"], softSkills:["Collaboration","Communication","Stakeholder Management"], impact:null, strength:{hasQuantity:false,hasActionVerb:false,hasOutcome:true} },
  dsa1_std:{ text:"Supervised cross-functional team of ten from audit, tax, and valuation services in statutory audit for tech client; leveraged data analytics to identify a $2M profit overstatement, enhancing audit accuracy", roleLabels:["Audit","Consulting","Corporate Finance","Tech Finance"], hardSkills:["Audit","Data Analytics","Valuation","Financial Analysis","Statutory Audit"], softSkills:["Leadership","Team Management","Cross-functional Collaboration"], impact:{type:"risk",label:"Profit Overstatement Found",value:"$2M",icon:"🔍"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa1_esg:{ text:"Led cross-functional teams of ten across audit, tax, and valuation to deliver financial insights and risk assessment for senior stakeholders, leveraging ESG data analytics to improve sustainability disclosures", roleLabels:["ESG/Sustainability","Audit","Consulting","Risk Management"], hardSkills:["ESG Analytics","Audit","Risk Assessment","Financial Reporting","Sustainability Disclosure"], softSkills:["Leadership","Stakeholder Management","Communication","Executive Presence"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  dsa1_esg2:{ text:"Supervised cross-functional team of ten from audit, tax, and valuation services in audit for tech client; leveraged ESG data analytics to identify reporting gaps and improve corporate sustainability disclosures", roleLabels:["ESG/Sustainability","Audit","Tech Finance","Corporate Governance"], hardSkills:["ESG Analytics","Audit","Corporate Governance","Financial Reporting","Gap Analysis"], softSkills:["Leadership","Team Management","Analytical Thinking"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  dsa_agile:{ isNew:true, text:"Led cross-border finance teams in Japan and Australia to enhance budgeting and forecasting accuracy for a $200M investment project, leveraging agile project tracking and stakeholder engagement to streamline planning", roleLabels:["FP&A","Project Management","Consulting","Corporate Finance","Operations"], hardSkills:["Budgeting","Forecasting","Agile","Project Management","Financial Planning"], softSkills:["Leadership","Cross-cultural Communication","Stakeholder Management","Adaptability"], impact:{type:"scale",label:"Project Scale",value:"$200M",icon:"🏗"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa2:{ text:"Pioneered audit innovation by developing two data-driven solutions using SQL and Python, automating processes and implementing KPI dashboards, enhancing efficiency by 30+% across 50+ projects", roleLabels:["Data Analytics","Audit","Consulting","Technology","Operations"], hardSkills:["SQL","Python","KPI Design","Dashboard Development","Process Automation"], softSkills:["Innovation","Initiative","Problem Solving"], impact:{type:"efficiency",label:"Process Efficiency",value:"+30%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa2_analytics:{ isNew:true, text:"Managed end-to-end audit analytics automation by structuring client datasets with SQL and delivering Power BI KPI dashboards with standardized reporting logic, reducing manual workload by 70% across 50+ engagements", roleLabels:["Data Analytics","Business Intelligence","Audit","Operations","FP&A"], hardSkills:["SQL","Power BI","Data Modeling","Dashboard Development","Process Automation","KPI Design"], softSkills:["Initiative","Problem Solving","Attention to Detail"], impact:{type:"efficiency",label:"Workload Reduction",value:"70%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa_lean:{ isNew:true, text:"Optimized audit workflows for high-tech and healthcare clients by applying Lean Six Sigma principles, identifying bottlenecks and eliminating redundancies, which cut reporting turnaround time by 30%", roleLabels:["Consulting","Operations","Process Improvement","Healthcare Finance","Manufacturing"], hardSkills:["Lean Six Sigma","Process Optimization","Workflow Analysis","Root Cause Analysis"], softSkills:["Analytical Thinking","Problem Solving","Attention to Detail"], impact:{type:"efficiency",label:"Turnaround Improvement",value:"30%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa3:{ text:"Led pre-IPO audit for tech firm, raising $10M and boosting investor confidence through optimizing capital structure, reporting compliance, and ROI-driven investment decisions", roleLabels:["Investment Banking","Capital Markets","Audit","Corporate Finance","Tech Finance"], hardSkills:["IPO","Capital Structure","Financial Reporting","Compliance","Valuation"], softSkills:["Strategic Thinking","Stakeholder Management","Communication"], impact:{type:"capital",label:"Equity Raised",value:"$10M",icon:"💰"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa4:{ text:"Identified $3.6M financial fraud in COGS (40% of operating profits) for a $20M revenue electronics manufacturing client, leading to enhanced internal controls and compliance reporting", roleLabels:["Audit","Risk Management","Forensic Accounting","Manufacturing Finance","Compliance"], hardSkills:["Fraud Detection","Internal Controls","Compliance","Risk Management","Forensic Accounting"], softSkills:["Analytical Thinking","Attention to Detail","Problem Solving"], impact:{type:"risk",label:"Fraud Detected",value:"$3.6M",icon:"🔍"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  dsa_cfo:{ isNew:true, text:"Presented audit insights and process optimization recommendations to regional CFOs and finance executives, influencing strategic decisions on internal controls and investment risk assessment for multinational clients", roleLabels:["Consulting","Corporate Finance","Audit","Strategy","C-Suite Advisory"], hardSkills:["Financial Reporting","Internal Controls","Risk Assessment","Executive Presentations","Strategic Advisory"], softSkills:["Communication","Executive Presence","Influencing Skills","Presentation","Stakeholder Management"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  dsa5:{ text:"Rated as Top Performer (top 3%) for three years; co-led 10+ cross-functional teams for tech, manufacturing, and finance industry, with end-to-end involvement in budgeting to report issuance", roleLabels:["Consulting","Corporate Finance","Operations","General Management"], hardSkills:["Budgeting","Financial Reporting","Project Management","Cross-industry Experience"], softSkills:["Leadership","Cross-functional Collaboration","Performance Excellence","Team Management"], impact:{type:"recognition",label:"Teams Led",value:"10+",icon:"⭐"}, strength:{hasQuantity:true,hasActionVerb:false,hasOutcome:true} },
  dsa_aop:{ isNew:true, text:"Partnered with global finance teams (Japan, Australia) to improve Annual Operating Plan (AOP) and forecasting accuracy, specifically optimizing manufacturing variance analysis and capital allocation across sectors", roleLabels:["FP&A","Corporate Finance","Manufacturing Finance","Operations"], hardSkills:["FP&A","AOP","Variance Analysis","Capital Allocation","Financial Forecasting"], softSkills:["Cross-cultural Collaboration","Stakeholder Management","Communication"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  dsa_aop_analytics:{ isNew:true, text:"Partnered with global finance teams (Japan, Australia) and client finance teams to improve budgeting and forecasting accuracy by standardizing reporting metrics and streamlining data validation processes across sectors", roleLabels:["Data Analytics","FP&A","Corporate Finance","Operations","Business Intelligence"], hardSkills:["Data Validation","Reporting Standardization","Financial Forecasting","Process Improvement","Metrics Design"], softSkills:["Cross-functional Collaboration","Communication","Stakeholder Management"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  da1_std:{ text:"Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; analyzed revenue streams, expense structures, and working capital to support investment decisions", roleLabels:["M&A","Investment Banking","Corporate Development","PE/VC","Audit"], hardSkills:["Due Diligence","M&A","Financial Analysis","Working Capital Analysis","Revenue Analysis"], softSkills:["Cross-functional Collaboration","Analytical Thinking","Teamwork"], impact:{type:"deal",label:"Acquisition DD",value:"$15M",icon:"🤝"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  da1_esg:{ text:"Collaborated with cross-functional teams to conduct due diligence for $15M healthcare acquisition; incorporated ESG risk assessments to support sustainable investment decisions", roleLabels:["ESG/Sustainability","Healthcare Finance","M&A","Investment","PE/VC"], hardSkills:["ESG","Due Diligence","M&A","Risk Assessment","Healthcare Finance","Sustainable Investing"], softSkills:["Cross-functional Collaboration","Analytical Thinking"], impact:{type:"deal",label:"Healthcare Acquisition",value:"$15M",icon:"🤝"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  da1_esg2:{ text:"Collaborated with cross-functional teams to conduct due diligence for $15M acquisition; incorporated ESG risk assessments and compliance reviews to support sustainable investment decisions", roleLabels:["ESG/Sustainability","M&A","Compliance","Corporate Development"], hardSkills:["ESG","Due Diligence","Compliance","Risk Assessment","Sustainable Investing"], softSkills:["Cross-functional Collaboration","Attention to Detail"], impact:{type:"deal",label:"Acquisition DD",value:"$15M",icon:"🤝"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  da2:{ text:"Managed multi-national team for a coal client with $200M revenue, analyzing performance metrics and integrating data insights to accelerate decision-making, reducing project cycle from 12 to 8 weeks", roleLabels:["Consulting","Operations","Project Management","Corporate Finance","Energy"], hardSkills:["Performance Analytics","Project Management","Data Analytics","Financial Analysis","Process Improvement"], softSkills:["Leadership","Cross-cultural Management","Decision Making","Team Management"], impact:{type:"efficiency",label:"Project Cycle Cut",value:"12→8 wks",icon:"⏱"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  nec1:{ text:"Implemented customized IT solutions including Cloud SAP products with real-time dashboards, improving client's inventory forecasting accuracy by 35% and operational efficiency by 50%", roleLabels:["ERP/IT Systems","Operations","Supply Chain","Consulting","Technology"], hardSkills:["SAP","Cloud ERP","Dashboard Development","Inventory Management","Forecasting","IT Implementation"], softSkills:["Problem Solving","Client Management","Technical Communication"], impact:{type:"efficiency",label:"Operational Efficiency",value:"+50%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  nec_erp:{ isNew:true, text:"Led the implementation and customization of ERP systems (SAP, IFS), translating cross-functional business needs into actionable system specifications supporting financial and inventory operations", roleLabels:["ERP/IT Systems","System Analyst","Operations","Supply Chain","Consulting"], hardSkills:["SAP","IFS","ERP","Requirements Analysis","System Design","Business Analysis"], softSkills:["Cross-functional Collaboration","Communication","Analytical Thinking","Stakeholder Management"], impact:null, strength:{hasQuantity:false,hasActionVerb:true,hasOutcome:true} },
  nec_predictive:{ isNew:true, text:"Coordinated delivery of predictive analytics solutions and automated dashboards across departments, improving stock visibility and reducing operational inefficiencies by 40%", roleLabels:["Data Analytics","Operations","Supply Chain","Business Intelligence","Consulting"], hardSkills:["Predictive Analytics","Dashboard Development","Process Automation","Supply Chain Analytics"], softSkills:["Cross-functional Collaboration","Project Coordination","Communication"], impact:{type:"efficiency",label:"Operational Inefficiency",value:"-40%",icon:"⚡"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  nec_sapdash:{ isNew:true, text:"Designed and deployed real-time SAP dashboards and reporting tools, improving forecasting accuracy by 35% and supporting data-driven inventory planning and executive decision-making", roleLabels:["ERP/IT Systems","Data Analytics","Operations","Supply Chain"], hardSkills:["SAP","Dashboard Development","Reporting Tools","Forecasting","Data-Driven Decision Making"], softSkills:["Attention to Detail","Problem Solving","Communication"], impact:{type:"efficiency",label:"Forecasting Accuracy",value:"+35%",icon:"📊"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  thinkie1:{ isNew:true, text:"Conducted keyword gap analysis across 101 terms and audited 70+ existing articles to redesign content architecture for a Mitsui-backed neurotechnology startup; delivered topic cluster strategy targeting 3 audience segments and a 50-article content roadmap, adopted as the brand's organic search and AI visibility plan", roleLabels:["Digital Marketing","Content Strategy","BizOps / Operations","Strategy","Analytics"], hardSkills:["SEO Strategy","Content Strategy","Keyword Research","Digital Marketing","Market Analysis","Strategic Framework Design"], softSkills:["Analytical Thinking","Strategic Thinking","Project Management"], impact:{type:"delivery",label:"Articles Planned",value:"50",icon:"📄"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  thinkie2:{ isNew:true, text:"Built cross-platform AI citation measurement framework spanning 8 generative search platforms (incl. Google AI Overviews, ChatGPT, Perplexity); evaluated 45 SEO/GEO tools and established a structured visibility scoring methodology to enable ongoing performance tracking", roleLabels:["Digital Marketing","Analytics","BizOps / Operations","Strategy"], hardSkills:["Digital Marketing","Analytics","SEO Strategy","Performance Measurement","Competitive Analysis"], softSkills:["Analytical Thinking","Problem Solving","Attention to Detail"], impact:{type:"scale",label:"Platforms Analyzed",value:"8",icon:"🔍"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  nec2:{ text:"Analyzed end-to-end business operation processes and redesigned workflow for chemical client, eliminating 80 FTEs and saving $5M annually", roleLabels:["Operations","Consulting","Process Improvement","Manufacturing","Cost Optimization"], hardSkills:["Business Process Reengineering","Workflow Design","Operations Analysis","Cost Reduction","Process Automation"], softSkills:["Analytical Thinking","Problem Solving","Strategic Thinking"], impact:{type:"savings",label:"Annual Cost Savings",value:"$5M",icon:"💾"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
  nec_training:{ isNew:true, text:"Led end-user training and change management sessions following ERP system rollout across three client divisions; increased system adoption by 40% and reduced support tickets by 25% within the first quarter", roleLabels:["Change Management","ERP/IT Systems","Consulting","Operations","Project Management"], hardSkills:["Change Management","ERP Training","Project Management","Adoption Metrics","Program Design"], softSkills:["Leadership","Communication","Training & Development","Stakeholder Management","Empathy"], impact:{type:"efficiency",label:"System Adoption",value:"+40%",icon:"📱"}, strength:{hasQuantity:true,hasActionVerb:true,hasOutcome:true} },
};

// ═══════════════════════════════════════════════════════════════
// §2  TAXONOMY MAPS
// ═══════════════════════════════════════════════════════════════
const ROLE_TAXONOMY = {
  "Investments & Strategy":   ["PE/VC","Investment Banking","M&A","Corporate Development","Capital Markets","Startup/Fintech","Business Development"],
  "Corporate Finance & Risk": ["FP&A","Corporate Finance","Audit","Risk Management","Compliance","Forensic Accounting","Manufacturing Finance","Healthcare Finance","ESG/Sustainability"],
  "Data & Technology":        ["Data Analytics","Business Intelligence","ERP/IT Systems","Technology","System Analyst"],
  "Consulting & Operations":  ["Consulting","Operations","Process Improvement","Change Management","Project Management","Supply Chain","Cost Optimization","General Management","C-Suite Advisory","Energy","Strategy"],
};
const HARD_TAXONOMY = {
  "Financial & Deal Execution": ["Financial Modeling","Forecasting","Valuation","Due Diligence","M&A","IPO","Budgeting","AOP","Capital Allocation","Variance Analysis","Working Capital Analysis","Revenue Analysis","Cash Flow Analysis","Unit Economics","Fundraising Support","Capital Deployment","Financial Analysis","Financial Planning","Financial Reporting","Strategic Advisory","Metrics Design","Performance Analytics"],
  "Data Analytics & Programming": ["SQL","Python","Power BI","Tableau","Dashboard Development","KPI Design","Data Analytics","Data Modeling","Reporting Standardization","Data Validation","Predictive Analytics","Data-Driven Decision Making","Supply Chain Analytics","Process Automation","Automation","Reporting Tools"],
  "Audit & Risk":               ["Audit","Internal Controls","Fraud Detection","Risk Assessment","ESG Analytics","Statutory Audit","Forensic Accounting","Risk Management","Compliance","Sustainability Disclosure","Corporate Governance","Gap Analysis","IT Implementation"],
  "Enterprise Systems":         ["SAP","ERP","IFS","Cloud ERP","Inventory Management","Requirements Analysis","System Design","Business Analysis","Workflow Design","Root Cause Analysis","Lean Six Sigma","Process Optimization","Change Management","ERP Training","Program Design","Adoption Metrics"],
};
const SOFT_TAXONOMY = {
  "Leadership & Team Management": ["Leadership","Team Management","Cross-functional Collaboration","Cross-cultural Management","Cross-cultural Communication","Training & Development","Empathy","Project Coordination"],
  "Strategic Thinking":           ["Strategic Thinking","Decision Making","Problem Solving","Innovation","Analytical Thinking","Initiative","Attention to Detail","Adaptability","Performance Excellence"],
  "Client Management":            ["Communication","Stakeholder Management","Executive Presence","Presentation","Influencing Skills","Client Management","Technical Communication","Collaboration","Teamwork"],
};

// ═══════════════════════════════════════════════════════════════
// §3  LIBRARY HIERARCHY
// ═══════════════════════════════════════════════════════════════
const LIBRARY = [
  { company:"Duke Capital Partners", location:"Durham, NC", color:"#2563eb",
    roles:[{ title:"Investment Associate", dates:"2025–Present",
      groups:[{bullets:["dc1"]},{bullets:["dc2"]}] }] },
  { company:"Thinkie System", location:"Seattle, WA (Remote)", color:"#0891b2",
    note:"仅 BizOps / go-to-market / digital strategy 方向收录",
    roles:[{ title:"Digital Marketing Analyst · Mentored Study", dates:"Sep 2025 – Dec 2025",
      groups:[{bullets:["thinkie1"]},{bullets:["thinkie2"]}] }] },
  { company:"EQTY LYFE", location:"San Jose, CA (Remote)", color:"#db2777",
    note:"仅 fintech / startup / FP&A / PE 方向收录",
    roles:[{ title:"Finance Intern / MBA Summer Finance Intern", dates:"2025",
      groups:[{bullets:["eq1"]},{bullets:["eq2"]}] }] },
  { company:"Deloitte Touche Tohmatsu LLC.", location:"Tokyo, Japan / Sydney, Australia", color:"#059669",
    note:"SA (2022–2024) 与 Associate (2018–2021) 可按JD合并为 Senior Associate 2018–2024",
    roles:[
      { title:"Senior Associate", dates:"2022–2024", groups:[
        { concept:"Team Leadership & Audit Delivery", useWhen:"Slot-1 必选其一", bullets:["dsa1_std"],
          variants:[{id:"dsa1_esg",label:"ESG variant",useWhen:"JD明确提ESG/sustainability"},{id:"dsa1_esg2",label:"ESG v2",useWhen:"ESG+科技客户"}] },
        { concept:"Automation & Technology", useWhen:"Slot-2 按角度选一", bullets:["dsa2"],
          variants:[{id:"dsa2_analytics",label:"Analytics variant",useWhen:"BI/数据分析方向"}] },
        {bullets:["dsa_agile"]},{bullets:["dsa_lean"]},{bullets:["dsa3"]},
        {bullets:["dsa4"]},{bullets:["dsa_cfo"]},{bullets:["dsa5"]},
        { concept:"Global Forecasting & AOP", useWhen:"FP&A/分析方向二选一", bullets:["dsa_aop"],
          variants:[{id:"dsa_aop_analytics",label:"Analytics variant",useWhen:"强调数据标准化"}] },
      ]},
      { title:"Associate", dates:"2018–2021", groups:[
        { concept:"Due Diligence & Acquisition", useWhen:"Slot-1 必选其一", bullets:["da1_std"],
          variants:[{id:"da1_esg",label:"ESG variant",useWhen:"医疗+ESG"},{id:"da1_esg2",label:"ESG v2",useWhen:"ESG+compliance"}] },
        {bullets:["da2"]},
      ]},
    ] },
  { company:"NEC Solution Innovators, Ltd.", location:"Tokyo, Japan", color:"#7c3aed",
    roles:[{ title:"IT Consultant (System Engineer)", dates:"2015–2018",
      groups:[{bullets:["nec1"]},{bullets:["nec_erp"]},{bullets:["nec_predictive"]},{bullets:["nec_sapdash"]},{bullets:["nec2"]},{bullets:["nec_training"]}] }] },
];

// ═══════════════════════════════════════════════════════════════
// §4  COURSES — 40 total
// ═══════════════════════════════════════════════════════════════
const ALL_COURSES = {
  // Finance
  "Corporate Finance":                                     {code:"FINANCE 646",   cat:"finance"},
  "Valuation and Fundamental Analysis":                    {code:"ACCOUNTG 598",  cat:"finance"},
  "Investment":                                            {code:"FINANCE 647",   cat:"finance"},
  "Entrepreneurial Finance & Venture Capital":             {code:"FINANCE 651",   cat:"finance,vc"},
  "Finance Data Analytics":                                {code:"FINANCE 894",   cat:"finance,analytics"},
  "Corporate Restructuring":                               {code:"FINANCE 658",   cat:"finance"},
  "Global Asset Allocation":                               {code:"FINANCE 656",   cat:"finance"},
  "International Finance":                                 {code:"FINANCE 663",   cat:"finance"},
  "Raising Capital & FinTech":                             {code:"FINANCE 661",   cat:"finance,fintech"},
  "Real Estate Entrepreneurship":                          {code:"FINANCE 662",   cat:"finance"},
  "Financial Management":                                  {code:"FINANCE 645",   cat:"finance"},
  "Tax for Global Management":                             {code:"ACCOUNTG 601",  cat:"finance"},
  // Analytics
  "Foundations of Business Analytics":                     {code:"DECISION 610",  cat:"analytics"},
  "Data Analytics for Business":                           {code:"DECISION 618",  cat:"analytics"},
  "Transforming Tech Analytics with Machine Intelligence": {code:"DECISION 894",  cat:"analytics,tech"},
  "Information Management":                                {code:"DECISION 617",  cat:"analytics"},
  "Forecasting":                                           {code:"DECISION 614",  cat:"analytics,finance"},
  "Software Tools for Analytics":                          {code:"DECISION 616",  cat:"analytics"},
  // Strategy & Management
  "Foundations of Strategy":                               {code:"STRATEGY 835",  cat:"strategy"},
  "Managerial Economics":                                  {code:"MGRECON 780",   cat:"strategy"},
  "Operations Management":                                 {code:"OPERATNS 820",  cat:"operations"},
  "Negotiation":                                           {code:"MANAGEMT 745",  cat:"strategy"},
  "Marketing Management":                                  {code:"MARKETNG 795",  cat:"strategy"},
  "Leadership, Ethics & Organizations":                    {code:"MANAGEMT 730",  cat:"leadership"},
  "Mentored Study / Entrepreneurship":                     {code:"MANAGEMT 754",  cat:"entrepreneurship"},
  // Leadership & Communication
  "Collaborative Leadership 1":                            {code:"FUQINTRD 565",  cat:"leadership"},
  "Collaborative Leadership 2":                            {code:"FUQINTRD 566",  cat:"leadership"},
  "Leading Business":                                      {code:"FUQINTRD 692",  cat:"leadership"},
  "Entrepreneurial Mindset & Action":                      {code:"FUQINTRD 698",  cat:"entrepreneurship"},
  "Innovation and Cryptoventures":                         {code:"FUQINTRD 697",  cat:"fintech,entrepreneurship"},
  "Leadership Communication 1":                            {code:"MGMTCOM 567",   cat:"communication"},
  "Leadership Communication 2":                            {code:"MGMTCOM 568",   cat:"communication"},
  // Healthcare
  "Seminars in Healthcare 1":                              {code:"HLTHMGMT 705",  cat:"healthcare"},
  "Seminars in Healthcare 2":                              {code:"HLTHMGMT 706",  cat:"healthcare"},
  "Medical Device Strategy":                               {code:"HLTHMGMT 712",  cat:"healthcare"},
  "Biotech and Pharma Strategy":                           {code:"HLTHMGMT 717",  cat:"healthcare"},
  "Healthcare Institutions, Systems & Policy":             {code:"HLTHMGMT 710",  cat:"healthcare"},
  // ESG & Ops
  "Sustainability Reporting & Analysis":                   {code:"ACCOUNTG 894",  cat:"esg,healthcare"},
  "Sustainable Operations":                                {code:"OPERATNS 894",  cat:"esg,operations"},
  // Exchange
  "Business Model Innovation in the Digital Economy":      {code:"ZZZ 999 (Chile Exchange)", cat:"strategy,entrepreneurship"},
};
const COURSE_NAMES = Object.keys(ALL_COURSES);

// ═══════════════════════════════════════════════════════════════
// §5  CONSTANTS
// ═══════════════════════════════════════════════════════════════
const CONC = {
  decision:"Decision Sciences Concentration",
  HSM:"Health Sector Management (HSM)",
  both:"Decision Sciences Concentration, Health Sector Management (HSM)",
};
const SKILLS_TEXT = {
  standard:  "CFA Exam Level III candidate; Advanced Excel (Financial Modeling), Valuation (DCF, Comps), SQL, Tableau, Power BI, ERP automation – Expertise in corporate finance, data-driven decision-making, and real-time financial insights.",
  enterprise:"CFA Exam Level III candidate; Advanced Excel (Financial Modeling, DCF, Scenario Analysis), SQL, Tableau, Power BI, ERP automation – Expertise in enterprise software finance, data-driven decision-making, and real-time financial insights.",
  analytics: "CFA Exam Level III candidate; Excel (advanced), Python, SQL, Tableau, Power BI (DAX, Modeling), ERP Automation (SAP) – Expertise in Data Analysis & Visualization, Financial Modeling & Forecasting, Process Optimization & Automation.",
};
const COMMUNITY = {
  full: "Member of Japanese Liquor Export Consortium; developed go-to-market strategy for sake brand, aligning product positioning with market demand through SWOT analysis; successfully sold 20,000 bottles to 15+ restaurants",
  short:"Member of Japanese Liquor Export Consortium; developed GTM strategy for sake brand and supported sales of 20,000 bottles to 15+ restaurants.",
};
const BASELINE_CFG = {
  contact:"personal", dukeConcentration:"decision", gpa:"3.85",
  showCoursework:false, coursework:[],
  showWasedaDesc:true, showTianjinDesc:true,
  includeEqtyLyfe:false, eqtyLyfeRole:"intern", eqtyLyfeBullets:[],
  includeThinkie:false, thinkieBullets:["thinkie1","thinkie2"],
  deloitteMerged:true,
  deloitteSABullets:["dsa1_std","dsa2","dsa3","dsa4","dsa5"],
  deloitteAssocBullets:["da1_std","da2"],
  necBullets:["nec1","nec2"],
  skillsVariant:"standard", showHobbies:true, communityVariant:"full", objective:"",
};

// ═══════════════════════════════════════════════════════════════
// §6  PRESETS — 13 directions
// ═══════════════════════════════════════════════════════════════
const PRESETS = {
  "FP&A": { ...BASELINE_CFG, showCoursework:true,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Finance Data Analytics","Forecasting","Operations Management","Foundations of Strategy"],
    deloitteSABullets:["dsa1_std","dsa_agile","dsa2","dsa_aop","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    objective:"CFA Level III candidate, CPA (Washington), and  Duke MBA (Decision Sciences) with 10+ years of international experience in financial planning, AOP, and cross-functional reporting. Proven expertise in variance analysis and automation to drive FP&A excellence." },
  "Investment Banking": { ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Investment","Corporate Restructuring","Global Asset Allocation","Entrepreneurial Finance & Venture Capital"],
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    showHobbies:false, communityVariant:"short",
    objective:"CFA Level III candidate, CPA (Washington), and  Duke MBA with 10+ years of financial analysis and audit across tech, manufacturing, and healthcare. Demonstrated expertise in pre-IPO audit, capital structure optimization, and M&A due diligence." },
  "Consulting": { ...BASELINE_CFG, showCoursework:true,
    coursework:["Foundations of Strategy","Managerial Economics","Operations Management","Data Analytics for Business","Negotiation","Corporate Finance"],
    deloitteSABullets:["dsa1_std","dsa_lean","dsa_cfo","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec2","nec_training"],
    objective:" CPA (Washington), CFA  III candidate, and Duke MBA with 10+ years of management consulting and audit at Deloitte. Proven track record in Lean Six Sigma, C-suite advisory, and cross-functional team leadership across tech, healthcare, and manufacturing clients." },
  "Data Analytics": { ...BASELINE_CFG, showCoursework:true, showTianjinDesc:false,
    coursework:["Data Analytics for Business","Transforming Tech Analytics with Machine Intelligence","Forecasting","Finance Data Analytics","Information Management","Foundations of Business Analytics"],
    deloitteSABullets:["dsa1_std","dsa2_analytics","dsa4","dsa_aop_analytics","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec_predictive"],
    skillsVariant:"analytics",
    objective:"Duke MBA (Decision Sciences), USCPA (Washington), and CFA III candidate with 10+ years of analytics and finance transformation. Expert in SQL, Power BI, and Python-driven automation — proven at reducing manual workload and delivering data-driven insights." },
  "Healthcare Finance": { ...BASELINE_CFG, dukeConcentration:"HSM", showCoursework:true,
    coursework:["Medical Device Strategy","Biotech and Pharma Strategy","Healthcare Institutions, Systems & Policy","Corporate Finance","Sustainability Reporting & Analysis","Finance Data Analytics"],
    deloitteSABullets:["dsa1_esg","dsa_lean","dsa3","dsa4","dsa5"],
    deloitteAssocBullets:["da1_esg","da2"], necBullets:["nec1","nec2"],
    skillsVariant:"enterprise", showHobbies:false, communityVariant:"short",
    objective:"US CPA (Washington), CFA  III candidate, and Duke MBA with Health Sector Management certificate and 10+ years of financial analysis in healthcare and high-tech sectors. Specialized in healthcare M&A due diligence, ESG reporting, and data-driven process optimization." },
  "PE / VC": { ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Investment","Entrepreneurial Finance & Venture Capital","Corporate Finance","Valuation and Fundamental Analysis","Global Asset Allocation","Raising Capital & FinTech"],
    includeEqtyLyfe:true, eqtyLyfeRole:"mba", eqtyLyfeBullets:["eq1","eq2"],
    deloitteMerged:true,
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std"], necBullets:["nec1","nec2"],
    showHobbies:false, communityVariant:"short",
    objective:"CFA Level III candidate, CPA (Washington), and  Duke MBA with $2M in deployed capital across 20+ company screenings at Duke Capital Partners. Brings 10+ years of financial due diligence, IPO audit, and ERP expertise to support portfolio management and deal execution." },
  "ESG / Sustainability": { ...BASELINE_CFG, dukeConcentration:"HSM", showCoursework:true,
    coursework:["Sustainability Reporting & Analysis","Healthcare Institutions, Systems & Policy","Foundations of Strategy","Data Analytics for Business","Sustainable Operations","International Finance"],
    deloitteSABullets:["dsa1_esg","dsa2_analytics","dsa_lean","dsa4","dsa5"],
    deloitteAssocBullets:["da1_esg2","da2"], necBullets:["nec1","nec2"],
    skillsVariant:"enterprise", showHobbies:false,
    objective:" CPA (Washington), CFA  III candidate, and Duke MBA with Health Sector Management certificate bringing 10+ years of ESG analytics, sustainability reporting, and audit expertise. Experienced in leveraging data-driven insights to improve corporate sustainability disclosures and support responsible investment decisions." },
  "Business Analyst": { ...BASELINE_CFG, showCoursework:true,
    coursework:["Information Management","Data Analytics for Business","Operations Management","Foundations of Strategy","Leadership, Ethics & Organizations","Managerial Economics"],
    deloitteSABullets:["dsa1_std","dsa_lean","dsa_cfo","dsa2","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec_erp","nec2","nec_training"],
    objective:" CPA (Washington), CFA  III candidate, and Duke MBA with 10+ years of business analysis, ERP implementation, and process optimization. Expert in translating complex business requirements into actionable system specifications and driving stakeholder alignment across cross-functional teams." },
  "Financial Analyst": { ...BASELINE_CFG, showCoursework:true,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Finance Data Analytics","Forecasting","Financial Management","Tax for Global Management"],
    deloitteSABullets:["dsa1_std","dsa2","dsa_aop","dsa4","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    objective:"CFA Level III candidate, USCPA (Washington), and Duke MBA with 10+ years of financial analysis, variance reporting, and audit across tech, manufacturing, and healthcare. Proven expertise in building data-driven financial models and delivering executive-level insights." },
  "Tech Company Finance": { ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Data Analytics for Business","Finance Data Analytics","Corporate Finance","Raising Capital & FinTech","Information Management","Foundations of Strategy"],
    deloitteSABullets:["dsa1_std","dsa2_analytics","dsa3","dsa4","dsa5"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec_sapdash"],
    skillsVariant:"enterprise",
    objective:"Duke MBA (Decision Sciences), USCPA (Washington), and CFA III candidate with 10+ years of finance and analytics at Deloitte and NEC. Brings deep expertise in Power BI, SQL, and ERP automation to drive data-driven financial decision-making at scale in tech environments." },
  "Startup Strategic Finance": { ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Entrepreneurial Finance & Venture Capital","Raising Capital & FinTech","Corporate Finance","Forecasting","Entrepreneurial Mindset & Action","Innovation and Cryptoventures"],
    includeEqtyLyfe:true, eqtyLyfeRole:"mba", eqtyLyfeBullets:["eq1","eq2"],
    deloitteMerged:true,
    deloitteSABullets:["dsa1_std","dsa2","dsa3","dsa_agile","dsa5"],
    deloitteAssocBullets:["da1_std"], necBullets:["nec1","nec2"],
    skillsVariant:"enterprise", showHobbies:true, communityVariant:"short",
    objective:"CFA III candidate, CPA (Washington), and  Duke MBA with hands-on startup finance experience building multi-year forecasts and unit economics models for an early-stage fintech, and $2M deployed capital at Duke Capital Partners. Brings institutional-grade rigor to high-growth environments." },
  "Corporate Development": { ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Investment","Corporate Restructuring","Global Asset Allocation","Entrepreneurial Finance & Venture Capital"],
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa_cfo"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec2"],
    showHobbies:false, communityVariant:"short",
    objective:"CFA III candidate, CPA (Washington), and  Duke MBA with 10+ years of M&A due diligence, capital structure optimization, and pre-IPO audit experience. Proven record identifying $3.6M in financial fraud and supporting $10M equity raises — ready to drive strategic deal execution." },
  "BizOps / Operations": { ...BASELINE_CFG, showCoursework:true,
    coursework:["Operations Management","Foundations of Strategy","Data Analytics for Business","Negotiation","Leadership, Ethics & Organizations","Sustainable Operations"],
    includeThinkie:true, thinkieBullets:["thinkie1","thinkie2"],
    showHobbies:false, communityVariant:"short",
    deloitteSABullets:["dsa1_std","dsa_lean","dsa2","dsa5","dsa_cfo"],
    deloitteAssocBullets:["da2","da1_std"], necBullets:["nec2","nec_training","nec_erp"],
    objective:" CPA (Washington), CFA  III candidate, and Duke MBA with 10+ years of operations and process improvement across consulting, ERP implementation, and BPR. Delivered $5M in annual savings through workflow redesign and drove 40% system adoption improvement through change management.",
    keywords:["process improvement","operations","workflow","lean","six sigma","BPR","efficiency","change management","ERP","stakeholder","cost savings","headcount","automation","cross-functional","implementation"] },
  "Investment Analysis": {
    ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Investment","Global Asset Allocation","Finance Data Analytics","Corporate Restructuring"],
    deloitteSABullets:["dsa1_std","dsa3","dsa4","dsa2","dsa_cfo"],
    deloitteAssocBullets:["da1_std","da2"], necBullets:["nec1","nec_sapdash"],
    skillsVariant:"standard", showHobbies:false, communityVariant:"short",
    objective:"CFA Level III candidate, Washington CPA (Washington), and Duke MBA with 10+ years of financial analysis and valuation across tech, healthcare, and manufacturing. Proven expertise in investment screening, financial modeling, and data-driven analytical insights to support buy/sell/hold decisions." },
  "Risk Analysis": {
    ...BASELINE_CFG, showCoursework:true, showWasedaDesc:false,
    coursework:["Corporate Finance","Valuation and Fundamental Analysis","Data Analytics for Business","Finance Data Analytics","Tax for Global Management","Foundations of Strategy"],
    deloitteSABullets:["dsa1_std","dsa4","dsa_lean","dsa2","dsa_cfo"],
    deloitteAssocBullets:["da1_esg2","da2"], necBullets:["nec1","nec_erp"],
    skillsVariant:"standard", showHobbies:false, communityVariant:"short",
    objective:"Washington  CPA (Washington), CFA  III candidate, and Duke MBA with 10+ years of risk identification, internal controls, and audit expertise at Deloitte. Proven ability to detect $3.6M financial fraud, optimize controls frameworks, and deliver risk insights to C-suite stakeholders across multinational environments." },
};

// ── Per-preset keyword sets (for instant match analysis without JD) ──
const PRESET_KEYWORDS = {
  "FP&A":                  ["budgeting","forecasting","variance analysis","AOP","financial planning","FP&A","P&L","financial reporting","headcount","cost","revenue","KPI","modeling","data-driven","cross-functional"],
  "Investment Banking":    ["financial modeling","valuation","DCF","M&A","due diligence","capital structure","IPO","equity","debt","financial analysis","pitch","deal","client","compliance","audit"],
  "Consulting":            ["stakeholder management","process improvement","Lean Six Sigma","recommendations","framework","strategy","deliverable","workstream","executive","cross-functional","analytical","change management","client","project management","data-driven"],
  "Data Analytics":        ["SQL","Python","Power BI","Tableau","dashboard","KPI","data analytics","automation","reporting","data-driven","ETL","visualization","machine learning","data modeling","forecasting"],
  "Healthcare Finance":    ["healthcare","ESG","value-based care","payer","compliance","financial analysis","due diligence","sustainability","reporting","internal controls","risk","audit","strategic","data analytics","cost"],
  "PE / VC":               ["due diligence","portfolio","IRR","capital deployment","deal sourcing","financial modeling","valuation","investment","equity","exit","term sheet","growth","unit economics","risk","MOIC"],
  "ESG / Sustainability":  ["ESG","sustainability","disclosure","reporting","TCFD","climate","risk assessment","stakeholder","compliance","data analytics","internal controls","governance","audit","sustainable","strategy"],
  "Business Analyst":      ["business analysis","requirements","ERP","SAP","process optimization","stakeholder","system design","documentation","user stories","workflow","change management","cross-functional","project management","data analysis","implementation"],
  "Financial Analyst":     ["financial analysis","financial modeling","forecasting","variance analysis","P&L","budget","financial reporting","Excel","data analysis","KPI","accounting","GAAP","audit","risk","compliance"],
  "Tech Company Finance":  ["SaaS","ARR","MRR","unit economics","Power BI","SQL","financial modeling","forecasting","headcount","burn rate","data-driven","automation","KPI","reporting","business intelligence"],
  "Startup Strategic Finance": ["unit economics","cash burn","runway","fundraising","financial forecasting","strategic planning","growth","metrics","VC","startup","equity","capital","P&L","financial modeling","data-driven"],
  "Corporate Development": ["M&A","due diligence","valuation","capital structure","financial analysis","acquisition","strategic","deal","integration","modeling","IPO","equity","risk","compliance","investment"],
  "BizOps / Operations":   ["process improvement","operations","efficiency","workflow","cross-functional","KPI","data-driven","project management","stakeholder","automation","cost savings","change management","ERP","analytics","headcount"],
  "Investment Analysis":   ["financial modeling","valuation","DCF","comparable analysis","investment analysis","equity research","financial analysis","P&L","due diligence","capital markets","portfolio","forecasting","KPI","SQL","Power BI"],
  "Risk Analysis":         ["risk analysis","risk assessment","internal controls","audit","compliance","fraud detection","risk management","financial risk","operational risk","regulatory","enterprise risk","SOX","GAAP","IFRS","governance"],
};

// ═══════════════════════════════════════════════════════════════
// §7  INDUSTRY KEYWORD LIBRARY (P7)
// ═══════════════════════════════════════════════════════════════
const INDUSTRY_KW = {
  "Finance 通用":    ["financial modeling","variance analysis","P&L","GAAP","IFRS","cash flow","budget","budgeting","forecasting","financial reporting","financial analysis","financial analytics"],
  "Consulting":      ["stakeholder management","workstream","deliverable","framework","process improvement","change management","client advisory","recommendations","strategic insights"],
  "Tech Finance":    ["ARR","MRR","CAC","LTV","unit economics","burn rate","runway","SaaS","equity compensation","headcount planning","gross margin","revenue growth"],
  "Healthcare":      ["value-based care","payer mix","reimbursement","FDA","HIPAA","HSM","clinical operations","healthcare policy","pharma","biotech","medical device"],
  "Data/Analytics":  ["SQL","Power BI","Tableau","Python","ETL","data pipeline","KPI","dashboard","reporting automation","data-driven","analytics","machine learning"],
  "ESG":             ["ESG","sustainability","sustainability reporting","carbon","TCFD","GRI","stakeholder engagement","climate risk","disclosure","responsible investment"],
  "PE / VC":         ["deal sourcing","due diligence","portfolio management","IRR","MOIC","cap table","term sheet","exit strategy","deployed capital","screening","investment memo"],
};

// ═══════════════════════════════════════════════════════════════
// §8  INTERVIEW QUESTIONS — preset-based (no API needed)
// ═══════════════════════════════════════════════════════════════
const IQ_BY_BULLET = {
  thinkie1: { q:"Tell me about a time you led a content or go-to-market strategy from scratch.", hint:"101 keywords, 70+ article audit, 4-pillar topic cluster, 3 audience segments. Emphasize end-to-end ownership and adoption as roadmap." },
  thinkie2: { q:"Describe how you have built a measurement or tracking framework for a new initiative.", hint:"8 AI platforms, 45 tools evaluated, 10-point visibility scoring rubric. Focus on methodology design and tool selection rationale." },
  dc1: { q:"Walk me through how you source and evaluate investment opportunities.", hint:"Lead with process: screening → DD → go/no-go → mention $2M deployed result" },
  dc2: { q:"Describe a time you built a reporting or analytics solution from scratch.", hint:"Use Power BI dashboard, -40% reporting ops. Quantify the before/after." },
  eq1: { q:"Tell me about your experience with financial forecasting for an early-stage company.", hint:"Unit economics, cash burn, multi-year model. Explain what assumptions you made." },
  dsa1_std: { q:"Give an example of leading a cross-functional team through a complex audit.", hint:"10-person team, tech client, identified $2M overstatement. Focus on your coordination role." },
  dsa2: { q:"Tell me about a time you used technology to improve an inefficient process.", hint:"SQL+Python automation, 30%+ efficiency, 50+ projects. Mention KPI dashboards." },
  dsa_lean: { q:"Describe how you have applied Lean or Six Sigma principles in a real project.", hint:"Bottleneck analysis, healthcare/tech clients, 30% turnaround cut. Specific tools used?" },
  dsa3: { q:"Walk me through your experience supporting a capital raise or IPO process.", hint:"Pre-IPO audit, $10M equity raise, capital structure optimization. Investor confidence angle." },
  dsa4: { q:"Tell me about a time you identified a significant financial risk or irregularity.", hint:"$3.6M COGS fraud, 40% of operating profit. How did you detect it? What was the impact?" },
  dsa_cfo: { q:"Give an example of presenting recommendations to senior executives.", hint:"CFO/finance execs, internal controls, investment risk. What was the business decision made?" },
  dsa5: { q:"How do you manage multiple high-priority workstreams simultaneously?", hint:"Top Performer 3%, 10+ teams, budgeting to report issuance. Prioritization approach?" },
  da1_std: { q:"Walk me through a due diligence process you led.", hint:"$15M acquisition, revenue/expense/WC analysis. What risks did you flag?" },
  da2:  { q:"Tell me about managing a multinational team on a tight timeline.", hint:"$200M coal client, 12→8 week cycle. How did you drive accountability across cultures?" },
  nec1: { q:"Describe a complex ERP or IT implementation you were part of.", hint:"Cloud SAP, real-time dashboards, +35% forecasting accuracy. Client challenges faced?" },
  nec2: { q:"Give an example of a business process redesign that delivered measurable savings.", hint:"Chemical client, 80 FTE, $5M annual savings. How did you identify the inefficiencies?" },
  nec_training: { q:"Tell me about a change management initiative you led.", hint:"ERP rollout, 3 divisions, +40% adoption, -25% tickets. How did you drive buy-in?" },
};

// ═══════════════════════════════════════════════════════════════
// §9  DERIVED DATA + HELPERS
// ═══════════════════════════════════════════════════════════════
const ALL_IDS   = Object.keys(B);
const ALL_ROLES = [...new Set(ALL_IDS.flatMap(id => B[id].roleLabels))].sort();
const ALL_HARD  = [...new Set(ALL_IDS.flatMap(id => B[id].hardSkills))].sort();
const ALL_SOFT  = [...new Set(ALL_IDS.flatMap(id => B[id].softSkills))].sort();
const newCount  = ALL_IDS.filter(id => B[id].isNew).length;
const CO_COLOR  = { "Duke Capital Partners":"#2563eb","Thinkie System":"#0891b2","EQTY LYFE":"#db2777","Deloitte Touche Tohmatsu LLC.":"#059669","NEC Solution Innovators, Ltd.":"#7c3aed" };

function getAllBulletIds(cfg) {
  if (!cfg) return [];
  return ["dc1","dc2",...(cfg.includeThinkie?(cfg.thinkieBullets||[]):[]),...(cfg.includeEqtyLyfe?(cfg.eqtyLyfeBullets||[]):[]),...(cfg.deloitteSABullets||[]),...(cfg.deloitteAssocBullets||[]),...(cfg.necBullets||[])];
}
function getResumeText(cfg) {
  return [...getAllBulletIds(cfg).map(id=>B[id]?.text||""), SKILLS_TEXT[cfg.skillsVariant]||"", COMMUNITY[cfg.communityVariant]||""].join(" ").toLowerCase();
}
function computeMatch(cfg, kws) {
  if (!cfg||!kws?.length) return {matched:[],missing:[],score:0};
  const txt = getResumeText(cfg);
  const matched = kws.filter(k => txt.includes(k.toLowerCase()));
  const missing  = kws.filter(k => !txt.includes(k.toLowerCase()));
  return { matched, missing, score: Math.round(matched.length/kws.length*100) };
}
function bulletStrengthLevel(id) {
  const s = B[id]?.strength;
  if (!s) return null;
  const count = (s.hasQuantity?1:0)+(s.hasActionVerb?1:0)+(s.hasOutcome?1:0);
  if (count===3) return "high";
  if (count===2) return "mid";
  return "low";
}
function estimatePage(cfg) {
  if (!cfg) return null;
  let lines = 27;
  lines += cfg.objective ? 2.5 : 0;
  lines += (cfg.showCoursework&&cfg.coursework?.length>0) ? 1.5 : 0;
  lines += cfg.showWasedaDesc ? 1 : 0;
  lines += cfg.showTianjinDesc ? 1 : 0;
  lines += cfg.includeThinkie ? 3+(cfg.thinkieBullets?.length||0)*1.4 : 0;
  lines += cfg.includeEqtyLyfe ? 3+(cfg.eqtyLyfeBullets?.length||0)*1.4 : 0;
  lines += (cfg.deloitteSABullets||[]).length * 1.45;
  lines += cfg.deloitteMerged ? 0 : 0.8;
  lines += (cfg.deloitteAssocBullets||[]).length * 1.45;
  lines += (cfg.necBullets||[]).length * 1.4;
  lines += cfg.showHobbies ? 1.2 : 0;
  const PAGE = 63;
  return { lines:Math.round(lines), overflow:Math.round((lines-PAGE)*10)/10, ok:lines<=PAGE };
}
function hlSearch(text, s) {
  if (!s?.trim()) return text;
  const parts = text.split(new RegExp(`(${s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi"));
  return parts.map((p,i) => p.toLowerCase()===s.toLowerCase()
    ? <mark key={i} style={{background:"#fde68a",color:"#713f12",borderRadius:2,padding:"0 1px"}}>{p}</mark>
    : <span key={i}>{p}</span>);
}
function hlKws(text, kws) {
  if (!kws||!kws.length) return text;
  const esc = kws.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "gi");
  const parts=[]; let last=0, m;
  while ((m=re.exec(text))!==null) {
    if (m.index>last) parts.push(<span key={`t${last}`}>{text.slice(last,m.index)}</span>);
    parts.push(<mark key={`m${m.index}`} style={{background:"#fde68a",color:"#713f12",borderRadius:2}}>{m[0]}</mark>);
    last=m.index+m[0].length;
  }
  if (last<text.length) parts.push(<span key={`e${last}`}>{text.slice(last)}</span>);
  return parts.length?parts:text;
}

// ═══════════════════════════════════════════════════════════════
// §10  DESIGN TOKENS + ATOMS
// ═══════════════════════════════════════════════════════════════
const T={bg:"#f5f6fa",surface:"#fff",border:"#e3e5ef",text:"#111827",text2:"#374151",text3:"#9ca3af",accent:"#2563eb",accentBg:"#eff4ff"};
const SEP = <div style={{height:1,background:"#f0f1f5",margin:"6px 0"}}/>;
function Chip({label,bg,color,bd}){ return <span style={{background:bg,border:`1px solid ${bd||bg}`,color,borderRadius:4,padding:"1px 7px",fontSize:10.5,fontWeight:600,lineHeight:1.7,whiteSpace:"nowrap",display:"inline-block"}}>{label}</span>; }
const RoleChip=({l})=><Chip label={l} bg="#f0fdf4" color="#166534" bd="#bbf7d0"/>;
const HardChip=({l})=><Chip label={l} bg="#eff6ff" color="#1e40af" bd="#bfdbfe"/>;
const SoftChip=({l})=><Chip label={l} bg="#fff7ed" color="#9a3412" bd="#fed7aa"/>;
const NewBadge=()=><Chip label="NEW ✦" bg="#fffbeb" color="#d97706" bd="#fde68a"/>;
function IdBadge({id}){ return <code style={{fontSize:10,color:T.text3,background:"#f3f4f6",border:`1px solid ${T.border}`,borderRadius:4,padding:"1px 6px"}}>{id}</code>; }
function Card({children,style}){ return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,.05)",...style}}>{children}</div>; }
function SectionTitle({children}){ return <div style={{fontSize:11,fontWeight:700,letterSpacing:1.8,color:T.text3,textTransform:"uppercase",marginBottom:14,marginTop:4}}>{children}</div>; }
function TagStack({bullet}){ return <div style={{display:"flex",flexDirection:"column",gap:5}}>
  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:9.5,color:T.text3,width:28,flexShrink:0}}>岗位</span>{bullet.roleLabels.map(r=><RoleChip key={r} l={r}/>)}</div>
  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:9.5,color:T.text3,width:28,flexShrink:0}}>Hard</span>{bullet.hardSkills.map(s=><HardChip key={s} l={s}/>)}</div>
  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:9.5,color:T.text3,width:28,flexShrink:0}}>Soft</span>{bullet.softSkills.map(s=><SoftChip key={s} l={s}/>)}</div>
</div>; }
function StrengthBadge({id}){
  const lv=bulletStrengthLevel(id);
  const s=B[id]?.strength;
  if(!s) return null;
  const cfg={high:{bg:"#f0fdf4",color:"#166534",label:"⭐ 高强度"},mid:{bg:"#fffbeb",color:"#92400e",label:"⚡ 中强度"},low:{bg:"#fef2f2",color:"#dc2626",label:"⚠️ 待优化"}};
  const c=cfg[lv];
  return <span title={`量化数字:${s.hasQuantity?"✓":"✗"} 强动词:${s.hasActionVerb?"✓":"✗"} 结果导向:${s.hasOutcome?"✓":"✗"}`} style={{background:c.bg,color:c.color,fontSize:9.5,fontWeight:700,borderRadius:4,padding:"1px 7px",cursor:"help"}}>{c.label}</span>;
}

// ═══════════════════════════════════════════════════════════════
// §11  LIBRARY TAB — left-right, with separators + strength
// ═══════════════════════════════════════════════════════════════
function BulletRowLR({id,isVariant,variantLabel,variantUseWhen,isLast,search}){
  const bullet=B[id]; if(!bullet) return null;
  const [open,setOpen]=useState(!isVariant);
  const LS={flex:"0 0 56%",borderRight:`1px solid ${T.border}`,paddingRight:14,paddingBottom:8};
  const RS={flex:1,paddingLeft:14,paddingBottom:8};
  if(isVariant) return <div>
    <div style={{display:"flex"}}>
      <div style={LS}><div style={{display:"flex",alignItems:"flex-start"}}>
        <div style={{width:24,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:2}}>
          <div style={{width:1,height:8,background:T.border}}/>
          <span style={{fontSize:12,color:T.border,lineHeight:1}}>{isLast?"└":"├"}</span>
          {!isLast&&<div style={{width:1,flex:1,background:T.border}}/>}
        </div>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center",marginBottom:4}}>
            <IdBadge id={id}/><Chip label={variantLabel} bg="#f5f3ff" color="#6d28d9" bd="#ddd6fe"/>
            {bullet.isNew&&<NewBadge/>}<StrengthBadge id={id}/>
            {variantUseWhen&&<span style={{fontSize:10.5,color:T.text3,fontStyle:"italic"}}>→ {variantUseWhen}</span>}
          </div>
          <div style={{fontSize:12.5,color:T.text2,lineHeight:1.6,cursor:"pointer"}} onClick={()=>setOpen(o=>!o)}>{hlSearch(bullet.text,search)}</div>
        </div>
      </div></div>
      <div style={RS}>{open&&<TagStack bullet={bullet}/>}</div>
    </div>{SEP}
  </div>;
  return <div>
    <div style={{display:"flex"}}>
      <div style={LS}>
        <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:5}}>
          <span style={{fontSize:14,color:T.text3,lineHeight:1}}>•</span><IdBadge id={id}/>
          {bullet.isNew&&<NewBadge/>}<StrengthBadge id={id}/>
          {bullet.impact&&<span style={{fontSize:10,color:"#7c3aed",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:4,padding:"1px 6px"}}>{bullet.impact.icon} {bullet.impact.value}</span>}
        </div>
        <div style={{fontSize:13.5,color:T.text,lineHeight:1.65,fontWeight:500,paddingLeft:22,cursor:"pointer"}} onClick={()=>setOpen(o=>!o)}>{hlSearch(bullet.text,search)}</div>
      </div>
      <div style={RS}>{open&&<TagStack bullet={bullet}/>}</div>
    </div>{SEP}
  </div>;
}
function BulletGroup({group,search}){
  const hasConcept=!!group.concept;
  const [varOpen,setVarOpen]=useState(true);
  return <div style={{marginBottom:hasConcept?12:0}}>
    {hasConcept&&<><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
      <div style={{flex:1,height:1,background:"#e9eaf0"}}/>
      <span style={{fontSize:11,fontWeight:700,color:"#6b7280",background:"#f3f4f6",border:`1px solid ${T.border}`,borderRadius:20,padding:"2px 12px",whiteSpace:"nowrap"}}>{group.concept}</span>
      <div style={{flex:1,height:1,background:"#e9eaf0"}}/>
    </div>
    {group.useWhen&&<div style={{fontSize:11,color:T.text3,fontStyle:"italic",marginBottom:8}}>💡 {group.useWhen}</div>}</>}
    {(group.bullets||[]).map(id=><BulletRowLR key={id} id={id} search={search}/>)}
    {group.variants?.length>0&&<div style={{paddingLeft:20}}>
      <button onClick={()=>setVarOpen(o=>!o)} style={{fontSize:11,color:"#6d28d9",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:6,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,marginBottom:varOpen?6:0}}>
        {varOpen?`▼ 收起 ${group.variants.length} 个变体`:`▶ 展开 ${group.variants.length} 个变体`}
      </button>
      {varOpen&&group.variants.map((v,i)=><BulletRowLR key={v.id} id={v.id} isVariant variantLabel={v.label} variantUseWhen={v.useWhen} isLast={i===group.variants.length-1} search={search}/>)}
    </div>}
  </div>;
}
function RoleSection({role,companyColor,search,filterNew}){
  const [collapsed,setCollapsed]=useState(false);
  const vg=useMemo(()=>{
    if(!filterNew&&!search) return role.groups;
    return role.groups.filter(g=>{
      const ids=[...(g.bullets||[]),...(g.variants||[]).map(v=>v.id)];
      if(filterNew) return ids.some(id=>B[id]?.isNew);
      return ids.some(id=>B[id]?.text.toLowerCase().includes(search.toLowerCase())||id.includes(search.toLowerCase()));
    });
  },[role.groups,filterNew,search]);
  if(!vg.length) return null;
  return <div style={{marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer",userSelect:"none"}} onClick={()=>setCollapsed(c=>!c)}>
      <span style={{fontSize:13,fontWeight:700,color:companyColor}}>{role.title}</span>
      <span style={{fontSize:12,color:T.text3}}>{role.dates}</span>
      <span style={{fontSize:10,color:T.text3,marginLeft:"auto"}}>{collapsed?"▶":"▼"}</span>
    </div>
    {!collapsed&&<div style={{border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden"}}>
      <div style={{display:"flex",padding:"7px 14px 4px",borderBottom:`1px solid ${T.border}`,background:"#fafafa"}}>
        <div style={{flex:"0 0 56%",fontSize:10,fontWeight:700,color:T.text3,letterSpacing:1,textTransform:"uppercase",paddingRight:14,borderRight:`1px solid ${T.border}`}}>Bullet 内容（点击展开/折叠标签）</div>
        <div style={{flex:1,fontSize:10,fontWeight:700,color:T.text3,letterSpacing:1,textTransform:"uppercase",paddingLeft:14}}>岗位 / Hard / Soft Skills</div>
      </div>
      <div style={{padding:"10px 14px 4px"}}>{vg.map((g,i)=><BulletGroup key={i} group={g} search={search}/>)}</div>
    </div>}
  </div>;
}
function CompanySection({co,search,filterNew}){
  const [collapsed,setCollapsed]=useState(false);
  return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderLeft:`4px solid ${co.color}`,borderRadius:12,marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,.04)",overflow:"hidden"}}>
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",cursor:"pointer",background:`${co.color}08`,borderBottom:collapsed?"none":`1px solid ${T.border}`}} onClick={()=>setCollapsed(c=>!c)}>
      <span style={{fontSize:17,fontWeight:800,color:co.color}}>{co.company}</span>
      <span style={{fontSize:11.5,color:T.text3}}>{co.location}</span>
      <span style={{fontSize:11,color:T.text3,marginLeft:"auto"}}>{collapsed?"▶ 展开":"▼ 收起"}</span>
    </div>
    {!collapsed&&<div style={{padding:"14px 18px 6px"}}>
      {co.note&&<div style={{fontSize:11.5,color:"#92400e",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:6,padding:"6px 12px",marginBottom:12}}>💡 {co.note}</div>}
      {co.roles.map(r=><RoleSection key={r.title} role={r} companyColor={co.color} search={search} filterNew={filterNew}/>)}
    </div>}
  </div>;
}
function LibraryTab(){
  const [search,setSearch]=useState("");
  const [filterNew,setFilterNew]=useState(false);
  return <div>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 搜索 bullet 文字 / id…"
        style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 13px",color:T.text,fontSize:12.5,outline:"none",width:230,fontFamily:"inherit"}}/>
      <button onClick={()=>setFilterNew(n=>!n)} style={{background:filterNew?"#fffbeb":"none",border:`1px solid ${filterNew?"#fde68a":T.border}`,borderRadius:8,padding:"7px 13px",color:filterNew?"#92400e":T.text3,fontSize:12.5,cursor:"pointer",fontFamily:"inherit",fontWeight:filterNew?700:400}}>✦ 仅看 NEW ({newCount})</button>
      {(search||filterNew)&&<button onClick={()=>{setSearch("");setFilterNew(false);}} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 10px",color:T.text3,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>✕</button>}
      <span style={{fontSize:11,color:T.text3}}>• 点击文字展开标签 · ⭐高强度 = 量化+强动词+结果</span>
    </div>
    {LIBRARY.map(co=><CompanySection key={co.company} co={co} search={search} filterNew={filterNew}/>)}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §12  RESUME CONTENT TAB
// ═══════════════════════════════════════════════════════════════
function ResumeContentTab(){
  function Row({label,children}){return <div style={{display:"flex",gap:12,marginBottom:8,alignItems:"flex-start"}}><span style={{fontSize:11,color:T.text3,fontWeight:600,width:120,flexShrink:0,paddingTop:2}}>{label}</span><span style={{fontSize:13,color:T.text,lineHeight:1.55,flex:1}}>{children}</span></div>;}
  const coursesByCat={};
  COURSE_NAMES.forEach(n=>{const cats=ALL_COURSES[n].cat.split(",");cats.forEach(c=>{if(!coursesByCat[c])coursesByCat[c]=[];coursesByCat[c].push(n);});});
  return <div style={{maxWidth:860}}>
    <SectionTitle>👤 个人信息</SectionTitle>
    <Card><Row label="姓名">Xi (Shawn) Yang, CPA</Row><Row label="电话">(984) 335-0494</Row><Row label="地址">Durham, NC 27708</Row><Row label="LinkedIn">linkedin.com/in/xyang0</Row>
      <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
        {[{v:"xyang.career@gmail.com",l:"personal",n:"主要投递"},{v:"xi.yang@duke.edu",l:"duke",n:"Duke/学术岗"}].map(e=><div key={e.v} style={{background:T.accentBg,border:"1px solid #bfdbfe",borderRadius:8,padding:"8px 14px"}}>
          <div style={{fontSize:12,fontWeight:700,color:T.accent,fontFamily:"monospace"}}>{e.v}</div>
          <div style={{fontSize:10.5,color:T.text3,marginTop:2}}>{e.l} · {e.n}</div>
        </div>)}
      </div>
    </Card>
    <SectionTitle>🎓 学历</SectionTitle>
    <Card>
      <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>Duke University, The Fuqua School of Business</div>
      <div style={{fontSize:12.5,color:T.text2,marginBottom:8}}>Master of Business Administration · 07/2024–05/2026 · Durham, NC</div>
      <Row label="GPA">3.85/4.0（统一版本）</Row><Row label="荣誉">Merit-based scholarship; Dean's list</Row><Row label="社团">Finance Club; Tech Club; Consulting Club</Row>
      <div style={{fontSize:11,fontWeight:700,color:T.text3,marginTop:10,marginBottom:6}}>Concentration（按岗位选择披露）</div>
      {[{v:CONC.decision,u:"金融/银行/咨询/分析（通用）"},{v:CONC.HSM,u:"医疗行业岗位"},{v:CONC.both,u:"医疗+分析双重相关"}].map(c=><div key={c.v} style={{display:"flex",gap:10,marginBottom:4,alignItems:"baseline",flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:T.text,fontWeight:600,flex:1}}>"{c.v}"</span><span style={{fontSize:11,color:T.text3,flexShrink:0}}>{c.u}</span>
      </div>)}
      <div style={{fontSize:11,fontWeight:700,color:T.text3,marginTop:12,marginBottom:8}}>课程全录（40门，按类别）</div>
      {Object.entries(coursesByCat).slice(0,8).map(([cat,courses])=><div key={cat} style={{marginBottom:8}}>
        <div style={{fontSize:10.5,fontWeight:700,color:T.accent,marginBottom:4,textTransform:"capitalize"}}>{cat}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {courses.map(n=><div key={n} style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:6,padding:"3px 8px"}}>
            <span style={{fontSize:11,color:T.text}}>{n}</span><span style={{fontSize:9,color:T.text3,marginLeft:5}}>{ALL_COURSES[n].code}</span>
          </div>)}
        </div>
      </div>)}
    </Card>
    <Card><div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:4}}>Waseda University</div>
      <div style={{fontSize:12.5,color:T.text2,marginBottom:6}}>Master of Arts in Economics · 04/2013–03/2015 · Tokyo, Japan</div>
      <Row label="描述">Applied econometric models to analyze cross-cultural market trends; Active member of Intercultural Communication Center; planned 10+ cross-culture-exchange events, engaging 10+ sponsors</Row>
    </Card>
    <Card><div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:4}}>Tianjin University of Finance and Economics</div>
      <div style={{fontSize:12.5,color:T.text2,marginBottom:6}}>Bachelor of Arts in Japanese Language & Accounting · 09/2008–06/2012 · Tianjin, China</div>
      <Row label="描述">Awarded first-honor academic-based scholarship (top 5%); Outstanding student leader scholarship</Row>
    </Card>
    <SectionTitle>📜 证书（5张）</SectionTitle>
    <Card>{[{n:"CFA Exam Level III Candidate",t:"Finance",u:"全部岗位"},{n:"U.S. Certified Public Accountant (Washington), Licensed January 2022",t:"Finance",u:"全部岗位"},{n:"AWS Certified Solutions Architect – Associate",t:"Tech",u:"Tech/IT/Cloud"},{n:"Oracle Certified Professional, Oracle Master Gold 11g",t:"Tech",u:"ERP/IT Systems"},{n:"Fundamental & Applied IT Engineer (IPA Japan) – Passed",t:"Tech",u:"日企/IT方向"}].map(c=><div key={c.n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,paddingBottom:8,borderBottom:`1px solid ${T.border}`}}>
      <span style={{fontSize:13,color:T.text,flex:1,fontWeight:500}}>{c.n}</span>
      <Chip label={c.t} bg={c.t==="Finance"?"#eff6ff":"#f5f3ff"} color={c.t==="Finance"?"#1e40af":"#6d28d9"} bd={c.t==="Finance"?"#bfdbfe":"#ddd6fe"}/>
      <span style={{fontSize:11,color:T.text3,width:110,flexShrink:0,textAlign:"right"}}>{c.u}</span>
    </div>)}</Card>
    <SectionTitle>🛠 Skills变体 / 🌐 语言 / 💼 附加</SectionTitle>
    <Card>
      {Object.entries(SKILLS_TEXT).map(([k,v])=><div key={k} style={{marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${T.border}`}}>
        <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:4}}>{k}</div>
        <div style={{fontSize:12.5,color:T.text2,lineHeight:1.6}}>{v}</div>
      </div>)}
      <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
        {[{l:"Chinese",lv:"Native"},{l:"Japanese",lv:"Fluent"},{l:"English",lv:"Fluent",n:"部分版本显式列出"}].map(lg=><div key={lg.l} style={{background:T.accentBg,border:"1px solid #bfdbfe",borderRadius:8,padding:"8px 14px"}}>
          <div style={{fontSize:13,fontWeight:700,color:T.text}}>{lg.l}</div>
          <div style={{fontSize:11.5,color:T.accent,fontWeight:600}}>{lg.lv}</div>
          {lg.n&&<div style={{fontSize:10,color:T.text3}}>{lg.n}</div>}
        </div>)}
      </div>
      <div style={{height:1,background:T.border,margin:"12px 0"}}/>
      <Row label="Community（完整）">{COMMUNITY.full}</Row>
      <Row label="Community（精简）">{COMMUNITY.short}</Row>
      <Row label="Hobbies">Developed tools such as real estate analytics app that saved 30+ hours in property research</Row>
    </Card>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §13  ROLE + SKILL INDEX TABS
// ═══════════════════════════════════════════════════════════════
function RoleIndexTab(){
  const [open,setOpen]=useState(null);
  return <div style={{maxWidth:860}}>
    <div style={{fontSize:12,color:T.text3,marginBottom:14}}>共 <strong style={{color:T.text}}>{ALL_ROLES.length}</strong> 个岗位标签 · 按4大类分组</div>
    {Object.entries(ROLE_TAXONOMY).map(([cat,roles])=><div key={cat} style={{marginBottom:20}}>
      <div style={{fontSize:12,fontWeight:700,color:T.accent,marginBottom:8}}>{cat}</div>
      {roles.filter(r=>ALL_ROLES.includes(r)).map(role=>{
        const ids=ALL_IDS.filter(id=>B[id].roleLabels.includes(role));
        const isOpen=open===role;
        return <div key={role} style={{marginBottom:6}}>
          <button onClick={()=>setOpen(isOpen?null:role)} style={{width:"100%",background:isOpen?"#f0fdf4":"#fafafa",border:`1px solid ${isOpen?"#bbf7d0":T.border}`,borderRadius:isOpen?"10px 10px 0 0":10,padding:"9px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
            <RoleChip l={role}/><span style={{fontSize:12,color:T.text3}}>{ids.length} bullets</span><span style={{marginLeft:"auto",fontSize:11,color:T.text3}}>{isOpen?"▲":"▼"}</span>
          </button>
          {isOpen&&<div style={{border:"1px solid #bbf7d0",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"12px 16px",background:"#f0fdf4"}}>
            {ids.map(id=><div key={id} style={{display:"flex",gap:10,marginBottom:7,alignItems:"flex-start"}}><IdBadge id={id}/><div style={{fontSize:12.5,color:T.text,lineHeight:1.55}}>{B[id].text}</div></div>)}
          </div>}
        </div>;
      })}
    </div>)}
  </div>;
}
function SkillIndexTab(){
  function SkillRow({skill,ids,type}){
    const [open,setOpen]=useState(false);
    const color=type==="hard"?"#1e40af":"#9a3412";
    const bg=type==="hard"?"#eff6ff":"#fff7ed";
    const bd=type==="hard"?"#bfdbfe":"#fed7aa";
    return <div style={{marginBottom:5}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",background:open?bg:"#fafafa",border:`1px solid ${open?bd:T.border}`,borderRadius:open?"8px 8px 0 0":8,padding:"7px 13px",display:"flex",alignItems:"center",cursor:"pointer",fontFamily:"inherit"}}>
        <span style={{fontSize:12,color,fontWeight:600}}>{skill}</span><span style={{fontSize:11,color:T.text3,marginLeft:"auto"}}>{ids.length}个 {open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{border:`1px solid ${bd}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"10px 12px",background:bg}}>
        {ids.map(id=><div key={id} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}><IdBadge id={id}/><div style={{fontSize:11.5,color:T.text,lineHeight:1.5}}>{B[id].text}</div></div>)}
      </div>}
    </div>;
  }
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start",maxWidth:1000}}>
    <div>
      {Object.entries(HARD_TAXONOMY).map(([cat,skills])=><div key={cat} style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1e40af",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{cat}</div>
        {skills.filter(s=>ALL_HARD.includes(s)).map(s=><SkillRow key={s} skill={s} ids={ALL_IDS.filter(id=>B[id].hardSkills.includes(s))} type="hard"/>)}
      </div>)}
    </div>
    <div>
      {Object.entries(SOFT_TAXONOMY).map(([cat,skills])=><div key={cat} style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"#9a3412",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{cat}</div>
        {skills.filter(s=>ALL_SOFT.includes(s)).map(s=><SkillRow key={s} skill={s} ids={ALL_IDS.filter(id=>B[id].softSkills.includes(s))} type="soft"/>)}
      </div>)}
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §14  DASHBOARD TAB — impact cards + heat matrix + fixed charts
// ═══════════════════════════════════════════════════════════════
function DashboardTab({cfg}){
  const [expandedCard,setExpandedCard]=useState(null);
  const PIE_COLORS=["#2563eb","#0891b2","#db2777","#059669","#7c3aed"];
  const tt={contentStyle:{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12}};
  const selIds=cfg?getAllBulletIds(cfg):[];
  const impactBullets=selIds.filter(id=>B[id]?.impact);

  const byCompany=["Duke Capital Partners","Thinkie System","EQTY LYFE","Deloitte Touche Tohmatsu LLC.","NEC Solution Innovators, Ltd."].map(c=>{
    const co=LIBRARY.find(l=>l.company===c);
    const count=co?co.roles.flatMap(r=>r.groups.flatMap(g=>[...(g.bullets||[]),...(g.variants||[]).map(v=>v.id)])).length:0;
    return {name:c.split(" ")[0],count};
  });
  const roleFreq=ALL_ROLES.map(r=>({name:r,count:ALL_IDS.filter(id=>B[id].roleLabels.includes(r)).length})).sort((a,b)=>b.count-a.count).slice(0,12);
  const hardFreq=ALL_HARD.map(s=>({name:s,count:ALL_IDS.filter(id=>B[id].hardSkills.includes(s)).length})).sort((a,b)=>b.count-a.count).slice(0,14);
  const softFreq=ALL_SOFT.map(s=>({name:s,count:ALL_IDS.filter(id=>B[id].softSkills.includes(s)).length})).sort((a,b)=>b.count-a.count);
  const radarData=[
    {subject:"Finance",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>["Corporate Finance","FP&A","Investment Banking"].includes(r))).length},
    {subject:"Analytics",A:ALL_IDS.filter(id=>B[id].hardSkills.some(s=>["SQL","Power BI","Data Analytics","Python"].includes(s))).length},
    {subject:"Audit/Risk",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>["Audit","Risk Management","Compliance"].includes(r))).length},
    {subject:"Ops",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>["Operations","Process Improvement"].includes(r))).length},
    {subject:"Leadership",A:ALL_IDS.filter(id=>B[id].softSkills.includes("Leadership")).length},
    {subject:"M&A/PE",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>["M&A","PE/VC"].includes(r))).length},
    {subject:"ESG",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>r.includes("ESG"))).length},
    {subject:"Tech/ERP",A:ALL_IDS.filter(id=>B[id].roleLabels.some(r=>["ERP/IT Systems","Technology"].includes(r))).length},
  ];

  const CARDS=[
    {id:"bullets",label:"总 Bullets",value:ALL_IDS.length,sub:`含 ${newCount} NEW`,color:"#2563eb",detail:()=><div>{LIBRARY.map(co=><div key={co.company} style={{marginBottom:10}}><div style={{fontSize:11,fontWeight:700,color:co.color,marginBottom:4}}>{co.company}</div>{co.roles.flatMap(r=>r.groups.flatMap(g=>[...(g.bullets||[]),...(g.variants||[]).map(v=>v.id)])).map(id=><div key={id} style={{display:"flex",gap:8,marginBottom:3,alignItems:"flex-start"}}><IdBadge id={id}/><span style={{fontSize:11,color:T.text2}}>{B[id]?.text?.slice(0,80)}…</span></div>)}</div>)}</div>},
    {id:"roles",label:"岗位标签",value:ALL_ROLES.length,sub:"4大类",color:"#059669",detail:()=><div>{Object.entries(ROLE_TAXONOMY).map(([cat,roles])=><div key={cat} style={{marginBottom:8}}><div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:4}}>{cat}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{roles.filter(r=>ALL_ROLES.includes(r)).map(r=><RoleChip key={r} l={r}/>)}</div></div>)}</div>},
    {id:"hard",label:"Hard Skills",value:ALL_HARD.length,sub:"4大类",color:"#7c3aed",detail:()=><div>{Object.entries(HARD_TAXONOMY).map(([cat,skills])=><div key={cat} style={{marginBottom:8}}><div style={{fontSize:11,fontWeight:700,color:"#1e40af",marginBottom:4}}>{cat}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{skills.filter(s=>ALL_HARD.includes(s)).map(s=><HardChip key={s} l={s}/>)}</div></div>)}</div>},
    {id:"soft",label:"Soft Skills",value:ALL_SOFT.length,sub:"3大类",color:"#d97706",detail:()=><div>{Object.entries(SOFT_TAXONOMY).map(([cat,skills])=><div key={cat} style={{marginBottom:8}}><div style={{fontSize:11,fontWeight:700,color:"#9a3412",marginBottom:4}}>{cat}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{skills.filter(s=>ALL_SOFT.includes(s)).map(s=><SoftChip key={s} l={s}/>)}</div></div>)}</div>},
    {id:"certs",label:"证书",value:5,sub:"Finance + Tech",color:"#0891b2",detail:()=><div style={{display:"flex",flexDirection:"column",gap:6}}>{["CFA Exam Level III Candidate","USCPA (Washington), Licensed January 2022","AWS Certified Solutions Architect – Associate","Oracle Certified Professional, Oracle Master Gold 11g","Fundamental & Applied IT Engineer (IPA Japan) – Passed"].map(c=><div key={c} style={{fontSize:12,color:T.text}}>{c}</div>)}</div>},
    {id:"courses",label:"课程",value:COURSE_NAMES.length,sub:"完整成绩单",color:"#be185d",detail:()=><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{COURSE_NAMES.map(n=><div key={n} style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:4,padding:"2px 7px",fontSize:10.5,color:T.text}}>{n}</div>)}</div>},
  ];

  return <div style={{maxWidth:1000}}>
    {/* KPI Cards */}
    <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
      {CARDS.map(card=><div key={card.id} style={{flex:1,minWidth:130}}>
        <div onClick={()=>setExpandedCard(expandedCard===card.id?null:card.id)} style={{background:T.surface,border:`1px solid ${expandedCard===card.id?card.color:T.border}`,borderRadius:expandedCard===card.id?"12px 12px 0 0":12,padding:"16px 18px",cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
          <div style={{fontSize:28,fontWeight:800,color:card.color,lineHeight:1}}>{card.value}</div>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginTop:5}}>{card.label}</div>
          <div style={{fontSize:10.5,color:T.text3,marginTop:2}}>{card.sub} · {expandedCard===card.id?"▲ 收起":"▼ 展开"}</div>
        </div>
        {expandedCard===card.id&&<div style={{background:T.surface,border:`1px solid ${card.color}`,borderTop:"none",borderRadius:"0 0 12px 12px",padding:"12px 16px",maxHeight:260,overflowY:"auto"}}>{card.detail()}</div>}
      </div>)}
    </div>

    {/* Impact Dashboard */}
    {impactBullets.length>0&&<Card style={{marginBottom:20}}>
      <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>💼 Impact Dashboard — 当前简历量化成果</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
        {impactBullets.map(id=>{const imp=B[id].impact;return <div key={id} style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 16px",minWidth:140}}>
          <div style={{fontSize:22,fontWeight:800,color:T.accent,lineHeight:1}}>{imp.value}</div>
          <div style={{fontSize:11.5,fontWeight:600,color:T.text,marginTop:4}}>{imp.label}</div>
          <div style={{fontSize:10,color:T.text3,marginTop:2}}>{imp.icon} [{id}]</div>
        </div>;})}
      </div>
    </Card>}
    {!cfg&&<div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#92400e",marginBottom:20}}>💡 在 Resume Tailor 选择预设方向后，Impact Dashboard 将显示当前简历的量化成果汇总</div>}

    {/* Radar + Pie */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <Card><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:12}}>能力覆盖雷达图</div>
        <ResponsiveContainer width="100%" height={250}><RadarChart data={radarData}><PolarGrid stroke={T.border}/><PolarAngleAxis dataKey="subject" tick={{fontSize:11,fill:T.text2}}/><Radar dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.18} strokeWidth={2}/><Tooltip {...tt}/></RadarChart></ResponsiveContainer>
      </Card>
      <Card><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:12}}>Bullets 分布（按公司）</div>
        <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={byCompany} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={({name,count})=>`${name} ${count}`}>{byCompany.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%4]}/>)}</Pie><Tooltip {...tt}/></PieChart></ResponsiveContainer>
      </Card>
    </div>
    {/* Role freq */}
    <Card style={{marginBottom:20}}><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:12}}>岗位标签覆盖度 Top 12</div>
      <ResponsiveContainer width="100%" height={260}><BarChart data={roleFreq} layout="vertical" margin={{left:20,right:20}}>
        <XAxis type="number" tick={{fontSize:11,fill:T.text3}} tickLine={false} axisLine={false}/>
        <YAxis type="category" dataKey="name" tick={{fontSize:10,fill:T.text2}} width={185} tickLine={false} axisLine={false} interval={0}/>
        <Tooltip {...tt}/><Bar dataKey="count" fill="#2563eb" radius={[0,4,4,0]} barSize={13}/>
      </BarChart></ResponsiveContainer>
    </Card>
    {/* Hard + Soft */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <Card><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:12}}>Hard Skills 频次 Top 14</div>
        <ResponsiveContainer width="100%" height={320}><BarChart data={hardFreq} layout="vertical" margin={{left:10,right:10}}>
          <XAxis type="number" tick={{fontSize:10,fill:T.text3}} tickLine={false} axisLine={false}/>
          <YAxis type="category" dataKey="name" tick={{fontSize:9.5,fill:T.text2}} width={165} tickLine={false} axisLine={false} interval={0}/>
          <Tooltip {...tt}/><Bar dataKey="count" fill="#1e40af" radius={[0,4,4,0]} barSize={10}/>
        </BarChart></ResponsiveContainer>
      </Card>
      <Card><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:12}}>Soft Skills 全览 ({ALL_SOFT.length})</div>
        <ResponsiveContainer width="100%" height={Math.max(320,ALL_SOFT.length*22)}><BarChart data={softFreq} layout="vertical" margin={{left:10,right:10}}>
          <XAxis type="number" tick={{fontSize:10,fill:T.text3}} tickLine={false} axisLine={false}/>
          <YAxis type="category" dataKey="name" tick={{fontSize:9.5,fill:T.text2}} width={210} tickLine={false} axisLine={false} interval={0}/>
          <Tooltip {...tt}/><Bar dataKey="count" fill="#d97706" radius={[0,4,4,0]} barSize={10}/>
        </BarChart></ResponsiveContainer>
      </Card>
    </div>
    {/* Heat Matrix */}
    <Card><div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:4}}>岗位热力矩阵 — Bullet × 预设方向</div>
      <div style={{fontSize:11,color:T.text3,marginBottom:12}}>✅ = 该预设方向选用此 bullet · 全能型bullet出现✅越多越通用</div>
      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse",fontSize:9.5}}>
          <thead><tr>
            <th style={{padding:"4px 8px",background:"#f8faff",border:`1px solid ${T.border}`,fontWeight:700,color:T.text3,textAlign:"left",minWidth:120}}>Bullet ID</th>
            {Object.keys(PRESETS).map(p=><th key={p} style={{padding:"4px 6px",background:"#f8faff",border:`1px solid ${T.border}`,fontWeight:600,color:T.accent,writingMode:"vertical-lr",transform:"rotate(180deg)",height:80,textAlign:"center",minWidth:28}}>{p}</th>)}
          </tr></thead>
          <tbody>{ALL_IDS.map(id=>{
            const row=Object.values(PRESETS).map(p=>getAllBulletIds(p).includes(id));
            if(!row.some(Boolean)) return null;
            return <tr key={id} style={{background:row.filter(Boolean).length>=8?"#eff6ff":"transparent"}}>
              <td style={{padding:"3px 8px",border:`1px solid ${T.border}`,fontFamily:"monospace",color:T.text3,fontSize:9}}>{id}</td>
              {row.map((v,i)=><td key={i} style={{padding:"3px 6px",border:`1px solid ${T.border}`,textAlign:"center",background:v?"#dbeafe":"transparent"}}>{v?"✅":""}</td>)}
            </tr>;
          })}</tbody>
        </table>
      </div>
    </Card>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §15  RESUME DOC RENDERER
// ═══════════════════════════════════════════════════════════════
function RRow({left,right,bold,italic,mt}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:mt||0}}><span style={{fontWeight:bold===false?400:700,fontStyle:italic?"italic":"normal",fontSize:bold===false?10:10.5}}>{left}</span><span style={{fontSize:9.5,color:"#333",flexShrink:0,marginLeft:6}}>{right}</span></div>;}
function RSH({title}){return <div style={{borderBottom:"1.5px solid #111",margin:"9px 0 3px",paddingBottom:1}}><span style={{fontSize:10.5,fontWeight:700,letterSpacing:.4}}>{title}</span></div>;}
function BulletList({ids,kws,overrides}){
  return <ul style={{margin:"2px 0 0",paddingLeft:15}}>
    {(ids||[]).map(id=>{
      const text=(overrides&&overrides[id])||B[id]?.text; if(!text) return null;
      const isOverridden=overrides&&overrides[id]&&overrides[id]!==B[id]?.text;
      return <li key={id} style={{fontSize:9.7,marginBottom:1.5,lineHeight:1.33,borderLeft:isOverridden?"2px solid #7c3aed":"none",paddingLeft:isOverridden?4:0}}>{hlKws(text,kws||[])}</li>;
    })}
  </ul>;
}
function PlainList({items,kws}){return <ul style={{margin:"2px 0 0",paddingLeft:15}}>{(items||[]).filter(Boolean).map((t,i)=><li key={i} style={{fontSize:9.7,marginBottom:1.5,lineHeight:1.33}}>{hlKws(t,kws||[])}</li>)}</ul>;}

function ResumeDoc({cfg,kws,showDiff,overrides}){
  const kwsArr=kws||[];
  const contact=cfg.contact==="duke"?"xi.yang@duke.edu  •  (984) 335-0494  •  Durham, NC":"Durham, NC 27708  |  (984) 335-0494  |  xyang.career@gmail.com  |  linkedin.com/in/xyang0";
  const concStr=", Decision Sciences Concentration, Health Sector Management (HSM)";
  return <div id="resume-print" style={{fontFamily:"Georgia,'Times New Roman',serif",background:"#fff",padding:"32px 40px",fontSize:10.5,color:"#111",lineHeight:1.35}}>
    <div style={{textAlign:"center",marginBottom:6}}><div style={{fontSize:16,fontWeight:700,letterSpacing:1.2}}>XI (SHAWN) YANG, CPA</div><div style={{fontSize:9.3,marginTop:3,color:"#444"}}>{contact}</div></div>
    {cfg.objective&&<><RSH title="OBJECTIVE"/><div style={{fontSize:9.7,lineHeight:1.5,color:"#111",paddingBottom:2}}>{hlKws(cfg.objective,kwsArr)}</div></>}
    <RSH title="EDUCATION"/>
    <RRow left="DUKE UNIVERSITY, The Fuqua School of Business" right="Durham, NC"/>
    <RRow left={`Master of Business Administration${concStr}`} right="Aug 2024 – May 2026" bold={false}/>
    <div style={{fontSize:9.5}}>GPA: 3.85/4; Fuqua Scholar (top 10%); Merit-based scholarship; Dean's list; Finance Club; Tech Club; Consulting Club</div>
    {cfg.showCoursework&&cfg.coursework?.length>0&&<div style={{fontSize:9.5}}>Relevant Coursework: {cfg.coursework.join(", ")}</div>}
    <RRow left="WASEDA UNIVERSITY" right="Tokyo, Japan" mt={4}/><RRow left="Master of Arts in Economics" right="Apr 2013 – Jun 2015" bold={false}/>
    {cfg.showWasedaDesc&&<div style={{fontSize:9.5}}>Applied econometric models to analyze cross-cultural market trends; Active member of Intercultural Communication Center; planned 10+ cross-culture-exchange events, engaging 10+ sponsors</div>}
    <RRow left="TIANJIN UNIVERSITY OF FINANCE AND ECONOMICS" right="Tianjin, China" mt={4}/><RRow left="Bachelor of Arts in Japanese Language & Accounting" right="Sep 2008 – Jun 2012" bold={false}/>
    {cfg.showTianjinDesc&&<div style={{fontSize:9.5}}>Awarded first-honor academic-based scholarship (top 5%); Outstanding student leader scholarship</div>}
    <RSH title="EXPERIENCE"/>
    <RRow left="Duke Capital Partners" right="Durham, NC"/><RRow left="Investment Associate" right="2025–Present" bold={false} italic/>
    <BulletList ids={["dc1","dc2"]} kws={kwsArr} overrides={overrides}/>
    {cfg.includeThinkie&&cfg.thinkieBullets?.length>0&&<><RRow left="Thinkie System" right="Seattle, WA (Remote)" mt={5}/><RRow left="Digital Marketing Analyst · Mentored Study" right="Sep 2025 – Dec 2025" bold={false} italic/><BulletList ids={cfg.thinkieBullets} kws={kwsArr} overrides={overrides}/></>}
    {cfg.includeEqtyLyfe&&cfg.eqtyLyfeBullets?.length>0&&<><RRow left="EQTY LYFE" right="San Jose, CA (Remote)" mt={5}/><RRow left={cfg.eqtyLyfeRole==="mba"?"MBA Summer Finance Intern":"Finance Intern"} right="2025" bold={false} italic/><BulletList ids={cfg.eqtyLyfeBullets} kws={kwsArr} overrides={overrides}/></>}
    <RRow left="Deloitte Touche Tohmatsu LLC." right="Tokyo, Japan / Sydney, Australia" mt={5}/>
    {cfg.deloitteMerged?<><RRow left="Senior Associate" right="2018–2024" bold={false} italic/><BulletList ids={[...(cfg.deloitteSABullets||[]),...(cfg.deloitteAssocBullets||[])]} kws={kwsArr} overrides={overrides}/></>
    :<><RRow left="Senior Associate" right="2022–2024" bold={false} italic/><BulletList ids={cfg.deloitteSABullets||[]} kws={kwsArr} overrides={overrides}/><RRow left="Associate" right="2018–2021" bold={false} italic mt={3}/><BulletList ids={cfg.deloitteAssocBullets||[]} kws={kwsArr} overrides={overrides}/></>}
    <RRow left="NEC Solution Innovators, Ltd." right="Tokyo, Japan" mt={5}/><RRow left="IT Consultant (System Engineer)" right="2015–2018" bold={false} italic/>
    <BulletList ids={cfg.necBullets||[]} kws={kwsArr} overrides={overrides}/>
    <RSH title="ADDITIONAL INFORMATION"/>
    <PlainList kws={kwsArr} items={["Certifications: U.S. CPA (Washington), Licensed 2022; CFA Exam Level III Candidate; AWS Certified Solutions Architect – Associate",`Skills: ${SKILLS_TEXT[cfg.skillsVariant]||SKILLS_TEXT.standard}`,"Languages: Chinese (Native), Japanese (Fluent)",`Community Involvement: ${COMMUNITY[cfg.communityVariant]||COMMUNITY.full}`,cfg.showHobbies?"Hobbies: Developed tools such as real estate analytics app that saved 30+ hours in property research":null]}/>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §16  MATCH TAB — 3-tier suggestions + improved display
// ═══════════════════════════════════════════════════════════════
function MatchTab({cfg,jdKeywords,matched,missing,score,onApply}){
  const [activeKw,setActiveKw]=useState(null);
  const [aiRewrite,setAiRewrite]=useState({});
  const [rewriting,setRewriting]=useState(null);
  const currentIds=new Set(getAllBulletIds(cfg));

  function getTier1(kw){
    const k=kw.toLowerCase();
    const covering=ALL_IDS.filter(id=>B[id].text.toLowerCase().includes(k)||B[id].hardSkills.some(s=>s.toLowerCase().includes(k))||B[id].roleLabels.some(r=>r.toLowerCase().includes(k)));
    const inCurrent=covering.filter(id=>currentIds.has(id));
    const notInCurrent=covering.filter(id=>!currentIds.has(id));
    return {inCurrent,notInCurrent};
  }

  async function getAiRewrite(kw){
    setRewriting(kw);
    const relIds=[...currentIds].filter(id=>B[id].text.toLowerCase().includes(kw.toLowerCase().split(" ")[0]));
    if(!relIds.length){setAiRewrite(p=>({...p,[kw]:{type:"noBullet"}}));setRewriting(null);return;}
    const id=relIds[0];
    const original=B[id].text;
    try{
      const rwKey = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("anthropic_api_key") : ""; if (!rwKey){setAiRewrite(p=>({...p,[kw]:{type:"error",msg:"请先输入 API Key"}}));setRewriting(null);return;}
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":rwKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Rewrite this resume bullet 3 different ways to naturally include the keyword "${kw}" without changing factual claims. Keep the same impact metrics and structure. Return ONLY a JSON array of 3 strings, no other text:\n\nOriginal: ${original}`}]})});
      const data=await res.json();
      if(data.error) throw new Error(data.error.message);
      const raw=data.content.map(c=>c.text||"").join("").trim();
      let variants;
      try{ variants=JSON.parse(raw.replace(/```json|```/g,"").trim()); }
      catch{ variants=[raw]; }
      setAiRewrite(p=>({...p,[kw]:{type:"variants",id,original,variants:Array.isArray(variants)?variants:[variants],selected:0}}));
    }catch(e){setAiRewrite(p=>({...p,[kw]:{type:"error",msg:e.message}}));}
    setRewriting(null);
  }
  function applyRewrite(kw,text,onApply){
    onApply&&onApply(aiRewrite[kw]?.id,text);
  }

  const sc=score>=70?"#16a34a":score>=50?"#d97706":"#dc2626";
  return <div style={{padding:"20px 24px",maxWidth:820}}>
    {/* Score */}
    <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:20,background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
      <div style={{position:"relative",width:76,height:76,flexShrink:0}}>
        <svg viewBox="0 0 36 36" style={{transform:"rotate(-90deg)",width:"100%",height:"100%"}}>
          <circle cx="18" cy="18" r="14" fill="none" stroke={T.border} strokeWidth="3.5"/>
          <circle cx="18" cy="18" r="14" fill="none" stroke={sc} strokeWidth="3.5" strokeDasharray={`${score*.879} ${87.9-score*.879}`} strokeLinecap="round"/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:20,fontWeight:800,color:sc,lineHeight:1}}>{score}</span>
          <span style={{fontSize:9,color:T.text3}}>ATS分</span>
        </div>
      </div>
      <div>
        <div style={{fontSize:17,fontWeight:800,color:sc}}>{score>=70?"优秀匹配":score>=50?"基本匹配":"需要优化"}</div>
        <div style={{fontSize:12,color:T.text3,marginTop:3}}>{matched.length}/{jdKeywords.length} 个关键词已覆盖</div>
        <div style={{fontSize:10.5,color:T.text3,marginTop:3}}>基于 ATS 严格字符串匹配逻辑 · 忠实模拟主流 ATS 系统行为</div>
      </div>
    </div>
    {/* Matched/Missing grid */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:"#16a34a",textTransform:"uppercase",marginBottom:8}}>✓ 已覆盖 ({matched.length})</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{matched.map(kw=><span key={kw} style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:20,padding:"3px 11px",fontSize:11,color:"#166534"}}>{kw}</span>)}</div>
      </div>
      <div><div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:"#dc2626",textTransform:"uppercase",marginBottom:8}}>✗ 缺失 ({missing.length}) — 点击展开补救建议</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{missing.map(kw=><span key={kw} onClick={()=>setActiveKw(activeKw===kw?null:kw)} style={{background:activeKw===kw?"#fef2f2":"#fff",border:"1px solid #fca5a5",borderRadius:20,padding:"3px 11px",fontSize:11,color:"#dc2626",cursor:"pointer",fontWeight:activeKw===kw?700:400}}>{kw} ↗</span>)}</div>
      </div>
    </div>
    {/* 3-tier suggestion panel */}
    {activeKw&&(()=>{
      const {inCurrent,notInCurrent}=getTier1(activeKw);
      const rw=aiRewrite[activeKw];
      return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>「{activeKw}」— 补救建议</div>
        {/* Tier 1a — already in resume */}
        {inCurrent.length>0&&<div style={{marginBottom:14}}>
          <div style={{fontSize:10.5,fontWeight:700,color:"#16a34a",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🟢 已收录的相关bullet（已在简历中）</div>
          {inCurrent.map(id=><div key={id} style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"8px 14px",marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><IdBadge id={id}/><span style={{fontSize:10,color:"#166534"}}>✓ 已收录 — 检查ATS写法是否完全一致</span></div>
            <div style={{fontSize:12,color:T.text,lineHeight:1.5}}>{B[id].text}</div>
          </div>)}
        </div>}
        {/* Tier 1b — not in resume but exists in library */}
        {notInCurrent.length>0&&<div style={{marginBottom:14}}>
          <div style={{fontSize:10.5,fontWeight:700,color:"#d97706",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🟡 母版库可替换的bullet</div>
          {notInCurrent.slice(0,3).map(id=>{
            const canReplace=[...currentIds].find(cid=>{
              const co=LIBRARY.find(l=>l.roles.some(r=>r.groups.some(g=>g.bullets?.includes(cid)||g.variants?.some(v=>v.id===cid))));
              const targetCo=LIBRARY.find(l=>l.roles.some(r=>r.groups.some(g=>g.bullets?.includes(id)||g.variants?.some(v=>v.id===id))));
              return co===targetCo;
            });
            return <div key={id} style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"8px 14px",marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><IdBadge id={id}/><span style={{fontSize:10,color:"#92400e"}}>未收录{canReplace?` — 建议替换 [${canReplace}]`:""}</span></div>
              <div style={{fontSize:12,color:T.text,lineHeight:1.5}}>{B[id].text}</div>
            </div>;
          })}
        </div>}
        {/* Tier 2 — AI multi-variant rewrite */}
        <div style={{marginBottom:8}}>
          <div style={{fontSize:10.5,fontWeight:700,color:"#7c3aed",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔵 AI改写建议（3个可选版本，勾选后应用）</div>
          {!rw&&<button onClick={()=>getAiRewrite(activeKw)} disabled={rewriting===activeKw} style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:8,padding:"8px 14px",color:"#6d28d9",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
            {rewriting===activeKw?"⏳ 生成3个改写版本…":"✨ 生成3个可选改写版本"}
          </button>}
          {rw?.type==="error"&&<div style={{fontSize:12,color:"#dc2626"}}>{rw.msg}</div>}
          {rw?.type==="noBullet"&&<div style={{fontSize:12,color:T.text3,fontStyle:"italic"}}>建议在 Objective 或 Skills 中手动加入此关键词</div>}
          {rw?.type==="variants"&&<div>
            <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:"8px 8px 0 0",padding:"7px 12px",fontSize:10.5,color:"#dc2626"}}>
              <span style={{fontWeight:700}}>原文</span> <IdBadge id={rw.id}/> {rw.original}
            </div>
            <div style={{border:"1px solid #ddd6fe",borderTop:"none",borderRadius:"0 0 8px 8px",padding:"8px 12px",background:"#f9f8ff"}}>
              <div style={{fontSize:10.5,fontWeight:700,color:"#6d28d9",marginBottom:8}}>选择一个改写版本应用到简历：</div>
              {rw.variants.map((v,i)=><label key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,padding:"7px 10px",background:rw.selected===i?"#f0f0ff":"#fff",border:`1.5px solid ${rw.selected===i?"#7c3aed":"#e5e7eb"}`,borderRadius:8,cursor:"pointer"}}>
                <input type="radio" name={`variant_${activeKw}`} checked={rw.selected===i}
                  onChange={()=>setAiRewrite(p=>({...p,[activeKw]:{...rw,selected:i}}))}
                  style={{marginTop:2,cursor:"pointer",flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#7c3aed",fontWeight:700,marginBottom:2}}>版本 {i+1}</div>
                  <div style={{fontSize:11.5,color:T.text,lineHeight:1.55}}>{v}</div>
                </div>
              </label>)}
              <div style={{display:"flex",gap:8,marginTop:8,alignItems:"center"}}>
                <button onClick={()=>{const chosen=rw.variants[rw.selected];applyRewrite(activeKw,chosen,onApply);}}
                  style={{background:"#7c3aed",border:"none",borderRadius:7,padding:"7px 16px",color:"#fff",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>
                  ✓ 应用版本 {rw.selected+1} 到简历
                </button>
                <span style={{fontSize:10,color:"#92400e"}}>⚠️ 请核实与实际经历一致</span>
              </div>
            </div>
          </div>}
        </div>
        {inCurrent.length===0&&notInCurrent.length===0&&!rw&&<div style={{fontSize:12,color:T.text3,fontStyle:"italic"}}>母版库中暂无直接匹配，建议在 Objective 或 Skills 部分自然插入此关键词</div>}
      </div>;
    })()}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §17  COMPLETE DIFF REPORT TAB — linear, color-coded, library-as-baseline
// ═══════════════════════════════════════════════════════════════
function DiffReportTab({cfg}){
  const selIds=new Set(getAllBulletIds(cfg));
  const [showExcluded,setShowExcluded]=useState(true);

  // Structural summary
  const choices=[];
  if(cfg.dukeConcentration) choices.push({label:"Concentration",value:CONC[cfg.dukeConcentration]||cfg.dukeConcentration});
  if(cfg.showCoursework&&cfg.coursework?.length>0) choices.push({label:"Coursework",value:`${cfg.coursework.length}门`});
  choices.push({label:"Deloitte职级",value:cfg.deloitteMerged?"合并 2018–2024":"分开 SA 22-24 / Assoc 18-21"});
  if(cfg.includeThinkie) choices.push({label:"THINKIE",value:"✅ GEO Analyst"});
  if(cfg.includeEqtyLyfe) choices.push({label:"EQTY LYFE",value:`✅ ${cfg.eqtyLyfeRole==="mba"?"MBA":"Intern"}`});
  if(cfg.skillsVariant!=="standard") choices.push({label:"Skills",value:cfg.skillsVariant});

  return <div style={{padding:"16px 20px",maxWidth:800}}>
    {/* Stats bar */}
    <div style={{display:"flex",gap:12,marginBottom:16,background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 16px",alignItems:"center",flexWrap:"wrap"}}>
      <div style={{fontSize:11,color:T.text3}}>基准：母版库全集（{ALL_IDS.length}条）</div>
      <div style={{height:14,width:1,background:T.border}}/>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{width:10,height:10,borderRadius:2,background:"#bbf7d0",display:"inline-block"}}/>
        <span style={{fontSize:11,color:T.text3}}>已选中 {selIds.size}条</span>
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{width:10,height:10,borderRadius:2,background:"#f3f4f6",border:"1px solid #e5e7eb",display:"inline-block"}}/>
        <span style={{fontSize:11,color:T.text3}}>已排除 {ALL_IDS.length-selIds.size}条</span>
      </div>
      <button onClick={()=>setShowExcluded(s=>!s)} style={{marginLeft:"auto",background:"none",border:`1px solid ${T.border}`,borderRadius:6,padding:"3px 10px",color:T.text3,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
        {showExcluded?"隐藏已排除":"显示已排除"}
      </button>
    </div>

    {/* Structural config */}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:10,fontWeight:700,color:"#7c3aed",letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>⚙️ 结构配置</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {choices.map((c,i)=><span key={i} style={{background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:20,padding:"3px 11px",fontSize:11.5}}>
          <span style={{color:T.text3}}>{c.label}：</span><span style={{color:"#6d28d9",fontWeight:600}}>{c.value}</span>
        </span>)}
      </div>
    </div>

    {/* Linear bullet list — all companies in order */}
    {LIBRARY.map(co=>{
      const coIds=co.roles.flatMap(r=>r.groups.flatMap(g=>[...(g.bullets||[]),...(g.variants||[]).map(v=>v.id)]));
      const selectedCoIds=coIds.filter(id=>selIds.has(id));
      const excludedCoIds=coIds.filter(id=>!selIds.has(id));
      if(!selectedCoIds.length&&(!showExcluded||!excludedCoIds.length)) return null;
      return <div key={co.company} style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,paddingBottom:6,borderBottom:`2px solid ${co.color}`}}>
          <span style={{fontSize:14,fontWeight:800,color:co.color}}>{co.company}</span>
          <span style={{fontSize:11,color:T.text3}}>{selectedCoIds.length}/{coIds.length} 条已选</span>
        </div>
        {/* Selected */}
        {selectedCoIds.map(id=><div key={id} style={{display:"flex",gap:10,marginBottom:5,padding:"7px 12px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,alignItems:"flex-start"}}>
          <span style={{fontSize:12,color:"#16a34a",flexShrink:0,marginTop:1}}>✓</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:6,marginBottom:3,flexWrap:"wrap"}}><IdBadge id={id}/><StrengthBadge id={id}/>{B[id]?.impact&&<span style={{fontSize:10,color:"#7c3aed",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:4,padding:"1px 6px"}}>{B[id].impact.icon} {B[id].impact.value}</span>}</div>
            <div style={{fontSize:12,color:T.text,lineHeight:1.55}}>{B[id]?.text}</div>
          </div>
        </div>)}
        {/* Excluded */}
        {showExcluded&&excludedCoIds.map(id=><div key={id} style={{display:"flex",gap:10,marginBottom:4,padding:"7px 12px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,alignItems:"flex-start",opacity:0.65}}>
          <span style={{fontSize:12,color:T.text3,flexShrink:0,marginTop:1}}>○</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:6,marginBottom:3,flexWrap:"wrap"}}><IdBadge id={id}/><StrengthBadge id={id}/></div>
            <div style={{fontSize:11.5,color:T.text3,lineHeight:1.5}}>{B[id]?.text}</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:4}}>{B[id]?.roleLabels.slice(0,3).map(r=><RoleChip key={r} l={r}/>)}</div>
          </div>
        </div>)}
      </div>;
    })}
  </div>;
}


// ═══════════════════════════════════════════════════════════════
// §18  INTERVIEW PREP TAB
// ═══════════════════════════════════════════════════════════════
function InterviewTab({cfg}){
  const selIds=getAllBulletIds(cfg);
  const qs=selIds.filter(id=>IQ_BY_BULLET[id]).map(id=>({...IQ_BY_BULLET[id],bulletId:id,bulletText:B[id]?.text}));
  const [expanded,setExpanded]=useState(null);
  if(!qs.length) return <div style={{padding:"40px",textAlign:"center",color:T.text3}}>请先在左侧选择预设方向或生成简历</div>;
  return <div style={{padding:"20px 24px",maxWidth:760}}>
    <div style={{fontSize:12,color:T.text3,marginBottom:16}}>基于当前简历配置，以下 {qs.length} 个行为面试题最可能被问到（STAR框架）</div>
    {qs.map((q,i)=><div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
      <div style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"flex-start",gap:12}} onClick={()=>setExpanded(expanded===i?null:i)}>
        <span style={{background:T.accentBg,color:T.accent,borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</span>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:T.text,lineHeight:1.5}}>{q.q}</div><div style={{fontSize:10.5,color:T.text3,marginTop:3}}>对应 <IdBadge id={q.bulletId}/></div></div>
        <span style={{fontSize:11,color:T.text3,flexShrink:0}}>{expanded===i?"▲":"▼"}</span>
      </div>
      {expanded===i&&<div style={{borderTop:`1px solid ${T.border}`,padding:"14px 18px",background:"#fafafa"}}>
        <div style={{fontSize:11.5,fontWeight:700,color:"#7c3aed",marginBottom:6}}>💡 STAR 提示</div>
        <div style={{fontSize:12,color:T.text2,lineHeight:1.6,marginBottom:12}}>{q.hint}</div>
        <div style={{fontSize:11.5,fontWeight:700,color:T.text3,marginBottom:4}}>对应 bullet 原文：</div>
        <div style={{fontSize:12,color:T.text,lineHeight:1.6,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"8px 12px"}}>{q.bulletText}</div>
      </div>}
    </div>)}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// §19  INDUSTRY KW TAB (P7)
// ═══════════════════════════════════════════════════════════════
function IndustryKwTab({cfg}){
  const [selectedIndustry,setSelectedIndustry]=useState(null);
  const [checkedKw,setCheckedKw]=useState(null);
  const resumeText=cfg?getResumeText(cfg):"";
  return <div style={{padding:"20px 24px",maxWidth:760}}>
    <div style={{fontSize:12,color:T.text3,marginBottom:16}}>选择行业 → 展开关键词 → 自检当前简历是否覆盖（无需AI，本地即时匹配）</div>
    {Object.entries(INDUSTRY_KW).map(([industry,kws])=><div key={industry} style={{marginBottom:8}}>
      <button onClick={()=>setSelectedIndustry(selectedIndustry===industry?null:industry)} style={{width:"100%",background:selectedIndustry===industry?T.accentBg:"#fafafa",border:`1px solid ${selectedIndustry===industry?"#bfdbfe":T.border}`,borderRadius:selectedIndustry===industry?"10px 10px 0 0":10,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <span style={{fontSize:13,fontWeight:700,color:T.text}}>{industry}</span>
        <span style={{fontSize:11,color:T.text3}}>{kws.length}个关键词</span>
        <span style={{marginLeft:"auto",fontSize:11,color:T.text3}}>{selectedIndustry===industry?"▲":"▼"}</span>
      </button>
      {selectedIndustry===industry&&<div style={{border:"1px solid #bfdbfe",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"14px 16px",background:T.accentBg}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {kws.map(kw=>{
            const covered=cfg&&resumeText.includes(kw.toLowerCase());
            const isChecked=checkedKw===kw;
            return <div key={kw}>
              <span onClick={()=>setCheckedKw(isChecked?null:kw)} style={{display:"inline-flex",alignItems:"center",gap:5,background:covered?"#f0fdf4":isChecked?"#fef2f2":"#fff",border:`1px solid ${covered?"#bbf7d0":isChecked?"#fca5a5":T.border}`,borderRadius:20,padding:"4px 12px",fontSize:11.5,color:covered?"#166534":isChecked?"#dc2626":T.text,cursor:"pointer",fontWeight:covered?600:400}}>
                {covered?"✓":"○"} {kw}
              </span>
              {isChecked&&<div style={{background:covered?"#f0fdf4":"#fef2f2",border:`1px solid ${covered?"#bbf7d0":"#fca5a5"}`,borderRadius:8,padding:"8px 12px",marginTop:4,fontSize:11.5}}>
                {covered?<div style={{color:"#166534"}}>✓ 已在简历中找到「{kw}」</div>
                :<div>
                  <div style={{color:"#dc2626",marginBottom:6}}>✗ 简历中未找到「{kw}」</div>
                  {(()=>{
                    const suggestions=ALL_IDS.filter(id=>B[id].text.toLowerCase().includes(kw.toLowerCase())||B[id].hardSkills.some(s=>s.toLowerCase().includes(kw.toLowerCase())));
                    const inCurrent=new Set(cfg?getAllBulletIds(cfg):[]);
                    if(!suggestions.length) return <div style={{fontSize:10.5,color:"#92400e"}}>💡 建议在 Objective 或 Skills 中手动加入此关键词</div>;
                    return <div>
                      <div style={{fontSize:10.5,color:"#92400e",marginBottom:5}}>💡 母版库中含此关键词的 bullets：</div>
                      {suggestions.slice(0,2).map(id=><div key={id} style={{background:inCurrent.has(id)?"#f0fdf4":"#fff",border:`1px solid ${inCurrent.has(id)?"#bbf7d0":"#e5e7eb"}`,borderRadius:6,padding:"5px 8px",marginBottom:4}}>
                        <div style={{display:"flex",gap:5,marginBottom:3}}><IdBadge id={id}/><span style={{fontSize:9.5,color:inCurrent.has(id)?"#166534":"#9ca3af"}}>{inCurrent.has(id)?"✓ 已在简历中":"未选中"}</span></div>
                        <div style={{fontSize:10.5,color:"#374151",lineHeight:1.5}}>{B[id]?.text?.slice(0,100)}…</div>
                      </div>)}
                    </div>;
                  })()}
                </div>}
              </div>}
            </div>;
          })}
        </div>
        {!cfg&&<div style={{fontSize:11,color:"#92400e",marginTop:10}}>💡 请先在 Resume Tailor 选择预设方向，再自检覆盖情况</div>}
      </div>}
    </div>)}
  </div>;
}


// ─── Local JD analysis — instant, no API ─────────────────────────
function analyzeJDLocally(jd){
  const lo = jd.toLowerCase();
  // Score each preset by keyword hit rate
  const scores = Object.entries(PRESET_KEYWORDS).map(([name,kws])=>{
    const hits = kws.filter(k=>lo.includes(k.toLowerCase()));
    return {name, score:Math.round(hits.length/kws.length*100), hits, total:kws.length};
  }).sort((a,b)=>b.score-a.score);
  // Extract matched keywords for highlighting (union of all PRESET_KEYWORDS + INDUSTRY_KW found in JD)
  const kwSet=new Set();
  Object.values(PRESET_KEYWORDS).flat().forEach(k=>{if(lo.includes(k.toLowerCase()))kwSet.add(k);});
  Object.values(INDUSTRY_KW).flat().forEach(k=>{if(lo.includes(k.toLowerCase()))kwSet.add(k);});
  return {scores, extractedKws:[...kwSet].slice(0,20)};
}

// ═══════════════════════════════════════════════════════════════
// §20  AI CALL
// ═══════════════════════════════════════════════════════════════
const BULLET_MENU=[
  "SLOT-1 SA (pick exactly one — ESG only if JD explicitly says ESG/sustainability/CSR):",
  "  dsa1_std → audit team leadership $2M overstatement data analytics [DEFAULT]",
  "  dsa1_esg → ESG analytics sustainability disclosures stakeholders",
  "  dsa1_esg2 → ESG analytics reporting gaps tech client",
  "SA remaining (pick 3-4):",
  "  dsa2 → SQL Python automation KPI dashboards 30% efficiency 50+projects",
  "  dsa2_analytics → SQL Power BI automation analytics 70% workload [BI/analytics roles]",
  "  dsa_agile → $200M project Japan/Australia budgeting agile [FP&A/PM]",
  "  dsa_lean → Lean Six Sigma workflow optimization [consulting/ops]",
  "  dsa3 → pre-IPO audit $10M equity raise capital structure",
  "  dsa4 → $3.6M fraud detection COGS internal controls manufacturing",
  "  dsa_cfo → CFO advisory executive influence multinational [consulting]",
  "  dsa5 → Top Performer 3% 10+ cross-functional teams budgeting",
  "  dsa_aop → AOP variance analysis capital allocation [FP&A/manufacturing]",
  "  dsa_aop_analytics → reporting standardization data validation [analytics/BI]",
  "SLOT-1 Assoc (pick exactly one):",
  "  da1_std → $15M acquisition due diligence financial analysis [DEFAULT]",
  "  da1_esg → $15M healthcare M&A ESG risk [ESG/healthcare]",
  "  da1_esg2 → $15M acquisition ESG compliance [ESG/compliance]",
  "Assoc optional: da2 → $200M multinational team project cycle 12→8 weeks",
  "NEC (always nec1+nec2, optionally one more):",
  "  nec1 → Cloud SAP dashboards forecasting+35% efficiency+50%",
  "  nec_erp → SAP/IFS implementation business→system specs [ERP/IT]",
  "  nec_predictive → predictive analytics supply chain [analytics/ops]",
  "  nec_sapdash → SAP dashboard design executive support [ERP/BI]",
  "  nec2 → BPR chemical 80FTE $5M savings",
  "  nec_training → ERP change management +40% adoption [change mgmt]",
  "THINKIE (optional — only if JD mentions go-to-market, growth strategy, digital strategy, cross-functional ops, or BizOps; never if includeEqtyLyfe is true):",
  "  thinkie1 → keyword gap analysis 101 terms 70+ articles topic cluster 3 audiences 50-article roadmap AI visibility",
  "  thinkie2 → AI citation framework 8 platforms 45 tools visibility scoring methodology GEO",
].join("\n");

async function callAI(jd,cancelRef){
  const timeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error("超时（90s）— 请刷新重试")),90000));
  const courseList=COURSE_NAMES.slice(0,22).join(", ");
  const prompt=`Resume tailoring assistant. Analyze JD, return config JSON only.

JD:\n${jd.slice(0,1500)}

BULLET MENU:\n${BULLET_MENU}

COURSES (pick 4-6 relevant or []): ${courseList}

OUTPUT JSON ONLY:
{"contact":"personal","dukeConcentration":"decision","showCoursework":false,"coursework":[],"showWasedaDesc":true,"showTianjinDesc":true,"includeEqtyLyfe":false,"eqtyLyfeRole":"intern","eqtyLyfeBullets":[],"includeThinkie":false,"thinkieBullets":["thinkie1","thinkie2"],"deloitteMerged":false,"deloitteSABullets":["dsa1_std","dsa2","dsa3","dsa4","dsa5"],"deloitteAssocBullets":["da1_std","da2"],"necBullets":["nec1","nec2"],"skillsVariant":"standard","showHobbies":true,"communityVariant":"full","jdKeywords":["kw1","kw2","kw1 variant","kw2 variant"],"objective":"2 sentences 50 words max.","notes":"one line"}

RULES:
- deloitteSABullets: 4-5, slot-1 must be dsa1_std/dsa1_esg/dsa1_esg2
- deloitteAssocBullets: 1-2, slot-1 must be da1_std/da1_esg/da1_esg2
- necBullets: always nec1+nec2 minimum
- includeThinkie: true ONLY if JD explicitly mentions go-to-market, growth strategy, digital strategy, cross-functional operations, or BizOps; false for pure finance, accounting, analytics, or data engineering; also false if includeEqtyLyfe is true (space constraint)
- thinkieBullets: default ["thinkie1","thinkie2"]; use ["thinkie1"] only if space is tight
- dukeConcentration: decision|HSM|both|null
- skillsVariant: standard|enterprise|analytics
- jdKeywords: 12-18 terms — for each concept include MULTIPLE surface forms (e.g. "financial modeling" AND "financial model" AND "financial analysis") to maximize ATS matching recall
- objective: mirror JD role title + top 2 candidate credentials`;

  const apiKey = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("anthropic_api_key") : "";
  if (!apiKey) return Promise.reject(new Error("请先在右上角输入 Anthropic API Key 以使用AI功能（本地分析无需API Key）"));
  const fetchP=fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})})
  .then(async r=>{if(cancelRef?.current)throw new Error("已取消");if(!r.ok){const t=await r.text().catch(()=>"");throw new Error(`HTTP ${r.status}: ${t.slice(0,100)}`);}return r.json();})
  .then(d=>{if(cancelRef?.current)throw new Error("已取消");if(d.error)throw new Error(`API: ${d.error.message}`);const raw=d.content.map(c=>c.text||"").join("");return {...JSON.parse(raw.replace(/```json|```/g,"").trim()),gpa:"3.85"};});
  return Promise.race([fetchP,timeout]);
}

// ═══════════════════════════════════════════════════════════════
// §21  TAILOR TAB
// ═══════════════════════════════════════════════════════════════

// ─── Combined Library + Content Tab ─────────────────────────────
function CombinedLibraryTab(){
  const [sub,setSub]=useState("library");
  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,background:"#fafafa",flexShrink:0}}>
      {[{id:"library",label:"📋 母版库"},{id:"content",label:"📄 完整内容"}].map(t=>(
        <button key={t.id} onClick={()=>setSub(t.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${sub===t.id?T.accent:"transparent"}`,padding:"9px 18px",color:sub===t.id?T.accent:T.text3,fontSize:12.5,fontWeight:sub===t.id?700:400,cursor:"pointer",fontFamily:"inherit"}}>
          {t.label}
        </button>
      ))}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
      {sub==="library" && <LibraryTab/>}
      {sub==="content" && <ResumeContentTab/>}
    </div>
  </div>;
}

// ─── Combined Analysis Tab (Dashboard + Role Index + Skill Index) ─
function CombinedAnalysisTab(){
  const [sub,setSub]=useState("dash");
  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,background:"#fafafa",flexShrink:0}}>
      {[{id:"dash",label:"📊 Dashboard"},{id:"roles",label:"🎯 岗位索引"},{id:"skills",label:"🛠 技能索引"}].map(t=>(
        <button key={t.id} onClick={()=>setSub(t.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${sub===t.id?T.accent:"transparent"}`,padding:"9px 18px",color:sub===t.id?T.accent:T.text3,fontSize:12.5,fontWeight:sub===t.id?700:400,cursor:"pointer",fontFamily:"inherit"}}>
          {t.label}
        </button>
      ))}
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
      {sub==="dash"   && <DashboardTab cfg={null}/>}
      {sub==="roles"  && <RoleIndexTab/>}
      {sub==="skills" && <SkillIndexTab/>}
    </div>
  </div>;
}


// ── Preset categories for grouped display ────────────────────────────
const PRESET_CATEGORIES = {
  "Corporate Finance":    ["FP&A","Financial Analyst","Tech Company Finance","Startup Strategic Finance"],
  "Investment & Deals":   ["Investment Analysis","Investment Banking","Corporate Development","PE / VC"],
  "Risk & Advisory":      ["Risk Analysis","Consulting","Business Analyst"],
  "Data & Operations":    ["Data Analytics","BizOps / Operations"],
  "Specialized":          ["Healthcare Finance","ESG / Sustainability"],
};

// ── Default FP&A JD (pre-filled for demo/instant use) ────────────────
const DEFAULT_JD = `We are seeking a Financial Planning & Analysis (FP&A) Analyst to join our Finance team. The ideal candidate will support the annual operating planning (AOP), variance analysis, budgeting, and forecasting processes across business units.

Key Responsibilities:
• Partner with business teams to develop financial models, forecasts, and budgets
• Lead monthly variance analysis and provide data-driven insights to senior leadership
• Manage the annual operating planning (AOP) cycle with cross-functional coordination
• Build and maintain Power BI dashboards and reporting automation to improve efficiency
• Analyze KPIs, P&L trends, and cash flow to support strategic decision-making
• Present financial summaries and recommendations to CFO and finance executives

Qualifications:
• Bachelor's degree in Finance, Accounting, or Economics; MBA preferred
• CPA or CFA designation preferred
• 3-5 years of FP&A, financial analysis, or related experience
• Advanced Excel (financial modeling), SQL, and ERP system proficiency
• Experience with BI tools (Power BI, Tableau) and data automation
• Excellent communication skills; ability to work cross-functionally`;

function TailorTab(){
  const [jd,setJd]=useState(DEFAULT_JD);
  const [loading,setLoading]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const [cfg,setCfg]=useState(null);
  const [notes,setNotes]=useState("");
  const [err,setErr]=useState("");
  const [showKwHl,setShowKwHl]=useState(true);
  const [jdKws,setJdKws]=useState([]);
  const [matchData,setMatchData]=useState(null);
  const [localScores,setLocalScores]=useState(null);
  const [activePreset,setActivePreset]=useState("FP&A");
  const [manualOpen,setManualOpen]=useState(true);
  const [customPresets,setCustomPresets]=useState({});
  const [savePresetName,setSavePresetName]=useState("");
  const [bulletOverrides,setBulletOverrides]=useState({});
  const [editingId,setEditingId]=useState(null);
  const [editText,setEditText]=useState("");
  const [sectionOpen,setSectionOpen]=useState({match:true,report:false,interview:false,indkw:false});
  const cancelRef=useRef(false);
  const isInitRef=useRef(false);

  // Auto-load FP&A on first render
  React.useEffect(()=>{
    if(!isInitRef.current){ isInitRef.current=true; loadPreset("FP&A"); }
  },[]);

  function loadPreset(name){
    const p=customPresets[name]||PRESETS[name]; if(!p) return;
    const kws=PRESET_KEYWORDS[name]||[];
    const newCfg={...p,gpa:"3.85"};
    setCfg(newCfg); setNotes(`预设方向：${name}`); setActivePreset(name);
    setJdKws(kws); setMatchData(kws.length>0?computeMatch(newCfg,kws):null);
    setBulletOverrides({}); setErr(""); setLocalScores(null);
  }
  function cancel(){cancelRef.current=true;setLoading(false);setErr("已取消");}

  function analyzeLocal(){
    if(!jd.trim()){setErr("请先粘贴JD内容");return;}
    setErr("");
    const {scores,extractedKws}=analyzeJDLocally(jd);
    setLocalScores(scores);
    const best=scores[0];
    const bestCfg={...PRESETS[best.name],gpa:"3.85"};
    setCfg(bestCfg); setActivePreset(best.name);
    setNotes(`本地分析（即时） · 最佳匹配：${best.name} (${best.score}%)`);
    setJdKws(extractedKws); setMatchData(computeMatch(bestCfg,extractedKws));
    setBulletOverrides({});
  }

  async function analyzeAI(){
    if(!jd.trim()){setErr("请先粘贴JD内容");return;}
    cancelRef.current=false; setErr(""); setLoading(true);
    setCfg(null); setMatchData(null); setElapsed(0); setActivePreset(null); setBulletOverrides({});
    const timer=setInterval(()=>setElapsed(s=>s+1),1000);
    async function tryOnce(){ const r=await callAI(jd,cancelRef); if(cancelRef.current)return null; return r; }
    try{
      let result=await tryOnce(); if(!result)return;
      const kws=result.jdKeywords||[];
      setCfg(result); setNotes(`AI分析 · ${result.notes||""}`);
      setJdKws(kws); setMatchData(computeMatch(result,kws)); setActivePreset(null);
    }catch(e){
      if(cancelRef.current)return;
      if(e.message.includes("超时")){
        setErr("⏳ 超时，重试中…");
        try{
          const r2=await tryOnce();
          if(r2&&!cancelRef.current){
            const kws=r2.jdKeywords||[];
            setCfg(r2); setNotes(`AI分析（重试） · ${r2.notes||""}`);
            setJdKws(kws); setMatchData(computeMatch(r2,kws)); setErr("");
          }
        }catch(e2){if(!cancelRef.current)setErr("❌ "+e2.message);}
      } else setErr("❌ "+e.message);
    }
    finally{setLoading(false);clearInterval(timer);}
  }

  function toggleBullet(id,section){
    if(!cfg)return;
    const key=section==="SA"?"deloitteSABullets":section==="Assoc"?"deloitteAssocBullets":"necBullets";
    const arr=cfg[key]||[];
    const newCfg={...cfg,[key]:arr.includes(id)?arr.filter(x=>x!==id):[...arr,id]};
    setCfg(newCfg); if(jdKws.length>0)setMatchData(computeMatch(newCfg,jdKws));
  }
  function moveBullet(id,section,dir){
    if(!cfg)return;
    const key=section==="SA"?"deloitteSABullets":section==="Assoc"?"deloitteAssocBullets":"necBullets";
    const arr=[...(cfg[key]||[])]; const idx=arr.indexOf(id); if(idx===-1)return;
    const ni=dir==="up"?idx-1:idx+1; if(ni<0||ni>=arr.length)return;
    [arr[idx],arr[ni]]=[arr[ni],arr[idx]]; setCfg({...cfg,[key]:arr});
  }
  function toggleSpecial(field){
    if(!cfg)return;
    const newCfg={...cfg,[field]:!cfg[field]};
    setCfg(newCfg); if(jdKws.length>0)setMatchData(computeMatch(newCfg,jdKws));
  }
  function startEdit(id){setEditingId(id);setEditText(bulletOverrides[id]||B[id]?.text||"");}
  function saveEdit(id){
    const t=editText.trim();
    if(t&&t!==B[id]?.text)setBulletOverrides(p=>({...p,[id]:t}));
    else setBulletOverrides(p=>{const n={...p};delete n[id];return n;});
    setEditingId(null);
  }
  function resetOverride(id){setBulletOverrides(p=>{const n={...p};delete n[id];return n;});}
  function applyRewrite(id,text){if(id&&text)setBulletOverrides(p=>({...p,[id]:text}));}
  function saveAsPreset(){
    const name=savePresetName.trim(); if(!name||!cfg)return;
    setCustomPresets(p=>({...p,[name]:{...cfg}}));
    setSavePresetName(""); setNotes(`已保存为预设：${name}`);
  }
  function download(){
    if(!cfg)return;
    const el=document.getElementById("resume-print"); const html=el?el.outerHTML:"";
    const full=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Xi (Shawn) Yang Resume</title><style>body{margin:0;padding:18mm;font-family:Georgia,'Times New Roman',serif;font-size:10.5pt;color:#111;line-height:1.35}mark{background:transparent!important;color:inherit}@page{margin:15mm;size:Letter}ul{padding-left:15pt}li{margin-bottom:2pt}</style></head><body>${html}</body></html>`;
    try{const w=window.open("","_blank","width=900,height=700");if(w){w.document.write(full);w.document.close();setTimeout(()=>w.print(),600);}
    else{const a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([full],{type:"text/html"})),download:"Resume.html"});document.body.appendChild(a);a.click();document.body.removeChild(a);}}
    catch(e){alert("请允许弹窗后重试");}
  }

  const page=cfg?estimatePage(cfg):null;
  const activeKws=showKwHl&&jdKws.length>0?(matchData?.matched||[]):[];
  const allPresetNames=[...Object.keys(PRESETS),...Object.keys(customPresets)];

  const MANUAL_SECTIONS=[
    {key:"SA",   label:"Deloitte SA",   ids:["dsa1_std","dsa1_esg","dsa1_esg2","dsa_agile","dsa2","dsa2_analytics","dsa_lean","dsa3","dsa4","dsa_cfo","dsa5","dsa_aop","dsa_aop_analytics"]},
    {key:"Assoc",label:"Deloitte Assoc",ids:["da1_std","da1_esg","da1_esg2","da2"]},
    {key:"nec",  label:"NEC",           ids:["nec1","nec_erp","nec_predictive","nec_sapdash","nec2","nec_training"]},
  ];

  function ManualPanel(){
    if(!cfg)return <div style={{fontSize:11.5,color:T.text3,fontStyle:"italic"}}>请先选择预设方向</div>;
    return <div>
      <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",marginBottom:7}}>
        <input type="checkbox" checked={!!cfg.includeEqtyLyfe} onChange={()=>toggleSpecial("includeEqtyLyfe")} style={{cursor:"pointer"}}/>
        <span style={{fontSize:11.5,fontWeight:600}}>EQTY LYFE</span>
      </label>
      {cfg.includeEqtyLyfe&&["eq1","eq2"].map(id=><label key={id} style={{display:"flex",gap:6,alignItems:"center",marginLeft:18,marginBottom:3,cursor:"pointer"}}>
        <input type="checkbox" checked={cfg.eqtyLyfeBullets?.includes(id)} onChange={()=>{const a=cfg.eqtyLyfeBullets||[];setCfg({...cfg,eqtyLyfeBullets:a.includes(id)?a.filter(x=>x!==id):[...a,id]});}} style={{cursor:"pointer"}}/>
        <IdBadge id={id}/><span style={{fontSize:10,color:T.text3}}>{B[id]?.text?.slice(0,50)}…</span>
      </label>)}
      <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",marginBottom:7}}>
        <input type="checkbox" checked={!!cfg.includeThinkie} onChange={()=>toggleSpecial("includeThinkie")} style={{cursor:"pointer"}}/>
        <span style={{fontSize:11.5,fontWeight:600}}>THINKIE</span>
      </label>
      {cfg.includeThinkie&&["thinkie1","thinkie2"].map(id=><label key={id} style={{display:"flex",gap:6,alignItems:"center",marginLeft:18,marginBottom:3,cursor:"pointer"}}>
        <input type="checkbox" checked={cfg.thinkieBullets?.includes(id)} onChange={()=>{const a=cfg.thinkieBullets||[];setCfg({...cfg,thinkieBullets:a.includes(id)?a.filter(x=>x!==id):[...a,id]});}} style={{cursor:"pointer"}}/>
        <IdBadge id={id}/><span style={{fontSize:10,color:T.text3}}>{B[id]?.text?.slice(0,50)}…</span>
      </label>)}
      {MANUAL_SECTIONS.map(sec=>{
        const sel=(sec.key==="SA"?cfg.deloitteSABullets:sec.key==="Assoc"?cfg.deloitteAssocBullets:cfg.necBullets)||[];
        return <div key={sec.key} style={{marginBottom:7}}>
          <div style={{fontSize:9.5,fontWeight:700,color:T.text3,letterSpacing:.5,textTransform:"uppercase",marginBottom:3}}>{sec.label}</div>
          {sec.ids.map(id=>{
            const on=sel.includes(id); const idx=sel.indexOf(id); const isEd=editingId===id;
            return <div key={id} style={{marginBottom:3,padding:"3px 5px",background:on?"#f0fdf4":T.bg,border:`1px solid ${on?"#bbf7d0":T.border}`,borderRadius:5}}>
              <div style={{display:"flex",alignItems:"center",gap:3}}>
                <input type="checkbox" checked={on} onChange={()=>toggleBullet(id,sec.key)} style={{cursor:"pointer",flexShrink:0}}/>
                <IdBadge id={id}/>{bulletOverrides[id]&&<span style={{fontSize:9,color:"#7c3aed"}}>✏️</span>}
                <span style={{flex:1,fontSize:10,color:on?T.text:T.text3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{(bulletOverrides[id]||B[id]?.text||"").slice(0,50)}…</span>
                <div style={{display:"flex",gap:1,flexShrink:0}}>
                  {on&&<><button onClick={()=>moveBullet(id,sec.key,"up")} disabled={idx<=0} style={{background:"none",border:"none",cursor:idx>0?"pointer":"default",color:idx>0?T.text3:"#ddd",fontSize:10,padding:"0 2px"}}>↑</button>
                  <button onClick={()=>moveBullet(id,sec.key,"down")} disabled={idx>=sel.length-1} style={{background:"none",border:"none",cursor:idx<sel.length-1?"pointer":"default",color:idx<sel.length-1?T.text3:"#ddd",fontSize:10,padding:"0 2px"}}>↓</button></>}
                  <button onClick={()=>isEd?saveEdit(id):startEdit(id)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:3,cursor:"pointer",color:"#7c3aed",fontSize:9.5,padding:"0 3px"}}>{isEd?"✓":"✏"}</button>
                  {bulletOverrides[id]&&<button onClick={()=>resetOverride(id)} style={{background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:9.5}}>↩</button>}
                </div>
              </div>
              {isEd&&<textarea value={editText} onChange={e=>setEditText(e.target.value)}
                style={{width:"100%",marginTop:3,padding:"5px 7px",fontSize:11,border:"1px solid #ddd6fe",borderRadius:5,background:"#faf5ff",lineHeight:1.5,resize:"vertical",outline:"none",fontFamily:"inherit",boxSizing:"border-box",minHeight:55}}/>}
            </div>;
          })}
        </div>;
      })}
      <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",marginBottom:7,marginTop:3}}>
        <input type="checkbox" checked={!!cfg.deloitteMerged} onChange={()=>toggleSpecial("deloitteMerged")} style={{cursor:"pointer"}}/>
        <span style={{fontSize:11,color:T.text}}>合并 Deloitte 职级（2018–2024）</span>
      </label>
      <div style={{display:"flex",gap:5}}>
        <input value={savePresetName} onChange={e=>setSavePresetName(e.target.value)} placeholder="保存为新预设…"
          style={{flex:1,background:"#fafafa",border:`1px solid ${T.border}`,borderRadius:5,padding:"4px 8px",fontSize:11,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={saveAsPreset} disabled={!savePresetName.trim()} style={{background:T.accentBg,border:"1px solid #bfdbfe",borderRadius:5,padding:"4px 9px",color:T.accent,fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>★</button>
      </div>
    </div>;
  }

  function RSection({id,title,badge,children}){
    const open=sectionOpen[id];
    return <div style={{borderBottom:`1px solid ${T.border}`}}>
      <button onClick={()=>setSectionOpen(s=>({...s,[id]:!s[id]}))}
        style={{width:"100%",background:open?"#f8f9ff":T.surface,border:"none",padding:"9px 14px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontFamily:"inherit",textAlign:"left",flexShrink:0}}>
        <span style={{fontSize:12,fontWeight:700,color:open?T.accent:T.text}}>{title}</span>
        {badge&&<span style={{background:T.accentBg,color:T.accent,border:"1px solid #bfdbfe",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:700}}>{badge}</span>}
        <span style={{marginLeft:"auto",fontSize:11,color:T.text3}}>{open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{borderTop:`1px solid ${T.border}`}}>{children}</div>}
    </div>;
  }

  // ── 3-COLUMN LAYOUT ─────────────────────────────────────────────────
  return <div style={{display:"flex",height:"100%",overflow:"hidden"}}>

    {/* ── LEFT (270px) — presets by category + JD + controls ── */}
    <div style={{width:310,flexShrink:0,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{flex:1,overflowY:"auto",padding:"10px 12px",display:"flex",flexDirection:"column",gap:8}}>
        {/* Presets grouped by category */}
        <div>
          <div style={{fontSize:9,fontWeight:700,color:T.text3,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7}}>预设方向</div>
          {Object.entries(PRESET_CATEGORIES).map(([cat,names])=>(
            <div key={cat} style={{marginBottom:8}}>
              <div style={{fontSize:9.5,fontWeight:600,color:"#6b7280",marginBottom:4,paddingLeft:2}}>{cat}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {names.filter(n=>PRESETS[n]).map(name=>(
                  <button key={name} onClick={()=>loadPreset(name)} style={{background:activePreset===name?T.accentBg:T.surface,border:`1px solid ${activePreset===name?"#bfdbfe":T.border}`,borderRadius:7,padding:"3px 9px",color:activePreset===name?T.accent:T.text2,fontSize:10.5,cursor:"pointer",fontFamily:"inherit",fontWeight:activePreset===name?700:400,whiteSpace:"nowrap"}}>
                    {name}
                  </button>
                ))}
                {/* Custom presets */}
                {Object.keys(customPresets).map(name=>(
                  <button key={name} onClick={()=>loadPreset(name)} style={{background:activePreset===name?T.accentBg:"#faf5ff",border:`1px solid ${activePreset===name?"#bfdbfe":"#ddd6fe"}`,borderRadius:7,padding:"3px 9px",color:activePreset===name?T.accent:"#6d28d9",fontSize:10.5,cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>
                    ★ {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>


        <div style={{height:1,background:T.border}}/>

        {/* JD input */}
        <div style={{fontSize:9,fontWeight:700,color:T.text3,letterSpacing:1.5,textTransform:"uppercase"}}>粘贴 JD（可编辑）</div>
        <textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste JD here..."
          style={{height:130,background:"#fafafa",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",color:T.text,fontSize:10.5,resize:"vertical",lineHeight:1.5,outline:"none",fontFamily:"inherit"}}/>
        <div style={{display:"flex",gap:6}}>
          <button onClick={analyzeLocal} style={{flex:1,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:7,padding:"8px 0",fontWeight:700,fontSize:11.5,color:"#166534",cursor:"pointer",fontFamily:"inherit"}}>⚡ 本地（即时）</button>
          <button onClick={analyzeAI} disabled={loading} style={{flex:1,background:loading?"#e5e7eb":`linear-gradient(135deg,${T.accent},#1d4ed8)`,color:loading?T.text3:"#fff",border:"none",borderRadius:7,padding:"8px 0",fontWeight:700,fontSize:11.5,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit"}}>
            {loading?`AI ${elapsed}s…`:"✨ AI精调"}
          </button>
          {loading&&<button onClick={cancel} style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:7,padding:"8px 9px",color:"#dc2626",cursor:"pointer",fontSize:12,fontWeight:600}}>✕</button>}
        </div>
        {loading&&<div style={{height:3,background:"#f3f4f6",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:T.accent,width:`${Math.min(elapsed/90*100,95)}%`,transition:"width .9s ease",borderRadius:2}}/></div>}

        {/* Local scores */}
        {localScores&&<div>
          <div style={{fontSize:9,fontWeight:700,color:T.text3,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>匹配度排名</div>
          {localScores.slice(0,5).map((s,i)=>(
            <div key={s.name} onClick={()=>loadPreset(s.name)} style={{display:"flex",alignItems:"center",gap:7,padding:"4px 7px",background:i===0?"#eff6ff":"#fafafa",border:`1px solid ${i===0?"#bfdbfe":T.border}`,borderRadius:6,cursor:"pointer",marginBottom:3}}>
              <span style={{fontSize:10,fontWeight:700,color:T.text3,width:13}}>{i+1}</span>
              <span style={{fontSize:11,fontWeight:i===0?700:400,color:i===0?T.accent:T.text,flex:1}}>{s.name}</span>
              <div style={{width:60,height:4,background:"#e5e7eb",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",background:s.score>=60?"#16a34a":s.score>=40?"#d97706":"#9ca3af",width:`${s.score}%`,borderRadius:2}}/>
              </div>
              <span style={{fontSize:10.5,fontWeight:700,color:s.score>=60?"#16a34a":s.score>=40?"#d97706":"#9ca3af",width:28,textAlign:"right"}}>{s.score}%</span>
            </div>
          ))}
        </div>}

        {/* Status */}
        {err&&<div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:7,padding:"6px 10px",fontSize:11,color:"#dc2626"}}>{err}</div>}
        {notes&&!loading&&<div style={{background:T.accentBg,border:"1px solid #bfdbfe",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontSize:8,fontWeight:700,color:T.accent,letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>说明</div>
          <div style={{fontSize:10.5,color:"#1e40af",lineHeight:1.5}}>{notes}</div>
        </div>}

        <div style={{height:1,background:T.border}}/>

        {/* Manual edit — default open */}
        <button onClick={()=>setManualOpen(o=>!o)} style={{background:manualOpen?"#f5f3ff":"#fafafa",border:`1px solid ${manualOpen?"#ddd6fe":T.border}`,borderRadius:7,padding:"6px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",fontFamily:"inherit"}}>
          <span style={{fontSize:11,fontWeight:700,color:manualOpen?"#6d28d9":T.text2}}>🎛 手动调整 Bullets</span>
          <span style={{fontSize:10,color:T.text3}}>{Object.keys(bulletOverrides).length>0?`✏️${Object.keys(bulletOverrides).length} · `:""}{manualOpen?"▲":"▼"}</span>
        </button>
        {manualOpen&&<div style={{border:"1px solid #ddd6fe",borderRadius:8,padding:"10px 11px",background:"#faf5ff",maxHeight:400,overflowY:"auto"}}><ManualPanel/></div>}

      </div>
    </div>

    {/* ── MIDDLE (flex ~400px) — Resume preview ── */}
    <div style={{flex:1,minWidth:320,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Toolbar */}
      <div style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",borderBottom:`1px solid ${T.border}`,background:"#fafafa",flexShrink:0,flexWrap:"wrap"}}>
        <span style={{fontSize:10.5,fontWeight:700,color:T.text3}}>📄 预览</span>
        {cfg&&<>
          <button onClick={()=>setShowKwHl(h=>!h)} style={{background:showKwHl?"#fefce8":"none",border:`1px solid ${showKwHl?"#fde047":T.border}`,borderRadius:5,padding:"3px 8px",color:showKwHl?"#713f12":T.text3,fontSize:10.5,cursor:"pointer",fontFamily:"inherit",fontWeight:showKwHl?700:400}}>🔍 高亮 {showKwHl?"ON":"OFF"}</button>
          {Object.keys(bulletOverrides).length>0&&<span style={{fontSize:10,color:"#7c3aed",background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:4,padding:"2px 6px"}}>✏️{Object.keys(bulletOverrides).length}</span>}
          <button onClick={download} style={{marginLeft:"auto",background:T.accentBg,border:"1px solid #bfdbfe",borderRadius:5,padding:"3px 9px",color:T.accent,fontSize:10.5,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>⬇ 下载</button>
          {page&&<span style={{fontSize:10.5,fontWeight:700,color:page.ok?"#166534":"#92400e",background:page.ok?"#f0fdf4":"#fffbeb",border:`1px solid ${page.ok?"#bbf7d0":"#fde68a"}`,borderRadius:5,padding:"3px 8px",flexShrink:0}}>{page.ok?"✅ 1页":`⚠️ +${page.overflow}行`}</span>}
        </>}
      </div>
      {/* Keyword bar */}
      {cfg&&showKwHl&&jdKws.length>0&&<div style={{padding:"5px 10px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {jdKws.map(kw=>{const ok=matchData?.matched.includes(kw);return <span key={kw} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#bbf7d0":"#fca5a5"}`,borderRadius:20,padding:"1px 7px",fontSize:9,color:ok?"#166534":"#dc2626"}}>{ok?"✓":"✗"} {kw}</span>;})}
        </div>
      </div>}
      <div style={{flex:1,overflowY:"auto",padding:"12px",background:"#f8f9fc",display:"flex",justifyContent:"center"}}>
        {loading&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"80%",gap:10}}>
          <div style={{width:32,height:32,border:`3px solid ${T.border}`,borderTop:`3px solid ${T.accent}`,borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
          <div style={{fontSize:11.5,color:T.text3}}>{elapsed<=10?"AI分析JD中…":elapsed<=30?"选择bullets…":"生成Objective…"}</div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>}
        {!loading&&!cfg&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"80%",gap:8}}>
          <div style={{fontSize:40,opacity:.15}}>📄</div>
          <div style={{fontSize:12,color:T.text3,textAlign:"center"}}>选择预设方向或粘贴JD生成</div>
        </div>}
        {!loading&&cfg&&<div style={{width:"100%",maxWidth:730}}>
          <div style={{boxShadow:"0 4px 24px rgba(0,0,0,.12)",borderRadius:3}}>
            <ResumeDoc cfg={cfg} kws={activeKws} showDiff={false} overrides={bulletOverrides}/>
          </div>
        </div>}
      </div>
    </div>

    {/* ── RIGHT (360px) — Analysis sections stacked ── */}
    <div style={{flex:"0 0 360px",overflowY:"auto",borderLeft:`1px solid ${T.border}`}}>
      {!cfg&&<EmptyState msg="请先选择预设方向或分析JD"/>}
      {cfg&&<>
        <RSection id="match" title="🎯 关键词匹配" badge={matchData?`${matchData.score}%`:undefined}>
          {matchData?<MatchTab cfg={cfg} jdKeywords={jdKws} matched={matchData.matched} missing={matchData.missing} score={matchData.score} onApply={applyRewrite}/>
          :<div style={{padding:"12px 16px",fontSize:12,color:T.text3}}>暂无关键词数据（预设已内置关键词，AI生成后显示JD提取结果）</div>}
        </RSection>
        <RSection id="report" title="📋 对比报告"><DiffReportTab cfg={cfg}/></RSection>
        <RSection id="interview" title="💬 面试准备"><InterviewTab cfg={cfg}/></RSection>
        <RSection id="indkw" title="📚 行业关键词"><IndustryKwTab cfg={cfg}/></RSection>
      </>}
    </div>
  </div>;
}


function EmptyState({msg}){
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60%",gap:8,padding:20}}>
    <div style={{fontSize:36,opacity:.2}}>📋</div>
    <div style={{fontSize:12.5,color:T.text3,textAlign:"center",maxWidth:240,lineHeight:1.6}}>{msg}</div>
  </div>;
}


// ═══════════════════════════════════════════════════════════════
// CAREER PROFILE TAB — 职业规划档案（来自"大脑超载"对话分析）
// ═══════════════════════════════════════════════════════════════
function CareerProfileTab(){
  const [section,setSection]=useState("cognitive");
  const TABS=[
    {id:"cognitive", label:"🧠 认知配置"},
    {id:"directions",label:"🎯 方向评估"},
    {id:"coaching",  label:"📋 Coaching计划"},
  ];
  function Block({title,color,children}){return <div style={{background:T.surface,border:`1px solid ${T.border}`,borderLeft:`4px solid ${color}`,borderRadius:10,padding:"14px 18px",marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}><div style={{fontSize:13,fontWeight:700,color,marginBottom:10}}>{title}</div>{children}</div>;}
  function Row({label,value,note}){return <div style={{display:"flex",gap:10,marginBottom:7,alignItems:"flex-start"}}><span style={{fontSize:11,color:T.text3,fontWeight:600,width:100,flexShrink:0,paddingTop:1}}>{label}</span><div style={{flex:1}}><span style={{fontSize:13,color:T.text}}>{value}</span>{note&&<div style={{fontSize:10.5,color:T.text3,marginTop:2}}>{note}</div>}</div></div>;}
  function Tag({text,color,bg}){return <span style={{background:bg,color,border:`1px solid ${color}33`,borderRadius:20,padding:"3px 11px",fontSize:11.5,fontWeight:600,marginRight:6,marginBottom:4,display:"inline-block"}}>{text}</span>;}

  const MATRIX=[
    {dir:"FP&A / Corporate Finance",  fit:5, sponsorship:4, growth:5, label:"★ 首选",   color:"#16a34a", note:"与审计背景直接延伸；CPA+CFA组合稀缺；三语在日企FP&A无可替代"},
    {dir:"Investment Analysis",        fit:4, sponsorship:3, growth:4, label:"★ 首选",   color:"#16a34a", note:"dc1/dc2 Duke Capital经验直接支撑；$2M deployed capital是强力背书"},
    {dir:"Transaction Advisory",       fit:5, sponsorship:4, growth:4, label:"★ 首选",   color:"#16a34a", note:"A&M/FTI/Kroll核心工作是DD+valuation+forensic；dsa4 $3.6M fraud + da1 $15M DD直接命中；CPA在此赛道比MBA更值钱；sponsorship比MBB友好"},
    {dir:"Risk Analysis / Audit",      fit:5, sponsorship:4, growth:3, label:"强相关",   color:"#2563eb", note:"Deloitte背景天然fit；dsa4 $3.6M fraud detection是标志性案例"},
    {dir:"Financial Data Engineering", fit:3, sponsorship:4, growth:5, label:"桥梁路径", color:"#7c3aed", note:"Python+SQL提升后可进入；STEM OPT延期友好；不依赖社交技能"},
    {dir:"Management Consulting",      fit:3, sponsorship:2, growth:4, label:"延伸目标", color:"#d97706", note:"ZS Associates对口HSM+pharma analytics；Econ Consulting（AG/NERA/CRA）偏litigation/forensic，MA in Econ加分但工作性质偏学术；30个case已打底，有面试邀请再专项准备"},
    {dir:"Investment Banking (IBD)",   fit:2, sponsorship:1, growth:3, label:"难度大",   color:"#9ca3af", note:"ATS过滤极严；需校友网络；时间窗口有限"},
    {dir:"Tech Company Finance",       fit:4, sponsorship:4, growth:4, label:"强相关",   color:"#2563eb", note:"enterprise skills match；SAP/ERP经验在SaaS公司稀缺"},
    {dir:"PE / VC",                    fit:3, sponsorship:2, growth:4, label:"可尝试",   color:"#7c3aed", note:"Duke Capital经历是入场券；数量少竞争激烈"},
    {dir:"BizOps / Strategy",          fit:4, sponsorship:4, growth:4, label:"可尝试",   color:"#7c3aed", note:"Lean Six Sigma + BPR直接支撑；适合不想做纯finance的路径"},
    {dir:"ESG / Sustainability",       fit:3, sponsorship:3, growth:5, label:"可尝试",   color:"#059669", note:"ESG variants已准备；HSM concentration加分；未来增长赛道"},
  ];

  function ScoreDots({n}){return <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<=n?"#2563eb":"#e5e7eb"}}/>)}</div>;}

  return <div style={{maxWidth:920}}>
    {/* Profile header */}
    <div style={{background:"linear-gradient(135deg,#1e40af,#7c3aed)",borderRadius:12,padding:"20px 24px",marginBottom:20,color:"#fff"}}>
      <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>Xi (Shawn) Yang — 职业规划档案</div>
      <div style={{fontSize:12,opacity:.85,lineHeight:1.7}}>
        基于认知配置分析 + 经历矩阵评估 · 面向职业顾问（可直接传阅）<br/>
        CPA (WA) · CFA III · Duke MBA · Deloitte 7yr · NEC 3yr · EN/ZH/JA · STEM OPT
      </div>
    </div>

    {/* Sub-tabs */}
    <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,marginBottom:20}}>
      {TABS.map(t=><button key={t.id} onClick={()=>setSection(t.id)} style={{background:"none",border:"none",borderBottom:`3px solid ${section===t.id?T.accent:"transparent"}`,padding:"8px 18px",color:section===t.id?T.accent:T.text3,fontSize:13,fontWeight:section===t.id?700:400,cursor:"pointer",fontFamily:"inherit"}}>{t.label}</button>)}
    </div>

    {/* ─ COGNITIVE SECTION ─ */}
    {section==="cognitive"&&<div>
      <Block title="🖥 认知硬件配置（Computer Architecture Analogy）" color="#2563eb">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          {[
            {hw:"CPU / 执行力", rating:4, note:"单线程处理能力强；高并发（社交场合）时会降频"},
            {hw:"Cache / 工作记忆", rating:2, note:"⚠️ 容量偏小、刷新偏慢；即时反应慢的核心原因", alert:true},
            {hw:"RAM / 短期记忆", rating:4, note:"稳定；任务内可以保持大量上下文"},
            {hw:"HDD / 长期记忆", rating:5, note:"✅ 容量大；知识积累深；考试类表现强"},
          ].map(({hw,rating,note,alert})=><div key={hw} style={{background:alert?"#fff7ed":"#f8faff",border:`1px solid ${alert?"#fed7aa":T.border}`,borderRadius:8,padding:"10px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:alert?"#92400e":T.text,marginBottom:4}}>{hw}</div>
            <ScoreDots n={rating}/>
            <div style={{fontSize:11,color:T.text3,marginTop:5,lineHeight:1.5}}>{note}</div>
          </div>)}
        </div>
        <div style={{background:"#f0f0ff",border:"1px solid #c7d2fe",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#3730a3",lineHeight:1.7}}>
          <strong>核心配置结论：</strong> 大容量硬盘 + 稳定RAM + Cache偏小 → <strong>单线程强，多线程一般</strong><br/>
          深度分析、书面表达、独立工作 = 优势场景 · 即兴社交、多任务并发 = 挑战场景
        </div>
      </Block>
      <Block title="📡 沟通特征观察" color="#7c3aed">
        <Row label="优势模式" value="书面 > 口头 · 有准备 > 即兴" note="书面表达质量明显高于口头；prepared context下表现优秀"/>
        <Row label="挑战模式" value="大型networking · 无结构闲聊 · 实时多任务" note="Cache同时处理：听+判断情绪+组织语言 = 容易卡顿"/>
        <Row label="语言习惯" value="倾向使用模糊表达（I guess / 也许 / 我觉得可能）" note="⚠️ 在决策性节点会降低说服力；可通过脚本化训练改善"/>
        <Row label="结构化后" value="表达质量显著提升" note="使用STAR框架 + 提前准备关键句 = 绕过Cache瓶颈的有效路径"/>
        <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#92400e",marginTop:10}}>
          <strong>建议：</strong> 工作记忆容量偏小是真实的神经认知特征，非动力问题。能降低实时认知负荷的Coaching策略（脚本化回答、书面优先触达、结构化格式）比泛化社交技能训练更有效。候选人分析深度是真实优势；目标是创造让优势可见的场景。
        </div>
      </Block>
    </div>}

    {/* ─ DIRECTIONS SECTION ─ */}
    {section==="directions"&&<div>
      <div style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:8,padding:"8px 14px",fontSize:11.5,color:T.text3,marginBottom:14}}>
        评估维度：<strong>Profile Fit</strong>（经历/资质匹配度）· <strong>Sponsorship友好度</strong>（H-1B支持程度）· <strong>成长潜力</strong>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#f3f4f6",borderBottom:`2px solid ${T.border}`}}>
            <th style={{padding:"8px 12px",textAlign:"left",fontWeight:700,color:T.text3,fontSize:10.5,letterSpacing:.5,textTransform:"uppercase"}}>方向</th>
            <th style={{padding:"8px 12px",textAlign:"center",fontWeight:700,color:T.text3,fontSize:10.5,letterSpacing:.5,textTransform:"uppercase",width:90}}>Profile Fit</th>
            <th style={{padding:"8px 12px",textAlign:"center",fontWeight:700,color:T.text3,fontSize:10.5,letterSpacing:.5,textTransform:"uppercase",width:90}}>Sponsorship</th>
            <th style={{padding:"8px 12px",textAlign:"center",fontWeight:700,color:T.text3,fontSize:10.5,letterSpacing:.5,textTransform:"uppercase",width:90}}>成长潜力</th>
            <th style={{padding:"8px 12px",textAlign:"left",fontWeight:700,color:T.text3,fontSize:10.5,letterSpacing:.5,textTransform:"uppercase"}}>判断 & 备注</th>
          </tr></thead>
          <tbody>{MATRIX.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${T.border}`,background:i%2===0?"#fff":"#fafafa"}}>
            <td style={{padding:"9px 12px",fontWeight:600,color:T.text}}>{r.dir}</td>
            <td style={{padding:"9px 12px",textAlign:"center"}}><ScoreDots n={r.fit}/></td>
            <td style={{padding:"9px 12px",textAlign:"center"}}><ScoreDots n={r.sponsorship}/></td>
            <td style={{padding:"9px 12px",textAlign:"center"}}><ScoreDots n={r.growth}/></td>
            <td style={{padding:"9px 12px"}}>
              <span style={{background:r.color+"15",color:r.color,border:`1px solid ${r.color}44`,borderRadius:20,padding:"2px 9px",fontSize:10.5,fontWeight:700,marginRight:8,whiteSpace:"nowrap"}}>{r.label}</span>
              <span style={{fontSize:11,color:T.text3,lineHeight:1.5}}>{r.note}</span>
            </td>
          </tr>)}</tbody>
        </table>
      </div>
      <div style={{marginTop:14,display:"flex",gap:12,flexWrap:"wrap"}}>
        {[
          {label:"★ 首选（现在优先投）",    color:"#16a34a", bg:"#f0fdf4"},
          {label:"强相关（同步投递）",        color:"#2563eb", bg:"#eff6ff"},
          {label:"桥梁路径（技能提升后）",    color:"#7c3aed", bg:"#f5f3ff"},
          {label:"延伸目标（时间允许再投）",  color:"#d97706", bg:"#fffbeb"},
          {label:"难度大（不建议主力资源）",  color:"#9ca3af", bg:"#f9fafb"},
        ].map(({label,color,bg})=><div key={label} style={{background:bg,border:`1px solid ${color}44`,borderRadius:8,padding:"6px 12px",fontSize:11.5,color,fontWeight:600}}>{label}</div>)}
      </div>

      {/* Target company lists */}
      <div style={{marginTop:20}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>🏢 目标公司清单（按方向）</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {dir:"FP&A / Corporate Finance ★",color:"#16a34a",bg:"#f0fdf4",
             companies:["Applied Materials","Lenovo","Tanium","Fujifilm Biotechnologies","NEC America","Hitachi America","Mitsubishi UFJ","DTCC","3M","Honeywell","Abbott","Johnson & Johnson","Emerson","Caterpillar","Thermo Fisher"],
             note:"非科技类大型企业 + 日企关联公司；CPA+审计背景在此类FP&A岗最直接匹配"},
            {dir:"Transaction Advisory ★",color:"#16a34a",bg:"#f0fdf4",
             companies:["Alvarez & Marsal","FTI Consulting","Kroll","Duff & Phelps","Stout","Ankura","Houlihan Lokey (Advisory)","Lazard (Restructuring)","Moelis","PJT Partners","Lincoln International"],
             note:"Financial DD / forensic / restructuring；dsa4 fraud + da1 DD直接命中；CPA比MBA更值钱；sponsorship比MBB友好很多"},
            {dir:"Investment Analysis ★",color:"#16a34a",bg:"#f0fdf4",
             companies:["BlackRock","Vanguard","State Street","PIMCO","Fidelity","T. Rowe Price","JPMorgan Asset Mgmt","Goldman Sachs AM","Nuveen","Baird","Raymond James","Morningstar"],
             note:"资产管理优先于投行；CFA III + 审计背景在risk-adjusted分析岗有竞争力"},
            {dir:"Risk Analysis",color:"#2563eb",bg:"#eff6ff",
             companies:["Deloitte Risk Advisory","KPMG Advisory","EY Consulting","PwC Risk","Morgan Stanley","Wells Fargo","Bank of America","Barclays","MUFG","Mizuho","Sumitomo Mitsui"],
             note:"四大风险咨询是最自然的路径延伸；日系银行因语言优势竞争力极高"},
            {dir:"Tech Company Finance ★",color:"#16a34a",bg:"#f0fdf4",
             companies:["Amazon","Microsoft","Meta","Intuit","Cisco","Salesforce","ServiceNow","Nvidia","AMD","Qualcomm","Workday","Snowflake","Databricks","Palantir","Stripe","Block (Square)"],
             note:"FAANG + SaaS公司finance/FP&A team；ERP/SAP经验 + analytics skills在此类岗位有差异化"},
            {dir:"Management / Econ Consulting",color:"#d97706",bg:"#fffbeb",
             companies:["ZS Associates","Analysis Group","Cornerstone Research","NERA Economic Consulting","CRA International","Putnam Associates","Precision Medicine Group","Navigant (now Guidehouse)"],
             note:"ZS对口HSM+pharma；Econ Consulting偏litigation，MA in Econ加分；有面试邀请再专项准备case"},
            {dir:"PE / VC",color:"#7c3aed",bg:"#f5f3ff",
             companies:["Duke Capital Partners（现有）","Andreessen Horowitz","General Catalyst","Insight Partners","Vista Equity","Thoma Bravo","Battery Ventures","SoftBank Vision Fund"],
             note:"Duke Capital经历是敲门砖；专注科技/SaaS方向的PE更契合背景"},
            {dir:"日企 / 亚太连接（三语优势）",color:"#059669",bg:"#f0fdf4",
             companies:["Sony America","Panasonic North America","Toyota Financial Services","Honda Finance","Mazda","Kyocera","Ricoh","Canon USA","Fujitsu","NTT Data","Rakuten"],
             note:"这是最被忽视的低竞争高胜率赛道；日语+CPA+审计几乎无竞争对手"},
          ].map(co=><div key={co.dir} style={{background:co.bg,border:`1px solid ${co.color}33`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:co.color,marginBottom:6}}>{co.dir}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>
              {co.companies.map(c=><span key={c} style={{background:"#fff",border:`1px solid ${co.color}44`,borderRadius:20,padding:"2px 9px",fontSize:10.5,color:T.text}}>{c}</span>)}
            </div>
            <div style={{fontSize:10.5,color:T.text3,lineHeight:1.5}}>{co.note}</div>
          </div>)}
        </div>
      </div>
    </div>}

    {/* ─ COACHING SECTION ─ */}
    {section==="coaching"&&<div>
      <Block title="📋 Coaching 行动计划（5项）" color="#059669">
        {[
          {n:"1",title:"沟通结构化 — 脚本化高频场景",priority:"立即",effort:"低",
           desc:"针对最常见的5个对话节点（自我介绍、Why this role、最大挑战、优势、closing question）预写固定脚本，背熟到自动化程度。目标：让Cache不需要实时生成，只需检索。"},
          {n:"2",title:"语言优化 — 消除模糊表达",priority:"立即",effort:"低",
           desc:'用直接陈述替换"I guess""也许""我觉得可能"等模糊表达。每次面试前录音自检，标出模糊词。这是短期内影响面试官感知最大的单一变量。'},
          {n:"3",title:"书面优先 — 最大化异步沟通比例",priority:"立即",effort:"低",
           desc:"LinkedIn outreach、邮件followup、感谢信 = 候选人最强的展示窗口。同等effort下，书面沟通的质量远高于口头；应优先建立书面连接再转向电话/面试。"},
          {n:"4",title:"Python深度提升 — Financial Data Engineering方向备选",priority:"3个月",effort:"中",
           desc:"现有Python水平可用但尚不具备差异化。在金融数据处理方向（pandas、数据pipeline、自动化报告）的针对性提升，将显著强化Financial Data Engineer作为备选赛道的竞争力。OPT期间可同步完成。"},
          {n:"5",title:"案例面试准备 — 咨询方向专项",priority:"视面试进展",effort:"高",
           desc:"如果Consulting赛道出现实质进展，需要专项case prep（非MBB标准，中小所/咨询部门的案例相对灵活）。在没有实质面试邀请前，case prep的边际ROI较低，不建议主力资源投入。"},
        ].map(item=><div key={item.n} style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:8,padding:"12px 16px",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{background:T.accent,color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{item.n}</span>
            <span style={{fontSize:13,fontWeight:700,color:T.text,flex:1}}>{item.title}</span>
            <span style={{background:item.priority==="立即"?"#fef2f2":"#fffbeb",color:item.priority==="立即"?"#dc2626":"#92400e",border:`1px solid ${item.priority==="立即"?"#fca5a5":"#fde68a"}`,borderRadius:20,padding:"2px 9px",fontSize:10.5,fontWeight:600,flexShrink:0}}>{item.priority}</span>
            <span style={{background:"#f3f4f6",color:T.text3,borderRadius:20,padding:"2px 9px",fontSize:10.5,flexShrink:0}}>effort: {item.effort}</span>
          </div>
          <div style={{fontSize:12,color:T.text2,lineHeight:1.65,paddingLeft:32}}>{item.desc}</div>
        </div>)}
      </Block>
      <Block title="🔑 三语优势 — 未被充分利用的差异化" color="#7c3aed">
        <div style={{fontSize:12,color:T.text2,lineHeight:1.75}}>
          <strong>现状：</strong>简历在广投时未突出三语（中/日/英）优势，ATS无法识别，相当于免费放弃了一个强力过滤器。<br/>
          <strong>行动：</strong>针对有日企背景的雇主（FUJIFILM、日立、三菱、NEC美国、大型四大日本业务组）优先匹配；LinkedIn标注 "Fluent in Japanese & Chinese"; 主动在outreach中提及语言能力（特别是日语）。<br/>
          <strong>预期效果：</strong>在这个细分市场里，具备日语+CPA+审计经验的MBA几乎没有竞争对手。
        </div>
      </Block>
      <div style={{background:"#f8faff",border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px",fontSize:11.5,color:T.text2,lineHeight:1.7}}>
        <div style={{fontWeight:700,color:T.text,marginBottom:6}}>📌 总体建议</div>
        候选人的profile在数量上是充足的（CPA+CFA+MBA+10yr国际经验），真正的障碍是：<br/>
        ① Sponsorship在ATS层面的过滤（结构性问题，需要针对sponsorship-friendly雇主的定向策略）<br/>
        ② 广投策略未充分利用日语/亚太背景这一稀缺竞争优势<br/>
        ③ 实时沟通中的Cache瓶颈（可通过脚本化coaching有效改善）<br/><br/>
        推荐优先级：<strong>FP&A/Corporate Finance（首选）→ Transaction Advisory（首选并行）→ Investment Analysis（并行）→ Risk Analysis（并行）→ Financial Data Engineering（技能提升后）→ Consulting（机会性）</strong>
      </div>
    </div>}
  </div>;
}


// ═══════════════════════════════════════════════════════════════
// §22  MAIN APP
// ═══════════════════════════════════════════════════════════════════════
const MAIN_TABS = [
  {id:"tailor",   label:"✨ 简历Tailor"},
  {id:"library",  label:"📚 简历母版库"},
  {id:"analysis", label:"📊 技能分析"},
  {id:"profile",  label:"👤 职业分析档案"},
];


// ── API Key input (Vite/Vercel: key stored in sessionStorage only) ──
function ApiKeyInput(){
  const [key,setKey]=React.useState(()=>typeof sessionStorage!=="undefined"?(sessionStorage.getItem("anthropic_api_key")||""):"");
  const [show,setShow]=React.useState(false);
  const [saved,setSaved]=React.useState(false);
  function save(){if(typeof sessionStorage!=="undefined")sessionStorage.setItem("anthropic_api_key",key);setSaved(true);setTimeout(()=>setSaved(false),2000);setShow(false);}
  const hasKey=key.startsWith("sk-ant");
  return <div style={{position:"relative"}}>
    <button onClick={()=>setShow(s=>!s)} style={{background:hasKey?"#f0fdf4":"#fffbeb",border:`1px solid ${hasKey?"#bbf7d0":"#fde68a"}`,borderRadius:6,padding:"3px 9px",fontSize:10.5,cursor:"pointer",fontFamily:"inherit",color:hasKey?"#166534":"#92400e",fontWeight:600}}>
      {hasKey?"✓ API Key已设置":"⚙ 设置API Key"}
    </button>
    {show&&<div style={{position:"absolute",right:0,top:"110%",background:"#fff",border:"1px solid #e3e5ef",borderRadius:10,padding:"14px 16px",width:300,boxShadow:"0 8px 32px rgba(0,0,0,.12)",zIndex:999}}>
      <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:6}}>Anthropic API Key</div>
      <div style={{fontSize:11,color:"#6b7280",marginBottom:10,lineHeight:1.5}}>
        用于「✨ AI精调」功能。Key仅存浏览器sessionStorage，关闭页面自动清除。<br/>
        <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{color:"#2563eb"}}>获取API Key →</a>
      </div>
      <input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="sk-ant-api03-..."
        style={{width:"100%",padding:"7px 10px",border:"1px solid #e3e5ef",borderRadius:6,fontSize:12,outline:"none",fontFamily:"monospace",marginBottom:8,boxSizing:"border-box"}}/>
      <div style={{display:"flex",gap:6}}>
        <button onClick={save} style={{flex:1,background:"#2563eb",border:"none",borderRadius:6,padding:"7px",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600}}>{saved?"✓ 已保存":"保存"}</button>
        <button onClick={()=>{setKey("");if(typeof sessionStorage!=="undefined")sessionStorage.removeItem("anthropic_api_key");setShow(false);}} style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:6,padding:"7px 10px",color:"#dc2626",fontSize:12,cursor:"pointer"}}>清除</button>
      </div>
      <div style={{fontSize:10,color:"#9ca3af",marginTop:6}}>⚡ 本地分析功能无需API Key</div>
    </div>}
  </div>;
}

export default function MasterLibrary(){
  const [tab,setTab]=useState("tailor");
  const isFullH = tab==="tailor";
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:T.bg,fontFamily:"Inter,'DM Sans',system-ui,sans-serif",color:T.text,overflow:"hidden"}}>
      {/* Top nav */}
      <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"0 24px",flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <div style={{display:"flex",alignItems:"center"}}>
          <div style={{padding:"10px 0",marginRight:20,flexShrink:0}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:T.accent,textTransform:"uppercase"}}>Resume Suite v5</div>
            <div style={{fontSize:14,fontWeight:800,color:T.text,lineHeight:1.2}}>Xi (Shawn) Yang</div>
          </div>
          <div style={{display:"flex",flex:1}}>
            {MAIN_TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:`3px solid ${tab===t.id?T.accent:"transparent"}`,padding:"0 20px",height:48,color:tab===t.id?T.accent:T.text3,fontSize:13,fontWeight:tab===t.id?700:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",transition:"color .15s"}}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{fontSize:10.5,color:T.text3,flexShrink:0,marginLeft:12,paddingLeft:12,borderLeft:`1px solid ${T.border}`,display:"flex",gap:10,alignItems:"center"}}>
            <span><span style={{color:T.accent,fontWeight:700}}>{ALL_IDS.length}</span> bullets</span>
            <span><span style={{color:"#d97706",fontWeight:700}}>{newCount}</span> NEW</span>
            <ApiKeyInput/>
            <span><span style={{color:"#be185d",fontWeight:700}}>{COURSE_NAMES.length}</span> 课程</span>
            <span><span style={{color:"#059669",fontWeight:700}}>{Object.keys(PRESETS).length}</span> 预设</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div style={{flex:1,overflow:isFullH?"hidden":"auto",display:"flex",flexDirection:"column"}}>
        {tab==="library"  && <CombinedLibraryTab/>}
        {tab==="analysis" && <CombinedAnalysisTab/>}
        {tab==="tailor"   && <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}><TailorTab/></div>}
        {tab==="profile"  && <div style={{padding:"20px 24px",flex:1,overflowY:"auto"}}><CareerProfileTab/></div>}
      </div>
    </div>
  );
}
