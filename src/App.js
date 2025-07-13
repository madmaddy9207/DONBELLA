import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroTitleRef = useRef(null);
  const navbarRef = useRef(null);
  const navbarTitleRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const aboutContentRef = useRef(null);
  const celebrityRef = useRef(null);
  const celebrityImageRef = useRef(null);
  const galleryTitleRef = useRef(null);
  const galleryImagesRef = useRef([]);
  const registrationRef = useRef(null);
  const registrationFormRef = useRef(null);
  const footerRef = useRef(null);
  const footerContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Navbar scroll animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowNavbar(scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);

    // GSAP Animation for title transition
    gsap.set(navbarTitleRef.current, { opacity: 0, scale: 0.5 });

    ScrollTrigger.create({
      trigger: heroTitleRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Animate hero title out
        gsap.to(heroTitleRef.current, {
          opacity: 1 - progress,
          scale: 1 - progress * 0.3,
          y: -progress * 100,
          duration: 0.1
        });
        
        // Animate navbar title in
        if (progress > 0.7) {
          gsap.to(navbarTitleRef.current, {
            opacity: (progress - 0.7) * 3.33,
            scale: 0.5 + (progress - 0.7) * 1.67,
            duration: 0.1
          });
        }
      }
    });

    // About section animations
    gsap.set([aboutHeadingRef.current, aboutContentRef.current], { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: aboutHeadingRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(aboutHeadingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });

    ScrollTrigger.create({
      trigger: aboutContentRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(aboutContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out'
        });
      }
    });

    // Celebrity section animations
    gsap.set([celebrityRef.current, celebrityImageRef.current], { opacity: 0, x: -50 });

    ScrollTrigger.create({
      trigger: celebrityRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(celebrityRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out'
        });
        gsap.to(celebrityImageRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out'
        });
      }
    });

    // Gallery animations
    gsap.set(galleryTitleRef.current, { opacity: 0, y: 50 });
    gsap.set(galleryImagesRef.current, { opacity: 0, y: 30, scale: 0.8 });

    ScrollTrigger.create({
      trigger: galleryTitleRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(galleryTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
    });

    // Individual image animations
    galleryImagesRef.current.forEach((img, index) => {
      if (img) {
        ScrollTrigger.create({
          trigger: img,
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            gsap.to(img, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out'
            });
          },
          onLeave: () => {
            gsap.to(img, {
              opacity: 0,
              y: -30,
              scale: 0.8,
              duration: 0.5,
              ease: 'power3.in'
            });
          },
          onEnterBack: () => {
            gsap.to(img, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(img, {
              opacity: 0,
              y: 30,
              scale: 0.8,
              duration: 0.5,
              ease: 'power3.in'
            });
          }
        });
      }
    });

    // Registration section animations
    gsap.set([registrationRef.current, registrationFormRef.current], { opacity: 0, y: 80, scale: 0.9 });

    ScrollTrigger.create({
      trigger: registrationRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(registrationRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
        });
        gsap.to(registrationFormRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          delay: 0.3,
          ease: 'power3.out'
        });
      }
    });

    // Footer animations
    gsap.set([footerRef.current, footerContentRef.current], { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(footerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });
        gsap.to(footerContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out'
        });
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted! (UI-only demo)');
  };

  return (
    <div className="min-h-screen text-pale-charcoal" style={{backgroundColor: '#f1f1f1'}}>
      {/* Navbar */}
      <nav ref={navbarRef} className={`navbar ${showNavbar ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="#contact" className="text-pale-charcoal hover:text-metal-jade transition-colors font-modern font-medium tracking-wide">
              Contact Us
            </a>
          </div>
          
          <div ref={navbarTitleRef} className="navbar-title font-bold bg-gradient-to-r from-metal-jade to-muted-sable bg-clip-text text-transparent" style={{fontFamily: 'Gista, serif'}}>
            DONBELLA
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#about" className="text-pale-charcoal hover:text-metal-jade transition-colors font-modern font-medium tracking-wide">
              About
            </a>
            <a href="#gallery" className="text-pale-charcoal hover:text-metal-jade transition-colors font-modern font-medium tracking-wide">
              Gallery
            </a>
          </div>
          
          <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="backdrop-blur-lg bg-white/90 border border-gray-200 rounded-2xl p-4 m-4 shadow-lg">
            <a href="#contact" className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 font-modern font-medium tracking-wide rounded-xl mb-2" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </a>
            <a href="#about" className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 font-modern font-medium tracking-wide rounded-xl mb-2" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#gallery" className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 font-modern font-medium tracking-wide rounded-xl" onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center" style={{backgroundColor: 'black'}}>
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          autoPlay 
          muted 
          loop
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="kenburns-top absolute inset-0 bg-[url('./Assistant_A_Dynamic_photo_of_a_f.webp')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center px-4 fade-in">
          <h1 ref={heroTitleRef} className="hero-title tracking-in-expand-fwd font-bold bg-gradient-to-r from-metal-jade to-muted-sable bg-clip-text text-transparent" style={{fontFamily: 'Gista, serif'}}>
            DONBELLA
          </h1>
          <p className="sub-text text-xl mb-12 font-fashion font-light text-pale-charcoal tracking-wide">Where Style Meets Culture</p>
          {/* <button className="bg-gradient-to-r from-metal-jade to-muted-sable px-8 py-4 text-ultra-black font-modern font-semibold rounded-full hover:scale-105 transition-transform duration-300 tracking-wide">
            Register Now
          </button> */}
        <a href="#registration" class="btn-shine">Register Now</a>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isVisible.about ? 'slide-up' : 'opacity-0'}`} style={{backgroundColor: '#f1f1f1'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 ref={aboutHeadingRef} className="text-8xl text-metal font-light tracking-wide" style={{fontFamily: 'Agelia, serif'}}>About</h2>
            </div>
            <div>
              <p ref={aboutContentRef} className="text-lg md:text-xl leading-relaxed text-pale font-modern font-light">
                DONBELLA is a premier global fashion platform that celebrates the intersection of style, culture, and artistry. 
                We curate extraordinary fashion shows, beauty pageants, and cultural style events that showcase diverse talent 
                and innovative design from around the world. Our vision is to create transformative experiences that inspire, 
                connect, and elevate the fashion industry while honoring cultural heritage and contemporary creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section id="highlights" className={`py-20 px-4 ${isVisible.highlights ? 'slide-up' : 'opacity-0'}`} style={{backgroundColor: '#f1f1f1'}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-16 text-metal font-light tracking-wide" style={{fontFamily: 'Agelia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>Event Highlights</h2>
          
          {/* Celebrity Guests - Main Feature */}
          <div className="w-full mb-12 bg-white/90 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style={{height: '55vh'}}>
            <div className="grid md:grid-cols-2 h-full">
              <div ref={celebrityRef} className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="mb-4 md:mb-6 text-metal font-medium tracking-wide" style={{fontFamily: 'Agelia, serif', fontSize: 'clamp(1.5rem, 4vw, 3rem)'}}>Celebrity Guests</h3>
                <p className="text-pale font-modern font-light text-sm md:text-lg leading-relaxed">
                  <span className="block md:hidden">Join international fashion icons and celebrities at DONBELLA Fashion Week.</span>
                  <span className="hidden md:block">Join us for an exclusive gathering of international fashion icons, influencers, and celebrities. 
                  Experience glamour like never before as A-list personalities grace our runway and share their 
                  fashion insights. From Hollywood stars to global fashion ambassadors, witness the convergence 
                  of style and stardom at DONBELLA Fashion Week.</span>
                </p>
              </div>
              <div ref={celebrityImageRef} className="h-48 md:h-auto overflow-hidden">
                <img src="https://i.pinimg.com/736x/02/42/02/02420230edb0623d5e74bccaab934979.jpg" alt="Celebrity Fashion" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Other Events */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Designer Showcases', desc: 'Exclusive collections from renowned designers', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { title: 'Multicultural Runways', desc: 'Celebrating global fashion diversity', image: 'https://i.pinimg.com/736x/b5/7a/f0/b57af09bda996c3efd7ba05e1d5f72c1.jpg' },
              { title: 'Charity Walk', desc: 'Fashion for a cause and social impact', image: 'https://i.pinimg.com/736x/38/d4/6d/38d46da1038acdfca0728dc0fceb8eae.jpg' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/90 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style={{height: '75vh'}}>
                <div className="h-3/5 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 h-2/5 flex flex-col justify-center text-center">
                  <h3 className="mb-3 text-metal font-medium tracking-wide" style={{fontFamily: 'Agelia, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)'}}>{item.title}</h3>
                  <p className="text-pale font-modern font-light text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4" style={{backgroundColor: '#f1f1f1'}}>
        <div className="max-w-6xl mx-auto">
          <h2 ref={galleryTitleRef} className="text-center mb-16 text-metal font-light tracking-wide" style={{fontFamily: 'Agelia, serif', fontSize: 'clamp(4rem, 8vw, 15rem)'}}>Gallery</h2>
          <div className="columns-2 md:columns-3 gap-7 space-y-7">
            {[
              'https://i.pinimg.com/1200x/b1/8f/b5/b18fb5bb677262e383113dbafe0865e3.jpg',
              'https://i.pinimg.com/1200x/f7/c3/8b/f7c38b3006c7f0a23f6c6e413a7b0bda.jpg',
              'https://i.pinimg.com/1200x/05/88/bb/0588bb452687ab6e8a494a038767185d.jpg',
              'https://data-corporate.abs-cbn.com/corp/medialibrary/dotcom/narrowcast%20metro%20pr/112923%20-%20donbelle%20metro/metro%20donbelle%20(1).jpg',
              'https://i.pinimg.com/1200x/2a/bb/c0/2abbc0932d5780d3b75529b072571d1c.jpg',
              'https://dubaifashionweek.org/wp-content/uploads/2025/02/MOLATO_DUBAI-FASHION-WEEK_AW25-26_095_11zon-scaled.jpg',
              'https://i.pinimg.com/1200x/42/39/ae/4239ae320363e104a4df20f7d2f9ee05.jpg'
            ].map((src, idx) => (
              <div 
                key={idx} 
                ref={el => galleryImagesRef.current[idx] = el}
                className={`break-inside-avoid mb-6 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md ${idx % 2 === 0 ? '' : 'mt-12'}`}
              >
                <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-auto object-cover hover:brightness-110 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20 px-4 relative overflow-hidden" style={{backgroundColor: '#f1f1f1'}}>
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/e5/2c/07/e52c0757eb7ebae08c6514fbe2fba9b8.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <div ref={registrationRef} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-center mb-12 text-metal font-light tracking-wide" style={{fontFamily: 'Agelia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>Register Now</h2>
            
            <div ref={registrationFormRef}>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    className="peer w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/60 focus:outline-none text-gray-800 placeholder-transparent transition-all duration-300"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white/80 px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600 peer-focus:bg-white/80 rounded-full" style={{fontFamily: 'Inter, sans-serif'}}>Full Name</label>
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    placeholder=" "
                    className="peer w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/60 focus:outline-none text-gray-800 placeholder-transparent transition-all duration-300"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white/80 px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600 peer-focus:bg-white/80 rounded-full" style={{fontFamily: 'Inter, sans-serif'}}>Email Address</label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder=" "
                    className="peer w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/60 focus:outline-none text-gray-800 placeholder-transparent transition-all duration-300"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-white/80 px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600 peer-focus:bg-white/80 rounded-full" style={{fontFamily: 'Inter, sans-serif'}}>Mobile Number</label>
                </div>
                
                <div className="relative">
                  <select className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/60 focus:outline-none text-gray-800 transition-all duration-300" required style={{fontFamily: 'Inter, sans-serif'}}>
                    <option value="" className="bg-white text-gray-800 rounded-lg p-2">Select Registration Type</option>
                    <option value="designer" className="bg-white text-gray-800 rounded-lg p-2 hover:bg-gray-50">Designer</option>
                    <option value="model" className="bg-white text-gray-800 rounded-lg p-2 hover:bg-gray-50">Model</option>
                    <option value="guest" className="bg-white text-gray-800 rounded-lg p-2 hover:bg-gray-50">Guest</option>
                  </select>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  placeholder=" "
                  rows="4"
                  className="peer w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:border-white/60 focus:outline-none text-gray-800 placeholder-transparent transition-all duration-300 resize-none"
                ></textarea>
                <label className="absolute left-4 -top-2.5 bg-white/80 px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600 peer-focus:bg-white/80 rounded-full" style={{fontFamily: 'Inter, sans-serif'}}>Tell us about your fashion background (Optional)</label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 py-4 px-8 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20" style={{fontFamily: 'Agelia, serif', fontSize: '1.1rem'}}
              >
                Submit Registration
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4" style={{fontFamily: 'Inter, sans-serif'}}>
                By registering, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} id="contact" className="py-16 px-4 relative overflow-hidden" style={{backgroundColor: '#1a1a1a'}}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div ref={footerContentRef} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h3 className="text-3xl mb-4 text-white font-light tracking-wide" style={{fontFamily: 'Agelia, serif'}}>DONBELLA</h3>
                <p className="text-gray-300 font-modern font-light leading-relaxed">Where Style Meets Culture</p>
                <p className="text-gray-400 text-sm mt-4 font-modern">Elevating fashion through cultural diversity and artistic expression.</p>
              </div>
              
              <div>
                <h4 className="text-xl mb-6 text-white font-medium" style={{fontFamily: 'Agelia, serif'}}>Contact Info</h4>
                <div className="space-y-3">
                  <p className="text-gray-300 font-modern font-light flex items-center justify-center md:justify-start">
                    <span className="mr-3">📍</span> Jumeirah, Dubai, UAE
                  </p>
                  <p className="text-gray-300 font-modern font-light flex items-center justify-center md:justify-start">
                    <span className="mr-3">✉️</span> info@donbella.com
                  </p>
                  <p className="text-gray-300 font-modern font-light flex items-center justify-center md:justify-start">
                    <span className="mr-3">📞</span> +971 4 XXX XXXX
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl mb-6 text-white font-medium" style={{fontFamily: 'Agelia, serif'}}>Follow Us</h4>
                <div className="flex justify-center md:justify-start space-x-6">
                  {[
                    { icon: 'fa-brands fa-facebook', name: 'Facebook', color: 'hover:text-blue-400' },
                    { icon: 'fa-brands fa-instagram', name: 'Instagram', color: 'hover:text-pink-400' },
                    { icon: 'fa-brands fa-square-x-twitter', name: 'Twitter', color: 'hover:text-blue-300' },
                    { icon: 'fa-brands fa-square-threads', name: 'Threads', color: 'hover:text-purple-400' }
                  ].map((social, idx) => (
                    <div key={idx} className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-white/20 ${social.color}`}>
                      <i className={`${social.icon} text-lg`}></i>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 text-sm font-modern">Stay updated with our latest fashion events</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-12 pt-8 text-center">
              <p className="text-gray-400 font-modern font-light">&copy; 2026 DONBELLA Fashion Week. All rights reserved.</p>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-modern">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-modern">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-modern">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;