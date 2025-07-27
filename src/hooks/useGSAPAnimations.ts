"use client";

import { useRef, useEffect, useCallback } from "react"; // Import useCallback
import { gsap } from "gsap";

const useGSAPAnimations = () => {
  const questBoardRef = useRef<HTMLDivElement>(null);
  const questItemsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states for quest board
    if (questBoardRef.current) {
      gsap.set(questBoardRef.current, {
        opacity: 0,
        scale: 0.85,
        rotationY: -15,
        transformOrigin: "center center",
      });
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.9,
      });
    }

    // Set initial states for quest items
    questItemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, {
          opacity: 0,
          x: -50,
          rotationX: -10,
          scale: 0.95,
        });
      }
    });
  }, []);

  const animateQuestBoardEntrance = useCallback(() => {
    const tl = gsap.timeline();

    // Animate parchment unfurling with authentic medieval feel
    tl.to(questBoardRef.current, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1.4,
      ease: "power3.out",
    });

    // Animate title with ink spreading effect
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      },
      "-=0.8"
    );

    // Animate quest items with staggered parchment settling
    questItemsRef.current.forEach((item, index) => {
      if (item) {
        tl.to(
          item,
          {
            opacity: 1,
            x: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          `-=${0.6 - index * 0.15}`
        );
      }
    });

    return tl;
  }, []); // Empty dependency array as it only depends on refs which are stable

  const animateQuestHover = useCallback((element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.02,
      rotationX: 1,
      y: -2,
      boxShadow: "0 12px 30px rgba(139, 69, 19, 0.25)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const animateQuestHoverOut = useCallback((element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      rotationX: 0,
      y: 0,
      boxShadow: "0 6px 20px rgba(139, 69, 19, 0.15)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const animateModalEntrance = useCallback(() => {
    if (!modalRef.current || !modalBackdropRef.current) return;

    const tl = gsap.timeline();

    // Set initial states
    gsap.set(modalBackdropRef.current, { opacity: 0 });
    gsap.set(modalRef.current, {
      opacity: 0,
      scale: 0.7,
      rotationY: 180,
      transformOrigin: "center center",
    });

    // Animate backdrop
    tl.to(modalBackdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate modal with parchment unrolling effect
    tl.to(
      modalRef.current,
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.0,
        ease: "power3.out",
      },
      "-=0.1"
    );

    return tl;
  }, []); // Empty dependency array as it only depends on refs which are stable

  const animateModalExit = useCallback((onComplete?: () => void) => {
    if (!modalRef.current || !modalBackdropRef.current) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Animate modal exit
    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      rotationY: -90,
      duration: 0.6,
      ease: "power2.in",
    });

    // Animate backdrop
    tl.to(
      modalBackdropRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    return tl;
  }, []); // Empty dependency array as it only depends on refs which are stable

  const animateQuestCompletion = useCallback((element: HTMLElement) => {
    const tl = gsap.timeline();

    // Parchment aging and sealing effect
    tl.to(element, {
      filter: "sepia(0.6) contrast(1.1) brightness(0.95)",
      duration: 0.4,
    })
      .to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(element, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.6)",
      })
      .to(element, {
        filter: "sepia(0.3) contrast(1.05) brightness(0.98)",
        duration: 0.6,
      });

    return tl;
  }, []);

  const animateInkWriting = useCallback(
    (textElement: HTMLElement, text: string) => {
      textElement.textContent = "";

      let i = 0;
      const writeInterval = setInterval(() => {
        textElement.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(writeInterval);
        }
      }, 40);
    },
    []
  );

  const addQuestItemRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      if (el) {
        questItemsRef.current[index] = el;
      }
    },
    []
  ); // No dependencies needed as questItemsRef.current is a stable ref

  return {
    questBoardRef,
    titleRef,
    modalRef,
    modalBackdropRef,
    addQuestItemRef,
    animateQuestBoardEntrance,
    animateQuestHover,
    animateQuestHoverOut,
    animateModalEntrance,
    animateModalExit,
    animateQuestCompletion,
    animateInkWriting,
  };
};

export { useGSAPAnimations };
