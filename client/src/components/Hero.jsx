import "../styles/Hero.css"

const Hero = () => {
  return (
    <div className="hero-main" id="heroSection">
      {/* hero content */}
      <div className="hero-text-content">
        <p className="top-text">AWSCC PUP Manila - DSWD</p>
        <p className="center-text">
          It's always <br />
          <span>Day One</span>
        </p>
        <p className="bottom-text">Learn more about AWS, cloud computing, and anything you want!</p>
        <a href="#articleSection">
          <button>
            Explore
          </button>
        </a>
      </div>

      {/* hero image content */}
      <div className="hero-img-content">
        <img src="/alf-ufo.svg" alt="UFO Alf" />
      </div>
    </div>
  );
};

export default Hero;