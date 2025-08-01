export const VideoBackground = () => {
  return (
    <div
      className="fixed h-screen w-full top-0 left-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        className="absolute top-0 left-0  md:h-full w-full object-cover"
      >
        <source
          src="videos/smooth.webm"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 h-full w-full bg-black/65"></div>
    </div>
  );
};
