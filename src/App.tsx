import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Music,
  VolumeX,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { Toaster } from 'sonner';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { CountdownTimer } from './components/CountdownTimer';
import { PhotoGallery } from './components/PhotoGallery';
import { EventTimeline } from './components/EventTimeline';
import { RSVPForm } from './components/RSVPForm';
import { BlessingForm } from './components/BlessingForm';
import { FloatingParticles } from './components/FloatingParticles';
import { ImageWithFallback } from './components/ImageWithFallback';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix');
  const guestName = params.get('name');

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    audioRef.current = new Audio('/aaa.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };



  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-100 relative overflow-x-hidden">
      <Toaster position="top-center" />
      <FloatingParticles />

      {/* Music Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#E60000] to-[#8a5a19] text-white shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 transition-transform border border-amber-200/40"
      >
        {isMusicPlaying ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E60000]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/2.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Decorative Top */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E60000] to-[#B91C1C] flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
          </motion.div>

          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#E60000] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-serif mb-6 uppercase"
          >
            Promise Of Love
          </motion.div>

          {/* Families */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs sm:text-sm text-gray-500 font-serif mb-8 uppercase tracking-widest leading-relaxed"
          >
            Loving Son of Mr. Susantha Kalyanadasa & Mrs. Shamali Perera <br className="hidden sm:block" />
            Together with Loving Daughter of Mr. L. R Jayanath & Mrs. Lakshmi Samarakoon
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#000000] mb-6 leading-tight"
          >
            Kolith
            <motion.span
              className="inline-block mx-2 sm:mx-6 text-[#E60000]"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              &
            </motion.span>
            Chathusha
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm sm:text-base text-gray-600 font-serif mb-8 italic"
          >
            Request the honour of the presence of Mr & Mrs / Mr / Miss / Family <br />
            To grace the occasion of the marriage of their beloved children
          </motion.div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#E60000]" />
            <Sparkles className="w-5 h-5 text-[#E60000]" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#E60000]" />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-base sm:text-xl md:text-2xl text-gray-700 font-serif max-w-2xl mx-auto leading-relaxed px-2 mb-10"
          >
            {guestName ? (
              <>
                We cordially invite <span className="font-bold">{prefix} {guestName}</span> <br />
                to join our wedding celebration on <br />
              </>
            ) : (
              <>
                Invite you to join their wedding celebration on <br />
              </>
            )}
            <span className="text-[#000000] font-bold">Saturday 24 October 2026 At 6 PM</span>
          </motion.p>


        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#E60000]"
          >
            <div className="w-6 h-10 border-2 border-[#E60000] rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#E60000] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Story Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] uppercase tracking-widest">
              A Match Made In Heaven
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              <ImageWithFallback
                src="/images/1.jpg"
                alt="Kolith & Chathusha"
                className="w-full h-[500px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border-2 border-[#E60000]/20 rounded-2xl pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-10 md:p-12 shadow-xl border-2 border-[#E60000]/30 relative text-center">
                <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#E60000]" />
                <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[#E60000]" />
                <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#E60000]" />
                <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#E60000]" />

                <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-serif relative z-10">
                  <p>
                    We are getting married and would love to celebrate with you.
                    A romantic evening filled with love, flowers, music, and the people who mean the most to us.
                  </p>
                  <p>
                    Thank you for being part of our most beautiful chapter.
                    We're excited for a lifetime of love, joy, and togetherness.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-red-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-serif text-[#000000] text-center mb-16 uppercase tracking-widest"
          >
            Wedding Details
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#E60000]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#E60000] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#E60000] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E60000] to-[#B91C1C] flex items-center justify-center text-white">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#000000] mb-3">Date</h3>
              <p className="text-xl text-gray-700 font-serif">Oct 24, 2026</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Saturday</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#E60000]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#E60000] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#E60000] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E60000] to-[#B91C1C] flex items-center justify-center text-white">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#000000] mb-3">Time</h3>
              <p className="text-xl text-gray-700 font-serif">6:00 PM</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Arrival & Gathering</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-[#E60000]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#E60000] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#E60000] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E60000] to-[#B91C1C] flex items-center justify-center text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#000000] mb-3">Venue</h3>
              <p className="text-xl text-gray-700 font-serif">White Tower Banquet Hall</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Dream Banquet</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] mb-4 uppercase tracking-widest">
              Location
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              White Tower Banquet Hall
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-xl border-2 border-[#E60000]/30"
          >
            {/* Decorative Map Visual */}
            <div className="relative bg-gradient-to-br from-[#f0f7f1] via-[#e8f4ea] to-[#ddeee0] py-16 flex flex-col items-center justify-center gap-4 border-b border-[#E60000]/20">
              {/* Grid lines for map feel */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(#90b996 1px, transparent 1px), linear-gradient(90deg, #90b996 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              />
              {/* Ripple rings */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute w-24 h-24 rounded-full bg-[#E60000]/30"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  className="absolute w-16 h-16 rounded-full bg-[#E60000]/40"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E60000] to-[#B91C1C] flex items-center justify-center shadow-xl">
                    <MapPin className="w-7 h-7 text-white" fill="white" />
                  </div>
                </motion.div>
              </div>
              <p className="relative z-10 text-[#000000] font-serif text-lg font-semibold tracking-widest uppercase mt-2">
                White Tower Banquet Hall
              </p>
              <p className="relative z-10 text-gray-500 text-sm uppercase tracking-widest">
                Dream Banquet
              </p>
              <a
                href="https://maps.app.goo.gl/iAyoUxWSmehDd8Kq9?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#E60000] to-[#B91C1C] text-white font-serif text-sm tracking-widest uppercase shadow-lg hover:scale-105 transition-transform"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>


          </motion.div>
        </div>
      </section>

      {/* Event Timeline Section */}
      <section id="timeline" className="py-24 px-4 bg-gradient-to-b from-transparent via-red-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] mb-4 uppercase tracking-widest">
              Event Timeline
            </h2>
            <p className="text-xl text-gray-600 font-serif lowercase italic">
              [HOMECOMING CELEBRATION AT 6.00PM]
            </p>
          </motion.div>

          <EventTimeline />
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] mb-4 uppercase tracking-widest">
              Counting Down
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Until the marriage of Kolith & Chathusha
            </p>
          </motion.div>

          <CountdownTimer />
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-4 bg-gradient-to-b from-transparent via-red-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] mb-4 uppercase tracking-widest">
              RSVP
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Kindly mention before October 1
            </p>
          </motion.div>

          <RSVPForm />
        </div>
      </section>

      {/* Blessing Messages Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-red-50/30 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#000000] mb-4 uppercase tracking-widest">
              Blessings & Wishes
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Share your love and blessings with Kolith & Chathusha
            </p>
          </motion.div>

          <BlessingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Heart className="w-12 h-12 mx-auto text-[#E60000] mb-4" fill="#E60000" />
            </div>

            <p className="text-2xl font-serif text-[#000000] mb-4">
              We would be honored to celebrate this beautiful moment with you
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#E60000]" />
              <Sparkles className="w-5 h-5 text-[#E60000]" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#E60000]" />
            </div>

            <div className="text-3xl font-serif text-[#000000] mb-2 uppercase tracking-[0.2em]">
              Kolith & Chathusha
            </div>

            <p className="text-gray-500 font-serif tracking-widest text-sm uppercase">
              Oct 24, 2026 • White Tower Banquet Hall
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}