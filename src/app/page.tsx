"use client";

import { useEffect, useRef, useState } from "react";
import { cubesData } from "./cubesData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";

// SVG Icons for the analytics section
const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#499DD0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10M12 20V4M6 20V14" stroke="#499DD0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WalletIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5V19H5V5H19ZM21 3H3V21H21V3ZM16 8H14V10H16V8ZM17 15H7V16H17V15ZM17 12H7V13H17V12Z" fill="#499DD0"/>
  </svg>
);

export default function Home() {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [isAnalyticsLaunching, setIsAnalyticsLaunching] = useState(false);
  const stickyRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cubesContainerRef = useRef<HTMLDivElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const connectBtnRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const analyticsHeaderRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const featureCard1Ref = useRef<HTMLDivElement>(null);
  const featureCard2Ref = useRef<HTMLDivElement>(null);
  const featureCard3Ref = useRef<HTMLDivElement>(null);
  const analyticsLaunchBtnRef = useRef<HTMLAnchorElement>(null);
  
  const handleConnectWallet = () => {
    setIsWalletConnecting(true);
    // Simulating connection process
    setTimeout(() => {
      setIsWalletConnecting(false);
      alert("Wallet connection functionality would go here!");
    }, 1500);
  };
  
  const handleAnalyticsLaunch = () => {
    setIsAnalyticsLaunching(true);
    // Simulating launch process
    setTimeout(() => {
      setIsAnalyticsLaunching(false);
      window.location.href = "https://playback-interface.vercel.app";
    }, 1000);
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    // Add images to cube faces
    const cubeFaces = document.querySelectorAll(".cube > div");
    let imageCounter = 1;
    
    cubeFaces.forEach((face) => {
      const img = document.createElement("img");
      img.src = `/${imageCounter}.jpg`;
      img.alt = `Cube face image ${imageCounter}`;
      face.textContent = "";
      face.appendChild(img);
      imageCounter = (imageCounter % 33) + 1; // Loop through 33 images
    });
    
    const interpolate = (start: number, end: number, progress: number) => {
      return start + (end - start) * progress;
    };
    
    const stickyHeight = window.innerHeight * 4;
    
    ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        if (!logoRef.current || !cubesContainerRef.current || !header1Ref.current || !header2Ref.current || !connectBtnRef.current) return;
        
        const initialProgress = Math.min(self.progress * 20, 1);
        logoRef.current.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
        
        const logoOpacityProgress =
          self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
        logoRef.current.style.opacity = String(1 - logoOpacityProgress);
        
        const cubesOpacityProgress =
          self.progress >= 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
        cubesContainerRef.current.style.opacity = String(cubesOpacityProgress);
        
        const header1Progress = Math.min(self.progress * 2.5, 1);
        header1Ref.current.style.transform = `translate(-50%, -50%) scale(${interpolate(
          1,
          1.5,
          header1Progress
        )})`;
        header1Ref.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
        header1Ref.current.style.opacity = String(1 - header1Progress);
        
        // Add background image shrinking effect
        const bgSvg = document.querySelector('.bg-svg') as HTMLElement;
        if (bgSvg) {
          const bgScale = interpolate(1, 0.90, Math.min(self.progress * 3, 1));
          bgSvg.style.transform = `translate(-50%, -50%) scale(${bgScale})`;
        }
        
        // Connect button animation - fades out with header1
        connectBtnRef.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
        connectBtnRef.current.style.opacity = String(1 - header1Progress);
        
        // Scroll indicator animation - fades out faster than header1
        if (scrollIndicatorRef.current) {
          const scrollProgress = Math.min(self.progress * 5, 1);
          scrollIndicatorRef.current.style.opacity = String(Math.max(0, 0.8 - scrollProgress));
        }
        
        const header2StartProgress = (self.progress - 0.4) * 10;
        const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
        const header2Scale = interpolate(0.75, 1, header2Progress);
        const header2Blur = interpolate(10, 0, header2Progress);
        const header2Top = interpolate(50, 50, header2Progress);
        
        header2Ref.current.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
        header2Ref.current.style.filter = `blur(${header2Blur}px)`;
        header2Ref.current.style.opacity = String(header2Progress);
        header2Ref.current.style.top = `${header2Top}%`;
        
        const firstPhaseProgress = Math.min(self.progress * 2, 1);
        const secondPhaseProgress =
          self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;
        
        Object.entries(cubesData).forEach(([cubeClass, data]) => {
          const cube = document.querySelector(`.${cubeClass}`);
          if (!cube) return;
          
          const { initial, final } = data;
          
          const currentTop = interpolate(
            initial.top,
            final.top,
            firstPhaseProgress
          );
          const currentLeft = interpolate(
            initial.left,
            final.left,
            firstPhaseProgress
          );
          const currentRotateX = interpolate(
            initial.rotateX,
            final.rotateX,
            firstPhaseProgress
          );
          const currentRotateY = interpolate(
            initial.rotateY,
            final.rotateY,
            firstPhaseProgress
          );
          const currentRotateZ = interpolate(
            initial.rotateZ,
            final.rotateZ,
            firstPhaseProgress
          );
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);
          
          let additionalRotation = 0;
          if (cubeClass === "cube-2") {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeClass === "cube-4") {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }
          
          (cube as HTMLElement).style.top = `${currentTop}%`;
          (cube as HTMLElement).style.left = `${currentLeft}%`;
          (cube as HTMLElement).style.transform = `
              translate(-50%, -50%) 
              translateZ(${currentZ}px)
              rotateX(${currentRotateX}deg)
              rotateY(${currentRotateY + additionalRotation}deg)
              rotateZ(${currentRotateZ}deg)
          `;
        });
      },
    });
    
    // Simple, clean animation for the analytics section
    if (analyticsHeaderRef.current && featureCardsRef.current && analyticsLaunchBtnRef.current) {
      // Header fade in
      gsap.fromTo(analyticsHeaderRef.current, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          scrollTrigger: {
            trigger: analyticsHeaderRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Analytics launch button animation
      gsap.fromTo(analyticsLaunchBtnRef.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: analyticsHeaderRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Feature cards fade in one by one
      const cards = [featureCard1Ref.current, featureCard2Ref.current, featureCard3Ref.current];
      
      cards.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5,
            delay: 0.3 + (index * 0.15), // Slight delay between cards
            scrollTrigger: {
              trigger: featureCardsRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
    
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <section className="sticky" ref={stickyRef}>
        <img src="/landing-bg.svg" alt="Background" className="bg-svg" />
        
        <div className="logo" ref={logoRef}>
          <div className="col">
            <div className="block block-1"></div>
            <div className="block block-2"></div>
          </div>
          <div className="col">
            <div className="block block-3"></div>
            <div className="block block-4"></div>
          </div>
          <div className="col">
            <div className="block block-5"></div>
            <div className="block block-6"></div>
          </div>
        </div>

        <div className="cubes" ref={cubesContainerRef}>
          <div className="cube cube-1">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>

          <div className="cube cube-2">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>

          <div className="cube cube-3">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>

          <div className="cube cube-4">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>

          <div className="cube cube-5">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>

          <div className="cube cube-6">
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        </div>

        <div className="header-1  mx-auto justify-center" ref={header1Ref}>
          <h1 className="text-center align-middle justify-center w-[80%] mx-auto">
            Unlock Your Gaming Future with Sonic's First NFT Marketplace.<br/> <span className="text-[24px]">Powered by: Sonic Blockchain</span>
          </h1>
        </div>
        
        <a 
          href="https://playback-interface.vercel.app" 
          className={`connect-wallet-btn ${isWalletConnecting ? 'connecting' : ''}`} 
          ref={connectBtnRef}
        >
          <img src="/landing-connect-btn.svg" alt="Connect Wallet Button" style={{ width: '100%', height: 'auto' }} />
          <div className="connect-wallet-btn-text">
            {isWalletConnecting ? "Launching..." : "Launch App"}
          </div>
        </a>

        <div className="header-2" ref={header2Ref}>
          <h2>Level Up Your Game, Power Up Your Assets.</h2>
          <p>
            Step into the future of gaming finance. Sonic.Game's NFT lending and borrowing market lets you unlock liquidity from your digital assets while keeping your in-game advantage.
          </p>
        </div>

        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <img src="/BsMouse.svg" alt="Scroll" className="mouse-icon" />
          <span className="scroll-text">scroll down</span>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="analytics-section">
        <div className="analytics-container">
          <div className="analytics-header" ref={analyticsHeaderRef}>
            <h2>Playback Protocol</h2>
            <p>Unlock the power of your NFT assets through our advanced lending and borrowing platform. Earn passive income or gain liquidity without selling your collectibles.</p>
          </div>
          
          {/* Analytics Launch Button - Using same style as hero section */}
          <a 
            href="https://playback-interface.vercel.app" 
            className={`analytics-launch-btn ${isAnalyticsLaunching ? 'launching' : ''}`} 
            ref={analyticsLaunchBtnRef}
            onClick={(e) => {
              e.preventDefault();
              handleAnalyticsLaunch();
            }}
          >
            <img src="/landing-connect-btn.svg" alt="Connect Wallet Button" style={{ width: '100%', height: 'auto' }} />
            <div className="analytics-launch-btn-text">
              {isAnalyticsLaunching ? "Launching..." : "Launch App"}
            </div>
          </a>
          
          <div className="platform-features" ref={featureCardsRef}>
            <div className="feature-card stat-card" ref={featureCard1Ref}>
              <div className="feature-icon">
                <ShieldIcon />
              </div>
              <h4>Secure Lending</h4>
              <p>Our smart contracts have undergone rigorous audits to ensure the safety of your assets throughout the lending process.</p>
            </div>
            
            <div className="feature-card stat-card" ref={featureCard2Ref}>
              <div className="feature-icon">
                <ChartIcon />
              </div>
              <h4>Market Analytics</h4>
              <p>Access real-time data on collection liquidity, floor prices, and market trends to make informed decisions.</p>
            </div>
            
            <div className="feature-card stat-card" ref={featureCard3Ref}>
              <div className="feature-icon">
                <WalletIcon />
              </div>
              <h4>Passive Income</h4>
              <p>Earn interest by depositing your NFTs into our lending pools, creating a new revenue stream with your digital assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="Sonic Logo" />
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Learn</h3>
              <ul>
                <li><a href="#">Developers</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Community</h3>
              <ul>
                <li><a href="#">X</a></li>
                <li><a href="#">Telegram</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Play</h3>
              <ul>
                <li><a href="#">Playback Hub</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-disclaimer">
          <p>These materials are for general information purposes only and are not investment advice or a recommendation or solicitation to buy, sell, stake or hold any cryptoasset or to engage in any specific trading strategy. Playback does not and will not work to increase or decrease the price of any particular cryptoasset it makes available. Some crypto products and markets are unregulated, and you may not be protected by government compensation and/or regulatory protection schemes. The unpredictable nature of the crypto-asset markets can lead to loss of funds. Tax may be payable on any return and/or on any increase in the value of your cryptoassets and you should seek independent advice on your taxation position. Geographic restrictions may apply.</p>
          <p>© 2024 Sonic Blockchain. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
