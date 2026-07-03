/* ------------------------------------------------------------
   Study Smarter — article data
   In a production build this would come from a database/API.
   For this project it is a static in-memory dataset consumed
   by blog.js, article.js and main.js to demonstrate dynamic
   client-side rendering.
------------------------------------------------------------ */

const ARTICLES = [
  {
    id: 1,
    title: "The Two-Day Rule: Why Spacing Beats Cramming",
    category: "Memory",
    date: "2026-01-12",
    readTime: 6,
    excerpt: "A single all-night session feels productive, but the science of forgetting says otherwise. Here's how to schedule review sessions that actually stick.",
    body: [
      "Cramming feels efficient because it produces a short-term illusion of mastery. You read a paragraph, you can repeat it back five minutes later, and your brain concludes the job is done. The problem is timing: memory tested minutes after exposure tells you almost nothing about memory a week later.",
      "Spaced repetition works because it interrupts forgetting at the point where it is about to happen, not before and not long after. Reviewing material at increasing intervals — a day, then three days, then a week — forces the brain to reconstruct the memory rather than simply recognise it, which is what makes the memory durable.",
      "A practical version of this for students: after any new lecture or reading, do a five-minute review that same evening, a second short review two days later, and a third review the following week. Each pass should take less time than the last, because retrieval gets easier as the memory strengthens.",
      "The two-day rule is simply a minimum viable version of spacing for students who can't commit to a full spaced-repetition system. If you review nothing else, review two days after first exposure — that single checkpoint recovers most of what would otherwise be lost."
    ]
  },
  {
    id: 2,
    title: "Active Recall: Turn Reading Into Testing",
    category: "Technique",
    date: "2026-01-19",
    readTime: 5,
    excerpt: "Highlighting and re-reading feel like studying, but they barely move the needle. Active recall — quizzing yourself — does the heavy lifting instead.",
    body: [
      "Re-reading a chapter creates fluency, not knowledge. Because the material feels familiar on the second pass, students mistake that fluency for understanding. Active recall breaks the illusion by forcing you to produce the answer rather than recognise it on the page.",
      "The simplest version: close the book, write down everything you remember about the topic, then check what you missed. The act of struggling to retrieve information — even when you fail — strengthens the memory more than a successful re-read would.",
      "Flashcards work for the same reason, provided you write the question on one side and genuinely attempt an answer before flipping. Passive flashcard flipping, where you read both sides at once, defeats the purpose entirely.",
      "Past exam papers are one of the most underused recall tools available. Working through a past paper under light time pressure, without notes, mimics the retrieval conditions of the real exam far more closely than any amount of reading ever could."
    ]
  },
  {
    id: 3,
    title: "Designing a Study Schedule You'll Actually Follow",
    category: "Planning",
    date: "2026-01-26",
    readTime: 7,
    excerpt: "Most study plans fail in the first week because they assume a version of you with infinite discipline. Build a schedule for the version of you that actually exists.",
    body: [
      "A study schedule that only works if nothing goes wrong is not a schedule, it's a wish. Build in slack: plan for roughly 70% of your available time, and leave the rest as a buffer for the sessions that inevitably run long or get skipped.",
      "Match the task to the time of day you actually have energy for it. Difficult, unfamiliar material belongs in your highest-energy window; routine review and organisational tasks can happen when you're tired.",
      "Batch by subject rather than switching every 20 minutes. Context-switching between unrelated subjects has a real cost — it takes time to reload the mental model for a topic, and frequent switching means you pay that cost over and over.",
      "Review your schedule weekly, not daily. A schedule adjusted every single day never stabilises long enough to become a habit; a weekly check-in gives you enough data to make a real adjustment instead of a reactive one."
    ]
  },
  {
    id: 4,
    title: "Note-Taking Systems Compared: Cornell vs. Outline vs. Mind Map",
    category: "Technique",
    date: "2026-02-02",
    readTime: 8,
    excerpt: "There is no single best note-taking method — only a best method for a given subject and a given brain. Here's how to pick.",
    body: [
      "The Cornell method splits the page into notes, cues, and a summary. It's especially strong for lecture-based subjects where you need to capture a lot of linear information quickly and then compress it into a testable form afterward.",
      "Outline notes follow the natural hierarchy of a topic — headings, sub-points, details — and work best for subjects that are already structured that way, like most textbook chapters and legal or policy material.",
      "Mind maps trade linearity for association. They're useful when the value of a topic lies in the connections between ideas rather than a strict sequence — brainstorming, essay planning, and subjects like biology or history where causes and effects branch outward.",
      "The honest answer is that most students benefit from switching methods by context: Cornell in lectures, outlines while reading, mind maps while planning writing. Committing to one method for every subject is usually the mistake, not the method itself."
    ]
  },
  {
    id: 5,
    title: "Beating Procrastination Without Willpower",
    category: "Mindset",
    date: "2026-02-09",
    readTime: 6,
    excerpt: "Willpower is a finite and unreliable resource. The students who consistently start work early usually aren't more disciplined — their environment is doing the work.",
    body: [
      "Procrastination is rarely about laziness; it's usually about the size of the first step. A task that begins with 'write the essay' is vague enough to trigger avoidance. A task that begins with 'open a blank document and write one sentence' is small enough that avoiding it feels silly.",
      "Remove friction from starting and add friction to distraction. Keep your study materials open and ready before you sit down; put your phone in another room rather than just face-down on the desk.",
      "The two-minute rule is useful here: if a task takes less than two minutes, do it immediately rather than scheduling it. For anything longer, commit to just two minutes of it — momentum tends to carry you past the point you intended to stop.",
      "Treat starting and finishing as separate skills. You are allowed to start a task badly. Perfectionism about the first draft is one of the most common, least discussed causes of procrastination among strong students."
    ]
  },
  {
    id: 6,
    title: "Sleep Is Part of Studying, Not Separate From It",
    category: "Wellbeing",
    date: "2026-02-16",
    readTime: 5,
    excerpt: "Memory consolidation happens overnight. Sacrificing sleep to study more is, for most material, a net loss.",
    body: [
      "During sleep, the brain replays and strengthens the neural patterns formed during the day, transferring information from short-term to long-term storage. Studying that isn't followed by adequate sleep is, in a real sense, incomplete.",
      "Research on all-night study sessions consistently shows the same pattern: performance on recall and problem-solving tasks drops sharply after sleep deprivation, even when total study hours are held constant against a well-rested comparison group.",
      "If you must choose between an extra hour of study and an extra hour of sleep the night before an exam, the sleep is very often the better investment — particularly for material that depends on reasoning rather than simple recognition.",
      "A practical middle ground: front-load difficult material earlier in your revision period so the final night before an assessment can be light review and rest, rather than the first exposure to anything."
    ]
  }
];
