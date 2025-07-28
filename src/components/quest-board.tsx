"use client";

import { useEffect } from "react";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import type { Quest } from "../hooks/useQuestBank";
import { ParchmentBackground } from "./parchment-background";

interface QuestBoardProps {
  quest: Quest | null;
  onQuestClick: (quest: Quest) => void;
}

const QuestBoard = ({ quest, onQuestClick }: QuestBoardProps) => {
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

  if (!quest) {
    return (
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <ParchmentBackground className="flex flex-col items-center justify-center py-16 px-8">
          <div className="text-center">
            <h2 className="font-jacquard-display text-display-lg text-amber-900 mb-4">
              Loading Quest...
            </h2>
            <div className="w-8 h-8 border-3 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </ParchmentBackground>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-full sm:max-w-4xl md:max-w-5xl mx-auto px-4">
      <ParchmentBackground
        ref={questBoardRef}
        className="py-16 px-4 sm:px-8 md:px-12 lg:px-16"
      >
        <div className="text-center mb-16 relative w-full">
          <h1
            ref={titleRef}
            className="font-jacquard-display text-display-xl text-amber-950 mb-8 tracking-wider relative"
            style={{
              textShadow:
                "3px 3px 6px rgba(139, 69, 19, 0.4), 1px 1px 2px rgba(0, 0, 0, 0.3)",
              filter: "drop-shadow(2px 2px 4px rgba(139, 69, 19, 0.3))",
            }}
          >
            QUEST CHARTER
          </h1>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-amber-800 to-amber-700"></div>
            <div className="relative">
              <div className="w-4 h-4 bg-amber-800 rotate-45"></div>
              <div className="absolute inset-0 w-4 h-4 bg-amber-600 rotate-45 scale-75"></div>
            </div>
            <div className="w-20 sm:w-32 h-px bg-gradient-to-l from-transparent via-amber-800 to-amber-700"></div>
          </div>

          <p className="font-serif-readable text-body-lg text-amber-800 opacity-90 tracking-wide">
            By Royal Decree • One Sacred Trial
          </p>
        </div>

        <div className="w-full max-w-xl px-4 sm:px-8 mb-12">
          <div
            ref={(el) => addQuestItemRef(el, 0)}
            className={`relative group cursor-pointer transition-all duration-300 ${
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
            {quest.isGrandPrize && (
              <>
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-amber-500/30 to-yellow-400/20 rounded-lg animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 via-yellow-500/40 to-amber-400/30 rounded-lg animate-pulse delay-75"></div>
              </>
            )}

            <div
              className={`relative ${
                quest.isGrandPrize
                  ? "bg-gradient-to-br from-yellow-50 via-amber-25 to-yellow-100 border-4 border-yellow-600 shadow-2xl shadow-yellow-500/50"
                  : "bg-gradient-to-br from-amber-50 via-amber-25 to-amber-100 border-3 border-amber-700 shadow-xl"
              } rounded-sm overflow-hidden`}
              style={{
                backgroundImage: quest.isGrandPrize
                  ? `
                    radial-gradient(circle at 15% 25%, rgba(255, 215, 0, 0.08) 0%, transparent 40%),
                    radial-gradient(circle at 85% 75%, rgba(255, 193, 7, 0.06) 0%, transparent 40%),
                    radial-gradient(circle at 45% 15%, rgba(255, 215, 0, 0.04) 0%, transparent 30%),
                    linear-gradient(45deg, rgba(255, 215, 0, 0.02) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255, 193, 7, 0.02) 25%, transparent 25%)
                  `
                  : `
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
              {quest.isGrandPrize ? (
                <div
                  className="absolute -top-2 -right-2 w-12 h-12 sm:-top-4 sm:-right-4 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl z-10 border-3 border-yellow-700 animate-pulse"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 1) 0%, rgba(255, 193, 7, 1) 70%)`,
                    boxShadow:
                      "inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 6px 12px rgba(255, 193, 7, 0.6)",
                  }}
                >
                  <span className="text-yellow-900 font-bold text-md sm:text-lg font-jacquard-display">
                    👑
                  </span>
                </div>
              ) : (
                <div
                  className="absolute -top-2 -right-2 w-12 h-12 sm:-top-4 sm:-right-4 sm:w-16 sm:h-16 bg-amber-700 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-amber-900"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.9) 0%, rgba(139, 69, 19, 1) 70%)`,
                    boxShadow:
                      "inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span className="text-amber-100 font-bold text-md sm:text-lg font-jacquard-display">
                    I
                  </span>
                </div>
              )}

              <div className="relative p-6 sm:p-8 md:p-10">
                {quest.isGrandPrize && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 text-center py-2 font-jacquard-display font-bold text-sm tracking-wider shadow-lg">
                    ⭐ GRAND PRIZE QUEST ⭐
                  </div>
                )}

                <div className={`mb-6 ${quest.isGrandPrize ? "mt-8" : ""}`}>
                  <h3
                    className={`font-jacquard-display text-heading-xl font-bold ${
                      quest.isGrandPrize ? "text-yellow-800" : "text-amber-800"
                    } mb-4 tracking-wide`}
                    style={{
                      textShadow: quest.isGrandPrize
                        ? "2px 2px 4px rgba(255, 193, 7, 0.4)"
                        : "1px 1px 2px rgba(139, 69, 19, 0.2)",
                    }}
                  >
                    {quest.title}
                  </h3>
                </div>
                <p
                  className={`font-serif-readable text-body-lg leading-relaxed mb-8 ${
                    quest.completed
                      ? "line-through text-amber-600 opacity-70"
                      : quest.isGrandPrize
                      ? "text-yellow-900"
                      : "text-amber-900"
                  }`}
                  style={{
                    textShadow: "0.5px 0.5px 1px rgba(139, 69, 19, 0.1)",
                  }}
                >
                  {quest.description}
                </p>
                <div className="flex items-center justify-center">
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
                    <div
                      className={`flex items-center gap-3 ${
                        quest.isGrandPrize
                          ? "text-yellow-800"
                          : "text-amber-800"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 border-3 ${
                          quest.isGrandPrize
                            ? "border-yellow-800 bg-yellow-50"
                            : "border-amber-800 bg-amber-50"
                        } rounded-full flex items-center justify-center shadow-inner`}
                      >
                        <div
                          className={`w-3 h-3 ${
                            quest.isGrandPrize
                              ? "bg-yellow-800"
                              : "bg-amber-800"
                          } rounded-full`}
                        ></div>
                      </div>
                      <span className="font-serif-readable font-bold text-body-md">
                        AWAITING COMPLETION
                      </span>
                    </div>
                  )}
                </div>
                {quest.completedAt && (
                  <div className="mt-4 text-center">
                    <span
                      className={`text-caption font-serif-readable px-3 py-1 rounded-full border ${
                        quest.isGrandPrize
                          ? "text-yellow-700 bg-yellow-100 border-yellow-300"
                          : "text-amber-700 bg-amber-100 border-amber-300"
                      }`}
                    >
                      Completed:{" "}
                      {new Date(quest.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 ${
                  quest.isGrandPrize ? "border-yellow-800" : "border-amber-800"
                } opacity-40`}
              ></div>
              <div
                className={`absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 ${
                  quest.isGrandPrize ? "border-yellow-800" : "border-amber-800"
                } opacity-40`}
              ></div>
              <div
                className={`absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 ${
                  quest.isGrandPrize ? "border-yellow-800" : "border-amber-800"
                } opacity-40`}
              ></div>
              <div
                className={`absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 ${
                  quest.isGrandPrize ? "border-yellow-800" : "border-amber-800"
                } opacity-40`}
              ></div>

              <div
                className={`absolute top-8 right-12 w-2 h-2 ${
                  quest.isGrandPrize ? "bg-yellow-700" : "bg-amber-700"
                } rounded-full opacity-10`}
              ></div>
              <div
                className={`absolute bottom-12 left-8 w-1 h-1 ${
                  quest.isGrandPrize ? "bg-yellow-800" : "bg-amber-800"
                } rounded-full opacity-15`}
              ></div>
            </div>

            {quest.completed && (
              <div className="absolute inset-0 bg-green-600/10 rounded-sm flex items-center justify-center backdrop-blur-[1px]">
                <div className="bg-green-700/95 text-green-100 px-6 py-3 rounded-lg font-jacquard-display text-heading-lg font-bold shadow-xl border-2 border-green-800">
                  ✓ QUEST SEALED
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-amber-900/15 via-amber-800/10 to-amber-900/15 backdrop-blur-sm rounded-lg px-8 py-4 border-2 border-amber-800/30 shadow-xl">
            <div className="text-center">
              <div className="font-jacquard-display text-display-lg font-bold text-amber-900 mb-1">
                {quest.completed ? 1 : 0}/1
              </div>
              <div className="font-serif-readable text-body-sm text-amber-800 font-bold tracking-wide">
                QUEST SEALED
              </div>
            </div>
          </div>
        </div>
      </ParchmentBackground>
    </div>
  );
};

export { QuestBoard };
