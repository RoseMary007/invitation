import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  MapPin
} from "lucide-react";


// ============================================================
// WEDDING INFORMATION
// ============================================================

const WEDDING = {

  groom: "VARGHESE J UKKEN",

  bride: "ALEENA BABU",

  date: "2026-09-27T03:00:00",

  dateText: "Sunday, 27th September 2026",

  church: {
    name: "St. Mary's Forane Church",
    address: "St. Mary's Forane Church, Koratty, Thrissur, Kerala, India, 680308",
    map:
      "https://www.google.com/maps/dir/9.8038172,76.6759214/St.+Mary's+Syro-Malabar+Church,+Koratty,+788W%2B6QJ,+Koratty,+Kerala+680308/@10.0341889,76.1815522,10z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3b0803362e58aaa3:0x77abf233a79bd505!2m2!1d76.3467855!2d10.2652556?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D"
  },

  reception: {
    name: "Heartland Convention centre",
    address: "Heartland Convention centre, chalakudy, Thrissur, Kerala, India, 680308",
    map:
      "https://www.google.com/maps/dir//Kizhakuden's+HeartLand+Convention+Centre,+Athirapilly+road,+Koodapuzha,+Chalakudy,+Kerala+680721/@9.8038172,76.6759214,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b08030ad038013d:0xf0b6ccf724a81644!2m2!1d76.3525474!2d10.3139921?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D"
  }

};


// ============================================================
// ANIMATION SETTINGS
// ============================================================

const revealTransition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1]
};


// ============================================================
// REVEAL COMPONENT
// ============================================================

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = ""
}) {

  const initialPositions = {

    up: {
      y: 60,
      x: 0
    },

    left: {
      x: -70,
      y: 0
    },

    right: {
      x: 70,
      y: 0
    }

  };


  return (

    <motion.div

      className={className}

      initial={{
        opacity: 0,
        ...initialPositions[direction]
      }}

      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}

      viewport={{
        once: true,
        amount: 0.15
      }}

      transition={{
        ...revealTransition,
        delay
      }}

    >

      {children}

    </motion.div>

  );

}


// ============================================================
// HERO
// ============================================================

function Hero() {

  const { scrollYProgress } = useScroll();


  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 1.14]
  );


  const imageY = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", "8%"]
  );


  return (

    <section
      id="home"
      className="hero-section"
    >

      {/* BACKGROUND PHOTO */}

      <motion.div
        className="hero-photo"

        style={{
          scale: imageScale,
          y: imageY
        }}
      />


      <div className="hero-dark" />


      {/* NAVIGATION */}

      <nav className="top-navigation">

        <a
          href="#home"
          className="nav-monogram"
        >
          V <span>&</span> A
        </a>


        <div className="nav-menu">

          <a href="#story">
            STORY
          </a>

          <a href="#gallery">
            GALLERY
          </a>

          <a href="#venues">
            VENUE
          </a>

        </div>

      </nav>


      {/* HERO CONTENT */}

      <div className="hero-content">

        <motion.p
          className="hero-intro"

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1,
            delay: 0.25
          }}
        >

          WE ARE GETTING

        </motion.p>


        <div className="hero-title-wrapper">

          <motion.h1

            initial={{
              y: "100%"
            }}

            animate={{
              y: 0
            }}

            transition={{
              duration: 1.3,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}

          >

            BETROTHED

          </motion.h1>

        </div>


        <motion.div
          className="hero-couple"

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 1,
            duration: 1
          }}
        >

          <span>
            {WEDDING.groom}
          </span>

          <i>&</i>

          <span>
            {WEDDING.bride}
          </span>

        </motion.div>


        <motion.p
          className="hero-date"

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 1.2,
            duration: 1
          }}
        >

          {WEDDING.dateText}

        </motion.p>

      </div>


      <motion.a
        href="#story"
        className="hero-scroll"

        animate={{
          y: [0, 8, 0]
        }}

        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >

        <span>
          SCROLL TO EXPLORE
        </span>

        <ArrowDown size={16} />

      </motion.a>

    </section>

  );

}


// ============================================================
// WELCOME
// ============================================================

function Welcome() {

  return (

    <section
      id="story"
      className="welcome-section"
    >

      <div className="welcome-photo" />

      <div className="welcome-overlay" />


      <div className="welcome-content">

        <div className="vertical-line" />


        <Reveal>

          <p className="eyebrow">
            A NEW CHAPTER
          </p>

        </Reveal>


        <Reveal delay={0.1}>

          <h2>

            Welcome to
            <br />

            <em>our invitation.</em>

          </h2>

        </Reveal>


        <Reveal delay={0.2}>

          <p className="welcome-description">

            We are so happy to share this
            beautiful chapter of our lives
            with the people who mean the
            most to us.

          </p>

        </Reveal>


        {/* IMPORTANT BUTTON */}

        <Reveal delay={0.35}>

          <a
            href="#venues"
            className="engagement-button"
          >

            <span>
              ENGAGEMENT
            </span>

            <ArrowUpRight size={18} />

          </a>

        </Reveal>

      </div>

    </section>

  );

}





