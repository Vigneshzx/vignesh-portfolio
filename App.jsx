import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import * as THREE from "three";
import "./index.css";


/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];


/* =========================================================
   SKILLS
========================================================= */
const skills = [
  {
    title: "Programming Languages",
    items: ["Python", "Java", "JavaScript", "SQL"]
  },
  {
     title: "AI / Machine Learning",
     items: ["Computer Vision", "PyTorch", "LLMs & RAG", "Prompt Engineering"]
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "postgreSQL",]
  },
  {
    title: "Cloud & DevOps",
    items: ["aws", "Docker", "Git / GitHub",],
  },
  {
    title: "Core CS",
    items: ["DSA", "OOP", "DBMS", "OS", "Networking"]
  },
];


/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    number: "01",
    title: "Face iD unloking",
    description:
      "by using python for backend and opencv for capturing face and checking in server with matching vectors whether the present face is orginal and matched with stored vectors",
    technologies: ["python", "openCV", "Cloud"],
  },
  {
    number: "02",
    title: "subway runner",
    description:
      " My curiosity about game development with inspired by subway surfers. I have create a game like subwaysurfers in unity with C# program and blender designs also with help of ai .",
    technologies: ["C#", "unity", "Blendr"],
  }
];


/* =========================================================
   CERTIFICATIONS
========================================================= */

const certifications = [
  {
    number: "01",
    title: "Started with LLM ",
    issuer: "Infosys",
    year: "2026",
    image: "/certificates/certificate1.jpg",
  },
  {
    number: "02",
    title: "Building Gen AI model        ",
    issuer: "NEX WAVE",
    year: "2025",
    image: "/certificates/certificate2.png",
  },
  {
    number: "03",
    title: "Introduction to Data science",
    issuer: "Infosys",
    year: "2025",
    image: "/certificates/certificate3.jpg",
  },
];


/* =========================================================
   INTERACTIVE BACKGROUND
========================================================= */

function InteractiveBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    /* ---------------------------------------------
       SCENE
    --------------------------------------------- */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 8);


    /* ---------------------------------------------
       RENDERER
    --------------------------------------------- */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.8)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);


    /* ---------------------------------------------
       MAIN BACKGROUND GROUP
    --------------------------------------------- */

    const backgroundGroup = new THREE.Group();

    scene.add(backgroundGroup);


    /* ---------------------------------------------
       SOFT WIRE SPHERE
    --------------------------------------------- */

    const sphereGeometry =
      new THREE.IcosahedronGeometry(2.3, 4);

    const sphereMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.055,
      });

    const sphere =
      new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
      );

    sphere.position.set(2.7, 0.2, -2);

    backgroundGroup.add(sphere);


    /* ---------------------------------------------
       SECOND WIREFRAME OBJECT
    --------------------------------------------- */

    const secondGeometry =
      new THREE.IcosahedronGeometry(1.15, 2);

    const secondMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        wireframe: true,
        transparent: true,
        opacity: 0.055,
      });

    const secondObject =
      new THREE.Mesh(
        secondGeometry,
        secondMaterial
      );

    secondObject.position.set(
      -3.1,
      1.4,
      -1.5
    );

    backgroundGroup.add(secondObject);


    /* ---------------------------------------------
       PARTICLES
    --------------------------------------------- */

    const particleCount = 850;

    const positions =
      new Float32Array(
        particleCount * 3
      );

    const originalPositions =
      new Float32Array(
        particleCount * 3
      );

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const x =
        (Math.random() - 0.5) * 15;

      const y =
        (Math.random() - 0.5) * 10;

      const z =
        (Math.random() - 0.5) * 9;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xb9a5ff,
        size: 0.022,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);


    /* ---------------------------------------------
       MOUSE
    --------------------------------------------- */

    const mouse = {
      x: 0,
      y: 0,
    };

    const targetMouse = {
      x: 0,
      y: 0,
    };


    /* ---------------------------------------------
       SCROLL
    --------------------------------------------- */

    let scrollY = 0;

    const handlePointerMove = (event) => {
      targetMouse.x =
        (event.clientX / window.innerWidth) *
          2 -
        1;

      targetMouse.y =
        -(
          (event.clientY /
            window.innerHeight) *
            2 -
          1
        );
    };


    const handlePointerLeave = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };


    const handleScroll = () => {
      scrollY = window.scrollY;
    };


    let clickPulse = 0;

    const handleClick = () => {
      clickPulse = 1;
    };


    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "click",
      handleClick
    );


    /* ---------------------------------------------
       RESIZE
    --------------------------------------------- */

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );


    /* ---------------------------------------------
       ANIMATION
    --------------------------------------------- */

    const clock =
      new THREE.Clock();

    let animationFrame;

    const animate = () => {
      const elapsed =
        clock.getElapsedTime();

      /* Smooth pointer */

      mouse.x +=
        (targetMouse.x - mouse.x) *
        0.035;

      mouse.y +=
        (targetMouse.y - mouse.y) *
        0.035;


      /* Main wire sphere */

      sphere.rotation.x =
        elapsed * 0.025 +
        mouse.y * 0.1;

      sphere.rotation.y =
        elapsed * 0.035 +
        mouse.x * 0.16;


      sphere.position.y =
        0.2 +
        Math.sin(
          elapsed * 0.25
        ) *
          0.15;


      /* Second object */

      secondObject.rotation.x =
        -elapsed * 0.02;

      secondObject.rotation.y =
        elapsed * 0.04;


      /* Particle movement */

      const particleAttribute =
        particleGeometry.attributes.position;

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        const i3 = i * 3;

        const baseX =
          originalPositions[i3];

        const baseY =
          originalPositions[i3 + 1];

        const baseZ =
          originalPositions[i3 + 2];

        const wave =
          Math.sin(
            elapsed * 0.25 +
              baseX * 0.4
          ) *
          0.018;

        particleAttribute.array[
          i3
        ] =
          baseX +
          mouse.x *
            Math.max(
              0.15,
              1 -
                Math.abs(baseZ) /
                  10
            );

        particleAttribute.array[
          i3 + 1
        ] =
          baseY +
          wave +
          mouse.y * 0.1;

        particleAttribute.array[
          i3 + 2
        ] =
          baseZ;
      }

      particleAttribute.needsUpdate =
        true;


      /* Background responds to cursor */

      backgroundGroup.position.x +=
        (
          mouse.x * 0.32 -
          backgroundGroup.position.x
        ) *
        0.025;

      backgroundGroup.position.y +=
        (
          mouse.y * 0.22 -
          backgroundGroup.position.y -
          scrollY * 0.00002
        ) *
        0.025;


      /* Whole scene slowly responds to scrolling */

      particles.rotation.y =
        elapsed * 0.007 +
        scrollY * 0.00025;

      particles.rotation.x =
        mouse.y * 0.05;


      /* Click reaction */

      clickPulse *= 0.91;

      const pulseScale =
        1 + clickPulse * 0.06;

      backgroundGroup.scale.setScalar(
        pulseScale
      );


      renderer.render(
        scene,
        camera
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animate();


    /* ---------------------------------------------
       CLEANUP
    --------------------------------------------- */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "click",
        handleClick
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      sphereGeometry.dispose();
      sphereMaterial.dispose();

      secondGeometry.dispose();
      secondMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);


  return (
    <div
      ref={containerRef}
      className="interactive-background"
      aria-hidden="true"
    />
  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [activeSection, setActiveSection] =
    useState("home");
const [selectedCertificate, setSelectedCertificate] =
  useState(null);
  const [menuOpen, setMenuOpen] =
    useState(false);
const [showResume, setShowResume] = useState(false); 

  const {
    scrollYProgress,
  } = useScroll();


  const scaleX =
    useSpring(
      scrollYProgress,
      {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
      }
    );


  /* ---------------------------------------------
     SECTION OBSERVER
  --------------------------------------------- */

  useEffect(() => {
    const sections =
      document.querySelectorAll(
        "section[id]"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setActiveSection(
                  entry.target.id
                );
              }
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(section)
    );

    return () =>
      observer.disconnect();
  }, []);


  /* ---------------------------------------------
     NAVIGATION
  --------------------------------------------- */

  const scrollToSection =
    (id) => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
        });

      setMenuOpen(false);
    };


  return (
    <div className="app">

      {/* -----------------------------------------
          BACKGROUND
      ----------------------------------------- */}

      <InteractiveBackground />


      <motion.div
        className="scroll-progress"
        style={{
          scaleX,
        }}
      />


      <div className="background-grid" />


      <motion.div
        className="ambient-glow glow-one"
        animate={{
          x: [0, 70, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      <motion.div
        className="ambient-glow glow-two"
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* -----------------------------------------
          NAVIGATION
      ----------------------------------------- */}

      <header className="site-header">

        <nav className="desktop-nav">

          {navItems.map(
            (item) => (
              <button
                key={item.id}
                className={
                  activeSection ===
                  item.id
                    ? "menu-link active"
                    : "menu-link"
                }
                onClick={() =>
                  scrollToSection(
                    item.id
                  )
                }
              >
                {item.label}
              </button>
            )
          )}

        </nav>


        <button
          className="mobile-menu-button"
          onClick={() =>
            setMenuOpen(
              (value) => !value
            )
          }
          aria-label="Open navigation"
        >
          <span />
          <span />
        </button>


        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {navItems.map(
              (item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(
                      item.id
                    )
                  }
                >
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}

      </header>


      {/* -----------------------------------------
          CONTENT
      ----------------------------------------- */}

      <main>

        {/* =======================================
            HOME
        ======================================= */}

        <section
          id="home"
          className="section hero-section"
        >

          <div className="hero-content">

         <motion.div
  className="hero-welcome"
  initial={{
    opacity: 0,
    y: 12,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.65,
    ease: "easeOut",
  }}
>
  HELLO<span>.</span>
</motion.div>


<motion.div
  className="hero-iam"
  initial={{
    opacity: 0,
    y: 14,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.12,
    duration: 0.65,
    ease: "easeOut",
  }}
>
  I AM
</motion.div>


<motion.h1
  className="hero-name"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.22,
    duration: 0.75,
    ease: "easeOut",
  }}
>
  Vignesh
</motion.h1>


<motion.p
  className="hero-title"
  initial={{
    opacity: 0,
    y: 12,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.35,
    duration: 0.6,
  }}
>
  Computer Science Engineer
</motion.p>


<motion.p
  className="hero-tagline"
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.48,
    duration: 0.6,
  }}
