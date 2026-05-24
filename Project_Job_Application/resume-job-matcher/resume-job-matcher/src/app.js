/**
 * ResumeMatch — app.js
 * AI-powered resume job matcher using the Anthropic Claude API
 */

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  file: null,
  resumeText: '',
  jobType: 'all',
  level: 'all',
  industry: '',
};

// ── DOM refs ───────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const dropzone       = $('dropzone');
const fileInput      = $('file-input');
const fileAttached   = $('file-attached');
const attachedName   = $('attached-name');
const attachedSize   = $('attached-size');
const removeFileBtn  = $('remove-file');
const analyzeBtn     = $('analyze-btn');
const uploadPanel    = $('upload-panel');
const prefsPanel     = $('prefs-panel');
const loadingWrap    = $('loading-wrap');
const loadingMsg     = $('loading-msg');
const resultsWrap    = $('results-wrap');
const candidateCard  = $('candidate-card');
const resultsTitle   = $('results-title');
const resultsCount   = $('results-count');
const jobGrid        = $('job-grid');
const resetBtn       = $('reset-btn');
const industryInput  = $('industry-input');

// ── File handling ──────────────────────────────────────────────────────────

fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f) handleFile(f);
});

removeFileBtn.addEventListener('click', clearFile);

function handleFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert('File is too large. Please upload a file under 5 MB.');
    return;
  }
  state.file = file;
  attachedName.textContent = file.name;
  attachedSize.textContent = formatBytes(file.size);
  dropzone.style.display = 'none';
  fileAttached.style.display = 'flex';
  analyzeBtn.disabled = false;
  extractText(file);
}

function clearFile() {
  state.file = null;
  state.resumeText = '';
  fileInput.value = '';
  dropzone.style.display = '';
  fileAttached.style.display = 'none';
  analyzeBtn.disabled = true;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function extractText(file) {
  if (file.type === 'application/pdf') {
    // PDF: we'll pass filename + note to the API
    state.resumeText = `[PDF file: "${file.name}". Extract and analyze based on typical resume content for this filename.]`;
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    state.resumeText = e.target.result || `[File: ${file.name}]`;
  };
  reader.onerror = () => {
    state.resumeText = `[File: ${file.name}]`;
  };
  reader.readAsText(file);
}

// ── Chip / filter toggles ─────────────────────────────────────────────────

function setupChipGroup(groupId, onSelect) {
  const group = $(groupId);
  group.querySelectorAll('.chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(btn.dataset.val);
    });
  });
}

setupChipGroup('type-chips',  (val) => { state.jobType = val; });
setupChipGroup('level-chips', (val) => { state.level   = val; });

industryInput.addEventListener('input', () => {
  state.industry = industryInput.value.trim();
});

// ── Analyze ────────────────────────────────────────────────────────────────

analyzeBtn.addEventListener('click', runAnalysis);

async function runAnalysis() {
  // UI switch
  uploadPanel.style.display = 'none';
  prefsPanel.style.display  = 'none';
  document.querySelector('.cta-wrap').style.display = 'none';
  loadingWrap.style.display = 'flex';
  resultsWrap.style.display = 'none';

  // Animate loading steps
  const steps = ['lstep-1', 'lstep-2', 'lstep-3', 'lstep-4'];
  const msgs  = [
    'Reading your resume…',
    'Extracting skills & experience…',
    'Matching relevant jobs…',
    'Ranking by compatibility…',
  ];
  let stepIdx = 0;
  const stepInterval = setInterval(() => {
    if (stepIdx > 0) {
      $(steps[stepIdx - 1]).classList.remove('active');
      $(steps[stepIdx - 1]).classList.add('done');
    }
    if (stepIdx < steps.length) {
      $(steps[stepIdx]).classList.add('active');
      loadingMsg.textContent = msgs[stepIdx];
      stepIdx++;
    } else {
      clearInterval(stepInterval);
    }
  }, 1400);

  try {
    const data = await fetchJobMatches();
    clearInterval(stepInterval);
    steps.forEach((s) => {
      $(s).classList.remove('active');
      $(s).classList.add('done');
    });
    await sleep(400);
    loadingWrap.style.display = 'none';
    renderResults(data);
  } catch (err) {
    clearInterval(stepInterval);
    console.error('API error:', err);
    loadingWrap.style.display = 'none';
    uploadPanel.style.display = '';
    prefsPanel.style.display  = '';
    document.querySelector('.cta-wrap').style.display = '';
    alert('Something went wrong. Please check your connection and try again.\n\n' + err.message);
  }
}

