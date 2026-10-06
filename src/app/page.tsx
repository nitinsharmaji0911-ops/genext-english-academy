"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight,
  Clock, 
  Users, 
  Sparkles, 
  Award, 
  BookOpen, 
  Mic, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Play,
  Star,
  Menu,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Navigation
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // Modals & Dynamic UI states
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeStoryVideo, setActiveStoryVideo] = useState<{ name: string; role: string; quote: string; image: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("Morning Batch (8:30 AM - 10:00 AM)");
  
  // Interactive Before/After slider position (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Classroom Carousel active slide
  const [activeClassroomIndex, setActiveClassroomIndex] = useState(0);

  // Dynamic notification popups for real submissions
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  useEffect(() => {
    let alerts = [
      "Sneha M. from Pardi just booked a Free Assessment!",
      "Rahul P. from Wardhaman Nagar joined Evening Batch!",
      "Pooja G. from Itwari took the 2-Minute English Assessment!",
      "Nikhil S. from Nagpur confirmed a seat for Monday demo!"
    ];

    try {
      const stored = JSON.parse(localStorage.getItem("genext_leads") || "[]");
      if (stored && stored.length > 0) {
        const dynamicAlerts = stored.map((s: { name: string }) => `${s.name} from Nagpur just booked Free Assessment!`);
        alerts = [...dynamicAlerts, ...alerts];
      }
    } catch {}

    let idx = 0;
    const interval = setInterval(() => {
      setRecentNotification(alerts[idx % alerts.length]);
      setTimeout(() => setRecentNotification(null), 4500);
      idx++;
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // 3-STEP QUIZ STATE
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [leadPhone, setLeadPhone] = useState("");
  const [leadName, setLeadName] = useState("");

  const phoneNumber = "7972111984";
  const whatsappLink = `https://wa.me/917972111984?text=Hello%20Roshan%20Sir%2C%20I%20want%20to%20book%20a%20Free%20Assessment%20at%20Genext%20English%20Academy%20in%20Pardi%2C%20Nagpur.`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=Genext+English+Academy+Near+Bhawani+Hospital+Pardi+Nagpur`;

  const quizQuestions = [
    {
      q: "Jab koi aapse English me baat karta hai, to pehla thought kya hota hai?",
      options: [
        { text: "Samajh sab aata hai, par bolte waqt hesitation aur darr lagta hai", score: 1 },
        { text: "Dimag me pehle Hindi/Marathi translate karna padta hai", score: 2 },
        { text: "Darr lagta hai ki grammatical mistake ho jayegi", score: 1 },
        { text: "Tooti-footi bol leta hu, par fluency aur command chahiye", score: 3 },
      ]
    },
    {
      q: "Aapko sabse zyada difficulty kis situation me aati hai?",
      options: [
        { text: "Quick words aur proper sentence formation instantly nahi milte", score: 1 },
        { text: "Job interview aur client meetings me speak karna", score: 2 },
        { text: "Group discussions aur public speaking stage fear", score: 2 },
        { text: "Basic grammar rules aur tense selection", score: 1 },
      ]
    },
    {
      q: "Aapka primary goal kya hai?",
      options: [
        { text: "Interview Crack karna & Corporate Promotion paana", score: 3 },
        { text: "Everyday life me fluent & naturally speak karna", score: 2 },
        { text: "College seminars aur stage pe confidently bolna", score: 2 },
        { text: "Zero level se step-by-step master karna", score: 1 },
      ]
    }
  ];

  const handleQuizAnswer = (score: number) => {
    setQuizScore(prev => prev + score);
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentName = leadName.trim() || "A Student";
    const msg = `Hello Roshan Sir, My name is ${studentName} (${leadPhone}). I want to book a Free Assessment Class for ${selectedBatch} at Genext English Academy (Pardi, Nagpur).`;
    
    try {
      const stored = JSON.parse(localStorage.getItem("genext_leads") || "[]");
      stored.unshift({ name: studentName, time: "Just now" });
      localStorage.setItem("genext_leads", JSON.stringify(stored.slice(0, 10)));
    } catch {}

    setRecentNotification(`${studentName} just registered for Free Assessment!`);
    setIsDemoModalOpen(false);
    setIsQuizOpen(false);
    setLeadName("");
    setLeadPhone("");

    const targetUrl = `https://wa.me/917972111984?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, "_blank");
  };

  // Slider touch/mouse movement handling
  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="min-h-screen bg-[#0C0F17] text-slate-100 font-sans selection:bg-[#E5A826] selection:text-slate-950 overflow-x-hidden pb-20 md:pb-0">
      
      {/* =========================================================================
          1. HEADER (MOBILE OPTIMIZED)
          ========================================================================= */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-wider uppercase text-white">
                GENEXT
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase text-slate-300 font-semibold -mt-1">
                ENGLISH SPEAKING CLASSES
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-200">
            <a href="#" className="hover:text-[#E5A826] transition-colors">Home</a>
            <a href="#programs" className="hover:text-[#E5A826] transition-colors">Programs</a>
            <a href="#founder" className="hover:text-[#E5A826] transition-colors">About</a>
            <a href="#stories" className="hover:text-[#E5A826] transition-colors">Stories</a>
            <a href="#classroom" className="hover:text-[#E5A826] transition-colors">Gallery</a>
            <a href="#location" className="hover:text-[#E5A826] transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F3EFE6] hover:bg-white text-slate-950 font-bold px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0"
            >
              <span>Book Free Trial</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-900" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-[#0F1420] border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl mt-2 mx-3 rounded-2xl"
            >
              <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wide text-slate-200">
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">Home</a>
                <a href="#programs" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">Programs</a>
                <a href="#founder" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">About Founder</a>
                <a href="#stories" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">Student Stories</a>
                <a href="#classroom" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">Classroom Gallery</a>
                <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="py-1 hover:text-[#E5A826]">Contact & Location</a>
              </div>
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsDemoModalOpen(true);
                  }}
                  className="w-full bg-[#E5A826] text-slate-950 font-bold py-3 rounded-full text-xs uppercase tracking-wider text-center"
                >
                  Book Free Assessment
                </button>
                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full bg-white/10 text-white font-medium py-3 rounded-full text-xs text-center border border-white/10"
                >
                  Call +91 79721 11984
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          2. CINEMATIC CLASSROOM HERO (MOBILE CLEANED)
          ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-end pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Full-bleed authentic classroom photograph */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-classroom.jpg"
            alt="Genext English Speaking Classes Pardi Nagpur"
            fill
            priority
            className="object-cover object-center filter brightness-90 sm:brightness-90"
          />
          {/* Natural vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F17] via-black/60 to-black/40 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/60 sm:to-black/30" />
        </div>

        {/* Hero Bottom-Left Content */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6 pt-28 sm:pt-32">
          
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/90">
              ENGLISH SPEAKING CLASSES IN PARDI, NAGPUR
            </p>
            <h1 className="font-display text-3xl sm:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.1] tracking-tight">
              Speak. Express. Grow.
            </h1>
            <p className="text-xs sm:text-base text-slate-200/90 max-w-lg leading-relaxed pt-0.5 sm:pt-1">
              Nagpur&apos;s trusted spoken English institute. Daily speaking drills, Hindi & Marathi medium guidance, and personal coaching by Mr. Roshan Sir.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer"
            >
              <span>Free Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>

            <a
              href="#programs"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white font-medium px-4 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-wider border border-white/30 transition-all duration-200 backdrop-blur-xs text-center"
            >
              <span>Programs</span>
            </a>
          </div>

          {/* Scroll Cue Arrow (hidden on very small phones to save space) */}
          <div className="hidden sm:block pt-3">
            <a href="#transformation" className="inline-block text-white/70 hover:text-white transition-colors">
              <span className="text-xl">↓</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. BEFORE / AFTER SPLIT TRANSFORMATION BANNER (MOBILE TOUCH OPTIMIZED)
          ========================================================================= */}
      <section id="transformation" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0F17]">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

          {/* Interactive Split Banner Card with Handwritten Doodles */}
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize bg-black h-[320px] sm:h-[480px]"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (isDragging) {
                handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onClick={(e) => {
              handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
            }}
          >
            {/* RIGHT HALF: AFTER (CONFIDENT, WARM NATURAL COLOR) */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/after-confident.jpg"
                alt="After: Confident English speaking student"
                fill
                className="object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {/* Handwritten Doodle Annotation (Right Side) */}
              <div className="absolute top-6 sm:top-16 right-4 sm:right-16 z-10 text-right pointer-events-none">
                <span className="font-handwriting text-2xl sm:text-5xl text-[#E5A826] font-bold block leading-none transform rotate-2">
                  Speaks <br /> with <br /> confidence.
                </span>
                <svg className="w-16 sm:w-32 h-3 sm:h-4 text-[#E5A826] ml-auto mt-1" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M 5 15 Q 50 5 95 12" />
                </svg>
              </div>
            </div>

            {/* LEFT HALF: BEFORE (HESITANT, DESATURATED B&W) */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/before-hesitant.jpg"
                alt="Before: Hesitant student struggling with spoken English"
                fill
                className="object-cover object-center filter grayscale contrast-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
              
              {/* Handwritten Doodle Annotation (Left Side) */}
              <div className="absolute top-6 sm:top-16 left-4 sm:left-16 z-20 text-left pointer-events-none">
                <span className="font-handwriting text-2xl sm:text-5xl text-white font-bold block leading-none transform -rotate-3">
                  Understands <br /> but can&apos;t <br /> speak.
                </span>
                <svg className="w-12 sm:w-16 h-6 sm:h-8 text-white/80 mt-1" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10 10 Q 30 25 50 15 M 40 22 L 50 15 L 45 6" />
                </svg>
              </div>
            </div>

            {/* Central Round Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-30 w-0.5 bg-white pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#181C26] text-white border-2 border-white/80 shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>

            {/* Hint pill for mobile users */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] text-slate-300 pointer-events-none border border-white/10 sm:hidden">
              Swipe slider left / right
            </div>

          </div>

          {/* Assessment Trigger Link */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#141824] border border-white/5">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-white text-sm sm:text-base">Take the 2-Minute Diagnostic Assessment</h4>
              <p className="text-[11px] sm:text-xs text-slate-400">Discover your exact fluency level and recommended batch in 3 quick questions.</p>
            </div>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <span>Start Assessment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. PROGRAMS SECTION (MOBILE HORIZONTAL SCROLL CARDS)
          ========================================================================= */}
      <section id="programs" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                PROGRAMS
              </span>
              <p className="text-[11px] text-slate-400 sm:hidden">Swipe to explore batches</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const el = document.getElementById("programs-scroll");
                  if (el) el.scrollBy({ left: -260, behavior: "smooth" });
                }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Previous programs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("programs-scroll");
                  if (el) el.scrollBy({ left: 260, behavior: "smooth" });
                }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Next programs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid: horizontal snap scroll on mobile, 4-col grid on desktop */}
          <div 
            id="programs-scroll"
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 scroll-smooth snap-x snap-mandatory"
          >
            
            {/* Card 1: For Students */}
            <div className="snap-start shrink-0 w-[240px] sm:w-auto group relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[3/4] flex flex-col justify-end p-4 sm:p-5 shadow-xl">
              <Image
                src="/images/program-students.jpg"
                alt="For Students"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedBatch("Special Student Batch (Morning/Evening)");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-white/95 hover:bg-white text-slate-950 font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs tracking-wide transition-colors cursor-pointer"
                >
                  For Students
                </button>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2: For Professionals */}
            <div className="snap-start shrink-0 w-[240px] sm:w-auto group relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[3/4] flex flex-col justify-end p-4 sm:p-5 shadow-xl">
              <Image
                src="/images/program-professionals.jpg"
                alt="For Professionals"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedBatch("Evening Batch (5:30 PM - 7:00 PM)");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-white/95 hover:bg-white text-slate-950 font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs tracking-wide transition-colors cursor-pointer"
                >
                  For Professionals
                </button>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3: For Beginners */}
            <div className="snap-start shrink-0 w-[240px] sm:w-auto group relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[3/4] flex flex-col justify-end p-4 sm:p-5 shadow-xl">
              <Image
                src="/images/program-beginners.jpg"
                alt="For Beginners"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedBatch("Morning Batch (8:30 AM - 10:00 AM)");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-white/95 hover:bg-white text-slate-950 font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs tracking-wide transition-colors cursor-pointer"
                >
                  For Beginners
                </button>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 4: For Women */}
            <div className="snap-start shrink-0 w-[240px] sm:w-auto group relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[3/4] flex flex-col justify-end p-4 sm:p-5 shadow-xl">
              <Image
                src="/images/program-women.jpg"
                alt="For Women"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedBatch("Afternoon Batch (2:00 PM - 3:30 PM)");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-white/95 hover:bg-white text-slate-950 font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs tracking-wide transition-colors cursor-pointer"
                >
                  For Women
                </button>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. OUR CLASSROOM BENTO GRID (RESPONSIVE)
          ========================================================================= */}
      <section id="classroom" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0F17]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              OUR CLASSROOM
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveClassroomIndex(prev => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous classroom view"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveClassroomIndex(prev => Math.min(2, prev + 1))}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Next classroom view"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reference Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* Big Classroom Session on Left */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[460px] shadow-xl group">
              <Image
                src="/images/hero-classroom.jpg"
                alt="Genext English Classroom Lecture"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Pagination pills */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-2">
                <span className={`h-1.5 rounded-full transition-all duration-300 ${activeClassroomIndex === 0 ? "w-8 bg-[#E5A826]" : "w-4 bg-white/40"}`} />
                <span className={`h-1.5 rounded-full transition-all duration-300 ${activeClassroomIndex === 1 ? "w-8 bg-[#E5A826]" : "w-4 bg-white/40"}`} />
                <span className={`h-1.5 rounded-full transition-all duration-300 ${activeClassroomIndex === 2 ? "w-8 bg-[#E5A826]" : "w-4 bg-white/40"}`} />
              </div>
            </div>

            {/* Right Side: Group Discussion Top + 2 Square Tiles Below */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
              
              {/* Top: Group Discussion Card */}
              <div className="relative rounded-2xl overflow-hidden h-[180px] sm:h-[240px] shadow-xl group">
                <Image
                  src="/images/classroom-gd.jpg"
                  alt="Roundtable Group Discussions"
                  fill
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Bottom 2 Split Square Tiles */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 flex-1 min-h-[150px] sm:min-h-[190px]">
                {/* Notes card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/images/classroom-notes.jpg"
                    alt="Classroom Vocabulary Notes"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Smiling student card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/images/classroom-smiling.jpg"
                    alt="Student Smiling in Class"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. STUDENT STORIES (RESPONSIVE)
          ========================================================================= */}
      <section id="stories" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              STUDENT STORIES
            </span>
            <div className="flex items-center gap-2">
              <button 
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Video Interview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            
            {/* Story 1: Rahul Sharma */}
            <div className="relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[16/11] shadow-xl group cursor-pointer"
              onClick={() => setActiveStoryVideo({
                name: "Rahul Sharma",
                role: "Software Engineer (Placed at Cognizant)",
                quote: "I knew coding, but during HR interviews my throat would dry up. Roshan Sir made me speak on mic every single day. Within 45 days, my hesitation vanished.",
                image: "/images/story-rahul.jpg"
              })}
            >
              <Image
                src="/images/story-rahul.jpg"
                alt="Rahul Sharma"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="absolute bottom-4 right-4 z-10 text-[10px] text-white/80 font-medium">
                Rahul Sharma
              </div>
            </div>

            {/* Story 2: Pooja Sahare */}
            <div className="relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[16/11] shadow-xl group cursor-pointer"
              onClick={() => setActiveStoryVideo({
                name: "Pooja Sahare",
                role: "Business Analyst & Team Lead",
                quote: "I used to keep quiet in office meetings because I worried people would judge my grammar. Genext taught me to think directly in English.",
                image: "/images/story-pooja.jpg"
              })}
            >
              <Image
                src="/images/story-pooja.jpg"
                alt="Pooja Sahare"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="absolute bottom-4 right-4 z-10 text-[10px] text-white/80 font-medium">
                Pooja Sahare
              </div>
            </div>

            {/* Story 3: Amit Kulkarni */}
            <div className="relative rounded-2xl overflow-hidden bg-[#161B28] aspect-[16/11] shadow-xl group cursor-pointer sm:col-span-2 md:col-span-1"
              onClick={() => setActiveStoryVideo({
                name: "Amit Kulkarni",
                role: "Bank Officer (Public Sector)",
                quote: "My written score was top tier, but spoken panel interview was my biggest fear. Roshan Sir took 5 mock interviews that replicated the exact panel environment.",
                image: "/images/story-amit.jpg"
              })}
            >
              <Image
                src="/images/story-amit.jpg"
                alt="Amit Kulkarni"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="absolute bottom-4 right-4 z-10 text-[10px] text-white/80 font-medium">
                Amit Kulkarni
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. OUR FOUNDER SECTION (MOBILE STACKED & CLEAN)
          ========================================================================= */}
      <section id="founder" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0C0F17]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Card with High-Res Portrait */}
            <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[440px] shadow-2xl bg-gradient-to-br from-[#1C2333] to-[#0A0D14] border border-white/10 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10">
              
              {/* Portrait */}
              <div className="relative w-44 sm:w-64 h-56 sm:h-80 z-10 shrink-0">
                <Image
                  src="/images/roshan-sir-portrait.png"
                  alt="Mr. Roshan Sir Founder"
                  fill
                  className="object-contain object-bottom filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Whiteboard Notes */}
              <div className="relative z-10 text-center sm:text-right space-y-2 max-w-xs pt-4 sm:pt-0 sm:pl-4">
                <span className="font-handwriting text-3xl sm:text-5xl text-[#E5A826] font-bold block leading-none transform rotate-1">
                  Speak <br className="hidden sm:inline" /> Express <br className="hidden sm:inline" /> Grow
                </span>
                <svg className="w-20 sm:w-28 h-4 sm:h-5 text-[#E5A826] mx-auto sm:ml-auto mt-1" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 10 12 Q 50 4 90 14" />
                </svg>
                <p className="text-xs text-slate-300 font-medium pt-1">
                  &ldquo;Language is not knowledge. It is a confidence habit.&rdquo;
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                  — Mr. Roshan Sir, Nagpur
                </p>
              </div>

              {/* Subtle ambient lighting */}
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Founder Narrative */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                  OUR FOUNDER
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  Mr. Roshan Sir
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Guiding students across Nagpur and Vidarbha for over 14 years. At Genext English Academy, we don&apos;t treat English as a subject to memorize—we treat it as a natural habit built through daily conversation, zero judgment, and personal confidence coaching.
              </p>

              <div>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#121622] hover:bg-black text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                >
                  <span>Know Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. OUR CENTER / LOCATION (MOBILE OPTIMIZED)
          ========================================================================= */}
      <section id="location" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* Center Exterior Building */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[400px] shadow-2xl">
              <Image
                src="/images/banner-original.jpg"
                alt="Genext English Speaking Classes Pardi Center"
                fill
                className="object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 text-[11px] sm:text-xs text-white/90 font-medium">
                Near Bhawani Hospital, Pardi, Bhandara Road, Nagpur
              </div>
            </div>

            {/* Dark Stylized Map Card */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden relative min-h-[240px] sm:min-h-[300px] bg-[#121826] border border-white/10 flex flex-col justify-between p-5 sm:p-6 shadow-2xl">
              
              {/* Map background iframe */}
              <div className="absolute inset-0 z-0 opacity-40">
                <iframe
                  title="Genext English Academy Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14884.288210355427!2d79.1368!3d21.1498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7333a44736f%3A0x6b9d62dcb99c4c1a!2sPardi%2C%20Nagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>

              {/* Pin in Center with Gold Icon */}
              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-[#E5A826] fill-[#E5A826]" />
                  <span className="font-bold text-xs text-white">Pardi, Nagpur</span>
                </div>
              </div>

              {/* Set Directions Button */}
              <div className="relative z-10 pt-2 text-center sm:text-right">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Set Directions in Maps</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. PRE-FOOTER DESK CTA WITH HANDWRITTEN CIRCLE
          ========================================================================= */}
      <section className="relative py-20 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
        
        {/* Background authentic study table */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/classroom-notes.jpg"
            alt="Study desk"
            fill
            className="object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
          
          {/* Hand-drawn Oval Doodle Annotation */}
          <div className="relative inline-block px-2">
            <span className="font-handwriting text-3xl sm:text-6xl text-white font-bold tracking-wide">
              FREE ASSESSMENT
            </span>
            <svg className="absolute -inset-3 sm:-inset-6 w-[115%] h-[140%] text-white/80 pointer-events-none -left-[7%]" viewBox="0 0 300 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 3">
              <ellipse cx="150" cy="50" rx="140" ry="40" transform="rotate(-2 150 50)" />
            </svg>
            <svg className="w-10 sm:w-12 h-6 sm:h-8 text-[#E5A826] mx-auto mt-2" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 10 5 Q 25 25 40 10" />
            </svg>
          </div>

          <p className="max-w-md text-xs sm:text-base text-slate-300">
            Visit Roshan Sir in Pardi, Nagpur or book a free trial class to check your spoken English level.
          </p>

          <div className="w-full sm:w-auto">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer"
            >
              <span>Book Free Assessment</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. FOOTER
          ========================================================================= */}
      <footer className="bg-[#080A10] border-t border-white/5 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          
          {/* Logo on Left */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-black text-lg tracking-wider uppercase text-white">
              GENEXT
            </span>
            <span className="text-[9px] tracking-widest uppercase text-slate-400 font-semibold -mt-1">
              ENGLISH SPEAKING CLASSES
            </span>
          </div>

          {/* Links in Center */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 text-xs">
            <a href="#" className="hover:text-[#E5A826] transition-colors">Home</a>
            <a href="#programs" className="hover:text-[#E5A826] transition-colors">Programs</a>
            <a href="#founder" className="hover:text-[#E5A826] transition-colors">About</a>
            <a href="#stories" className="hover:text-[#E5A826] transition-colors">Stories</a>
            <a href="#classroom" className="hover:text-[#E5A826] transition-colors">Gallery</a>
            <a href="#location" className="hover:text-[#E5A826] transition-colors">Contact</a>
          </div>

          {/* WhatsApp Action on Right */}
          <div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#E5A826] font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Chat on WhatsApp &rarr;</span>
            </a>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          11. REAL-TIME SUBMISSION TOAST & MOBILE BOTTOM BAR
          ========================================================================= */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-50 bg-[#161B28]/95 border border-white/10 text-white p-3 rounded-xl shadow-2xl backdrop-blur-md sm:max-w-xs flex items-center gap-2.5 pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E5A826] shrink-0" />
            <p className="text-xs text-slate-200 truncate">{recentNotification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0F17]/98 border-t border-white/10 px-3 py-2.5 flex items-center gap-2 backdrop-blur-md shadow-2xl">
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 bg-white/10 text-white font-bold py-2.5 rounded-full text-xs text-center border border-white/15 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#E5A826]" />
          <span>Call</span>
        </a>
        <button
          onClick={() => setIsDemoModalOpen(true)}
          className="flex-[2] bg-[#E5A826] text-slate-950 font-bold py-2.5 rounded-full text-xs text-center uppercase tracking-wider shadow-lg flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Free Trial</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-slate-950 shrink-0 shadow-md"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>

      {/* =========================================================================
          12. 2-MINUTE LEVEL ASSESSMENT QUIZ MODAL (MOBILE OPTIMIZED)
          ========================================================================= */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#141824] rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative border border-white/15 text-white my-auto">
            
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!quizCompleted ? (
              <div className="space-y-5 sm:space-y-6 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                    <span className="text-[#E5A826]">Takes 30 seconds</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#E5A826] h-full transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white pt-2 leading-snug">
                    {quizQuestions[quizStep].q}
                  </h3>
                </div>

                <div className="space-y-2">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(opt.score)}
                      className="w-full text-left p-3 sm:p-4 rounded-xl border border-white/10 hover:border-[#E5A826] hover:bg-[#E5A826]/10 text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="pr-2 leading-relaxed">{opt.text}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E5A826] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 sm:space-y-5 pt-2">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-white">Assessment Complete!</h3>
                  <p className="text-xs text-slate-300">
                    Roshan Sir personally will review your responses and recommend the right batch.
                  </p>
                </div>

                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 text-left space-y-1.5">
                  <div className="text-[10px] font-semibold text-[#E5A826] uppercase tracking-wider">Recommended Batch Plan</div>
                  <div className="font-bold text-xs sm:text-sm text-white">
                    {quizScore <= 4 ? "Basic Foundation + Hesitation Removal" : "Advanced Fluency & Spoken Confidence"}
                  </div>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-2.5 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Aapka Naam (Your Full Name)"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 focus:outline-hidden focus:border-[#E5A826]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number (e.g. 7972111984)"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 focus:outline-hidden focus:border-[#E5A826]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    Send to Roshan Sir on WhatsApp &rarr;
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          13. FREE ASSESSMENT BOOKING MODAL (MOBILE OPTIMIZED)
          ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#141824] rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 shadow-2xl relative border border-white/15 text-white my-auto">
            
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-4 sm:mb-6 pt-1">
              <span className="text-[10px] font-bold text-[#E5A826] uppercase tracking-wider">Pardi, Nagpur Center</span>
              <h3 className="text-lg sm:text-xl font-black text-white">Book Free Assessment</h3>
              <p className="text-xs text-slate-300">
                Experience Mr. Roshan Sir&apos;s direct teaching in person before deciding to enroll.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 focus:outline-hidden focus:border-[#E5A826]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">WhatsApp / Calling Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 7972111984"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-500 focus:outline-hidden focus:border-[#E5A826]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Preferred Batch Timing</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/15 bg-[#1B2232] text-white focus:outline-hidden focus:border-[#E5A826]"
                >
                  <option value="Morning Batch (8:30 AM - 10:00 AM)">Morning (8:30 AM - 10:00 AM)</option>
                  <option value="Afternoon Batch (2:00 PM - 3:30 PM)">Afternoon (2:00 PM - 3:30 PM)</option>
                  <option value="Evening Batch (5:30 PM - 7:00 PM)">Evening (5:30 PM - 7:00 PM)</option>
                  <option value="Special Weekend Batch">Special Weekend Batch</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all mt-1 cursor-pointer"
              >
                Confirm on WhatsApp &rarr;
              </button>

              <p className="text-[10px] sm:text-[11px] text-center text-slate-400 pt-1">
                🔒 Free diagnostic trial. No advance fee. Direct 1-on-1 interaction with Roshan Sir.
              </p>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          14. STUDENT STORY PREVIEW MODAL
          ========================================================================= */}
      {activeStoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#141824] rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative border border-white/15 text-white space-y-4">
            <button
              onClick={() => setActiveStoryVideo(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-white/20">
                <Image
                  src={activeStoryVideo.image}
                  alt={activeStoryVideo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A826]">Student Transformation</span>
                <h3 className="text-base sm:text-lg font-bold text-white">{activeStoryVideo.name}</h3>
                <p className="text-[11px] sm:text-xs text-slate-400">{activeStoryVideo.role}</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                &ldquo;{activeStoryVideo.quote}&rdquo;
              </p>
            </div>

            <button
              onClick={() => {
                setActiveStoryVideo(null);
                setIsDemoModalOpen(true);
              }}
              className="w-full bg-[#E5A826] hover:bg-[#d89c1f] text-slate-950 font-bold py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Book Free Assessment with Roshan Sir &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
