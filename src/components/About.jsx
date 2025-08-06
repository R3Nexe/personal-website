import MagneticButton from "./MagneticButton";
import SocialIcon from "./socialMediaIcons";
export const About = () => {
  return (
    <section id="about" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center">
      <div className="container mx-auto max-w-4xl md:px-20">
        <div className="relative space-y-5">
          <h2 className="text-4xl md:text-5xl">About Me</h2>
          <p className="text-lg leading-relaxed text-justify text-neutral-300">
            I'm <span>Nishant</span>, a passionate CS student from Institute of Technical Research and Education, India, with a love for building eyecatching websites and learning about Artificial intelligence and their uses.  I am proficient in front-end technologies including <span>Javascript</span>, <span>Reactjs</span>, <span>TailwindCss</span> and <span>Framer-motion</span> My skills set extends to <span className="hover:text-gradient-1"> Python </span> leveraging libraries like <span className="hover:text-gradient-1">Pandas</span> for data analysis, and general-purpose programming in <span className="hover:text-gradient-1">Java</span>
          </p>
          <p className="text-lg text-justify leading-relaxed text-neutral-300">
            When I'm not coding, you can find me exploring the latest tech trends,doing <span>Photography</span>, <span>3D Modelling</span>, <span>Sketching</span> or brewing the perfect cup of coffee.
          </p>
          <p className="text-lg leading-relaxed text-neutral-300">Find me here</p>
          <div className="flex flex-row justify-center gap-7 ">
            <MagneticButton>
              <SocialIcon
                href={'https://github.com/R3Nexe'}
                src={'icons/github.svg'}
              >
              </SocialIcon>
            </MagneticButton>

            <MagneticButton>
              <SocialIcon
                href={'https://www.linkedin.com/in/nishant-kumar-b91a96325/'}
                src={'icons/linkedin.svg'}
              >
              </SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                href={'https://www.instagram.com/notsoshaant_/'}
                src={'icons/instagram.svg'}
              >
              </SocialIcon>
            </MagneticButton>
            <MagneticButton>
              <SocialIcon
                href={'https://www.artstation.com/r3nexe'}
                src={'icons/artstation.svg'}
              >
              </SocialIcon>
            </MagneticButton>

          </div>
        </div>
      </div>
    </section>
  );
};
