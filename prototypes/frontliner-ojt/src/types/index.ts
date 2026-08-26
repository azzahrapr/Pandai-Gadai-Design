export type UserRole = 'fl' | 'kanit'
export type MilestoneType = 'minggu1' | 'minggu2'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}
export type SubmissionStatus = 'not_started' | 'submitted' | 'scored'
export type AssessmentStatus = 'not_started' | 'submitted' | 'selesai'

export interface LearningMaterial {
  id: string
  title: string
  content: string
  slideUrl?: string
}

// Shared by ChecklistItem and Milestone — see `getEffectiveTarget()` in mockData.ts.
// `target`/`targetForPass` are the min. submission attempts and the min. of those
// attempts that must individually pass for the whole thing to count as "Lulus".
// `level2Target`/`level2TargetForPass` are ADDED on top only for a Level 1 item that
// a kanit has approved for carry-over into Level 2 — untouched otherwise.
export interface TargetSpec {
  target?: number
  targetForPass?: number
  level2Target?: number
  level2TargetForPass?: number
}

export interface ChecklistItem extends TargetSpec {
  id: string
  text: string
  category: string
  description?: string
  // Curriculum spreadsheet's "Kondisi Ideal" column (col AD) — a standardized acceptance
  // criterion for this item, shown to the Kanit as review guidance (see
  // KondisiIdealInfo). Only set for items the curriculum actually defines one for; most
  // items have none, which is expected — don't backfill a guess.
  kondisiIdeal?: string
  // For an individual-type milestone whose "Daftar Isi" grouping bundles more than one
  // curriculum Task List row under itself (e.g. Cash Management's "Tarik-Setor Tunai
  // Cabang" covers 2 task-list rows) — when set, this item's own FLTaskList submission
  // form becomes a checklist of these sub-items (all required) instead of a plain
  // free-text-only form. See TaskConfirmation.completedSubItemIds for the submitted
  // record shape.
  subItems?: { id: string; text: string }[]
}

export interface Milestone extends TargetSpec {
  id: string
  name: string
  shortName: string
  type: MilestoneType
  order: number
  description: string
  unlockDay: number
  estimatedMinutes: number
  materials: LearningMaterial[]
  checklistItems: ChecklistItem[]
  quiz?: QuizQuestion[]
  submissionType?: 'session' | 'individual'
  // Personal Grooming only: must be done fully every day, no catch-up possible — never
  // shows "Terlambat"/kanit-approval, its Lulus/Tidak Lulus verdict is decided purely by
  // the day-13 program-end fallback like every other module.
  noRemedial?: boolean
}

export interface TaskConfirmation {
  id: string
  flId: string
  milestoneId: string
  itemId: string
  itemText: string
  nomorSbg?: string
  nomorBox?: string[]
  catatan?: string
  // Which of the parent ChecklistItem's subItems (if any) were checked at submission —
  // see ChecklistItem.subItems. Undefined for every item that has no subItems.
  completedSubItemIds?: string[]
  kanitNote?: string
  kanitReviewedAt?: string
  // true = lulus, false = tidak lulus (remedial required), undefined = belum dinilai
  kanitPassed?: boolean
  submittedAt: string
  day: number
}

export interface ChecklistItemRecord {
  itemId: string
  completed: boolean
  note?: string
}

export interface DailyTaskRecord {
  taskId: string
  taskName: string
  completedItemIds: string[]
  reflection: string
  submittedAt: string
  kanitScore?: number
  kanitNote?: string
}

export interface DailyChecklist {
  id: string
  day: number
  date: string
  flId: string
  // Legacy format (historical data)
  milestoneId?: string
  milestoneName?: string
  items?: ChecklistItemRecord[]
  // Multi-task format
  tasks?: DailyTaskRecord[]
  status: SubmissionStatus
  submittedAt?: string
  kanitScore?: number
  kanitNote?: string
  kanitScoredAt?: string
  // Pass/fail: true = all items checked, false = incomplete
  passed?: boolean
}

export type ExtensionType = 'daily-redo' | 'weekly-carryover'
export type ExtensionStatus = 'pending' | 'approved' | 'rejected'