// ============================================================
// PERSON SECTION
// ============================================================

function PersonSection({
  image,
  number,
  role,
  name,
  align
}) {

  return (

    <section className="person-section">

      <motion.div
        className="person-photo"

        style={{
          backgroundImage:
            `url("${image}")`
        }}

        initial={{
          scale: 1
        }}

        whileInView={{
          scale: 1.08
        }}

        viewport={{
          once: true
        }}

        transition={{
          duration: 12,
          ease: "linear"
        }}
      />


      <div className="person-overlay" />


      <div
        className={`person-content ${align}`}
      >

        <Reveal>

          <span className="person-number">
            {number}
          </span>

        </Reveal>


        <Reveal delay={0.1}>

          <p className="eyebrow">
            {role}
          </p>

        </Reveal>


        <div className="name-reveal">

          <motion.h2

            initial={{
              y: "110%"
            }}

            whileInView={{
              y: 0
            }}

            viewport={{
              once: true
            }}

            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}

          >

            {name}

          </motion.h2>

        </div>

      </div>


      <div className="person-scroll">

        SCROLL

        <ArrowDown size={15} />

      </div>

    </section>

  );

}

// ============================================================
// COUPLE IMAGE
// ============================================================

function CoupleImage() {

  return (

    <section className="couple-photo-section">

      <motion.div
        className="couple-photo"

        initial={{
          scale: 1.08
        }}

        whileInView={{
          scale: 1
        }}

        viewport={{
          once: true
        }}

        transition={{
          duration: 2,
          ease: [0.16, 1, 0.3, 1]
        }}
      />

      <div className="couple-photo-overlay" />


      <div className="couple-photo-content">

        <Reveal>

          <p className="eyebrow">
            TOGETHER
          </p>

        </Reveal>


        <Reveal delay={0.15}>

          <h2>

            One love.
            <br />

            <em>One story.</em>

          </h2>

        </Reveal>

      </div>


      <div className="photo-caption">
        Love stories are narratives focused on romantic relationships, 
        emotional connection, and the journey of two people falling or staying
         in love.Key Types of Love StoriesClassic Literature: Timeless novels like 
         Jane Austen's Pride and Prejudice explore social standing, wit, and personal
          growth alongside romance.Tragic and Historical: Tales like Shakespeare's Romeo and Juliet or real-world epics focus on sacrifice, societal barriers, and deep loss.Modern and Contemporary: Everyday accounts of real people meeting, overcoming obstacles, and building long-term partnerships.Common Tro
      </div>

    </section>

  );

}


// ============================================================
// CINEMATIC GALLERY
// ============================================================

const galleryImages = [

  {
    src: "/images/gallery1.jpg",
    className: "gallery-large"
  },

  {
    src: "/images/gallery2.jpg",
    className: "gallery-small"
  },

  {
    src: "/images/gallery3.jpg",
    className: "gallery-tall"
  },

  {
    src: "/images/gallery4.jpg",
    className: "gallery-wide"
  },

  {
    src: "/images/gallery5.jpg",
    className: "gallery-small-two"
  },

  {
    src: "/images/gallery6.jpg",
    className: "gallery-final"
  }

];


