"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import type { Quest } from "../hooks/useQuestBank";
import { ParchmentBackground } from "./parchment-background"; // Import the new component

interface QuestVerificationProps {
  quest: Quest;
  onVerify: (questId: string, passcode: string) => boolean;
  onClose: () => void;
}

const QuestVerification = ({
  quest,
  onVerify,
  onClose,
}: QuestVerificationProps) => {
  const [passcode, setPasscode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { modalRef, modalBackdropRef, animateModalEntrance, animateModalExit } =
    useGSAPAnimations();

  useEffect(() => {
    animateModalEntrance();
  }, [animateModalEntrance]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    animateModalExit(() => {
      onClose();
    });
  };

  const handleVerify = async () => {
    if (!passcode.trim()) {
      setError("Please enter the sacred verification rune");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate verification delay for authentic feel
    setTimeout(() => {
      const isValid = onVerify(quest.id, passcode);

      if (isValid) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setError(
          "The runes do not align. Seek the true code from thy quest giver."
        );
      }
      setIsVerifying(false);
    }, 1000);
  };

  const getDifficultyStyles = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Novice":
        return {
          textColor: "text-amber-800",
          borderColor: "border-amber-700",
          bgColor: "bg-amber-100",
        };
      case "Adept":
        return {
          textColor: "text-orange-800",
          borderColor: "border-orange-700",
          bgColor: "bg-orange-100",
        };
      case "Master":
        return {
          textColor: "text-red-900",
          borderColor: "border-red-800",
          bgColor: "bg-red-100",
        };
      default:
        return {
          textColor: "text-amber-800",
          borderColor: "border-amber-700",
          bgColor: "bg-amber-100",
        };
    }
  };

  const styles = getDifficultyStyles(quest.difficulty);

  return (
    <div
      ref={modalBackdropRef}
      className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ParchmentBackground
          minHeight="min-h-[700px]"
          className="p-8 sm:p-12 md:p-16 lg:p-20"
        >
          {success ? (
            // Success State with Medieval Celebration
            <div className="text-center animate-pulse">
              <div className="text-8xl mb-8">🏆</div>
              <h2 className="font-jacquard-display text-display-lg text-green-800 mb-6 tracking-wide text-readable">
                QUEST SEALED!
              </h2>
              <p className="font-serif-readable text-body-lg text-amber-800 leading-relaxed text-readable">
                Thy deed is recorded in the annals of valor.
                <br />
                Well done, noble adventurer!
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent to-green-700"></div>
                <div className="w-3 h-3 bg-green-700 rotate-45"></div>
                <div className="w-24 h-px bg-gradient-to-l from-transparent to-green-700"></div>
              </div>
            </div>
          ) : (
            // Verification Form
            <>
              {/* Medieval Header */}
              <div className="text-center mb-12">
                <h2 className="font-jacquard-display text-display-lg text-amber-900 mb-6 tracking-wide text-readable">
                  QUEST VERIFICATION
                </h2>
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-800"></div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-amber-800 rotate-45"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-amber-600 rotate-45 scale-75"></div>
                  </div>
                  <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-800"></div>
                </div>
                <p className="font-serif-readable text-body-lg text-amber-800 opacity-90 text-readable">
                  Present thy sacred rune to seal this quest
                </p>
              </div>

              {/* Quest Details Scroll */}
              <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/80 border-3 border-amber-800/50 rounded-lg p-8 mb-10 max-w-2xl w-full shadow-inner relative">
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-800 opacity-50"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-800 opacity-50"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-800 opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-800 opacity-50"></div>

                <h3
                  className={`font-jacquard-display text-heading-lg font-bold ${styles.textColor} mb-4 tracking-wide text-readable`}
                >
                  {quest.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-body-sm">
                  <span
                    className={`px-3 py-2 rounded-full ${styles.textColor} ${styles.bgColor} font-bold border ${styles.borderColor} font-serif-readable`}
                  >
                    {quest.difficulty}
                  </span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-300 font-serif-readable">
                    {quest.category}
                  </span>
                </div>
                <p className="font-serif-readable text-body-lg text-amber-900 leading-relaxed text-readable">
                  {quest.description}
                </p>
              </div>

              {/* Verification Input */}
              <div className="w-full max-w-lg mb-8">
                <label className="block font-serif-readable text-heading-lg font-bold text-amber-900 mb-4 text-center text-readable">
                  Sacred Verification Rune:
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                  placeholder="Enter the sacred code..."
                  className="w-full px-6 py-4 border-3 border-amber-800 rounded-lg bg-amber-50/80 text-amber-900 font-serif-readable text-heading-lg placeholder-amber-600 focus:outline-none focus:border-amber-900 focus:bg-white transition-all duration-300 text-center tracking-widest text-readable"
                  disabled={isVerifying}
                  onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                  style={{
                    textShadow: "0.5px 0.5px 1px rgba(139, 69, 19, 0.1)",
                  }}
                />

                {error && (
                  <p className="mt-4 text-red-800 font-serif-readable text-body-md font-bold text-center bg-red-100 border border-red-300 rounded-lg py-2 px-4">
                    {error}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying || !passcode.trim()}
                  className={`px-8 py-3 sm:px-10 sm:py-4 font-serif-readable text-body-lg font-bold rounded-lg transition-all duration-300 shadow-lg border-2 ${
                    isVerifying || !passcode.trim()
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500"
                      : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white hover:scale-105 active:scale-95 border-green-800"
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying Sacred Rune...
                    </div>
                  ) : (
                    "SEAL QUEST"
                  )}
                </button>

                <button
                  onClick={handleClose}
                  className="px-8 py-3 sm:px-10 sm:py-4 font-serif-readable text-body-lg font-bold bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border-2 border-amber-800"
                >
                  RETURN LATER
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-10 text-center max-w-2xl">
                <p className="font-serif-readable text-body-md text-amber-800 leading-relaxed bg-amber-100/50 border border-amber-300 rounded-lg py-4 px-6 text-readable">
                  Complete thy quest and seek the sacred verification rune from
                  thy quest giver.
                  <br />
                  Only they possess the power to seal thy achievement in the
                  annals of honor.
                </p>
              </div>
            </>
          )}
        </ParchmentBackground>
      </div>
    </div>
  );
};

export { QuestVerification };
