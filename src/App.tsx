import React, { useState, useRef, useEffect } from 'react'
import {
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Code2,
  Sun,
  Moon,
  RotateCw,
  Share2,
  Check,
  UserPlus,
  Sparkles,
  ExternalLink,
  Terminal,
  Clock,
} from 'lucide-react'

export const PROFILE = {
  name: 'Georgi Kotsev',
  initials: 'GK',
  role: 'Software Engineer',
  degree: 'M.Sc. Computer Science',
  university: 'Technical University of Berlin',
  location: 'Berlin, Germany',
  timezone: 'Europe/Berlin',
  website: 'https://gogokotsev00.github.io',
  githubUrl: 'https://github.com/gogokotsev00',
  githubHandle: '@gogokotsev00',
  linkedinUrl: 'https://www.linkedin.com/in/georgi-kotsev-1618431ba',
  linkedinHandle: 'in/georgi-kotsev-1618431ba',
}

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [berlinTime, setBerlinTime] = useState<string>('')
  const cardRef = useRef<HTMLDivElement>(null)

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovering: false })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: PROFILE.timezone,
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
        setBerlinTime(formatter.format(new Date()))
      } catch {
        setBerlinTime('CET')
      }
    }
    updateClock()
    const timer = setInterval(updateClock, 30000)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const maxTilt = 9
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovering: true,
    })
  }

  const handleMouseLeave = () => {
    setTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovering: false,
    }))
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = window.location.href || PROFILE.website
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE.name} — ${PROFILE.role}`,
          text: `${PROFILE.name} | ${PROFILE.role} (${PROFILE.degree}, ${PROFILE.university})`,
          url,
        })
        return
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const handleDownloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${PROFILE.name}`,
      'N:Kotsev;Georgi;;;',
      `TITLE:${PROFILE.role}`,
      `ORG:${PROFILE.university}`,
      `NOTE:${PROFILE.degree} at ${PROFILE.university}`,
      `ADR;TYPE=WORK:;;;Berlin;;;Germany`,
      `URL:${PROFILE.githubUrl}`,
      'END:VCARD',
    ].join('\r\n')

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Georgi_Kotsev.vcf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 transition-colors duration-500 overflow-hidden ${
        isDark
          ? 'bg-[#07090e] text-slate-100'
          : 'bg-[#f4f6fb] text-slate-900'
      }`}
    >
      {/* Ambient Mesh / Aurora Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -top-36 -left-36 h-[28rem] w-[28rem] rounded-full blur-[130px] animate-float-slow transition-opacity duration-700 ${
            isDark
              ? 'bg-indigo-600/25 opacity-100'
              : 'bg-indigo-400/30 opacity-80'
          }`}
        />
        <div
          className={`absolute top-1/2 -right-36 h-[26rem] w-[26rem] rounded-full blur-[130px] animate-float-Slow-reverse transition-opacity duration-700 ${
            isDark
              ? 'bg-cyan-500/20 opacity-100'
              : 'bg-sky-400/30 opacity-80'
          }`}
        />
        <div
          className={`absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full blur-[130px] animate-float-slow transition-opacity duration-700 ${
            isDark
              ? 'bg-violet-600/20 opacity-90'
              : 'bg-purple-300/35 opacity-75'
          }`}
        />
        {/* Subtle Architectural Grid Overlay */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]`}
        />
      </div>

      {/* Top Navigation / Controls */}
      <header className="relative z-20 w-full max-w-xl flex items-center justify-between pt-2">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code border backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-white/[0.04] border-white/10 text-slate-300'
              : 'bg-white/70 border-slate-200/80 text-slate-600 shadow-xs'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>gogokotsev00.github.io</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFlipped((f) => !f)}
            title="Flip Business Card"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-slate-200'
                : 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-700 shadow-xs'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Front View' : 'Inspect Code'}</span>
          </button>

          <button
            onClick={() => setIsDark((d) => !d)}
            aria-label="Toggle color theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-amber-300'
                : 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-700 shadow-xs'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main 3D Interactive Business Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full my-6">
        <div className="perspective-1200 w-full max-w-[460px]">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${
                tilt.rotateY + (isFlipped ? 180 : 0)
              }deg)`,
              transition: tilt.isHovering
                ? 'transform 120ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
                : 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="relative w-full preserve-3d"
          >
            {/* ==================== CARD FRONT ==================== */}
            <div
              className={`relative w-full rounded-3xl p-7 sm:p-9 border backdrop-blur-2xl backface-hidden overflow-hidden transition-colors duration-500 ${
                isDark
                  ? 'bg-slate-900/65 border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.75),0_0_1px_1px_rgba(255,255,255,0.08)]'
                  : 'bg-white/75 border-white/90 shadow-[0_25px_60px_-15px_rgba(30,41,59,0.14),0_0_1px_1px_rgba(15,23,42,0.05)]'
              }`}
            >
              {/* Dynamic Cursor Glare / Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: tilt.isHovering ? (isDark ? 0.22 : 0.35) : 0,
                  background: `radial-gradient(420px circle at ${tilt.glareX}% ${tilt.glareY}%, ${
                    isDark ? 'rgba(129, 140, 248, 0.35)' : 'rgba(99, 102, 241, 0.2)'
                  }, transparent 65%)`,
                }}
              />

              {/* Top decorative gradient bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-90" />

              {/* Card Header: Avatar + Location Badge */}
              <div className="relative flex items-start justify-between gap-4 mb-6">
                {/* Monogram Avatar with Glowing Ring */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-violet-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div
                    className={`relative h-16 w-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl tracking-tight border ${
                      isDark
                        ? 'bg-slate-950 border-white/15 text-white'
                        : 'bg-white border-slate-100 text-slate-900'
                    }`}
                  >
                    <span className="bg-gradient-to-br from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                      {PROFILE.initials}
                    </span>
                  </div>
                </div>

                {/* Location & Time Pill */}
                <div className="flex flex-col items-end gap-1.5">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-slate-300'
                        : 'bg-slate-900/[0.04] border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{PROFILE.location}</span>
                  </div>
                  {berlinTime && (
                    <div
                      className={`inline-flex items-center gap-1 text-[11px] font-mono-code ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Clock className="w-3 h-3 opacity-75" />
                      <span>{berlinTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Identity: Name & Role */}
              <div className="relative space-y-2 mb-6">
                <h1
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {PROFILE.name}
                </h1>

                <div className="inline-flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium border ${
                      isDark
                        ? 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
                        : 'bg-indigo-50 border-indigo-200/80 text-indigo-700'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    {PROFILE.role}
                  </span>
                </div>
              </div>

              {/* Academic Credentials Box (TU Berlin) */}
              <div
                className={`relative rounded-2xl p-4 mb-7 border transition-colors ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-slate-50/90 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      isDark
                        ? 'bg-cyan-500/10 border-cyan-400/20 text-cyan-300'
                        : 'bg-cyan-50 border-cyan-200 text-cyan-700'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono-code uppercase tracking-wider ${
                          isDark ? 'text-cyan-400/90' : 'text-cyan-700'
                        }`}
                      >
                        Education
                      </span>
                      <span
                        className={`text-[11px] font-mono-code px-2 py-0.5 rounded-md ${
                          isDark
                            ? 'bg-white/[0.06] text-slate-300'
                            : 'bg-slate-200/70 text-slate-700'
                        }`}
                      >
                        TU Berlin
                      </span>
                    </div>
                    <p
                      className={`font-semibold text-base mt-0.5 ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {PROFILE.degree}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {PROFILE.university}
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Social Links */}
              <div className="relative grid grid-cols-2 gap-3 mb-5">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm border transition-all duration-200 active:scale-[0.98] ${
                    isDark
                      ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 hover:border-white/25 text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 text-slate-800 shadow-2xs'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm border transition-all duration-200 active:scale-[0.98] ${
                    isDark
                      ? 'bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border-[#0A66C2]/40 hover:border-[#0A66C2]/60 text-sky-100'
                      : 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]/15 border-[#0A66C2]/25 text-[#0A66C2] shadow-2xs'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Card Footer Actions: Save Contact (vCard) & Share Link */}
              <div
                className={`relative pt-4 border-t flex items-center justify-between gap-2 ${
                  isDark ? 'border-white/10' : 'border-slate-200/80'
                }`}
              >
                <button
                  onClick={handleDownloadVCard}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Save Contact (.vcf)</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleShare}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer active:scale-95 ${
                      isDark
                        ? 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-slate-300'
                        : 'bg-slate-100/80 hover:bg-slate-200/70 border-slate-200 text-slate-700'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied URL</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsFlipped(true)}
                    title="Flip card to view developer spec"
                    className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                      isDark
                        ? 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-100/80 hover:bg-slate-200/70 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ==================== CARD BACK (DEVELOPER VIEW) ==================== */}
            <div
              className={`
                absolute inset-0 w-full h-full rounded-3xl p-7 sm:p-8 border backdrop-blur-2xl backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden transition-colors duration-500
                ${
                  isDark
                    ? 'bg-slate-900/80 border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.75)]'
                    : 'bg-white/85 border-white/90 shadow-[0_25px_60px_-15px_rgba(30,41,59,0.14)]'
                }
              `}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500 opacity-90" />

              {/* Terminal Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span
                      className={`ml-2 text-xs font-mono-code ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      georgi-kotsev.json
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>

                {/* Developer JSON Representation */}
                <pre
                  className={`font-mono-code text-xs sm:text-[13px] leading-relaxed overflow-x-auto p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-slate-950/80 border-white/10 text-slate-300'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <code>
                    <span className="text-slate-500">{'{\n'}</span>
                    {'  '}
                    <span className="text-indigo-400">"name"</span>:{' '}
                    <span className="text-emerald-300">"{PROFILE.name}"</span>,{'\n'}
                    {'  '}
                    <span className="text-indigo-400">"position"</span>:{' '}
                    <span className="text-emerald-300">"{PROFILE.role}"</span>,{'\n'}
                    {'  '}
                    <span className="text-indigo-400">"education"</span>: {'{\n'}
                    {'    '}
                    <span className="text-cyan-400">"degree"</span>:{' '}
                    <span className="text-amber-300">"{PROFILE.degree}"</span>,{'\n'}
                    {'    '}
                    <span className="text-cyan-400">"institution"</span>:{' '}
                    <span className="text-amber-300">"{PROFILE.university}"</span>
                    {'\n  },\n'}
                    {'  '}
                    <span className="text-indigo-400">"location"</span>:{' '}
                    <span className="text-emerald-300">"{PROFILE.location}"</span>,{'\n'}
                    {'  '}
                    <span className="text-indigo-400">"github"</span>:{' '}
                    <span className="text-sky-300">"{PROFILE.githubHandle}"</span>,{'\n'}
                    {'  '}
                    <span className="text-indigo-400">"linkedin"</span>:{' '}
                    <span className="text-sky-300">"{PROFILE.linkedinHandle}"</span>
                    {'\n'}
                    <span className="text-slate-500">{'}'}</span>
                  </code>
                </pre>
              </div>

              {/* Back Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span
                  className={`text-xs font-mono-code ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Interactive 3D Business Card
                </span>
                <button
                  onClick={() => setIsFlipped(false)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-white'
                      : 'bg-slate-900 text-white hover:bg-slate-800 border-transparent'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip to Front</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 text-center pb-1">
        <p
          className={`text-xs font-mono-code ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          © {new Date().getFullYear()} {PROFILE.name} · Move cursor over card for 3D perspective
        </p>
      </footer>
    </div>
  )
}
