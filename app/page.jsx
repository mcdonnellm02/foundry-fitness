"use client";

import { useState } from "react";

const DAYS = [
  {
    id: "A", label: "Day A", focus: "Lower Body + Pull", color: "#e8673a",
    gym: [
      { name: "Goblet Squat", sets: "3", reps: "10–12", weight: "25# KB → progress to 35#", cue: "Chest up, knees track over toes, full depth. Keep the KB close to your sternum.", category: "Legs", video: "BR4tlEE_A98" },
      { name: "Romanian Deadlift (RDL)", sets: "3", reps: "10–12", weight: "Women's bar (35#) + 5s or 10s", cue: "Hinge at hips, soft knee bend, bar drags down your shins. Feel the hamstring stretch.", category: "Posterior Chain", video: "vnEANU7BqqY" },
      { name: "Assisted or Banded Pull-Up", sets: "3", reps: "5–8", weight: "Resistance band assist — lightest band that makes reps hard", cue: "Initiate with the lats, not a shrug. Chin clears bar = full rep. Build to unassisted over time.", category: "Back / Biceps", video: "ZTsuNUzq3e4" },
      { name: "Hip Thrust (Barbell or KB)", sets: "3", reps: "12–15", weight: "25# DB pair / 35# KB on hips", cue: "Shoulders on bench, drive hips to full extension. Squeeze at the top for 1 count. This builds the glutes.", category: "Glutes", video: "lBZZFJ6Z3Dg" },
      { name: "Dead Bug", sets: "3", reps: "8 each side", weight: "Bodyweight", cue: "Lower back MUST stay flat against the floor. Slow and controlled. Breathe out on the reach.", category: "Core", video: "JrcoGEZn6L4" },
    ],
    bodyweight: [
      { name: "Bodyweight Squat", sets: "3", reps: "15–20", weight: "Bodyweight — slow the descent to 3 counts", cue: "Chest up, knees track toes, squat as deep as you can. Tempo is the load here — make each rep take 5 seconds total.", category: "Legs", video: "l83R5PblSMA" },
      { name: "Single-Leg Romanian Deadlift", sets: "3", reps: "10 each side", weight: "Bodyweight — use a wall for balance if needed", cue: "Stand on one leg, hinge forward at the hip, opposite leg extends back. Feel the hamstring load on the standing leg. Control the movement.", category: "Posterior Chain", video: "JQZqPsmeesc" },
      { name: "Inverted Row (under a table) or Doorframe Row", sets: "3", reps: "8–12", weight: "Bodyweight — lean back more to make it harder", cue: "Lie under a sturdy table, grip the edge, keep your body straight and pull your chest up to it. Or grip a doorframe at hip height, lean back, and row. This replaces the pull-up.", category: "Back / Biceps", video: "Fl0UMfdEzsE" },
      { name: "Glute Bridge", sets: "3", reps: "15–20", weight: "Bodyweight — pause 2 sec at top", cue: "On your back, feet flat, drive hips up and squeeze hard at the top. Hold 2 seconds every rep. Progress by doing single-leg version.", category: "Glutes", video: "Xp33YgPZgns" },
      { name: "Dead Bug", sets: "3", reps: "8 each side", weight: "Bodyweight", cue: "Lower back MUST stay flat against the floor. Slow and controlled. Breathe out on the reach.", category: "Core", video: "JrcoGEZn6L4" },
    ],
  },
  {
    id: "B", label: "Day B", focus: "Upper Body Push + Core", color: "#4a90d9",
    pushupNote: "Progression ladder: (1) Elevated hands on barbell at hip height — start here. (2) Elevated on bench height. (3) Knees on floor. (4) Full push-up. Move down one level when you can hit 3×12 with perfect form.",
    gym: [
      { name: "Dumbbell Bench Press", sets: "3", reps: "10–12", weight: "10# DBs → progress to 15# → 20#", cue: "Feet flat, slight arch. Lower slowly to chest level, press with control. Don't let shoulders flare forward.", category: "Chest / Shoulders", video: "xhEhjF5ozuY" },
      { name: "Dumbbell Row (each arm)", sets: "3", reps: "10–12 each", weight: "15# → 20# DBs", cue: "Brace on the bench. Pull elbow to hip, not ear. Squeeze at the top.", category: "Back", video: "gfUg6qWohTk" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10–12", weight: "8# → 10# → 15# DBs", cue: "Seated or standing. Brace core. Press straight up, lower to 90°. Don't shrug.", category: "Shoulders", video: "qEwKCR5JCog" },
      { name: "Ring or Inverted Row", sets: "3", reps: "10–12", weight: "Bodyweight — angle determines difficulty", cue: "Body straight like a plank. Pull chest to hands. Harder = more horizontal.", category: "Back / Biceps", video: "Fl0UMfdEzsE" },
      { name: "Hollow Body Hold", sets: "3", reps: "20–30 sec", weight: "Bodyweight", cue: "Lower back pressed DOWN. Arms overhead or crossed. Legs low. Feel your abs working hard.", category: "Core", video: "HAfUt2Cco74" },
    ],
    bodyweight: [
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps (8–15)", weight: "See ladder below — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line — no sagging hips. Lower chest to the surface, press back up. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. Drop down a level anytime form breaks.", category: "Chest / Shoulders", video: "t09H_B6hrm8" },
      { name: "Pike Push-Up", sets: "3", reps: "8–12", weight: "Bodyweight", cue: "Start in a downward-dog position, bend elbows and lower your head toward the floor. Press back up. This hits the shoulders hard — more vertical than a regular push-up.", category: "Shoulders", video: "x7_I5SUAd00" },
      { name: "Doorframe Row or Table Row", sets: "3", reps: "10–12", weight: "Bodyweight", cue: "Grip a doorframe at chest height, lean back, pull yourself in. Or lie under a table and row up to it. Keep your body straight the whole time.", category: "Back", video: "laxlC3wq6sU" },
      { name: "Tricep Dip (chair or floor)", sets: "3", reps: "10–15", weight: "Bodyweight", cue: "Hands on chair behind you, lower your body by bending the elbows, press back up. Keep your hips close to the chair. Feel the back of the arm working.", category: "Triceps", video: "HCf97NPYeGY" },
      { name: "Hollow Body Hold", sets: "3", reps: "20–30 sec", weight: "Bodyweight", cue: "Lower back pressed DOWN. Arms overhead or crossed. Legs low. Feel your abs working hard.", category: "Core", video: "HAfUt2Cco74" },
    ],
  },
  {
    id: "C", label: "Day C", focus: "Full Body + Finisher", color: "#3cb87a",
    gym: [
      { name: "Barbell Back Squat", sets: "3", reps: "8–10", weight: "Women's bar only (35#) or + 5s each side to start", cue: "This is the money lift. Bar on traps, brace core hard, squat to parallel or below. Your dad can spot.", category: "Legs / Full Body", video: "8PMjqgR8Wa8" },
      { name: "Romanian Deadlift to Row Combo", sets: "3", reps: "10", weight: "15# DBs", cue: "RDL down, row at the bottom, stand back up. Two movements = more bang for your time.", category: "Posterior Chain / Back", video: "NcrOitNgHfI" },
      { name: "Box Step-Up with DB", sets: "3", reps: "10 each leg", weight: "10–15# DBs / use 20\" box", cue: "Drive through your heel. Don't push off the back leg. Full hip extension at the top.", category: "Legs / Glutes", video: "DxUNi119Qzs" },
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps (aim 8–12)", weight: "See ladder — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. Move down one level when you hit 3×12 with perfect form.", category: "Chest / Triceps", video: "t09H_B6hrm8" },
      { name: "Assault Bike Finisher", sets: "—", reps: "3 rounds: 20 sec hard / 40 sec easy", weight: "Bodyweight", cue: "All-out for 20 seconds, recover on the 40. This is the stomach finisher — boosts metabolic conditioning.", category: "Conditioning", video: null },
    ],
    bodyweight: [
      { name: "Jump Squat or Squat Pulse", sets: "3", reps: "15 jumps or 20 pulses", weight: "Bodyweight", cue: "Squat down, explode up into a jump, land softly. If low impact needed, stay in the squat and pulse at the bottom for 20 reps. Both options build serious leg endurance.", category: "Legs / Full Body", video: "BRfxI2Es2lE" },
      { name: "Reverse Lunge", sets: "3", reps: "10 each leg", weight: "Bodyweight — slow and controlled", cue: "Step back, lower your back knee toward the floor, drive through the front heel to stand. Easier on the knees than forward lunge. Hits the glutes and quads.", category: "Legs / Glutes", video: "xrPteyQLGAo" },
      { name: "Plank to Downward Dog", sets: "3", reps: "10 reps", weight: "Bodyweight", cue: "Start in a plank, push hips up to a downward dog position, then return. This flows between shoulder stability and hamstring stretch. Keep it controlled.", category: "Full Body", video: "u8eUdDxyAMg" },
      { name: "Push-Up Progression", sets: "3", reps: "Max quality reps", weight: "See ladder — start where you can get 8+ clean reps", cue: "Hands slightly wider than shoulders. Body in a straight line. PROGRESSION LADDER: (1) Hands on barbell at hip height — start here. (2) Hands on bench height. (3) Knees on floor. (4) Full push-up. This is the finisher — push to your limit each set.", category: "Chest / Triceps", video: "t09H_B6hrm8" },
      { name: "Burpee (modified or full)", sets: "3", reps: "8–10", weight: "Bodyweight", cue: "Squat down, step or jump feet back to plank, do a push-up, step or jump feet in, stand up. This is the cardio finisher replacement for the assault bike. Go at your own pace — form over speed.", category: "Conditioning", video: "q_UDHn7uN-0" },
    ],
  },
];

const RECOVERY = [
  { icon: "🚶", title: "Zone 2 Walk", desc: "20–30 min at conversational pace. Flat or slight incline. This is active, not intense." },
  { icon: "🏃", title: "Easy Jog", desc: "15–20 min. Keep pace where you could talk in full sentences. Don't push it — this is recovery." },
  { icon: "🚴", title: "Assault Bike Easy", desc: "20 min at low-moderate effort. Great for blood flow without taxing muscles you trained." },
];

const STRETCHES = [
  { name: "Kneeling Hip Flexor Stretch", hold: "45–60 sec each side", target: "Hip Flexors", cue: "Kneel on one knee, step the other foot forward. Drive your hips forward gently until you feel the front of the back hip. Keep your torso tall — don't lean forward. Most important stretch if you sit a lot.", video: "Q4Ko275cluo" },
  { name: "Standing Hamstring Stretch", hold: "45–60 sec each side", target: "Hamstrings", cue: "Stand and place one heel on a surface at hip height. Keep that leg straight, hinge slightly forward from the hip — not the lower back. Feel the pull behind your thigh. Switch sides.", video: "Jku6PwFGBGk" },
  { name: "Pigeon Pose (or Figure-4 on back)", hold: "60–90 sec each side", target: "Glutes / Hip Rotators", cue: "On the floor: cross one ankle over the opposite knee and gently press the knee away. Or full pigeon on the ground if comfortable. Targets the deep glute — especially important after hip thrusts and squats.", video: "Nz3gOPDNx5Q" },
  { name: "Lying Glute Stretch", hold: "45 sec each side", target: "Glutes / Lower Back", cue: "On your back, pull one knee across your body toward the opposite shoulder. Keep your shoulder blades flat on the floor. Breathe into it.", video: "5gb1G9GKRgQ" },
  { name: "Doorway Chest Stretch", hold: "45 sec each side", target: "Chest / Front Shoulder", cue: "Place forearm on a doorframe at 90°, step through gently. Feel the stretch across your chest and front shoulder. Counters the bench press and push-up work.", video: "tPw8bE-6drU" },
  { name: "Overhead Tricep + Lat Stretch", hold: "30–45 sec each side", target: "Lats / Triceps", cue: "Raise one arm, bend it behind your head, use the other hand to gently press the elbow down. Lean slightly to the opposite side to hit the lat. Long stretch down the side of your torso.", video: "-WFQhIRimnw" },
  { name: "Cat-Cow", hold: "10 slow reps", target: "Thoracic Spine / Core", cue: "On hands and knees. Inhale — drop your belly, lift your chest and tailbone (cow). Exhale — round your entire spine toward the ceiling (cat). Move slowly with your breath.", video: "Fa4ZMS5M7xA" },
  { name: "Child's Pose", hold: "60–90 sec", target: "Lower Back / Hips / Shoulders", cue: "Kneel and sit back toward your heels, arms stretched forward on the floor. Let gravity do the work. Breathe deep into your lower back. Cool-down finisher — just relax into it.", video: "kH12QrSGedM" },
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
  { title: "Nutrition (Critical for Muscle Gain)", body: "At 108 lbs she likely needs to eat MORE than she wants to. Target 95–110g protein/day. Add eggs, Greek yogurt, chicken, cottage cheese. She won't gain muscle in a calorie deficit." },
  { title: "Form First, Weight Second", body: "First 4 weeks = technique. Especially the squat and RDL — these will be the foundation. Your coaching here is the real asset." },
  { title: "Warm-Up (5 min)", body: "Every session: 2 min jump rope or assault bike + leg swings + arm circles + 10 bodyweight squats. Gets her warm without eating into the 40-min window." },
  { title: "Phase 2 (Weeks 7–12)", body: "Add barbell RDL, increase squat load meaningfully, introduce KB swings (35# → 53#), consider adding a 4th day. Pull-ups should be unassisted by then." },
];

const PROTEIN_FOODS = [
  { emoji: "🍗", name: "Chicken Breast", grams: 35, serving: "4 oz (1 palm)", visual: "palm", tip: "One palm-sized piece, about as thick as a deck of cards. Grill, bake, or air fry — easiest high-protein option.", primary: true },
  { emoji: "🥩", name: "Ground Beef (90% lean)", grams: 28, serving: "4 oz cooked", visual: "palm", tip: "A palm-sized portion cooked. Great in taco bowls, pasta, or burgers. The fat content makes it more filling than chicken.", primary: true },
  { emoji: "🥚", name: "Eggs", grams: 6, serving: "1 large egg", visual: "egg", tip: "Each egg has about 6g. Two eggs = 12g, three eggs = 18g. Fast, cheap, complete protein. Scramble, fry, or hard-boil for meal prep.", primary: true },
  { emoji: "🫙", name: "Greek Yogurt", grams: 17, serving: "1 cup (fist-sized)", visual: "fist", tip: "One fist-sized serving. Go for plain or low-sugar. Add berries or honey for flavor. Great breakfast base or snack.", primary: true },
  { emoji: "🥛", name: "Protein Shake", grams: 22, serving: "1 scoop in water or milk", visual: "scoop", tip: "Use as a convenience backfill — after a workout or when a meal falls short. Whole food protein first whenever possible.", primary: false },
  { emoji: "🧀", name: "Cottage Cheese", grams: 14, serving: "½ cup (half fist)", visual: "fist", tip: "Half a fist-sized portion. High in casein protein — digests slowly, making it great before bed to support overnight muscle recovery.", primary: true },
  { emoji: "🫘", name: "Edamame", grams: 17, serving: "1 cup shelled", visual: "fist", tip: "One full fist, shelled. One of the only plant foods with complete protein. Great warm snack or add to bowls and salads.", primary: false },
  { emoji: "🍫", name: "Barebells Bar", grams: 20, serving: "1 bar", visual: "bar", tip: "Candy-bar size, 20g protein. Best as a snack or on-the-go option — not a meal replacement, but great for hitting your daily target when life gets busy.", primary: false },
];

const MEAL_PLANS = {
  3: [
    {
      label: "Breakfast", emoji: "🌅", target: 25, color: "#e8673a",
      meals: [
        { name: "Egg scramble + Greek yogurt", protein: 29, desc: "3 scrambled eggs + ¾ cup Greek yogurt with berries", tags: ["quick", "no cook"] },
        { name: "Greek yogurt parfait", protein: 25, desc: "1 cup Greek yogurt + ½ cup cottage cheese + granola", tags: ["no cook"] },
        { name: "Egg & cheese wrap", protein: 27, desc: "3 eggs + 1 oz cheese in a whole wheat tortilla", tags: ["quick"] },
      ]
    },
    {
      label: "Lunch", emoji: "☀️", target: 40, color: "#4a90d9",
      meals: [
        { name: "Chicken & cottage cheese bowl", protein: 49, desc: "4 oz grilled chicken + ½ cup cottage cheese + rice + salsa", tags: ["meal prep"] },
        { name: "Ground beef taco bowl", protein: 38, desc: "4 oz ground beef + rice + cheese + Greek yogurt (as sour cream)", tags: ["easy"] },
        { name: "Chicken wrap", protein: 42, desc: "4 oz chicken + Greek yogurt ranch + veggies in large tortilla", tags: ["quick"] },
      ]
    },
    {
      label: "Dinner", emoji: "🌙", target: 40, color: "#3cb87a",
      meals: [
        { name: "Steak + eggs", protein: 46, desc: "4 oz sirloin steak + 2 fried eggs + roasted potatoes", tags: ["satisfying"] },
        { name: "Chicken thighs + edamame", protein: 44, desc: "4 oz chicken thighs + 1 cup edamame + rice", tags: ["easy"] },
        { name: "Ground beef & egg bowl", protein: 40, desc: "3 oz ground beef + 2 eggs + cheese over rice", tags: ["meal prep"] },
      ]
    },
  ],
  4: [
    {
      label: "Breakfast", emoji: "🌅", target: 25, color: "#e8673a",
      meals: [
        { name: "Egg scramble + Greek yogurt", protein: 29, desc: "3 scrambled eggs + ¾ cup Greek yogurt", tags: ["quick"] },
        { name: "Cottage cheese bowl", protein: 25, desc: "1 cup cottage cheese + berries + honey + granola", tags: ["no cook"] },
        { name: "3-egg omelet", protein: 24, desc: "3 eggs + 1 oz cheese + veggies", tags: ["quick"] },
      ]
    },
    {
      label: "Lunch", emoji: "☀️", target: 30, color: "#4a90d9",
      meals: [
        { name: "Chicken rice bowl", protein: 35, desc: "4 oz grilled chicken + rice + salsa + Greek yogurt", tags: ["meal prep"] },
        { name: "Ground beef taco bowl", protein: 32, desc: "3.5 oz ground beef + rice + cheese + salsa", tags: ["easy"] },
        { name: "Chicken wrap", protein: 33, desc: "3.5 oz chicken + cheese + veggies in tortilla", tags: ["quick"] },
      ]
    },
    {
      label: "Dinner", emoji: "🌙", target: 30, color: "#3cb87a",
      meals: [
        { name: "Steak + side", protein: 33, desc: "3.5 oz sirloin + 1 egg + roasted veggies", tags: ["satisfying"] },
        { name: "Chicken thighs + edamame", protein: 35, desc: "3.5 oz chicken thighs + 1 cup edamame", tags: ["easy"] },
        { name: "Ground beef bowl", protein: 30, desc: "3.5 oz ground beef + egg + rice + cheese", tags: ["meal prep"] },
      ]
    },
    {
      label: "Snack", emoji: "⚡", target: 20, color: "#9b6fd4",
      meals: [
        { name: "Barebells bar", protein: 20, desc: "1 Barebells protein bar — on the go, no prep", tags: ["convenience"] },
        { name: "Greek yogurt + edamame", protein: 22, desc: "½ cup Greek yogurt + ½ cup edamame", tags: ["no cook"] },
        { name: "Protein shake", protein: 22, desc: "1 scoop protein powder in milk or water", tags: ["quick"] },
      ]
    },
  ],
};

const GOOD_TO_KNOW = [
  {
    title: "Eat protein within an hour after training",
    icon: "⏱️",
    body: "On training days, getting protein soon after your workout helps kickstart muscle repair. It doesn't need to be huge — a Greek yogurt, some eggs, or a Barebells bar all work. The habit matters more than the exact timing.",
  },
  {
    title: "Drink 64–80 oz of water daily",
    icon: "💧",
    body: "Hydration directly supports how your muscles work and recover. At your size and activity level, aim for at least 8 cups daily — more on training days. If you're not peeing clear-ish, drink more.",
  },
  {
    title: "What makes a 'complete' protein",
    icon: "🧬",
    body: "Complete proteins contain all 9 essential amino acids your body can't make on its own. Chicken, beef, eggs, dairy, and protein powder are all complete. Edamame is one of the rare plant foods that qualifies. Most plant proteins (beans, nuts) are incomplete — pair them with other foods to cover all the bases.",
  },
  {
    title: "What real muscle gain looks like",
    icon: "📈",
    body: "At your size, age, and training level, gaining 0.5–1 lb of muscle per month is excellent progress — that's the realistic ceiling for a natural beginner doing everything right. Don't let the scale fool you: you might gain muscle and lose fat at the same time, so your weight barely changes while your body composition shifts noticeably. Progress photos every 4 weeks tell the real story.",
  },
  {
    title: "Whole food first, supplements second",
    icon: "🍳",
    body: "Protein shakes and bars are convenient backfills — not the foundation. Chicken, eggs, Greek yogurt, and cottage cheese are more nutrient-dense, more filling, and better for overall health. Use shakes and Barebells bars when life is busy or a meal falls short, not as a replacement for real food.",
  },
];

function VideoEmbed({ videoId, color }) {
  const [open, setOpen] = useState(false);
  if (!videoId) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{
        background: "transparent", border: `1px solid ${color}50`, borderRadius: 6,
        color: color, fontSize: 11, letterSpacing: "0.08em", padding: "5px 12px",
        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ fontSize: 13 }}>{open ? "▼" : "▶"}</span>
        {open ? "Hide Video" : "Watch Tutorial"}
      </button>
      {open && (
        <div style={{ marginTop: 10, borderRadius: 10, overflow: "hidden", aspectRatio: "16/9", background: "#000" }}>
          <iframe width="100%" height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title="Exercise tutorial" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen style={{ display: "block" }} />
        </div>
      )}
    </div>
  );
}