function Gallery() {

  return (

    <section
      id="gallery"
      className="gallery-section"
    >

      <div className="gallery-introduction">

        <Reveal>

          <p className="eyebrow">
            LITTLE MOMENTS
          </p>

        </Reveal>


        <Reveal delay={0.1}>

          <h2>

            Our
            <br />

            <em>memories.</em>

          </h2>

        </Reveal>


        <Reveal delay={0.2}>

          <p>

            A collection of moments
            that brought us here.

          </p>

        </Reveal>

      </div>


      {/* CINEMATIC COLLAGE */}

      <div className="gallery-collage">

        {galleryImages.map(
          (image, index) => (

            <motion.div

              key={image.src}

              className={`gallery-image ${image.className}`}

              initial={{
                opacity: 0,
                y: 80,
                scale: 0.96
              }}

              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              viewport={{
                once: true,
                amount: 0.1
              }}

              transition={{
                duration: 1.1,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}

            >

              <img
                src={image.src}
                alt="Wedding memory"
              />


              <motion.div

                className="gallery-image-inner"

                whileInView={{
                  scale: [1.08, 1]
                }}

                viewport={{
                  once: true
                }}

                transition={{
                  duration: 2
                }}

              />

            </motion.div>

          )
        )}

      </div>


      <div className="gallery-bottom-text">

        <span>
          MORE MEMORIES TO CREATE
        </span>

        <span>
          V & A
        </span>

      </div>

    </section>

  );

}



// ============================================================
// VENUE CARD
// ============================================================

function VenueCard({
  type,
  venue,
  address,
  image,
  map,
  time,
  date
}) {

  return (

    <Reveal className="venue-card">

      {/* PHOTO */}
      <div className="venue-card-photo">

        <img
          src={image}
          alt={venue}
        />

      </div>


      {/* CARD INFORMATION */}
      <div className="venue-card-info">

        {/* EVENT TYPE */}
        <p className="venue-type">
          {type}
        </p>


        {/* VENUE NAME */}
        <h3>
          {venue}
        </h3>


        {/* ADDRESS */}
        <div className="venue-address">

          <MapPin size={16} />

          <span>
            {address}
          </span>

        </div>


        {/* TIME */}
        <div className="venue-event-time">

          <span>
            {time}
          </span>

        </div>


        {/* DATE */}
        <p className="venue-event-date">
          {date}
        </p>


        {/* MAP */}
        <a
          href={map}
          target="_blank"
          rel="noreferrer"
          className="map-link"
        >

          <span>
            VIEW ON MAP
          </span>

          <ArrowUpRight size={17} />

        </a>

      </div>

    </Reveal>

  );

}


// ============================================================
// VENUES
// ============================================================

function Venues() {

  return (

    <section
      id="venues"
      className="venues-section"
    >

      {/* BACKGROUND PHOTO */}

      <div className="venues-background" />

      <div className="venues-dark" />


      <div className="venues-content">

        {/* ====================================================
            SECTION TITLE
            ==================================================== */}

        <div className="venues-title">

          <Reveal>

            <p className="eyebrow">
              JOIN US
            </p>

          </Reveal>


          <Reveal delay={0.1}>

            <h2>

              Where the
              <br />

              <em>magic happens.</em>

            </h2>

          </Reveal>

        </div>


        {/* ====================================================
            TWO VENUE CARDS ONLY
            ==================================================== */}

        <div className="venue-grid">


          {/* ==================================================
              CHURCH / BETROTHAL
              ================================================== */}

          <VenueCard

            type="THE BETROTHAL"

            venue={
              WEDDING.church.name
            }

            address={
              WEDDING.church.address
            }

            image="/images/church.jpg"

            map={
              WEDDING.church.map
            }

            time="3:00 PM"

            date="Sunday, 27 September 2026"

          />


          {/* ==================================================
              RECEPTION
              ================================================== */}

          <VenueCard

            type="RECEPTION"

            venue={
              WEDDING.reception.name
            }

            address={
              WEDDING.reception.address
            }

            image="/images/reception.jpg"

            map={
              WEDDING.reception.map
            }

            time="6:30 PM"

            date="Sunday, 27 September 2026"

          />

        </div>

      </div>

    </section>

  );

}




// ============================================================
// DRESS CODE
// ============================================================
// ============================================================
// DRESS CODE
// ============================================================

function DressCode() {

  return (

    <section
      id="dress"
      className="dress-section"
    >

      {/* BACKGROUND */}

      <div className="dress-photo" />

      <div className="dress-overlay" />


      {/* CONTENT */}

      <div className="dress-content">


        {/* ====================================================
            SMALL TITLE
            ==================================================== */}

        <Reveal>

          <p className="eyebrow">
            WHAT TO WEAR
          </p>

        </Reveal>


        {/* ====================================================
            MAIN TITLE
            ==================================================== */}

        <Reveal delay={0.1}>

          <h2>
            Dress code
          </h2>

        </Reveal>


        {/* ====================================================
            DIVIDER
            ==================================================== */}

        <Reveal delay={0.2}>

          <div className="dress-line" />

        </Reveal>


        {/* ====================================================
            DRESS STYLE
            ==================================================== */}

        <Reveal delay={0.3}>

          <p className="dress-style">
            Elegant
          </p>

          <p className="dress-subtitle">
            traditional attire in rich, dark ,loud tones
          </p>

        </Reveal>


        {/* ====================================================
            DESCRIPTION
            ==================================================== */}

        <Reveal delay={0.4}>

          <p className="dress-description">

            Come dressed in something
            that makes you feel beautiful,
            comfortable and ready to celebrate.

          </p>

        </Reveal>


        {/* ====================================================
            DRESS CODE IMAGE
            ==================================================== */}

        <Reveal delay={0.5}>

          <div className="dress-code-image">

            <img
              src="/images/dress-code.jpg"
              alt="Traditional wedding dress code"
            />

          </div>

        </Reveal>


        {/* ====================================================
            BOTTOM LABEL
            ==================================================== */}

        <Reveal delay={0.6}>

          <p className="dress-code-note">
          •  DARK • RICH • TRADITIONAL •  
          </p>

        </Reveal>


      </div>

    </section>

  );

}


// ============================================================
// COUNTDOWN
// ============================================================

function Countdown() {

  const calculate = () => {

    const target =
      new Date(WEDDING.date).getTime();

    const now =
      Date.now();

    const difference =
      target - now;


    if (difference <= 0) {

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

    }


    return {

      days: Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference /
          (1000 * 60 * 60)) %
          24
      ),

      minutes: Math.floor(
        (difference /
          (1000 * 60)) %
          60
      ),

      seconds: Math.floor(
        (difference / 1000) %
        60
      )

    };

  };


  const [time, setTime] =
    useState(calculate());


  useEffect(() => {

    const interval =
      setInterval(() => {

        setTime(calculate());

      }, 1000);


    return () =>
      clearInterval(interval);

  }, []);


  const values = [

    {
      number: time.days,
      label: "DAYS"
    },

    {
      number: time.hours,
      label: "HOURS"
    },

    {
      number: time.minutes,
      label: "MINUTES"
    },

    {
      number: time.seconds,
      label: "SECONDS"
    }

  ];


  return (

    <section
      className="countdown-section"
    >

      {/* BACKGROUND PHOTO */}

      <div className="countdown-photo" />

      <div className="countdown-overlay" />


      <div className="countdown-content">

        <Reveal>

          <p className="eyebrow">
            UNTIL WE SAY I DO
          </p>

        </Reveal>


        <Reveal delay={0.1}>

          <h2>
            The countdown
          </h2>

        </Reveal>


        <div className="countdown-grid">

          {values.map(
            (item, index) => (

              <motion.div
                key={item.label}
                className="countdown-glass"

                initial={{
                  opacity: 0,
                  y: 40
                }}

                whileInView={{
                  opacity: 1,
                  y: 0
                }}

                viewport={{
                  once: true
                }}

                transition={{
                  delay: index * 0.08,
                  duration: 0.8
                }}

                whileHover={{
                  y: -8
                }}
              >

                <div className="glass-light" />


                <motion.div
                  className="count-number"

                  key={item.number}

                  initial={{
                    opacity: 0,
                    scale: 0.85
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1
                  }}

                  transition={{
                    duration: 0.3
                  }}
                >

                  {String(
                    item.number
                  ).padStart(2, "0")}

                </motion.div>


                <span className="count-label">
                  {item.label}
                </span>

              </motion.div>

            )
          )}

        </div>


        <Reveal delay={0.25}>

          <p className="count-date">
            {WEDDING.dateText}
          </p>

        </Reveal>

      </div>

    </section>

  );

}


