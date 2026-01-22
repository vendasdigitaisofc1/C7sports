
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { ContentCards } from './components/ContentCards';
import { Results } from './components/Results';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { MiniPlayer } from './components/MiniPlayer';
import { VideoModal } from './components/VideoModal';

export interface VideoData {
  id: string;
  title: string;
  module: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

const COMMON_THUMBNAIL = 'https://i.ytimg.com/vi/S3I_8y_P5W0/maxresdefault.jpg';
const VIMEO_PLAYER_URL = 'https://player.vimeo.com/video/1066763132';

const VIDEO_LIBRARY: VideoData[] = [
  {
    id: 'c7-vimeo-01',
    title: 'A Nova Era do Trading Esportivo: Masterclass C7',
    module: 'Masterclass Especial',
    duration: '45:00',
    thumbnail: COMMON_THUMBNAIL,
    videoUrl: VIMEO_PLAYER_URL
  },
  {
    id: 'master-01',
    title: 'A Matemática do Valor Esperado (+EV) no Futebol',
    module: 'Módulo Profissional',
    duration: '18:12',
    thumbnail: COMMON_THUMBNAIL,
    videoUrl: VIMEO_PLAYER_URL
  },
  {
    id: '1',
    title: 'Estratégia de Scalping em Mercados de Alta Liquidez',
    module: 'Live Trading',
    duration: '12:45',
    thumbnail: COMMON_THUMBNAIL,
    videoUrl: VIMEO_PLAYER_URL
  },
  {
    id: '2',
    title: 'Gestão de Stake Dinâmica: Protegendo sua Banca',
    module: 'Psicologia e Gestão',
    duration: '08:20',
    thumbnail: COMMON_THUMBNAIL,
    videoUrl: VIMEO_PLAYER_URL
  }
];

const Embers: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {[...Array(35)].map((_, i) => (
        <div 
          key={i} 
          className="ember" 
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10px',
            animationDuration: `${6 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.3 + Math.random() * 0.7
          }}
        />
      ))}
    </div>
  );
}

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeVideo, setActiveVideo] = useState<VideoData>(VIDEO_LIBRARY[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWatchNow = () => {
    setIsModalOpen(true);
  };

  const handleSelectVideo = (video: VideoData) => {
    setActiveVideo(video);
    setIsPlayingInline(true);
    setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`relative min-h-screen bg-[#010101] text-white selection:bg-red-500/30 transition-all duration-500 ${isModalOpen ? 'blur-md scale-[0.98]' : ''}`}>
      <Embers />
      
      {/* Background Gloaming Fires */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[70%] h-[70%] bg-red-600/15 blur-[160px] rounded-full fire-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-15%] w-[70%] h-[70%] bg-orange-600/15 blur-[160px] rounded-full fire-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-yellow-500/5 blur-[100px] rounded-full fire-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <Header isScrolled={scrollY > 50} />
      
      <main className="relative z-10">
        <Hero onWatchClick={handleWatchNow} />
        <div ref={videoSectionRef} className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none"></div>
          <VideoSection 
            activeVideo={activeVideo} 
            library={VIDEO_LIBRARY} 
            onSelectVideo={handleSelectVideo}
            isPlayingInline={isPlayingInline}
            setIsPlayingInline={setIsPlayingInline}
            onMaximize={handleOpenModal}
          />
        </div>
        <ContentCards onSelectVideo={handleSelectVideo} library={VIDEO_LIBRARY} />
        <Results />
        <Benefits />
      </main>

      <Footer />
      
      <MiniPlayer activeVideo={activeVideo} onPlay={handleWatchNow} />

      {isModalOpen && (
        <VideoModal 
          video={activeVideo} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
