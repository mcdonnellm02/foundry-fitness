"use client";

import { useState } from "react";

const DAYS = [
  {
    id: "A",
    label: "Day A",
    focus: "Lower Body + Pull",
    color: "#e8673a",
    gym: [
      { name: "Goblet Squat", sets: "3", reps: "10–12", weight: "25# KB → progress to 35#", cue: "Chest up, knees track over toes, full depth. Keep the KB close to your sternum.", category: "Legs" },
      { name: "Romanian Deadlift (RDL)", sets: "3", reps: "10–12", weight: "Women's bar (35#) + 5s or 10s", cue: "Hinge at hips, soft knee bend, bar drags down your shins. Feel the hamstring stretch.", category: "Posterior Chain" },
      { name: "Assisted or Banded Pull-Up", sets: "3", reps: "5–8", weight: "Resistance band assist — lightest band that makes reps hard", cue: "Initiate with the lats, not a shrug. Chin clears bar = full rep. Build to unassisted over time.", category: "Back / Biceps" },
      { name: "Hip Thrust (Barbell or KB)", sets: "3", reps: "12–15", weight: "25# DB pair / 35# KB on hips", cue: "Shoulders on bench, drive hips to full extension. Squeeze at the top for 1 count. This builds the glutes.", category: "Glutes" },
      { name: "Dead Bug", sets: "3", reps: "8 each side", weight: "Bodyweight", cue: "Lower back MUST stay flat against the floor. Slow and controlled. Breathe out on the reach.", category: "Core" },
    ],
    bodyweight: [
      { name: "Bodyweight Squat", sets: "3", reps: "15–20", weight: "Bodyweight — slow the descent to 3 counts", cue: "Chest up, knees track toes, squat as deep as you can. Tempo is the load here — make each rep take 5 seconds total.", category: "Legs" },
      { name: "Single-Leg Romanian Deadlift", sets: "3", reps: "10 each side", weight: "Bodyweight — use a wall for balance if needed", cue: "Stand on one leg, hinge forward at the hip, opposite leg extends back. Feel the hamstring load on the standing leg. Control the movement.", category: "Posterior Chain" },
      { name: "Inverted Row (under a table) or Doorframe Row", sets: "3", reps: "8–12", weight: "Bodyweight — lean back more to make it harder", cue: "Lie under a sturdy table, grip the edge, keep your body straight and pull your chest up to it. Or grip a doorframe at hip height, lean back, and row. This replaces the pull-up.", category: "Back / Biceps" },
      { name: "Glute Bridge", sets: "3", reps: "15–20", weight: "Bodyweight — pause 2 sec at top", cue: "On your back, feet flat, drive hips up and squeeze hard at the top. Hold 2 seconds every rep. Progress by doing single-leg version.", category: "Glutes" },
      { name: "Dead Bug", sets: "3", reps: "8 each side", weight: "Bodyweight", cue: "Lower back MUST stay flat against the floor. Slow and controlled. Breathe out on the reach.", category: "Core" },
    ],
  },
  {
    id: "B",
    label: "Day B",
    focus: "Upper Body Push + Core",
    color: "#4a90d9",
    gym: [
      { name: "Dumbbell Bench Press", sets: "3", reps: "10–12", weight: "10# DBs → progress to 15# → 20#", cue: "Feet flat, slight arch. Lower slowly to chest level, press with control. Don't let shoulders flare forward.", category: "Chest / Shoulders" },
      { name: "Dumbbell Row (each arm)", sets: "3", reps: "10–12 each", weight: "15# → 20# DBs", cue: "Brace on the bench. Pull elbow to hip, not ear. Squeeze at the top.", category: "Back" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10–12", weight: "8# → 10# → 15# DBs", cue: "Seated or standing. Brace core. Press straight up, lower to 90°. Don't shrug.", category: "Shoulders" },
      { name: "Ring or Inverted Row", sets: "3", reps: "10–12", weight: "Bodyweight — angle determines difficulty", cue: "Body straight like a plank. Pull chest to hands. Harder = more horizontal.", category: "Back / Biceps" },
      { name: "Hollow Body Hold", sets: "3", reps: "20–30 sec", weight: "Bodyweight", cue: "Lower back pressed DOWN. Arms overhead or crossed. Legs low. Feel your abs working hard.", category: "Core" },
    ],
    pushupNote: "Progression ladder: (1) Elevated hands on barbell at hip height — start here. (2) Elevated on bench height. (3) Knees on floor. (4) Full push-up. Move down one level when you can hit 3×12 with perfect form.",
    bodyweight: [
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps (8–15)", weight: "See ladder below — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line — no sagging hips. Lower chest to the surface, press back up. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. Drop down a level anytime form breaks.", category: "Chest / Shoulders" },
      { name: "Pike Push-Up", sets: "3", reps: "8–12", weight: "Bodyweight", cue: "Start in a downward-dog position, bend elbows and lower your head toward the floor. Press back up. This hits the shoulders hard — more vertical than a regular push-up.", category: "Shoulders" },
      { name: "Doorframe Row or Table Row", sets: "3", reps: "10–12", weight: "Bodyweight", cue: "Grip a doorframe at chest height, lean back, pull yourself in. Or lie under a table and row up to it. Keep your body straight the whole time.", category: "Back" },
      { name: "Tricep Dip (chair or floor)", sets: "3", reps: "10–15", weight: "Bodyweight", cue: "Hands on chair behind you, lower your body by bending the elbows, press back up. Keep your hips close to the chair. Feel the back of the arm working.", category: "Triceps" },
      { name: "Hollow Body Hold", sets: "3", reps: "20–30 sec", weight: "Bodyweight", cue: "Lower back pressed DOWN. Arms overhead or crossed. Legs low. Feel your abs working hard.", category: "Core" },
    ],
  },
  {
    id: "C",
    label: "Day C",
    focus: "Full Body + Finisher",
    color: "#3cb87a",
    gym: [
      { name: "Barbell Back Squat", sets: "3", reps: "8–10", weight: "Women's bar only (35#) or + 5s each side to start", cue: "This is the money lift. Bar on traps, brace core hard, squat to parallel or below. Your dad can spot.", category: "Legs / Full Body" },
      { name: "Romanian Deadlift to Row Combo", sets: "3", reps: "10", weight: "15# DBs", cue: "RDL down, row at the bottom, stand back up. Two movements = more bang for your time.", category: "Posterior Chain / Back" },
      { name: "Box Step-Up with DB", sets: "3", reps: "10 each leg", weight: "10–15# DBs / use 20\" box", cue: "Drive through your heel. Don't push off the back leg. Full hip extension at the top.", category: "Legs / Glutes" },
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps (aim 8–12)", weight: "See ladder — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. Move down one level when you hit 3×12 with perfect form.", category: "Chest / Triceps" },
      { name: "Assault Bike Finisher", sets: "—", reps: "3 rounds: 20 sec hard / 40 sec easy", weight: "Bodyweight", cue: "All-out for 20 seconds, recover on the 40. This is the stomach finisher — boosts metabolic conditioning.", category: "Conditioning" },
    ],
    bodyweight: [
      { name: "Jump Squat or Squat Pulse", sets: "3", reps: "15 jumps or 20 pulses", weight: "Bodyweight", cue: "Squat down, explode up into a jump, land softly. If low impact needed, stay in the squat and pulse at the bottom for 20 reps. Both options build serious leg endurance.", category: "Legs / Full Body" },
      { name: "Reverse Lunge", sets: "3", reps: "10 each leg", weight: "Bodyweight — slow and controlled", cue: "Step back, lower your back knee toward the floor, drive through the front heel to stand. Easier on the knees than forward lunge. Hits the glutes and quads.", category: "Legs / Glutes" },
      { name: "Plank to Downward Dog", sets: "3", reps: "10 reps", weight: "Bodyweight", cue: "Start in a plank, push hips up to a downward dog position, then return. This flows between shoulder stability and hamstring stretch. Keep it controlled.", category: "Full Body" },
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps", weight: "See ladder — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. This is the finisher — push to your limit each set.", category: "Chest / Triceps" },
      { name: "Burpee (modified or full)", sets: "3", reps: "8–10", weight: "Bodyweight", cue: "Squat down, step or jump feet back to plank, do a push-up, step or jump feet in, stand up. This is the cardio finisher replacement for the assault bike. Go at your own pace — form over speed.", category: "Conditioning" },
    ],
  },
];

const RECOVERY = [
  { icon: "🚶", title: "Zone 2 Walk", desc: "20–30 min at conversational pace. Flat or slight incline. This is active, not intense." },
  { icon: "🏃", title: "Easy Jog", desc: "15–20 min. Keep pace where you could talk in full sentences. Don't push it — this is recovery." },
  { icon: "🚴", title: "Assault Bike Easy", desc: "20 min at low-moderate effort. Great for blood flow without taxing muscles you trained." },
];

const STRETCHES = [
  { name: "Kneeling Hip Flexor Stretch", hold: "45–60 sec each side", target: "Hip Flexors", cue: "Kneel on one knee, step the other foot forward. Drive your hips forward gently until you feel the front of the back hip. Keep your torso tall — don't lean forward. Most important stretch if you sit a lot." },
  { name: "Standing Hamstring Stretch", hold: "45–60 sec each side", target: "Hamstrings", cue: "Stand and place one heel on a surface at hip height. Keep that leg straight, hinge slightly forward from the hip — not the lower back. Feel the pull behind your thigh. Switch sides." },
  { name: "Pigeon Pose (or Figure-4 on back)", hold: "60–90 sec each side", target: "Glutes / Hip Rotators", cue: "On the floor: cross one ankle over the opposite knee and gently press the knee away. Or full pigeon on the ground if comfortable. Targets the deep glute — especially important after hip thrusts and squats." },
  { name: "Lying Glute Stretch", hold: "45 sec each side", target: "Glutes / Lower Back", cue: "On your back, pull one knee across your body toward the opposite shoulder. Keep your shoulder blades flat on the floor. Breathe into it." },
  { name: "Doorway Chest Stretch", hold: "45 sec each side", target: "Chest / Front Shoulder", cue: "Place forearm on a doorframe at 90°, step through gently. Feel the stretch across your chest and front shoulder. Counters the bench press and push-up work." },
  { name: "Overhead Tricep + Lat Stretch", hold: "30–45 sec each side", target: "Lats / Triceps", cue: "Raise one arm, bend it behind your head, use the other hand to gently press the elbow down. Lean slightly to the opposite side to hit the lat. Long stretch down the side of your torso." },
  { name: "Cat-Cow", hold: "10 slow reps", target: "Thoracic Spine / Core", cue: "On hands and knees. Inhale — drop your belly, lift your chest and tailbone (cow). Exhale — round your entire spine toward the ceiling (cat). Move slowly with your breath." },
  { name: "Child's Pose", hold: "60–90 sec", target: "Lower Back / Hips / Shoulders", cue: "Kneel and sit back toward your heels, arms stretched forward on the floor. Let gravity do the work. Breathe deep into your lower back. Cool-down finisher — just relax into it." },
];

const SCHEDULE = [
  { day: "Mon", type: "strength", label: "Day A — Lower + Pull" },
  { day: "Tue", type: "recovery", label: "Active Recovery" },
  { day: "Wed", type: "strength", label: "Day B — Upper Push + Core" },
  { day: "Thu", type: "recovery", label: "Active Recovery" },
  { day: "Fri", type: "strength", label: "Day C — Full Body + Finisher" },
  { day: "Sat", type: "rest", label: "Rest or Walk" },
  { day: "Sun", type: "rest", label: "Rest" },
];

const NOTES = [
  { title: "Progressive Overload", body: "The whole game is adding weight or reps over time. Every 1–2 weeks, if she hits the top of the rep range across all sets, add the smallest increment (2.5–5#). Keep a simple log." },
  { title: "Nutrition (Critical for Muscle Gain)", body: "At 100 lbs she likely needs to eat MORE than she wants to. Target 110–120g protein/day. Add eggs, Greek yogurt, chicken, cottage cheese. She won't gain muscle in a calorie deficit." },
  { title: "Form First, Weight Second", body: "First 4 weeks = technique. Especially the squat and RDL — these will be the foundation. Your coaching here is the real asset." },
  { title: "Warm-Up (5 min)", body: "Every session: 2 min jump rope or assault bike + leg swings + arm circles + 10 bodyweight squats. Gets her warm without eating into the 40-min window." },
  { title: "Phase 2 (Weeks 7–12)", body: "Add barbell RDL, increase squat load meaningfully, introduce KB swings (35# → 53#), consider adding a 4th day. Pull-ups should be unassisted by then." },
];

export default function FitnessProgram() {
  const [activeDay, setActiveDay] = useState("A");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [tab, setTab] = useState("program");
  const [mode, setMode] = useState("gym");

  const currentDay = DAYS.find((d) => d.id === activeDay);
  const exercises = mode === "gym" ? currentDay.gym : currentDay.bodyweight;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0f0f0f", minHeight: "100vh", color: "#e8e0d4", padding: "0" }}>

      <div style={{ background: "linear-gradient(135deg, #1a1108 0%, #0f0f0f 100%)", borderBottom: "1px solid #2a2418", padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#e8673a", textTransform: "uppercase", marginBottom: 8 }}>The Foundry · Starter Program</div>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 400, margin: "0 0 6px", letterSpacing: "-0.02em", color: "#f0e8d8", lineHeight: 1.1 }}>Strength Foundation</h1>
          <p style={{ margin: 0, color: "#8a7d6a", fontSize: 14, fontStyle: "italic" }}>3-day / week · 40 min sessions · Muscle gain focus · Beginner</p>
        </div>
      </div>

      <div style={{ background: "#141210", borderBottom: "1px solid #1e1a14", padding: "16px 24px", overflowX: "auto" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: 8, minWidth: "fit-content" }}>
          {SCHEDULE.map((s) => (
            <div key={s.day} style={{
              flex: 1, minWidth: 70, textAlign: "center", padding: "10px 8px", borderRadius: 8,
              background: s.type === "strength" ? "rgba(232,103,58,0.12)" : s.type === "recovery" ? "rgba(74,144,217,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${s.type === "strength" ? "rgba(232,103,58,0.25)" : s.type === "recovery" ? "rgba(74,144,217,0.15)" : "#1e1a14"}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: s.type === "strength" ? "#e8673a" : s.type === "recovery" ? "#4a90d9" : "#4a4238", marginBottom: 4 }}>{s.day}</div>
              <div style={{ fontSize: 9, color: s.type === "rest" ? "#3a3228" : "#8a7d6a", lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#0f0f0f", borderBottom: "1px solid #1e1a14", padding: "0 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex" }}>
          {[{ id: "program", label: "Training Days" }, { id: "recovery", label: "Recovery Days" }, { id: "notes", label: "Coach Notes" }].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none",
              borderBottom: tab === t.id ? "2px solid #e8673a" : "2px solid transparent",
              color: tab === t.id ? "#e8e0d4" : "#5a5040",
              padding: "14px 16px", fontSize: 13, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "Georgia, serif", transition: "color 0.2s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 24px 60px" }}>

        {tab === "program" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {DAYS.map((d) => (
                <button key={d.id} onClick={() => { setActiveDay(d.id); setExpandedExercise(null); }} style={{
                  flex: 1, padding: "14px 8px",
                  background: activeDay === d.id ? d.color : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeDay === d.id ? d.color : "#2a2418"}`,
                  borderRadius: 10, color: activeDay === d.id ? "#fff" : "#6a5d50",
                  cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.05em", opacity: 0.8 }}>{d.focus}</div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4, border: "1px solid #2a2418" }}>
              <button onClick={() => { setMode("gym"); setExpandedExercise(null); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: mode === "gym" ? currentDay.color : "transparent",
                color: mode === "gym" ? "#fff" : "#5a5040",
                fontSize: 13, fontFamily: "Georgia, serif", letterSpacing: "0.05em", transition: "all 0.2s",
              }}>🏋️ Gym Access</button>
              <button onClick={() => { setMode("bodyweight"); setExpandedExercise(null); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: mode === "bodyweight" ? currentDay.color : "transparent",
                color: mode === "bodyweight" ? "#fff" : "#5a5040",
                fontSize: 13, fontFamily: "Georgia, serif", letterSpacing: "0.05em", transition: "all 0.2s",
              }}>🏠 No Equipment</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {exercises.map((ex, i) => (
                <div key={i} onClick={() => setExpandedExercise(expandedExercise === i ? null : i)} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${expandedExercise === i ? currentDay.color + "60" : "#1e1a14"}`,
                  borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 9, letterSpacing: "0.12em", color: currentDay.color, textTransform: "uppercase", background: currentDay.color + "20", padding: "2px 7px", borderRadius: 4 }}>{ex.category}</span>
                      </div>
                      <div style={{ fontSize: 16, color: "#e8e0d4", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 6 }}>{ex.name}</div>
                      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#8a7d6a" }}>
                        <span><span style={{ color: currentDay.color }}>{ex.sets}</span> sets</span>
                        <span><span style={{ color: currentDay.color }}>{ex.reps}</span> reps</span>
                      </div>
                    </div>
                    <div style={{ color: expandedExercise === i ? currentDay.color : "#3a3228", fontSize: 18, marginLeft: 12, flexShrink: 0, transition: "transform 0.2s, color 0.2s", transform: expandedExercise === i ? "rotate(180deg)" : "none" }}>▾</div>
                  </div>
                  {expandedExercise === i && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${currentDay.color}30` }}>
                      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#5a5040", textTransform: "uppercase", marginBottom: 4 }}>Load / Weight</div>
                        <div style={{ fontSize: 13, color: "#c8b89a" }}>{ex.weight}</div>
                      </div>
                      <div style={{ background: currentDay.color + "10", borderLeft: `2px solid ${currentDay.color}`, padding: "10px 14px", borderRadius: "0 8px 8px 0" }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: currentDay.color, textTransform: "uppercase", marginBottom: 4 }}>Coaching Cue</div>
                        <div style={{ fontSize: 13, color: "#c8b89a", lineHeight: 1.6, fontStyle: "italic" }}>{ex.cue}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentDay.pushupNote && (
              <div style={{ marginTop: 12, background: "rgba(232,103,58,0.08)", border: "1px solid rgba(232,103,58,0.25)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#e8673a", textTransform: "uppercase", marginBottom: 6 }}>Push-Up Progression Ladder</div>
                <div style={{ fontSize: 13, color: "#c8b89a", lineHeight: 1.65 }}>{currentDay.pushupNote}</div>
              </div>
            )}

            <div style={{ marginTop: 20, background: "rgba(255,255,255,0.02)", border: "1px solid #1e1a14", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#5a5040", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Rest Between Sets</div>
                <div style={{ fontSize: 20, color: "#e8673a" }}>90 sec</div>
              </div>
              <div style={{ width: 1, background: "#1e1a14" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#5a5040", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Est. Session Time</div>
                <div style={{ fontSize: 20, color: "#e8673a" }}>35–40 min</div>
              </div>
              <div style={{ width: 1, background: "#1e1a14" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#5a5040", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Warm-Up</div>
                <div style={{ fontSize: 20, color: "#e8673a" }}>5 min</div>
              </div>
            </div>
          </div>
        )}

        {tab === "recovery" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a90d9", textTransform: "uppercase", marginBottom: 12 }}>Cardio — Pick One · 20–30 min</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {RECOVERY.map((r, i) => (
                <div key={i} style={{ background: "rgba(74,144,217,0.06)", border: "1px solid rgba(74,144,217,0.15)", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, color: "#e8e0d4", marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 13, color: "#8a7d6a", lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#c87a4a", textTransform: "uppercase", marginBottom: 12 }}>Stretching Routine · 10–15 min · Do All 8</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {STRETCHES.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e1a14", borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.12em", color: "#c87a4a", textTransform: "uppercase", background: "rgba(200,122,74,0.12)", padding: "2px 7px", borderRadius: 4 }}>{s.target}</span>
                    <span style={{ fontSize: 11, color: "#5a5040" }}>{s.hold}</span>
                  </div>
                  <div style={{ fontSize: 15, color: "#e8e0d4", marginBottom: 8 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#8a7d6a", lineHeight: 1.65, fontStyle: "italic", borderLeft: "2px solid rgba(200,122,74,0.3)", paddingLeft: 12 }}>{s.cue}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(60,184,122,0.06)", border: "1px solid rgba(60,184,122,0.2)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#3cb87a", textTransform: "uppercase", marginBottom: 8 }}>Core Principle</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8a7d6a", lineHeight: 1.7 }}>Muscle is built during <em>recovery</em>, not during the workout. Recovery days aren't optional — they're where adaptation happens. If you're sore, walking and light movement will clear it faster than sitting still.</p>
            </div>
          </div>
        )}

        {tab === "notes" && (
          <div>
            <p style={{ color: "#6a5d50", fontSize: 13, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>The program works. These variables determine whether the results show up.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NOTES.map((n, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2a2418", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e8673a", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, color: "#e8e0d4" }}>{n.title}</div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#8a7d6a", lineHeight: 1.7, paddingLeft: 34 }}>{n.body}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, background: "rgba(255,255,255,0.02)", border: "1px solid #2a2418", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#e8673a", textTransform: "uppercase", marginBottom: 12 }}>Phase Structure</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { phase: "Weeks 1–2", label: "Movement Pattern Learning", desc: "Light loads. Master form on squat, RDL, press." },
                  { phase: "Weeks 3–6", label: "Base Building", desc: "Add load progressively. Hit the rep targets consistently. Pull-up progression begins." },
                  { phase: "Weeks 7–12", label: "Phase 2 Transition", desc: "Introduce barbell deadlift, increase squat load, add KB swings, optional 4th day." },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 10, color: "#e8673a", background: "rgba(232,103,58,0.12)", padding: "3px 8px", borderRadius: 4, flexShrink: 0, marginTop: 1, minWidth: 80, textAlign: "center" }}>{p.phase}</div>
                    <div>
                      <div style={{ fontSize: 13, color: "#c8b89a", marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: "#6a5d50" }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
