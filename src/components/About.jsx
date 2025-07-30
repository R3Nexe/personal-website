import MagneticButton from "./MagneticButton";
import SocialIcon from "./socialMediaIcons";
export const About = () => {
  return (
    <section id="about" className="w-full py-20 lg:py-100">
      <div className="container z-5 mx-auto max-w-2/3 items-center md:px-20">
        <div className="space-y-6 text-center md:text-center">
          <h2 className="text-4xl font-bold md:text-5xl">About Me</h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Hello! I'm a passionate developer with a love for creating elegant solutions in code. My journey into web development started with a simple "Hello World" and has grown into a full-fledged passion for building tools that are both useful and beautiful.
          </p>
          <p className="text-lg leading-relaxed text-neutral-300">
            When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or brewing the perfect cup of coffee.
          </p>
          <p>Find me here</p>
          <div className="flex flex-row justify-center gap-7 ">
            <MagneticButton>
           <SocialIcon
           href={'https://github.com/R3Nexe'}
           src={'public/icons/github.svg'}
           >
           </SocialIcon>
            </MagneticButton>

            <MagneticButton>
           <SocialIcon
           href={'https://www.linkedin.com/in/nishant-kumar-b91a96325/'}
           src={'public/icons/linkedin.svg'}
           >
           </SocialIcon>
            </MagneticButton>
            <MagneticButton>
           <SocialIcon
           href={'https://www.instagram.com/notsoshaant_/'}
           src={'public/icons/instagram.svg'}
           >
           </SocialIcon>
            </MagneticButton>
            <MagneticButton>
           <SocialIcon
           href={'https://www.artstation.com/r3nexe'}
           src={'public/icons/artstation.svg'}
           >
           </SocialIcon>
            </MagneticButton>

          </div>
        </div>
      </div>
    </section>
  );
};
