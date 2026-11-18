# 📘 Datexia Lurnex LMS: User Guide

A plain-English manual for the Sovereign AI Architect study tracker: tick boxes, see progress, keep going.

> [!NOTE]
> This guide is about *using* the site. For what the project is, how to run it on your own computer, and how to contribute, see the [README](README.md).

## 📑 Contents

- [Which version should I use?](#-which-version-should-i-use)
- [Quick start (60 seconds)](#-quick-start-60-seconds)
- [Where your progress is saved](#-where-your-progress-is-saved)
- [Finding your way around](#-finding-your-way-around)
- [How to study with it](#-how-to-study-with-it)
- [Backup, move and reset](#-backup-move-and-reset)
- [Keyboard and accessibility](#-keyboard-and-accessibility)
- [FAQ and troubleshooting](#-faq-and-troubleshooting)
- [Month-by-month reference](#-month-by-month-reference)

## 🧩 Which version should I use?

Three versions of the site are live at the same time:

| Version | Address | Notes |
|---|---|---|
| **Classic v1** | <https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/> (the root address) | The original. You sign in with Google first. |
| **v2** | <https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/v2/> | Guest mode, search, a progress ring and cloud sync. |
| **v3** (latest) | <https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/v3/> | The 26-month timetable. This guide describes v3. |

- **Same sign-in, same progress.** All three live on one web domain and use the same Firebase data. Sign in with Google on any of them and you see the same synced progress.
- **Guest progress is per browser.** If you use the site without signing in, your ticks are saved in your browser's own storage. v2 and v3 share that guest storage, so a guest tick made in one shows in the other (in the same browser). v1 has no guest mode.
- **Our recommendation: use v3.** It is the newest and the easiest to scan.

## 🚀 Quick start (60 seconds)

1. Open <https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/v3/>.
2. Near the top, find the **Next up** box. It shows your first unticked task. Press **Open month 1** (on a brand new start the button says **Start month 1**).
3. The month's sheet shows your checkboxes, and the page scrolls to your first task. Tick its box.
4. That's it. Your progress saves automatically, with no Save button.

> [!TIP]
> You do not need an account. Sign in only if you want your progress on more than one device.

## 💾 Where your progress is saved

You can use the site in two ways: as a guest, or signed in with Google.

| | Guest | Signed in with Google |
|---|---|---|
| Saved where | This browser only | Your private cloud record (Firebase) |
| Other devices | Not shared | Same progress everywhere, live |
| Clearing site data | **Erases your progress** | Cloud copy is safe |
| Account needed | No | Yes (Google) |

### Guest mode

Every tick is stored in your browser's local storage. Nothing leaves your computer. v2 and v3 use the same storage spot, so they show the same guest progress in one browser.

> [!WARNING]
> If you clear this browser's site data or cookies, or use a private window, your guest progress is gone. Use [Export progress](#export-step-by-step) as a backup.

### Signing in with Google

Press **Sign in to sync** in the top bar (or **Sign in with Google to sync** in the small note under the page title). A Google popup appears.

On your first sign-in the site compares two lists of completed tasks: the one in your browser and the one already in the cloud. It combines them as a **union**: if a task is done in either place, it stays done. Nothing is lost.

After that, the cloud copy is the one that counts. Tick a box on your laptop and it shows up on your phone, live. Once your browser's guest progress has been merged into the cloud, the site clears that local copy.

### Signing out

Open the **⋮** menu and choose **Sign out**.

- Your cloud progress stays in the cloud. Sign in again and it comes back.
- The page then goes back to guest mode and shows whatever is in this browser's local storage.
- Because that local copy was cleared when you first signed in, a signed-out page usually looks empty. This is normal, not data loss.
- Ticks you make as a guest are stored in this browser and will be merged into your account the next time you sign in.

> [!NOTE]
> The note under the page title ("Saved in this browser") only shows when you are signed out. Its **Hide** button hides it, and the site remembers that. When you are signed in it reads "Synced to your Google account."

## 🧭 Finding your way around

### The top bar

The bar stays at the top as you scroll. From left to right:

- **Lurnex**: the wordmark. Press it to jump back to the top.
- **N% done**: your overall percentage.
- **Theme button**: one button that switches between light and dark. The site starts with your system setting and remembers your choice.
- **Sign in to sync**: signs you in with Google. Once you are signed in, this button is replaced by your Google avatar (or first initial), which opens the same menu as the ⋮ button.
- **⋮ menu** (labelled "Progress menu"). It contains:
  - **Export progress (JSON)**
  - **Import progress**
  - **Reset progress** (in red)
  - **Sign out** (only when signed in, with your name and email shown at the top)

### "Next up"

This box shows your first unticked task, in curriculum order, with its month and phase. Press **Open month N** to open that month's sheet and scroll to the task.

When every box is ticked, the box changes to "All 26 months done".

### The four figures

Under the page title are four numbers: **Tasks done**, **Months complete**, **Projects done**, and **Of the roadmap** (your overall percent).

### The 26-month timetable

This is the heart of the site. It shows all 26 months on one page.

- **Seven phase rows.** Each row is a phase (I to VII) with its name and its own percent. Each month is a small cell in its row.
- **Each cell** shows the month number, a title, a counter such as `3/6`, and three bars:
  - **Blue**: weekly topics
  - **Red**: the project (or projects)
  - **Yellow**: the study habit
- **The bars fill up** as you tick boxes.
- **A finished month turns solid ink.** When every box in a month is ticked, its cell goes dark in light mode (or light in dark mode) and the counter says **Done**. There is no pop-up message. The cell changing is your signal.
- **The month you are looking at** is the one marked in the timetable and shown in the sheet.

### The month sheet

Click any month cell to open its **month sheet**. On wide screens the sheet sits beside the timetable. On narrow screens it sits below it, and the page scrolls down to it when you click a cell.

The sheet holds:

- the phase and month number, the month's title and a short description
- **Open course**: opens that month's course in a new tab. Month 20 shows two rows instead, one for the **free route** and one for the **paid route**
- **Weekly topics**: four checkboxes
- **Project** (or **Projects**, in Month 12): one or two checkboxes
- **Study habit**: one checkbox
- **Previous and next month buttons** at the bottom, labelled with the month numbers

Every month has 4 weekly topics, 1 or 2 projects and 1 study habit, so most months have 6 boxes. A month counts as complete only when all of them are ticked.

### Search

The search box sits above the timetable. It matches, ignoring upper and lower case:

- month titles and descriptions
- course names (including both Month 20 routes)
- weekly topic text
- project names

It does **not** search the study habit line, the job roles or the roadmap table. While you search, months that do not match are dimmed, and a line under the box tells you how many months match (or that none do). Nothing is hidden or opened, so you can still click any month. Clear the box to go back to normal.

### How it works

A short four-step guide: open the next task, study the linked course, tick what you finish, and sync if you like. It also links back to this user guide.

### Job roles

A table of 10 AI job roles with an indicative pay range (INR lakh a year, India, 2026) and a short description. It is context for why you are studying, not something you tick. The page itself says to check current market data before making decisions.

### Project roadmap

A table of projects with month, project name, difficulty and focus. Use the tabs above it to filter by difficulty: **All, Beginner, Foundational, Intermediate, Advanced, Master**.

> [!NOTE]
> The roadmap table lists 26 projects. The month sheets list 28 project checkboxes, because Month 12 has two projects (both are in the roadmap table), and Months 25 and 26 have one each ("Mock Interview Completion" and "Job Secured") that are not in the roadmap table.

### The footer

The footer links to the project on GitHub, this user guide, the broken-link report form, the MIT license, and all three versions of the site.

## 🧠 How to study with it

### A suggested weekly routine

The site does not enforce a schedule. This is a simple way to use what is there:

- **About one week, one weekly task.** Work on that week's topic, then tick it.
- **Spread the project across the month.** Start it early, add a bit each week, tick it when it works.
- **Do the monthly habit/method once** (the brain-icon box). Tick it after you have actually done it.
- At the end of the month, check that the cell in the timetable has turned solid ink.

> [!TIP]
> Small and regular beats big and rare. A short session most days is easier to keep up than one long weekend.

### The habit / method line

Each month ends with a learning habit. Names start with "IQ:" (a brain-training exercise) or "Method:" (a study technique). The curriculum does not explain them, so here is a short plain-English note on each.

**Study methods**

- **Feynman Technique** (Month 2): explain the idea in simple words, as if to a friend. Gaps in your explanation show what to relearn.
- **Blank-Page Retrieval** (Month 4): on an empty page, write everything you remember from earlier months, then check.
- **Interleaving** (Month 6): mix topics (here, math and coding) in one session instead of doing one block at a time.
- **Self-Explanation** (Month 8): explain each step of a process to yourself as you go (here, backpropagation).
- **Pipeline Mapping** (Month 9): draw how data flows from step to step.
- **Architecture Replication** (Month 10): rebuild a known design from memory or from the paper.
- **Year 1 Retrieval Test** (Month 12): a blank-page recall check of the whole first year.
- **Security Rule Structuring** (Month 16): write security rules in a clear, organised form.
- **Native Mapping** (Month 22): map your idea onto how a native desktop app is built.
- **Future Mapping** (Month 26): sketch where you want your career to go next.
- **Full Synthesis** (Month 24): pull everything you have learned into one coherent picture.

**"IQ" exercises** (thinking and memory practice)

- **Detailed Visualization** (Month 1): picture a process step by step, such as data moving from GPU to RAM.
- **Dual N-Back** (Month 3): a memory game that trains working memory.
- **Relational Reasoning** (Month 5): spot patterns and how things relate.
- **Strategic Chess** (Month 7): play chess to practise planning ahead.
- **Matrix Visualization** (Month 11) and **Matrix Reasoning** (Month 15): imagine and reason about grids of numbers, including in 3D.
- **Weight Logic Visualization** (Month 13): picture how model weights change.
- **Resource Allocation Puzzles** (Month 14): puzzles about sharing limited resources.
- **Information Graphing** (Month 17): draw how facts connect.
- **Delegation Logic** (Month 18): think through who or what should do which job.
- **Memory Pathing** (Month 19): trace how information is stored and found.
- **Adversarial Thinking** (Month 20): think like an attacker to find weak spots.
- **Logic Architecture** (Month 21): lay out the logic of a system.
- **Load Balancing** (Month 23): think about spreading work evenly.
- **Communication Drills** (Month 25): practise explaining and defending your work out loud.

> [!NOTE]
> These one-line descriptions are general explanations. The app only shows the names. If one is unfamiliar, a quick web search will give you more detail.

### Free vs paid

Most courses are free to read, watch or audit. Courses on **Coursera** usually have an "audit" option, which lets you view the material without paying (you only pay if you want a certificate). Check the course page, since offers can change.

**Month 20** is the one month with two routes. The **Free Route** is *OWASP Top 10 for LLMs* and the **Paid Route** is *AI Security Masterclass*. You can follow either; the weekly tasks are the same.

## 🔁 Backup, move and reset

### Export (step by step)

1. Click the **⋮** menu in the top bar.
2. Choose **Export progress (JSON)**.
3. Your browser saves a file named `lurnex-progress.json`.

The file lists only the tasks you have completed. It is plain text; you can open it in any text editor.

### Import (step by step)

1. Click **⋮**, then **Import progress**.
2. Pick a `.json` file in the file chooser.
3. A message at the bottom tells you how many completed tasks were imported. If the file is not valid, an error message appears instead.

A valid file is a single JSON object where every key is a real task key and every value is `true` or `false`:

```json
{
  "m1_w1": true,
  "m1_p0": true,
  "m1_iq": true
}
```

How keys are built: `m1_w1` is Month 1, week 1. `m1_p0` is Month 1, first project. `m1_iq` is Month 1's study habit box.

> [!WARNING]
> If even one key is unknown or one value is not `true`/`false`, the whole file is rejected with an error message and nothing changes.

> [!NOTE]
> Import **merges**. It adds the imported ticks to what you already have. It never unticks anything. To go backwards, use Reset instead.

### Move to another device

Either sign in with Google on both devices (easiest, then it syncs live), or export on one and import on the other.

### Reset

1. Click **⋮**, then **Reset progress**.
2. A dialog asks "Reset all progress?". Press **Reset progress** to confirm, or **Cancel**.

What it clears: every checkbox across all 26 months. It does not touch your theme choice or the hidden-note setting.

- **Guest**: your browser's saved progress is emptied.
- **Signed in**: your cloud progress is emptied, so it is empty on every device.

> [!WARNING]
> Reset cannot be undone. Export a backup first if you might want it back.

## ⌨️ Keyboard and accessibility

- **Tab** and **Shift+Tab** move between buttons, links and checkboxes. The focused item gets a visible highlight.
- **Space** ticks or unticks the focused checkbox. Each task is a real checkbox, so it also works with screen readers.
- **Enter** (or Space) presses buttons, including each month cell in the timetable, and follows links.
- A **Skip to the timetable** link appears first when you press Tab on a fresh page.
- **Escape** closes the Reset dialog (same as Cancel). It also closes the **⋮** menu.
- When the Reset dialog opens, focus lands on **Cancel**, the safe choice.
- **Reduced motion**: if your device is set to reduce motion, animations are switched off, and the scroll after you press **Open month N** is instant instead of smooth.
- Error and import messages are announced to screen readers.
- Each month cell has a spoken label such as "Month 3, GitHub Mastery and Analytics, 2 of 6 done".
- Dimmed months during a search are only dimmed, not hidden, so they stay reachable.

## ❓ FAQ and troubleshooting

### The sign-in popup was blocked

Allow popups for the site and press **Sign in to sync** again. If your browser blocks the popup, the site automatically tries a full-page redirect to Google instead, so you may be taken away and back. If you close the popup yourself, nothing happens.

### My progress is missing on another device

- Are you signed in with the **same Google account** on both? Look for your avatar in the top bar.
- If you were a guest on one device, that progress lives only in that browser. Sign in there and it merges into your account. Also check that both devices use the same version family (v1, v2 and v3 all share synced progress, but guest progress does not travel).
- Wait a moment, since it syncs live. If you see a red error message ("Sync error" or "Could not save"), check your internet connection and try again.
- You can always move it by hand with [export and import](#-backup-move-and-reset).

### A course link is dead

Courses move sometimes. Please [report a broken link](https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/issues/new?template=broken_link.yml) and say which month it is.

### Is my data private?

Signed-in progress is stored under your own account and can only be read and written by you. Only your task ticks and basic Google profile details are stored. Details are in [SECURITY.md](SECURITY.md).

### Can I use it offline?

Not really. The site has no offline mode, so you need internet to open it and to sync. Guest ticks are saved in your browser as you make them, but the page itself has to load first.

### Is it free?

Yes. The site is free and open source (MIT license). Some courses it links to may have paid options, as described in [Free vs paid](#free-vs-paid).

## 🗓️ Month-by-month reference

Copied from the curriculum data used by v3. Month 20 shows both routes.

| Month | Title | Course | Project(s) |
|:--:|---|---|---|
| 1 | The Linux Shell & Hardware Provisioning | [The Missing Semester of Your CS Education (MIT)](https://missing.csail.mit.edu/) | L1 Foundation Script; Sovereign Portfolio Hub |
| 2 | Full-Stack Web Logic | [HTML, CSS, and Javascript for Web Developers](https://www.coursera.org/learn/html-css-javascript-for-web-developers) | Cyber Factory UI |
| 3 | GitHub Mastery & Analytics | [Git and GitHub: Track Changes and Collaborate on Code (Coursera)](https://www.coursera.org/learn/introduction-git-github) | The Statistics Profiler |
| 4 | Type-Safe Backend with Node.js | [Learn TypeScript: Fundamentals](https://www.codecademy.com/learn/learn-typescript-fundamentals) | L5 AI Router Proxy |
| 5 | Linear Algebra & Matrix Calculus | [MIT 18.06: Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) | Matrix Engine |
| 6 | Multivariable Calculus & Optimization | [Multivariable Calculus (Khan Academy)](https://www.khanacademy.org/math/multivariable-calculus) | Loss Optimizer |
| 7 | Probability & Uncertainty | [Data Science: Probability](https://pll.harvard.edu/course/data-science-probability) | Hallucination Scorer |
| 8 | GitHub Mastery 2: MLOps | [Automate Workflows with GitHub Actions](https://learn.microsoft.com/en-us/training/paths/github-actions/) | Autonomous Deployer |
| 9 | Python for AI Engineering | [Machine Learning with Python: Train Predictive Models (Coursera)](https://www.coursera.org/learn/machine-learning-with-python) | Sovereign Data Preprocessor |
| 10 | PyTorch Mechanics | [Introduction to Neural Networks and PyTorch (Coursera)](https://www.coursera.org/learn/deep-neural-networks-with-pytorch) | Visual Security Monitor |
| 11 | Transformer Architecture | [Generative AI with Large Language Models](https://www.coursera.org/learn/generative-ai-with-llms) | Attention Visualizer |
| 12 | Pre-training & Ethics | [CS50 AI (Harvard)](https://cs50.harvard.edu/ai/) | Synthetic Dataset Engine; Year-One Capstone |
| 13 | Parameter-Efficient Fine-Tuning | [Hugging Face LLM Course: Fine-tuning a Pretrained Model](https://huggingface.co/learn/llm-course/chapter3/1) | Domain Expert Fine-tune |
| 14 | Quantization Science | [Optimum Quantization Guide](https://huggingface.co/docs/optimum/concept_guides/quantization) | The VRAM Optimizer |
| 15 | CUDA & Kernel-Level Integration | [NVIDIA DLI: Fundamentals of Accelerated Computing with CUDA C/C++](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+C-AC-01+V1) | The 60% Differentiator |
| 16 | GitHub Mastery 3 | [GitHub Foundations](https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/) | Factory Security Audit |
| 17 | Retrieval-Augmented Generation | [Retrieval-Augmented Generation](https://www.pinecone.io/learn/retrieval-augmented-generation/) | Sovereign PDF Brain |
| 18 | Agentic Workflows | [AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction) | Autonomous Developer Swarm |
| 19 | Long-Term Memory | [Neo4j & Generative AI Fundamentals (GraphAcademy)](https://graphacademy.neo4j.com/courses/genai-fundamentals/) | Self-Evolving Assistant |
| 20 | Red Teaming & Safety | Free: [OWASP Top 10 for LLMs](https://genai.owasp.org/)<br>Paid: [AI Security Masterclass](https://learnprompting.org/courses/ai-security-masterclass) | Safety Audit Report |
| 21 | Local Inference Engines | [Ollama Official Documentation](https://github.com/ollama/ollama) | Ollama Desktop Client |
| 22 | Desktop Application Packaging | [Tauri 2: Create a Project](https://v2.tauri.app/start/create-project/) | Sovereign Chat App |
| 23 | Scalable MLOps | [Machine Learning Operations (MLOps): Getting Started (Coursera)](https://www.coursera.org/learn/mlops-fundamentals) | Auto-Scaling Factory |
| 24 | Final Portfolio & Capstone | [Open Source Guide](https://opensource.guide/) | The Cyber Factory Repo |
| 25 | Interview Blitz | [Data Scientist Career Guide and Interview Preparation (Coursera)](https://www.coursera.org/learn/career-guide-and-interview-prep-for-data-science-pc) | Mock Interview Completion |
| 26 | Placement & Graduation | [Wellfound Job Portal](https://wellfound.com/jobs) | Job Secured |

Back to the [top](#-datexia-lurnex-lms-user-guide) or the [README](README.md).