>
  Build
  <span>·</span>
  Solve
  <span>·</span>
  Scale
</motion.p>

            <motion.div
              className="hero-buttons"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.7,
              }}
            >

              <motion.button
                className="button-primary"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  scrollToSection(
                    "projects"
                  )
                }
              >
                View Projects
                <span>↗</span>
              </motion.button>

              <button
  className="button-secondary"
  onClick={() => setShowResume(true)}
>
  View Resume ↗
</button>


              <motion.button
                className="button-secondary"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  scrollToSection(
                    "contact"
                  )
                }
              >
                Contact Me
              </motion.button>

            </motion.div>


            <motion.div
              className="hero-details"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.95,
                duration: 0.8,
              }}
            >
              <span>
                Based in India
              </span>

              <span />

              <span>
                Open to opportunities
              </span>
            </motion.div>

          </div>

        </section>


        {/* =======================================
            ABOUT
        ======================================= */}

        <section
          id="about"
          className="section content-section"
        >
<SectionHeading
  title="About Me"
/>


          <Reveal>

            <div className="about-layout">

              <div className="about-main-card">

                <span className="small-label">
                  WHO I AM
                </span>

                <h3>
                  A Real-world soluton innovator 
                </h3>

                <p>
                I’m a tech enthusiast driven by curiosity, challenges,
and continuous growth. I learn from failures, innovate
dynamic logical solution, solve real-world problems and
turn ideas into scalable solutions. Always exploring new
techs, building solutions and always pushing beyond
what’s possible.
                </p>


              </div>


              <div className="about-side">

                <div className="info-card">

                  <span className="small-label">
                    CURRENT FOCUS
                  </span>

                  <strong>
                    Software · AI · Cloud . IOT
                  </strong>

                </div>


                <div className="info-card">

                  <span className="small-label">
                    EDUCATION
                  </span>

                  <strong>
                    BE Computer Science
                  </strong>

                </div>


                <div className="info-card">

                  <span className="small-label">
                    LANGUAGES
                  </span>

                  <strong>
                    English · Tamil
                  </strong>

                </div>

              </div>

            </div>

          </Reveal>

        </section>


        {/* =======================================
            SKILLS
        ======================================= */}

        <section
          id="skills"
          className="section content-section"
        >

         <SectionHeading
  title="Skills" 
  />


          <div className="skills-layout">

            {skills.map(
              (skill, index) => (
                <Reveal
                  key={skill.title}
                  delay={
                    index * 0.06
                  }
                >

                  <motion.article
                    className="skill-group"
                    whileHover={{
                      y: -6,
                    }}
                  >

                    <h3>
                      {skill.title}
                    </h3>


                    <div className="skill-list">

                      {skill.items.map(
                        (item) => (
                          <span
                            key={item}
                          >
                            {item}
                          </span>
                        )
                      )}

                    </div>

                  </motion.article>

                </Reveal>
              )
            )}

          </div>

        </section>


        {/* =======================================
            PROJECTS
        ======================================= */}

        <section
          id="projects"
          className="section content-section"
        >
<SectionHeading
  title="Projects"
  text="Trying to build something useful in real-world."
