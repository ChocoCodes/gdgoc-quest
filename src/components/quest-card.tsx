import { useState } from "react"
import type { SelectedTask } from "../hooks/hooks"

interface QuestCardProps {
  task: SelectedTask
  onComplete: (task: SelectedTask) => void
  onClose: () => void
}

const QuestCard = ({ task, onComplete, onClose }: QuestCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      onComplete({ ...task, completed: true })
      setIsCompleting(false)
    }, 800)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-2xl w-full">
        {/* Main Quest Scroll */}
        <div
          className="relative bg-[url('/ui/parchement.png')] bg-no-repeat bg-contain bg-center min-h-[500px] flex flex-col justify-center items-center p-12"
          style={{
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 bg-red-700 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 hover:scale-110 shadow-lg z-10"
          >
            ×
          </button>

          {/* Ornate Header */}
          <div className="text-center mb-8">
            <h2 className="font-jacquard text-4xl md:text-5xl font-bold text-amber-900 mb-4 drop-shadow-lg">
              Quest Details
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-800"></div>
              <div className="w-4 h-4 bg-amber-800 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-800"></div>
            </div>
          </div>

          {/* Quest Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            {/* Decorative Border */}
            <div className="relative bg-gradient-to-br from-amber-50/80 to-amber-100/60 border-2 border-amber-800/40 rounded-lg p-8 shadow-inner">
              {/* Corner Decorations */}
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-amber-800 rotate-45"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-800 rotate-45"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-amber-800 rotate-45"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-800 rotate-45"></div>

              {/* Quest Text */}
              <p className="font-jacquard text-lg md:text-xl leading-relaxed text-amber-900 text-center font-medium">
                {task.task}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 mt-8">
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className={`relative px-8 py-4 font-jacquard font-bold text-lg rounded-lg transition-all duration-300 shadow-lg ${
                isCompleting
                  ? "bg-green-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white hover:scale-105 active:scale-95"
              }`}
            >
              {isCompleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Completing...
                </div>
              ) : (
                "Complete Quest"
              )}
            </button>

            <button
              onClick={onClose}
              className="px-8 py-4 font-jacquard font-bold text-lg bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              Return Later
            </button>
          </div>

          {/* Completion Overlay */}
          {task.completed && (
            <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <div className="text-center bg-green-600/95 text-white p-8 rounded-xl shadow-2xl">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="font-jacquard text-2xl font-bold mb-2">Quest Completed!</h3>
                <p className="font-jacquard text-lg">Well done, brave adventurer!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