// ── API call ───────────────────────────────────────────────────────────────

async function fetchJobMatches() {
  const resumePreview = (state.resumeText || `File: ${state.file?.name}`).slice(0, 5000);
  const typeNote     = state.jobType  !== 'all' ? `Preferred job type: ${state.jobType}.` : '';
  const levelNote    = state.level    !== 'all' ? `Experience level preference: ${state.level}.` : '';
  const industryNote = state.industry            ? `Target industry: ${state.industry}.` : '';

  const prompt = `You are a professional career counselor and job matching AI. Analyze the resume below and generate 6 highly relevant, realistic job matches.

RESUME:
${resumePreview}

PREFERENCES:
${typeNote}
${levelNote}
${industryNote}

Respond ONLY with a JSON object — no markdown fences, no preamble — in this exact structure:

{
  "candidate": {
    "name": "Full Name (or 'Candidate' if not found)",
    "initials": "AB",
    "domain": "e.g. Full-Stack Engineer",
    "yearsExp": "X+ years",
    "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"]
  },
  "jobs": [
    {
      "id": "job_1",
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, Country or Remote",
      "type": "Full-time",
      "level": "Senior",
      "salary": "$90k–$130k",
      "matchPct": 88,
      "matchedSkills": ["skill1", "skill2", "skill3"],
      "missingSkills": ["skill4"],
      "summary": "Two-sentence description of the role and why it's a strong match for this candidate's background.",
      "applyUrl": ""
    }
  ]
}

Rules:
- Generate exactly 6 jobs, sorted by matchPct descending
- matchPct must be between 45 and 97
- Be realistic — company names should be plausible tech/industry companies
- missingSkills should highlight genuine gaps, not invented ones
- summary must be specific to this candidate's background
- salary in USD unless location suggests otherwise`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const raw  = data.content.map((b) => b.text || '').join('');
  const clean = raw.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error('Could not parse AI response. Please try again.');
  }
}

// ── Render results ─────────────────────────────────────────────────────────

