"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import type { Quest } from "../hooks/useQuestBank";
import { ParchmentBackground } from "./parchment-background";

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

  return (
    <div
      ref={modalBackdropRef}
      className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-full sm:max-w-2xl md:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ParchmentBackground
          minHeight="min-h-[90vh] sm:min-h-[600px]"
          className="p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
        >
          {success ? (
            <div className="text-center animate-pulse">
              <div className="text-6xl sm:text-8xl mb-6 sm:mb-8">
                {quest.isGrandPrize ? "🏆👑" : "🏆"}
              </div>
              <h2
                className={`font-jacquard-display text-display-lg ${
                  quest.isGrandPrize ? "text-yellow-800" : "text-green-800"
                } mb-4 sm:mb-6 tracking-wide`}
              >
                {quest.isGrandPrize ? "GRAND PRIZE SEALED!" : "QUEST SEALED!"}
              </h2>
              <p className="font-serif-readable text-body-lg text-amber-800 leading-relaxed px-2">
                {quest.isGrandPrize
                  ? "Thou hast claimed the ultimate prize! Thy name shall be etched in golden letters upon the sacred scrolls of legend!"
                  : "Thy deed is recorded in the annals of valor. Well done, noble adventurer!"}
              </p>
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
                <div
                  className={`w-16 sm:w-24 h-px bg-gradient-to-r from-transparent ${
                    quest.isGrandPrize ? "to-yellow-700" : "to-green-700"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 ${
                    quest.isGrandPrize ? "bg-yellow-700" : "bg-green-700"
                  } rotate-45`}
                ></div>
                <div
                  className={`w-16 sm:w-24 h-px bg-gradient-to-l from-transparent ${
                    quest.isGrandPrize ? "to-yellow-700" : "to-green-700"
                  }`}
                ></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="font-jacquard-display text-display-lg text-amber-900 mb-4 sm:mb-6 tracking-wide">
                  QUEST VERIFICATION
                </h2>
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-amber-800"></div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-amber-800 rotate-45"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-amber-600 rotate-45 scale-75"></div>
                  </div>
                  <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-amber-800"></div>
                </div>
                <p className="font-serif-readable text-body-lg text-amber-800 opacity-90 px-2">
                  Present thy sacred rune to seal this quest
                </p>
              </div>

              <div
                className={`${
                  quest.isGrandPrize
                    ? "bg-gradient-to-br from-yellow-50/90 to-yellow-100/80 border-3 border-yellow-800/50"
                    : "bg-gradient-to-br from-amber-50/90 to-amber-100/80 border-3 border-amber-800/50"
                } rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 w-full shadow-inner relative`}
              >
                {quest.isGrandPrize && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 text-center py-1 font-jacquard-display font-bold text-xs sm:text-sm tracking-wider shadow-lg rounded-t-lg">
                    ⭐ GRAND PRIZE QUEST ⭐
                  </div>
                )}

                <div
                  className={`absolute top-2 left-2 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 ${
                    quest.isGrandPrize
                      ? "border-yellow-800"
                      : "border-amber-800"
                  } opacity-50`}
                ></div>
                <div
                  className={`absolute top-2 right-2 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 ${
                    quest.isGrandPrize
                      ? "border-yellow-800"
                      : "border-amber-800"
                  } opacity-50`}
                ></div>
                <div
                  className={`absolute bottom-2 left-2 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 ${
                    quest.isGrandPrize
                      ? "border-yellow-800"
                      : "border-amber-800"
                  } opacity-50`}
                ></div>
                <div
                  className={`absolute bottom-2 right-2 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 ${
                    quest.isGrandPrize
                      ? "border-yellow-800"
                      : "border-amber-800"
                  } opacity-50`}
                ></div>

                <h3
                  className={`font-jacquard-display text-heading-lg font-bold ${
                    quest.isGrandPrize ? "text-yellow-800" : "text-amber-800"
                  } mb-3 sm:mb-4 tracking-wide ${
                    quest.isGrandPrize ? "mt-4" : ""
                  }`}
                >
                  {quest.title}
                </h3>

                <p
                  className={`font-serif-readable text-body-lg ${
                    quest.isGrandPrize ? "text-yellow-900" : "text-amber-900"
                  } leading-relaxed`}
                >
                  {quest.description}
                </p>
              </div>

              <div className="w-full mb-6 sm:mb-8">
                <label className="block font-serif-readable text-heading-lg font-bold text-amber-900 mb-3 sm:mb-4 text-center">
                  Sacred Verification Rune:
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                  placeholder="Enter the sacred code..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-3 border-amber-800 rounded-lg bg-amber-50/80 text-amber-900 font-serif-readable text-heading-lg placeholder-amber-600 focus:outline-none focus:border-amber-900 focus:bg-white transition-all duration-300 text-center tracking-widest"
                  disabled={isVerifying}
                  onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                  style={{
                    textShadow: "0.5px 0.5px 1px rgba(139, 69, 19, 0.1)",
                  }}
                />

                {error && (
                  <p className="mt-3 sm:mt-4 text-red-800 font-serif-readable text-body-md font-bold text-center bg-red-100 border border-red-300 rounded-lg py-2 px-4">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying || !passcode.trim()}
                  className={`px-6 sm:px-8 py-3 sm:py-4 font-serif-readable text-body-lg font-bold rounded-lg transition-all duration-300 shadow-lg border-2 ${
                    isVerifying || !passcode.trim()
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500"
                      : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white hover:scale-105 active:scale-95 border-green-800"
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">
                        Verifying Sacred Rune...
                      </span>
                    </div>
                  ) : (
                    "SEAL QUEST"
                  )}
                </button>

                <button
                  onClick={handleClose}
                  className="px-6 sm:px-8 py-3 sm:py-4 font-serif-readable text-body-lg font-bold bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border-2 border-amber-800"
                >
                  RETURN LATER
                </button>
              </div>

              <div className="text-center">
                <p className="font-serif-readable text-body-md text-amber-800 leading-relaxed bg-amber-100/50 border border-amber-300 rounded-lg py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base">
                  Complete thy quest and seek the sacred verification rune from
                  thy quest giver.
                  <br />
                  Only they possess the power to seal thy achievement in the
                  annals of honor.
                </p>
              </div>
            </div>
          )}
        </ParchmentBackground>
      </div>
    </div>
  );
};

export { QuestVerification };