function ProteinBar({ grams, max = 50, color = "#e8673a" }) {
  const pct = Math.min((grams / max) * 100, 100);
  return (
    <div style={{ marginTop: 6, marginBottom: 2 }}>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function NutritionTab() {
  const [meals, setMeals] = useState(3);
  const [nutSection, setNutSection] = useState("targets");
  const [expandedFood, setExpandedFood] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [expandedKnow, setExpandedKnow] = useState(null);

  const plan = MEAL_PLANS[meals];
  const totalTarget = plan.reduce((s, m) => s + m.target, 0);

  return (
    <div>
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4, border: "1px solid #2a2418" }}>
        {[{ id: "targets", label: "Daily Targets" }, { id: "meals", label: "Meal Ideas" }, { id: "know", label: "Good to Know" }].map((s) => (
          <button key={s.id} onClick={() => setNutSection(s.id)} style={{
            flex: 1, padding: "9px 4px", borderRadius: 8, border: "none", cursor: "pointer",
            background: nutSection === s.id ? "#e8673a" : "transparent",
            color: nutSection === s.id ? "#fff" : "#5a5040",
            fontSize: 12, fontFamily: "Georgia, serif", letterSpacing: "0.03em", transition: "all 0.2s",
          }}>{s.label}</button>
        ))}
      </div>

      {nutSection === "targets" && (
        <div>
          <div style={{ background: "rgba(232,103,58,0.08)", border: "1px solid rgba(232,103,58,0.2)", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#e8673a", textTransform: "uppercase", marginBottom: 6 }}>Daily Protein Target</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 36, color: "#f0e8d8", fontWeight: 400 }}>95–110</span>
              <span style={{ fontSize: 16, color: "#8a7d6a" }}>grams / day</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: "#6a5d50", lineHeight: 1.6 }}>
              Based on 108 lbs body weight. Enough to support steady muscle growth without forcing oversized meals. Aim to be in this range most days — don't stress about hitting it exactly every day.
            </p>
          </div>

          <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8a7d6a", textTransform: "uppercase", marginBottom: 10 }}>How many meals today?</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[3, 4].map((n) => (
              <button key={n} onClick={() => setMeals(n)} style={{
                flex: 1, padding: "14px", borderRadius: 10, border: `1px solid ${meals === n ? "#e8673a" : "#2a2418"}`,
                background: meals === n ? "rgba(232,103,58,0.12)" : "rgba(255,255,255,0.03)",
                color: meals === n ? "#e8673a" : "#5a5040", cursor: "pointer", textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 400, marginBottom: 2 }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.08em" }}>meals / day</div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {plan.map((slot, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${slot.color}30`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{slot.emoji}</span>
                    <span style={{ fontSize: 15, color: "#e8e0d4" }}>{slot.label}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 24, color: slot.color, fontWeight: 400 }}>{slot.target}</span>
                    <span style={{ fontSize: 11, color: "#5a5040" }}> g</span>
                  </div>
                </div>
                <ProteinBar grams={slot.target} max={50} color={slot.color} />
                <div style={{ fontSize: 11, color: "#5a5040", marginTop: 4 }}>target — aim to hit this range at this meal</div>
              </div>
            ))}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #2a2418", borderRadius: 10, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#8a7d6a", letterSpacing: "0.05em" }}>DAILY TOTAL</span>
              <div>
                <span style={{ fontSize: 22, color: "#e8673a" }}>{totalTarget}</span>
                <span style={{ fontSize: 12, color: "#5a5040" }}> g target</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8a7d6a", textTransform: "uppercase", marginBottom: 12 }}>Protein Per Serving — Tap to Expand</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PROTEIN_FOODS.map((food, i) => (
              <div key={i} onClick={() => setExpandedFood(expandedFood === i ? null : i)} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${expandedFood === i ? "#e8673a60" : "#1e1a14"}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{food.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: "#e8e0d4" }}>{food.name}</span>
                      <span style={{ fontSize: 18, color: "#e8673a", fontWeight: 400 }}>{food.grams}g</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#5a5040" }}>{food.serving}</span>
                      {food.primary && <span style={{ fontSize: 9, color: "#3cb87a", background: "rgba(60,184,122,0.12)", padding: "1px 6px", borderRadius: 4, letterSpacing: "0.08em" }}>WHOLE FOOD FIRST</span>}
                    </div>
                    <ProteinBar grams={food.grams} max={40} color="#e8673a" />
                  </div>
                  <div style={{ color: expandedFood === i ? "#e8673a" : "#3a3228", fontSize: 16, flexShrink: 0, transform: expandedFood === i ? "rotate(180deg)" : "none" }}>▾</div>
                </div>
                {expandedFood === i && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1e1a14" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 28, flexShrink: 0 }}>
                        {food.visual === "palm" ? "🖐️" : food.visual === "fist" ? "✊" : food.visual === "egg" ? "🥚" : food.visual === "scoop" ? "🥄" : "📏"}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "#e8673a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                          {food.visual === "palm" ? "Palm-sized portion" : food.visual === "fist" ? "Fist-sized portion" : food.visual === "egg" ? "Per egg" : food.visual === "scoop" ? "One scoop" : "One bar"}
                        </div>
                        <div style={{ fontSize: 13, color: "#8a7d6a", lineHeight: 1.65, fontStyle: "italic" }}>{food.tip}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {nutSection === "meals" && (
        <div>
          <p style={{ color: "#6a5d50", fontSize: 13, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
            Simple real-food combinations with protein counts. These are starting points — mix and match based on what's in the fridge.
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[3, 4].map((n) => (
              <button key={n} onClick={() => setMeals(n)} style={{
                flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${meals === n ? "#e8673a" : "#2a2418"}`,
                background: meals === n ? "rgba(232,103,58,0.12)" : "rgba(255,255,255,0.03)",
                color: meals === n ? "#e8673a" : "#5a5040", cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
              }}>{n} meals / day</button>
            ))}
          </div>
          {plan.map((slot, si) => (
            <div key={si} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{slot.emoji}</span>
                <span style={{ fontSize: 12, letterSpacing: "0.12em", color: slot.color, textTransform: "uppercase" }}>{slot.label} — {slot.target}g target</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {slot.meals.map((meal, mi) => {
                  const key = `${si}-${mi}`;
                  return (
                    <div key={mi} onClick={() => setExpandedMeal(expandedMeal === key ? null : key)} style={{
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${expandedMeal === key ? slot.color + "60" : "#1e1a14"}`,
                      borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, color: "#e8e0d4", marginBottom: 4 }}>{meal.name}</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {meal.tags.map((tag, ti) => (
                              <span key={ti} style={{ fontSize: 9, color: slot.color, background: slot.color + "15", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.08em" }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                          <span style={{ fontSize: 20, color: slot.color }}>{meal.protein}g</span>
                        </div>
                      </div>
                      {expandedMeal === key && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${slot.color}25`, fontSize: 13, color: "#8a7d6a", lineHeight: 1.65, fontStyle: "italic" }}>
                          {meal.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ background: "rgba(60,184,122,0.06)", border: "1px solid rgba(60,184,122,0.2)", borderRadius: 10, padding: "14px 16px", marginTop: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#3cb87a", textTransform: "uppercase", marginBottom: 6 }}>On Training Days</div>
            <p style={{ margin: 0, fontSize: 13, color: "#8a7d6a", lineHeight: 1.65 }}>Try to get protein within an hour after training — a Greek yogurt, eggs, or a Barebells bar all work. Your muscles are primed to use it right after a workout.</p>
          </div>
        </div>
      )}

      {nutSection === "know" && (
        <div>
          <p style={{ color: "#6a5d50", fontSize: 13, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
            The stuff that makes the difference over weeks and months.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {GOOD_TO_KNOW.map((item, i) => (
              <div key={i} onClick={() => setExpandedKnow(expandedKnow === i ? null : i)} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${expandedKnow === i ? "#e8673a50" : "#1e1a14"}`,
                borderRadius: 12, padding: "16px 18px", cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: "#e8e0d4" }}>{item.title}</span>
                  </div>
                  <div style={{ color: expandedKnow === i ? "#e8673a" : "#3a3228", fontSize: 16, flexShrink: 0, marginLeft: 8, transform: expandedKnow === i ? "rotate(180deg)" : "none" }}>▾</div>
                </div>
                {expandedKnow === i && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1e1a14", fontSize: 13, color: "#8a7d6a", lineHeight: 1.7 }}>
                    {item.body}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FitnessProgram() {
  const [activeDay, setActiveDay] = useState("A");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [tab, setTab] = useState("program");
  const [mode, setMode] = useState("gym");

  const currentDay = DAYS.find((d) => d.id === activeDay);
  const exercises = mode === "gym" ? currentDay.gym : currentDay.bodyweight;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0f0f0f", minHeight: "100vh", color: "#e8e0d4" }}>

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

      <div style={{ background: "#0f0f0f", borderBottom: "1px solid #1e1a14", padding: "0 24px", overflowX: "auto" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", minWidth: "fit-content" }}>
          {[
            { id: "program", label: "Training" },
            { id: "recovery", label: "Recovery" },
            { id: "nutrition", label: "Nutrition" },
            { id: "notes", label: "Coach Notes" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none",
              borderBottom: tab === t.id ? "2px solid #e8673a" : "2px solid transparent",
              color: tab === t.id ? "#e8e0d4" : "#5a5040",
              padding: "14px 14px", fontSize: 13, cursor: "pointer", letterSpacing: "0.04em", fontFamily: "Georgia, serif", whiteSpace: "nowrap",
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
                  borderRadius: 10, color: activeDay === d.id ? "#fff" : "#6a5d50", cursor: "pointer", textAlign: "center",
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>{d.focus}</div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4, border: "1px solid #2a2418" }}>
              <button onClick={() => { setMode("gym"); setExpandedExercise(null); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: mode === "gym" ? currentDay.color : "transparent",
                color: mode === "gym" ? "#fff" : "#5a5040", fontSize: 13, fontFamily: "Georgia, serif",
              }}>🏋️ Gym Access</button>
              <button onClick={() => { setMode("bodyweight"); setExpandedExercise(null); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: mode === "bodyweight" ? currentDay.color : "transparent",
                color: mode === "bodyweight" ? "#fff" : "#5a5040", fontSize: 13, fontFamily: "Georgia, serif",
              }}>🏠 No Equipment</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {exercises.map((ex, i) => (
                <div key={i} onClick={() => setExpandedExercise(expandedExercise === i ? null : i)} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${expandedExercise === i ? currentDay.color + "60" : "#1e1a14"}`,
                  borderRadius: 12, padding: "16px 18px", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 9, letterSpacing: "0.12em", color: currentDay.color, textTransform: "uppercase", background: currentDay.color + "20", padding: "2px 7px", borderRadius: 4 }}>{ex.category}</span>
                      </div>
                      <div style={{ fontSize: 16, color: "#e8e0d4", marginBottom: 6 }}>{ex.name}</div>
                      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#8a7d6a" }}>
                        <span><span style={{ color: currentDay.color }}>{ex.sets}</span> sets</span>
                        <span><span style={{ color: currentDay.color }}>{ex.reps}</span> reps</span>
                      </div>
                    </div>
                    <div style={{ color: expandedExercise === i ? currentDay.color : "#3a3228", fontSize: 18, marginLeft: 12, flexShrink: 0, transform: expandedExercise === i ? "rotate(180deg)" : "none" }}>▾</div>
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
                      <VideoEmbed videoId={ex.video} color={currentDay.color} />
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
                  <div style={{ fontSize: 12, color: "#8a7d6a", lineHeight: 1.65, fontStyle: "italic", borderLeft: "2px solid rgba(200,122,74,0.3)", paddingLeft: 12, marginBottom: 4 }}>{s.cue}</div>
                  <VideoEmbed videoId={s.video} color="#c87a4a" />
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(60,184,122,0.06)", border: "1px solid rgba(60,184,122,0.2)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#3cb87a", textTransform: "uppercase", marginBottom: 8 }}>Core Principle</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8a7d6a", lineHeight: 1.7 }}>Muscle is built during <em>recovery</em>, not during the workout. Recovery days aren't optional — they're where adaptation happens. If you're sore, walking and light movement will clear it faster than sitting still.</p>
            </div>
          </div>
        )}

        {tab === "nutrition" && <NutritionTab />}

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