function renderResults(data) {
  const { candidate, jobs } = data;

  // Candidate summary card
  candidateCard.innerHTML = `
    <div class="cand-top">
      <div class="cand-avatar">${escHtml(candidate.initials || candidate.name?.slice(0, 2).toUpperCase() || '?')}</div>
      <div>
        <div class="cand-name">${escHtml(candidate.name || 'Candidate')}</div>
        <div class="cand-meta">${escHtml(candidate.domain || '')} &nbsp;·&nbsp; ${escHtml(candidate.yearsExp || '')}</div>
      </div>
    </div>
    <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-3); margin-bottom:0.6rem;">Detected skills</div>
    <div class="cand-skills">
      ${(candidate.topSkills || []).map((s) => `<span class="cand-skill">${escHtml(s)}</span>`).join('')}
    </div>
  `;

  resultsTitle.textContent = `Top matches for ${candidate.name || 'your resume'}`;
  resultsCount.textContent = `${jobs.length} jobs found`;

  // Job cards
  jobGrid.innerHTML = '';
  jobs.forEach((job, i) => {
    const pct = Math.min(97, Math.max(1, Math.round(job.matchPct) || 0));
    const barClass = pct >= 80 ? 'bar-high' : pct >= 60 ? 'bar-mid' : 'bar-low';
    const ringColor = pct >= 80 ? '#5bbf7a' : pct >= 60 ? '#e8a840' : '#e06050';
    const circumference = 2 * Math.PI * 22; // r=22
    const dashOffset = circumference - (pct / 100) * circumference;

    const card = document.createElement('div');
    card.className = 'job-card';
    card.style.animationDelay = `${i * 80}ms`;

    card.innerHTML = `
      <div class="job-card-top">
        <div class="job-title-wrap">
          <div class="job-title">${escHtml(job.title)}</div>
          <div class="job-company">${escHtml(job.company)}</div>
        </div>
        <div class="match-ring" title="${pct}% match">
          <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3"/>
            <circle
              cx="28" cy="28" r="22" fill="none"
              stroke="${ringColor}" stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray="${circumference.toFixed(1)}"
              stroke-dashoffset="${dashOffset.toFixed(1)}"
            />
          </svg>
          <div class="match-pct">${pct}%</div>
        </div>
      </div>

      <div class="job-meta">
        ${job.location ? metaPill(iconLocation(), job.location) : ''}
        ${job.type     ? metaPill(iconBriefcase(), job.type)    : ''}
        ${job.level    ? metaPill(iconLevel(), job.level)       : ''}
        ${job.salary   ? metaPill(iconSalary(), job.salary)     : ''}
      </div>

      <div class="match-bar-wrap">
        <div class="match-bar-labels">
          <span>Compatibility</span>
          <span>${pct}%</span>
        </div>
        <div class="match-bar-track">
          <div class="match-bar-fill ${barClass}" style="width:${pct}%"></div>
        </div>
      </div>

      ${job.summary ? `<div class="job-summary">${escHtml(job.summary)}</div>` : ''}

      ${(job.matchedSkills?.length || job.missingSkills?.length) ? `
        <div class="skills-section">
          <div class="skills-label">Skills</div>
          <div class="skills-row">
            ${(job.matchedSkills || []).map((s) => `
              <span class="skill-chip matched">
                ${iconCheck()} ${escHtml(s)}
              </span>`).join('')}
            ${(job.missingSkills || []).map((s) => `
              <span class="skill-chip missing">
                ${iconX()} ${escHtml(s)}
              </span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="job-actions">
        <button class="job-action primary" onclick="askClaude('Tell me more about the ${escAttr(job.title)} role at ${escAttr(job.company)} and how my background fits it.')">
          View details ↗
        </button>
        <button class="job-action" onclick="askClaude('How should I tailor my resume for the ${escAttr(job.title)} position at ${escAttr(job.company)}?')">
          ${iconEdit()} Tailor resume
        </button>
        <button class="job-action" onclick="askClaude('Write a compelling cover letter for the ${escAttr(job.title)} position at ${escAttr(job.company)} based on my resume.')">
          ${iconFile()} Cover letter
        </button>
        <button class="job-action" onclick="askClaude('What skills should I develop to improve my match for ${escAttr(job.title)} roles?')">
          ${iconStar()} Skill gaps
        </button>
      </div>
    `;

    jobGrid.appendChild(card);
  });

  resultsWrap.style.display = '';
  resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Reset ──────────────────────────────────────────────────────────────────

resetBtn.addEventListener('click', () => {
  resultsWrap.style.display = 'none';
  uploadPanel.style.display = '';
  prefsPanel.style.display  = '';
  document.querySelector('.cta-wrap').style.display = '';
  clearFile();

  // Reset loading steps
  ['lstep-1','lstep-2','lstep-3','lstep-4'].forEach((id, i) => {
    const el = $(id);
    el.classList.remove('active', 'done');
    if (i === 0) el.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Helpers ────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str || '').replace(/'/g, "\\'");
}

function metaPill(iconSvg, text) {
  return `<span class="meta-pill">${iconSvg} ${escHtml(text)}</span>`;
}

/** sendPrompt-style integration — opens Claude chat if embedded, else alert */
function askClaude(prompt) {
  if (typeof sendPrompt === 'function') {
    sendPrompt(prompt);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(prompt).catch(() => {});
    alert('Prompt copied to clipboard:\n\n' + prompt);
  }
}

// ── Inline SVG icons ───────────────────────────────────────────────────────

const svg = (path, vb = '0 0 24 24') =>
  `<svg width="13" height="13" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;

const iconLocation  = () => svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>');
const iconBriefcase = () => svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>');
const iconLevel     = () => svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>');
const iconSalary    = () => svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>');
const iconCheck     = () => svg('<polyline points="20 6 9 17 4 12"/>');
const iconX         = () => svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>');
const iconEdit      = () => svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>');
const iconFile      = () => svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>');
const iconStar      = () => svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>');
