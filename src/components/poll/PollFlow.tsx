import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface PollState {
  role: string;
  status: string;
  uses_ai: boolean | null;
  ai_tools: string[];
  ai_no_reason: string;
}

const ROLES = ["Architect", "Urbanist", "Engineer"];
const STATUSES = ["Erasmus Student", "Polimi Resident Student"];
const AI_TOOLS = ["ChatGPT", "Gemini", "Midjourney", "Kling AI", "Other"];
const NO_REASONS = ["Too complex", "Not accurate", "Don't trust it", "Other"];

const PollFlow = () => {
  const [step, setStep] = useState(0);
  const [poll, setPoll] = useState<PollState>({ role: "", status: "", uses_ai: null, ai_tools: [], ai_no_reason: "" });
  const [submitted, setSubmitted] = useState(false);

  const select = (field: string, value: any) => {
    setPoll((p) => ({ ...p, [field]: value }));
    setTimeout(() => setStep((s) => s + 1), 400);
  };

  const toggleTool = (tool: string) => {
    setPoll((p) => ({
      ...p,
      ai_tools: p.ai_tools.includes(tool) ? p.ai_tools.filter((t) => t !== tool) : [...p.ai_tools, tool],
    }));
  };

  const submit = async () => {
    await supabase.from("poll_responses").insert({
      role: poll.role,
      status: poll.status,
      uses_ai: poll.uses_ai!,
      ai_tools: poll.ai_tools.length > 0 ? poll.ai_tools : null,
      ai_no_reason: poll.ai_no_reason || null,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-white">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
          <p className="text-xl opacity-90">Your response is live on the big screen.</p>
        </motion.div>
      </div>
    );
  }

  const steps = [
    {
      title: "What is your role?",
      options: ROLES,
      onSelect: (v: string) => select("role", v),
      selected: poll.role,
    },
    {
      title: "Your status?",
      options: STATUSES,
      onSelect: (v: string) => select("status", v),
      selected: poll.status,
    },
    {
      title: "Do you use AI in your daily life?",
      options: ["Yes", "No"],
      onSelect: (v: string) => select("uses_ai", v === "Yes"),
      selected: poll.uses_ai === null ? "" : poll.uses_ai ? "Yes" : "No",
    },
  ];

  // Branching: step 3 = tools (if yes) or reason (if no)
  const branchStep = step === 3;
  const isToolStep = branchStep && poll.uses_ai === true;
  const isReasonStep = branchStep && poll.uses_ai === false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 p-6">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">{steps[step].title}</h2>
              <div className="space-y-3">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => steps[step].onSelect(opt)}
                    className={`w-full p-4 rounded-2xl text-lg font-medium transition-all text-left ${
                      steps[step].selected === opt
                        ? "bg-white text-violet-600 scale-[1.02]"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : isToolStep ? (
            <motion.div
              key="tools"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Which tools do you use?</h2>
              <div className="space-y-3 mb-6">
                {AI_TOOLS.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`w-full p-4 rounded-2xl text-lg font-medium transition-all text-left ${
                      poll.ai_tools.includes(tool)
                        ? "bg-white text-violet-600"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
              <button
                onClick={submit}
                disabled={poll.ai_tools.length === 0}
                className="w-full p-4 rounded-2xl bg-white text-violet-600 font-bold text-lg disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                Submit →
              </button>
            </motion.div>
          ) : isReasonStep ? (
            <motion.div
              key="reason"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Why not?</h2>
              <div className="space-y-3">
                {NO_REASONS.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => {
                      setPoll((p) => ({ ...p, ai_no_reason: reason }));
                      setTimeout(submit, 400);
                    }}
                    className={`w-full p-4 rounded-2xl text-lg font-medium transition-all text-left ${
                      poll.ai_no_reason === reason
                        ? "bg-white text-violet-600"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PollFlow;