// ============================================================
// FOOTER
// ============================================================

function Footer() {

  return (

    <footer className="final-section">

      <Reveal>

        <p className="eyebrow">
          WITH LOVE
        </p>

      </Reveal>


      <div className="final-names">

        <motion.span

          initial={{
            x: -70,
            opacity: 0
          }}

          whileInView={{
            x: 0,
            opacity: 1
          }}

          viewport={{
            once: true
          }}

          transition={{
            duration: 1
          }}

        >

          {WEDDING.groom}

        </motion.span>


        <i>
          &
        </i>


        <motion.span

          initial={{
            x: 70,
            opacity: 0
          }}

          whileInView={{
            x: 0,
            opacity: 1
          }}

          viewport={{
            once: true
          }}

          transition={{
            duration: 1
          }}

        >

          {WEDDING.bride}

        </motion.span>

      </div>


      <p className="final-date">
        {WEDDING.dateText}
      </p>


      <div className="final-heart">
        ♥
      </div>

    </footer>

  );

}


// ============================================================
// APP
// ============================================================

export default function App() {

  return (

    <main className="wedding-site">

      <Hero />

      <Welcome />

      

      <PersonSection
        image="/images/groom.jpg"
        number="I am"
        name={WEDDING.groom}
        align="left"
      />


      <PersonSection
        image="/images/bride.jpg"
        number="AND I am"
        name={WEDDING.bride}
        align="right"
      />

      <CoupleImage />


      <Gallery />

      

      <Venues />

      <DressCode />

       <Countdown />

      <Footer />

    </main>

  );

}