/>


          <div className="project-list">

            {projects.map(
              (project, index) => (
                <Reveal
                  key={project.number}
                  delay={
                    index * 0.08
                  }
                >

                  <motion.article
                    className="project-item"
                    whileHover="hover"
                  >

                    <div className="project-number">
                      {project.number}
                    </div>


                    <div className="project-information">

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {project.description}
                      </p>


                      <div className="project-technologies">

                        {project.technologies.map(
                          (technology) => (
                            <span
                              key={
                                technology
                              }
                            >
                              {technology}
                            </span>
                          )
                        )}

                      </div>

                    </div>


                    <motion.div
                      className="project-arrow"
                      variants={{
                        hover: {
                          x: 6,
                          y: -6,
                        },
                      }}
                    >
                      ↗
                    </motion.div>

                  </motion.article>

                </Reveal>
              )
            )}

          </div>

        </section>


        {/* =======================================
            CERTIFICATIONS
        ======================================= */}

        <section
          id="certifications"
          className="section content-section"
        >

         <SectionHeading
  title="Certifications"
/>
         <div className="certification-list">

  {certifications.map(
    (certificate, index) => (
      <Reveal
        key={certificate.number}
        delay={index * 0.07}
      >

        <motion.button
          className="certification-card"
          whileHover={{
            y: -5,
          }}
          whileTap={{
            scale: 0.99,
          }}
          onClick={() =>
            setSelectedCertificate(
              certificate
            )
          }
        >

          <div className="certificate-number">
            {certificate.number}
          </div>

          <div className="certificate-info">

            <h3>
              {certificate.title}
            </h3>

            <p>
              {certificate.issuer}
            </p>

          </div>

          <div className="certificate-right">

            <span className="certificate-year">
              {certificate.year}
            </span>

            <span className="certificate-open">
              View ↗
            </span>

          </div>

        </motion.button>

      </Reveal>
    )
  )}

</div>

        </section>


        {/* =======================================
            CONTACT
        ======================================= */}

        <section
          id="contact"
          className="section contact-section"
        >

          <Reveal>

            <div className="contact-inner">

              <h2>
                Let's build something
                <span>
                  meaningful.
                </span>
              </h2>


              <p>
                Open to learn and work in dynamic opportunity and Technologies.
              </p>


              <div className="contact-grid">

                {/* EMAIL */}

<a href="mailto:vigneshverze@gmail.com">
  <span>Email</span>
  <strong>vigneshverze@gmail.com</strong>
  <span>↗</span>
</a>

{/* LINKEDIN */}
<a
  href="https://www.linkedin.com/in/vigneshverze"
  target="_blank"
  rel="noopener noreferrer"
>
  <span>LinkedIn</span>
  <strong>Vignesh</strong>
  <span>↗</span>
</a>

{/* GITHUB */}
<a
  href="https://github.com/Vigneshzx"
  target="_blank"
  rel="noopener noreferrer"
>
  <span>GitHub</span>
  <strong>vigneshzx</strong>
  <span>↗</span>
</a>

              </div>

            </div>

          </Reveal>

        </section>

      </main>

      {selectedCertificate && (
  <motion.div
    className="certificate-modal"
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    onClick={() =>
      setSelectedCertificate(null)
    }
  >

    <motion.div
      className="certificate-modal-content"
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      <button
        className="certificate-close"
        onClick={() =>
          setSelectedCertificate(null)
        }
      >
        ×
      </button>

      <img
        src={selectedCertificate.image}
        alt={selectedCertificate.title}
      />

      <div className="certificate-modal-details">

        <h3>
          {selectedCertificate.title}
        </h3>

        <p>
          {selectedCertificate.issuer}
          {" · "}
          {selectedCertificate.year}
        </p>

      </div>

    </motion.div>

  </motion.div>
)}


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">

        <span>
          © 2026 Vignesh
        </span>

        <span>
          Designed & built with React
          and Three.js
        </span>

      </footer>
      {showResume && (
  <div
    className="resume-modal"
    onClick={() => setShowResume(false)}
  >
    <div
      className="resume-modal-content"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="resume-modal-header">
        <h3>My Resume</h3>

        <div className="resume-modal-actions">
          <a
            href="/resume.png"
            download="Vignesh-Resume.png"
            className="resume-download"
          >
            Download Resume ↓
          </a>

          <button
            onClick={() => setShowResume(false)}
            className="resume-close"
            aria-label="Close resume"
          >
            ×
          </button>
        </div>
      </div>

      <img
        src="/resume.png"
        alt="Vignesh's Resume"
        className="resume-image"
      />
    </div>
  </div>
)}

    </div>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ title, text }) {
  return (
    <div className="section-heading">

      <motion.h2
        initial={{
          opacity: 0,
          y: 22,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          delay: 0.08,
          duration: 0.7,
        }}
      >
        {text}
      </motion.p>

    </div>
  );
}
/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={{
        duration: 0.7,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}


export default App;