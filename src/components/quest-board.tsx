"use client";

import { useEffect } from "react";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import type { Quest } from "../hooks/useQuestBank";

interface QuestBoardProps {
  quests: Quest[];
  onQuestClick: (quest: Quest) => void;
  totalPoints: number;
}

const QuestBoard = ({ quests, onQuestClick, totalPoints }: QuestBoardProps) => {
  const {
    questBoardRef,
    titleRef,
    addQuestItemRef,
    animateQuestBoardEntrance,
    animateQuestHover,
    animateQuestHoverOut,
  } = useGSAPAnimations();

  useEffect(() => {
    const timer = setTimeout(() => {
      animateQuestBoardEntrance();
    }, 200);
    return () => clearTimeout(timer);
  }, [animateQuestBoardEntrance]);

  const getDifficultyStyles = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Novice":
        return {
          textColor: "text-amber-800",
          borderColor: "border-amber-700",
          bgColor: "bg-amber-100",
          sealColor: "bg-amber-700",
          roman: "I",
        };
      case "Adept":
        return {
          textColor: "text-orange-800",
          borderColor: "border-orange-700",
          bgColor: "bg-orange-100",
          sealColor: "bg-orange-700",
          roman: "II",
        };
      case "Master":
        return {
          textColor: "text-red-900",
          borderColor: "border-red-800",
          bgColor: "bg-red-100",
          sealColor: "bg-red-800",
          roman: "III",
        };
      default:
        return {
          textColor: "text-amber-800",
          borderColor: "border-amber-700",
          bgColor: "bg-amber-100",
          sealColor: "bg-amber-700",
          roman: "I",
        };
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div
        ref={questBoardRef}
        className="relative bg-[url('/ui/parchement.png')] bg-no-repeat bg-contain bg-center min-h-[90vh] flex flex-col items-center py-16 px-8"
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "contrast(1.1) brightness(1.02)",
        }}
      >
        {/* Medieval Title with Illuminated Manuscript Style */}
        <div className="text-center mb-16 relative">
          <h1
            ref={titleRef}
            className="font-jacquard-display text-display-xl text-amber-900 mb-8 tracking-wider relative text-readable"
            style={{
              textShadow:
                "3px 3px 6px rgba(139, 69, 19, 0.4), 1px 1px 2px rgba(0, 0, 0, 0.3)",
              filter: "drop-shadow(2px 2px 4px rgba(139, 69, 19, 0.3))",
            }}
          >
            QUEST CHARTER
            {/* Decorative flourishes */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-3 border-t-3 border-amber-800 opacity-60"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-3 border-t-3 border-amber-800 opacity-60"></div>
          </h1>

          {/* Ornate separator */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-800 to-amber-700"></div>
            <div className="relative">
              <div className="w-4 h-4 bg-amber-800 rotate-45"></div>
              <div className="absolute inset-0 w-4 h-4 bg-amber-600 rotate-45 scale-75"></div>
            </div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-amber-800 to-amber-700"></div>
          </div>

          <p className="font-serif-readable text-body-lg text-amber-800 opacity-90 tracking-wide text-readable">
            By Royal Decree • Three Sacred Trials
          </p>
        </div>

        {/* Quest Scrolls */}
        <div className="flex flex-col gap-10 w-full max-w-4xl">
          {quests.map((quest, index) => {
            const styles = getDifficultyStyles(quest.difficulty);
            return (
              <div
                key={quest.id}
                ref={(el) => addQuestItemRef(el, index)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  quest.completed ? "opacity-75" : ""
                }`}
                onClick={() => !quest.completed && onQuestClick(quest)}
                onMouseEnter={(e) =>
                  !quest.completed && animateQuestHover(e.currentTarget)
                }
                onMouseLeave={(e) =>
                  !quest.completed && animateQuestHoverOut(e.currentTarget)
                }
              >
                {/* Parchment Background with Authentic Texture */}
                <div
                  className={`relative bg-gradient-to-br from-amber-50 via-amber-25 to-amber-100 border-3 ${styles.borderColor} rounded-sm shadow-xl overflow-hidden`}
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 15% 25%, rgba(139, 69, 19, 0.04) 0%, transparent 40%),
                      radial-gradient(circle at 85% 75%, rgba(160, 82, 45, 0.03) 0%, transparent 40%),
                      radial-gradient(circle at 45% 15%, rgba(139, 69, 19, 0.02) 0%, transparent 30%),
                      linear-gradient(45deg, rgba(139, 69, 19, 0.01) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(160, 82, 45, 0.01) 25%, transparent 25%)
                    `,
                    backgroundSize:
                      "80px 80px, 100px 100px, 60px 60px, 25px 25px, 25px 25px",
                  }}
                >
                  {/* Wax Seal with Roman Numerals */}
                  <div
                    className={`absolute -top-4 -right-4 w-16 h-16 ${styles.sealColor} rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-amber-900`}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${styles.sealColor
                        .replace("bg-", "rgba(")
                        .replace("-700", ", 0.9)")} 0%, ${styles.sealColor
                        .replace("bg-", "rgba(")
                        .replace("-700", ", 1)")} 70%)`,
                      boxShadow:
                        "inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <span className="text-amber-100 font-bold text-lg font-jacquard-display">
                      {styles.roman}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative p-10">
                    {/* Quest Title */}
                    <div className="mb-6">
                      <h3
                        className={`font-jacquard-display text-heading-xl font-bold ${styles.textColor} mb-4 tracking-wide text-readable`}
                        style={{
                          textShadow: "1px 1px 2px rgba(139, 69, 19, 0.2)",
                        }}
                      >
                        {quest.title}
                      </h3>
                      <div className="flex items-center gap-6 text-body-sm">
                        <span
                          className={`px-4 py-2 rounded-full ${styles.textColor} ${styles.bgColor} font-bold border ${styles.borderColor} font-serif-readable`}
                        >
                          {quest.difficulty}
                        </span>
                        <span className="text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-300 font-serif-readable">
                          {quest.category}
                        </span>
                        <span className="text-amber-900 font-bold bg-yellow-100 px-3 py-1 rounded-full border border-yellow-400 font-serif-readable">
                          {quest.points} Points
                        </span>
                      </div>
                    </div>

                    {/* Quest Description */}
                    <p
                      className={`font-serif-readable text-body-lg leading-relaxed mb-8 text-readable ${
                        quest.completed
                          ? "line-through text-amber-600 opacity-70"
                          : "text-amber-900"
                      }`}
                      style={{
                        textShadow: "0.5px 0.5px 1px rgba(139, 69, 19, 0.1)",
                      }}
                    >
                      {quest.description}
                    </p>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {quest.completed ? (
                          <div className="flex items-center gap-3 text-green-800">
                            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center shadow-lg border-2 border-green-800">
                              <svg
                                className="w-5 h-5 text-green-100"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="font-serif-readable font-bold text-body-md">
                              QUEST COMPLETED
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-amber-800">
                            <div className="w-8 h-8 border-3 border-amber-800 rounded-full flex items-center justify-center bg-amber-50 shadow-inner">
                              <div className="w-3 h-3 bg-amber-800 rounded-full"></div>
                            </div>
                            <span className="font-serif-readable font-bold text-body-md">
                              AWAITING COMPLETION
                            </span>
                          </div>
                        )}
                      </div>

                      {quest.completedAt && (
                        <span className="text-caption text-amber-700 font-serif-readable bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                          Completed:{" "}
                          {new Date(quest.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Decorative Medieval Corners */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-amber-800 opacity-40"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-amber-800 opacity-40"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-amber-800 opacity-40"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-amber-800 opacity-40"></div>

                  {/* Subtle aging spots */}
                  <div className="absolute top-8 right-12 w-2 h-2 bg-amber-700 rounded-full opacity-10"></div>
                  <div className="absolute bottom-12 left-8 w-1 h-1 bg-amber-800 rounded-full opacity-15"></div>
                </div>

                {/* Completed Quest Overlay */}
                {quest.completed && (
                  <div className="absolute inset-0 bg-green-600/10 rounded-sm flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-green-700/95 text-green-100 px-6 py-3 rounded-lg font-jacquard-display text-heading-lg font-bold shadow-xl border-2 border-green-800">
                      ✓ QUEST SEALED
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary with Medieval Styling */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-gradient-to-br from-amber-900/15 via-amber-800/10 to-amber-900/15 backdrop-blur-sm rounded-lg px-8 sm:px-12 py-6 border-2 border-amber-800/30 shadow-xl">
            <div className="text-center">
              <div className="font-jacquard-display text-display-lg font-bold text-amber-900 mb-1">
                {totalPoints}
              </div>
              <div className="font-serif-readable text-body-sm text-amber-800 font-bold tracking-wide">
                HONOR POINTS
              </div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-800/50 to-transparent hidden sm:block"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent block sm:hidden"></div>
            <div className="text-center">
              <div className="font-jacquard-display text-display-lg font-bold text-amber-900 mb-1">
                {quests.filter((q) => q.completed).length}/{quests.length}
              </div>
              <div className="font-serif-readable text-body-sm text-amber-800 font-bold tracking-wide">
                QUESTS SEALED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { QuestBoard };
