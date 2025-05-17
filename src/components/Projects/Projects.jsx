import React, { useState, useEffect, useRef, memo } from 'react';
import './Projects.css';

// Optimized image component with lazy loading and blur-up effect
const OptimizedImage = memo(({ src, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    // Reset when src changes
    if (imgRef.current) {
      imgRef.current.src = src;
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`optimized-image-container ${isLoaded ? 'loaded' : ''}`}>
      {!isLoaded && !error && (
        <div className="image-loader">
          <div className="spinner"></div>
          <span className="loading-text font-heading">Loading</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'visible' : 'hidden'}`}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
      {error && (
        <div className="image-error">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
});

// Thumbnail component with optimization
const ProjectThumbnail = memo(({ image, index, currentImage, setCurrentImage }) => {
  return (
    <div 
      className={`thumbnail-container ${currentImage === index ? 'active' : ''}`}
    >
      <OptimizedImage
        src={image}
        alt={`Thumbnail ${index + 1}`}
        className="thumbnail"
        onLoad={() => {}}
      />
      <div 
        className="thumbnail-overlay"
        onClick={() => setCurrentImage(index)}
      />
    </div>
  );
});

// Projects component with performance optimizations
const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  
  const projectRef = useRef(null);
  const detailsRef = useRef(null);
  const autoSlideTimerRef = useRef(null);
  
  // Define minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Preload high priority images
  useEffect(() => {
    const preloadImages = async () => {
      const currentProjectImages = projects[currentProject].images;
      const priorityImages = [currentProjectImages[currentImage]];
      
      // Add next and previous images as lower priority
      const nextIndex = (currentImage + 1) % currentProjectImages.length;
      const prevIndex = (currentImage - 1 + currentProjectImages.length) % currentProjectImages.length;
      
      if (nextIndex !== currentImage) priorityImages.push(currentProjectImages[nextIndex]);
      if (prevIndex !== currentImage) priorityImages.push(currentProjectImages[prevIndex]);
      
      const promises = priorityImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [src]: true }));
            resolve(src);
          };
          img.onerror = () => {
            resolve(src); // Resolve anyway to not block
          };
        });
      });
      
      await Promise.all(promises);
      if (!pageLoaded) setPageLoaded(true);
    };
    
    preloadImages();
  }, [currentProject, currentImage]);
  
  const projects = [
    {
      title: 'Modern Apartment',
      description: 'A contemporary apartment design with clean lines and minimalist aesthetic, balancing functionality with timeless elegance.',
      images: [
        '../../../images/prasantbhai_img/img1.jpg',
        '../../../images/prasantbhai_img/img2.jpg',
        '../../../images/prasantbhai_img/img3.jpg',
        '../../../images/prasantbhai_img/img4.jpg',
        '../../../images/prasantbhai_img/img5.jpg'
      ],
      features: ['Open Concept Living', 'Minimalist Design', 'Natural Lighting', 'Smart Home Integration'],
      colorPalette: ['#E8E8E8', '#2C3E50', '#E74C3C', '#3498DB'],
      dimensions: {
        livingRoom: '6m x 4m',
        kitchen: '3m x 2.5m',
        bedroom: '4m x 3.5m'
      },
      style: 'Modern Minimalist',
      completionDate: '2023',
      area: '1200 sq.ft',
      duration: {
        months: 4,
        days: 15
      },
      designInspiration: 'Inspired by Scandinavian minimalism with a touch of Japanese Zen'
    },
    {
      title: 'Luxury Villa',
      description: 'An elegant villa design featuring modern architecture and luxurious interiors that create a harmonious balance between comfort and sophistication.',
      images: [
        '../../../images/jatinaghera/img1.jpg',
        '../../../images/jatinaghera/img2.jpg',
        '../../../images/jatinaghera/img3.jpg',
        '../../../images/jatinaghera/img4.jpg',
        '../../../images/jatinaghera/img5.jpg'
      ],
      features: ['Luxury Finishes', 'Spacious Layout', 'Outdoor Living Space', 'Custom Lighting'],
      colorPalette: ['#F5F5F5', '#34495E', '#E67E22', '#2ECC71'],
      dimensions: {
        livingRoom: '8m x 6m',
        kitchen: '4m x 3m',
        bedroom: '5m x 4m'
      },
      style: 'Contemporary Luxury',
      completionDate: '2023',
      area: '2500 sq.ft',
      duration: {
        months: 7,
        days: 20
      },
      designInspiration: 'Inspired by modern European luxury with sustainable elements'
    },
    {
      title: 'Office Space',
      description: 'A functional and inspiring office space designed for productivity and comfort, combining aesthetic appeal with practical workplace solutions.',
      images: [
        '/images/project3/image1.jpg',
        '/images/project3/image2.jpg',
        '/images/project3/image3.jpg',
        '/images/project3/image4.jpg'
      ],
      features: ['Ergonomic Design', 'Collaborative Spaces', 'Modern Technology', 'Sustainable Materials'],
      colorPalette: ['#FFFFFF', '#2C3E50', '#3498DB', '#95A5A6'],
      dimensions: {
        mainHall: '10m x 8m',
        meetingRoom: '5m x 4m',
        workstations: '3m x 2m'
      },
      style: 'Modern Corporate',
      completionDate: '2023',
      area: '1800 sq.ft',
      duration: {
        months: 3,
        days: 10
      },
      designInspiration: 'Inspired by modern tech companies with focus on employee well-being'
    }
  ];

  // Handle touch events for mobile swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  useEffect(() => {
    // Clear previous timer if exists
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    
    if (isAutoSliding && !isFullscreen && !isTransitioning) {
      autoSlideTimerRef.current = setTimeout(() => {
        handleNextImage('next');
      }, 5000); // Increased time for better user experience
    }
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current);
      }
    };
  }, [currentProject, currentImage, isAutoSliding, isTransitioning, isFullscreen]);

  // Scroll to top of project when changing projects
  useEffect(() => {
    if (projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Reset loaded images when changing project
    setLoadedImages({});
  }, [currentProject]);

  // Disable body scroll when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      setIsAutoSliding(false);
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isFullscreen]);

  // Keydown event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleNextImage = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setAnimationDirection(direction);
    
    // Longer transition time for smoother animation
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentImage((prev) => (prev + 1) % projects[currentProject].images.length);
      } else {
        setCurrentImage((prev) => (prev - 1 + projects[currentProject].images.length) % projects[currentProject].images.length);
      }
      
      // Give more time for the animation to complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Increased from 300 to 600ms
    }, 600); // Increased from 300 to 600ms
  };

  const nextImage = () => {
    handleNextImage('next');
  };

  const prevImage = () => {
    handleNextImage('prev');
  };

  const handleProjectChange = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setAnimationDirection(direction);
    
    // Slower transition for project change
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      } else {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      }
      setCurrentImage(0);
      setShowDetails(false);
      
      // Give more time for the animation to complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 700);
  };

  const nextProject = () => {
    handleProjectChange('next');
  };

  const prevProject = () => {
    handleProjectChange('prev');
  };

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    // Scroll to details when opening
    if (!showDetails && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Pause auto slide in fullscreen mode
    if (!isFullscreen) {
      setIsAutoSliding(false);
    }
  };

  // Format dimensions with proper capitalization
  const formatRoomName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Preload status check
  const isCurrentImageLoaded = loadedImages[projects[currentProject].images[currentImage]];

  return (
    <section id="projects" className="projects-section" ref={projectRef}>
      <div className="projects-header">
        <h2 className="section-title font-heading">Our Signature Projects</h2>
        <p className="section-subtitle font-heading">Where Design Meets Innovation</p>
      </div>

      <div className={`project-showcase ${isFullscreen ? 'fullscreen' : ''} ${showDetails ? 'details-open' : ''}`}>
        <div className={`project-content-wrapper ${showDetails ? 'with-details' : ''}`}>
          <div className="project-main">
            <div 
              className="project-image-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className={`image-wrapper ${isTransitioning ? 'transitioning' : ''} ${animationDirection}`}>
                <OptimizedImage
                  src={projects[currentProject].images[currentImage]}
                  alt={projects[currentProject].title}
                  className="main-image"
                  onLoad={() => {
                    setLoadedImages(prev => ({
                      ...prev,
                      [projects[currentProject].images[currentImage]]: true
                    }));
                  }}
                />
                <div className="image-overlay">
                  <div className="project-brief">
                    <h3 className="font-heading">{projects[currentProject].title}</h3>
                    <p className="font-heading">{projects[currentProject].style}</p>
                  </div>
                </div>
              </div>
              
              <div className="image-controls">
                <button onClick={prevImage} className="nav-btn prev" aria-label="Previous image">
                  <span aria-hidden="true">←</span>
                </button>
                <button onClick={nextImage} className="nav-btn next" aria-label="Next image">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
              
              <div className="control-buttons">
                <button 
                  onClick={toggleAutoSlide} 
                  className={`control-btn auto-slide-btn ${isAutoSliding ? 'active' : ''}`}
                  aria-label={isAutoSliding ? "Pause slideshow" : "Play slideshow"}
                  title={isAutoSliding ? "Pause slideshow" : "Play slideshow"}
                >
                  <span aria-hidden="true">{isAutoSliding ? '⏸' : '▶'}</span>
                </button>
                <button 
                  onClick={toggleFullscreen} 
                  className="control-btn fullscreen-btn"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <span aria-hidden="true">{isFullscreen ? '⤢' : '⤡'}</span>
                </button>
              </div>
              
              <div className="image-counter font-heading">
                {currentImage + 1} / {projects[currentProject].images.length}
              </div>
            </div>
            
            <div className="project-thumbnails">
              {projects[currentProject].images.map((image, index) => (
                <ProjectThumbnail
                  key={index}
                  image={image}
                  index={index}
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                />
              ))}
            </div>

            <button 
              onClick={toggleDetails} 
              className="details-toggle-btn font-heading"
              aria-expanded={showDetails}
            >
              {showDetails ? 'Hide Details' : 'Explore Project'}
            </button>
          </div>

          {showDetails && (
            <div className="project-details" ref={detailsRef}>
              <div className="project-info">
                <div className="project-header">
                  <div className="project-title-section">
                    <h3 className="project-title font-heading">{projects[currentProject].title}</h3>
                    <span className="project-style font-heading">{projects[currentProject].style}</span>
                  </div>
                  <div className="project-meta">
                    <span className="project-area font-heading">{projects[currentProject].area}</span>
                    <span className="project-date font-heading">{projects[currentProject].completionDate}</span>
                  </div>
                </div>

                <div className="project-description">
                  <p>{projects[currentProject].description}</p>
                  <p className="inspiration-text">
                    <strong>Design Inspiration:</strong> {projects[currentProject].designInspiration}
                  </p>
                </div>
              
                <div className="project-features">
                  <h4 className="font-heading">Key Features</h4>
                  <ul>
                    {projects[currentProject].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-specs">
                  <div className="color-palette">
                    <h4 className="font-heading">Color Palette</h4>
                    <div className="colors">
                      {projects[currentProject].colorPalette.map((color, index) => (
                        <div 
                          key={index} 
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="duration">
                    <h4 className="font-heading">Project Duration</h4>
                    <div className="duration-display">
                      <div className="duration-item">
                        <span className="duration-value font-heading">{projects[currentProject].duration.months}</span>
                        <span className="duration-label font-heading">Months</span>
                      </div>
                      <div className="duration-item">
                        <span className="duration-value font-heading">{projects[currentProject].duration.days}</span>
                        <span className="duration-label font-heading">Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="dimensions">
                    <h4 className="font-heading">Room Dimensions</h4>
                    <ul>
                      {Object.entries(projects[currentProject].dimensions).map(([room, size]) => (
                        <li key={room}>
                          <span className="room-name font-heading">{formatRoomName(room)}:</span>
                          <span className="room-size">{size}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Project Navigation Buttons */}
      <div className="global-project-navigation">
        <button onClick={prevProject} className="project-nav-btn prev font-heading">
          <span className="nav-icon">←</span>
          <span className="nav-text">Previous Project</span>
        </button>
        <div className="project-dots">
          {projects.map((_, index) => (
            <span 
              key={index} 
              className={`project-dot ${currentProject === index ? 'active' : ''}`}
              onClick={() => {
                setCurrentProject(index);
                setCurrentImage(0);
                setShowDetails(false);
              }}
            />
          ))}
        </div>
        <button onClick={nextProject} className="project-nav-btn next font-heading">
          <span className="nav-text">Next Project</span>
          <span className="nav-icon">→</span>
        </button>
      </div>
    </section>
  );
};

export default Projects;