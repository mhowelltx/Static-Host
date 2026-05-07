# Strategy Tools — Implementation Plan

Interactive tool cards for strategy items in `pages/emotion-strategies-toggle.html`.

When a user opens an emotion's detail panel, strategy items tagged with a matching type
display a small badge. Clicking the badge opens a modal with a guided tool.

---

## How It Works (code map)

All code lives inside the `<script>` block of `emotion-strategies-toggle.html`.

| Function | Purpose |
|---|---|
| `categorizeStrategy(text)` | Returns a category key or `null` for a strategy string |
| `STRAT_LABELS` | Maps category key → badge label text |
| `openStrategyCard(strat, cat)` | Creates and mounts the modal overlay |
| `buildXTool()` | Returns the inner HTML for tool type X |
| `initXTool(overlay)` | Wires event listeners for tool type X |

To add a new tool type, implement all four touchpoints above.

Badge CSS classes follow the pattern `.badge-{key}` — add matching styles in the
`/* STRATEGY TOOL BADGES */` CSS block near the top of the file.

---

## Status

### Implemented ✓

| # | Type | Badge label | Frequency | Tool name |
|---|---|---|---|---|
| 1 | `naming` | name it | ~72 strategies | "Name It" Reflection Tool |
| 2 | `reframing` | reframe | ~49 strategies | Perspective Shift Worksheet |
| 3 | `action` | act | ~17–20 strategies | Next Small Step Planner |

### To Build

Listed in priority order (by how often the type appears across the 87 emotions).

---

### 4. `self-compassion` — Self-Compassion & Self-Care

**Frequency:** ~18 strategies  
**Badge label:** `be kind`  
**Badge color:** warm rose, e.g. `rgba(220,130,140,.18)` / `rgba(240,150,160,.9)`

**Example strategies that should match:**
- "Attend to basic regulation: sleep, movement, breath"
- "Practice self-compassion when things go wrong"
- "Be gentle with yourself — heartbreak reshapes something real"
- "Practice self-forgiveness once accountability is genuinely taken"
- "Practice self-love as a genuine starting point"

**Suggested regex keywords:**
```
/attend to basic|self-compassion|be gentle with yourself|practice self-forgiv|self-love|self-kindness/
```

**Tool idea — "Self-Compassion Check-In":**
Three prompts based on Kristin Neff's three components:
1. *Self-kindness* — "What would you say to a good friend going through exactly this?"
2. *Common humanity* — "How might others in a similar situation feel right now?"
3. *Mindfulness* — "Without judging, what are you feeling right now?"
Output: a self-compassion statement the user composes from their three answers.

---

### 5. `connection` — Seeking & Building Connection

**Frequency:** ~15 strategies  
**Badge label:** `connect`  
**Badge color:** teal, e.g. `rgba(60,170,160,.18)` / `rgba(80,190,180,.9)`

**Example strategies that should match:**
- "Do not face it alone — anguish requires human presence"
- "Seek comfort in safe people"
- "Seek people who can sit with you without trying to fix it"
- "Reach out to one person — lower the bar for contact"
- "Share it — awe is one of the most socially bonding emotions"
- "Share something real — connection requires some vulnerability"

**Suggested regex keywords:**
```
/do not face it alone|seek comfort in|seek people who|reach out|share it\b|share something real|not face.*alone/
```

**Tool idea — "Connection Prompt":**
1. "Who is one person who could be with you in this?"
2. "What specifically do you need from them? (just presence / to listen / practical help / distraction)"
3. "What would you say to reach out?" (free-text draft)
Output: a ready-to-send draft message or a reminder of who to call.

---

### 6. `values` — Values Clarification

**Frequency:** ~11 strategies  
**Badge label:** `values`  
**Badge color:** amber, e.g. `rgba(200,160,60,.18)` / `rgba(220,180,80,.9)`

**Example strategies that should match:**
- "Use it as information about what you value, not a verdict on your worth"
- "Use it as a mirror: what does it reveal about your own values?"
- "Notice what you hold in reverence — it maps your deepest values"
- "Use it as a prompt for values clarification"
- "Use it to clarify your values, not as permission to dehumanize"

**Suggested regex keywords:**
```
/what you value|your own values|maps your.*values|values clarification|clarify your values|what matters to you/
```

**Tool idea — "Values Compass":**
1. "What value feels like it was violated or activated here?"
   (Optional: show a short list of common values as prompts — authenticity, fairness, freedom, connection, growth, safety, respect, honesty…)
2. "How important is this value to how you want to live?"
3. "What would acting in line with this value look like right now?"
Output: a values statement: "I care about [X]. In this situation, that means [Z]."

---

### 7. `mindfulness` — Mindfulness & Presence