export interface ExtensionRequest {
  id: string
  flId: string
  milestoneId: string
  type: ExtensionType
  status: ExtensionStatus
  requestedAt: string
  respondedAt?: string
  kanitId?: string
  kanitNote?: string
}

export interface PenaksiranRecord {
  id: string
  day: number
  date: string
  flId: string
  barangType: string
  barangDescription: string
  flEstimate: number
  intoolsValue?: number
  accuracy?: number
  kanitScore?: number
  kanitNote?: string
  kanitScoredAt?: string
}

export interface MasteryCheck {
  materialId: string
  material: string
  mastered: boolean
}

export interface AssessmentAnswer {
  questionId: string
  question: string
  answer: string
}

export interface Assessment {
  id: string
  flId: string
  day: number
  date: string
  masteryChecks: MasteryCheck[]
  answers: AssessmentAnswer[]
  status: AssessmentStatus
  submittedAt?: string
  mcqScore?: number
}

export interface SoftSkillRating {
  skill: string
  score: number
}

export interface FinalEvaluation {
  id: string
  flId: string
  kanitId: string
  submittedAt: string
  softSkills: SoftSkillRating[]
  attitudeScore: number
  feedback: string
  recommendation: 'lulus' | 'tidak_lulus'
}

// Penilaian model (2026-08-10 rework): no more single weighted "Nilai Akhir" score.
// 3 independent components — Latihan, Ujian Akhir, Evaluasi Akhir (kanit) — each with its
// own KKM (see KKM_LATIHAN/KKM_UJIAN_AKHIR in mockData.ts). The OJT is Tidak Lulus the
// moment ANY known component is below its KKM; Lulus only once all 3 are known and all
// clear their KKM. `passed` encodes exactly that gate — see getFlScoreBreakdown().
export interface ScoreBreakdown {
  dailyProgressScore: number | null   // Latihan component (0-100)
  assessmentScore: number | null      // Ujian Akhir component (0-100)
  // Sikap Kerja component (0-100), 2026-08-12 — (sum of all 5 ratings [4 soft skills +
  // Attitude, each 1-4] / 20) * 100, matching the official curriculum spreadsheet's own
  // formula exactly. Display/KKM-comparison only — evaluasiPassed below is still driven by
  // the kanit's own Pernyataan Kelulusan recommendation, not auto-computed from this score.
  sikapKerjaScore: number | null
  penaksiranScore: number | null      // legacy Penaksiran Emas intools-accuracy score — display-only, not part of the pass/fail gate
  daysScored: number
  penaksiranCount: number
  latihanPassed: boolean | null       // null = not yet scored
  ujianPassed: boolean | null         // null = not yet taken/scored
  evaluasiPassed: boolean | null      // null = kanit hasn't filled Evaluasi Akhir yet
  passed: boolean | null              // overall gate — false if any known component failed, true if all 3 known & passed, null while still undecided
}

export interface FLProfile {
  id: string
  name: string
  branch: string
  position: string
  startDate: string
  currentDay: number
  kanitId: string
  courseId: string
  // Whether the learner has clicked past the pre-Day-1 "Mulai" gate. Missing/undefined
  // on legacy profiles means already-started (backward compatible for existing FLs).
  hasStarted?: boolean
  activeMilestoneIds: string[]
  completedMilestoneIds?: string[]
  quizScores?: Record<string, number>
  quizAnswers?: Record<string, Record<string, number>>
  quizAttempts?: Record<string, number>
}

// A course wraps an entire training program (its own modules/tasks/quizzes) —
// today there's only "On the Job Training", but the model supports a learner
// being enrolled in more than one (e.g. a future Kanit training course).
export interface Course {
  id: string
  name: string
}

export interface KanitProfile {
  id: string
  name: string
  branch: string
  flIds: string[]
}

export interface AppUser {
  id: string
  name: string
  role: UserRole
  profile: FLProfile | KanitProfile
}

export type FLNotificationType = 'feedback_latihan' | 'persetujuan_kanit' | 'final_assessment' | 'quiz_unlocked'

export interface FLNotification {
  id: string
  flId: string
  type: FLNotificationType
  title: string
  body: string
  milestoneId?: string
  milestoneName?: string
  read: boolean
  createdAt: string
}