**Frequency:** ~10 strategies  
**Badge label:** `pause`  
**Badge color:** slate blue, e.g. `rgba(100,130,180,.18)` / `rgba(120,150,200,.9)`

**Example strategies that should match:**
- "Pause before reacting — surprise briefly clouds judgment"
- "Pause before acting — let the acute heat pass"
- "Stay with confusion a moment before resolving it"
- "Savor it — slow down and let it register in your body"
- "Let yourself be small — awe benefits from surrender, not analysis"
- "Let yourself fully exhale — physically and emotionally"

**Suggested regex keywords:**
```
/pause before (reacting|acting)|stay with (it|confusion)|savor it|let yourself (be|fully)|slow down and let/
```

**Tool idea — "Pause & Ground" Exercise:**
A brief 3-step grounding sequence:
1. "Take three slow breaths. Notice your feet on the floor." (checkbox)
2. "Name five things you can currently see." (text field)
3. "What is one thing that is okay right now — even if small?" (text field)
Output: a grounding summary, plus a note that the nervous system needs ~20 minutes to fully regulate after activation.

---

### 8. `boundaries` — Boundary Setting

**Frequency:** ~8 strategies  
**Badge label:** `boundary`  
**Badge color:** coral, e.g. `rgba(210,120,90,.18)` / `rgba(230,140,110,.9)`

**Example strategies that should match:**
- "Know your limits before you're in the situation"
- "Communicate boundaries clearly, kindly, and early"
- "Recognize that 'no' is a complete sentence"
- "Hold your limits even when uncomfortable"
- "Ask: what boundary have I not set that needs setting?"

**Suggested regex keywords:**
```
/know your limits|communicate.*boundaries|'no' is a complete|hold your limits|what boundary have i not set/
```

**Tool idea — "Boundary Clarity" Worksheet:**
1. "What situation or relationship needs a boundary right now?"
2. "What specifically is not okay with you?" (the limit itself)
3. "What would you like to happen instead?"
4. "Draft what you'd say to communicate this clearly and kindly:"
Output: the drafted boundary statement, plus a reminder that a boundary is about your own behavior/limits, not a demand that others change.

---

### 9. `professional` — Seeking Professional Support

**Frequency:** ~6 strategies  
**Badge label:** `get support`  
**Badge color:** soft purple, e.g. `rgba(140,100,180,.18)` / `rgba(160,120,200,.9)`

**Example strategies that should match:**
- "Reach for professional support without shame"
- "Seek professional support — despair is not a willpower problem"
- "Work with a professional if hate is consuming significant energy"
- "Consider whether professional support is needed if it has become pervasive"

**Suggested regex keywords:**
```
/professional support|work with a professional|seek.*professional|connect them to professional/
```

**Tool idea — "Support Resource Card":**
Not a reflective worksheet but an informational card:
- Normalize: "Seeking support for hard emotions is not weakness — it is the most effective strategy available for sustained states."
- Prompt: "What kind of support might fit right now?" (options: therapy/counseling, peer support group, crisis line, trusted mentor, GP/doctor)
- Show relevant resource types based on selection (generic, not real URLs — remind user to search locally)
- Simple message: "You don't have to earn the right to ask for help."

---

### 10. `gratitude` — Gratitude Practice

**Frequency:** ~5 strategies  
**Badge label:** `gratitude`  
**Badge color:** soft green, e.g. `rgba(80,170,100,.18)` / `rgba(100,190,120,.9)`

**Example strategies that should match:**
- "Practice concretely: name three specific things rather than generic ones"
- "Express it directly to the people it involves"
- "Use it as an antidote to foreboding joy"
- "Make it a deliberate practice rather than waiting to feel it spontaneously"

**Suggested regex keywords:**
```
/practice.*gratitude|name three specific|express.*gratitude|antidote to foreboding|make it a deliberate practice/
```

**Tool idea — "Specific Gratitude Practice":**
Brown's research finding: gratitude must be specific to work.
1. "Name one specific thing you're grateful for right now (not generic)."
2. "What specifically about it are you grateful for?"
3. "Is there a person involved? What would you want them to know?"
Output: a gratitude note they can optionally share — framed as a practice, not a performance.

---

## Design Consistency Notes

All tool modals should follow the existing pattern:
- Use CSS classes: `.strat-overlay`, `.strat-card`, `.strat-card-close`, `.strat-card-type`, `.strat-card-title`, `.strat-card-ctx`, `.tool-q`, `.tool-ta`, `.tool-btn`, `.tool-out`, `.tool-out-hd`
- Each tool has a "submit" button that generates a visible output summary (`.tool-out.show`)
- Both light and dark mode supported via CSS variables — no hardcoded colors in tool HTML
- Close on × button or clicking outside the modal
- `scrollIntoView` on the output after submission so the user sees the result
