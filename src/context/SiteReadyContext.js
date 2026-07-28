import { createContext, useContext } from "react";

// Flips true once the Singularity Intake loader has cleared, so mount-time
// entrance choreography (hero stagger, HUD corner boot-up, page-header reveal,
// video zoom) plays where the visitor can actually see it. Without this, every
// reveal animation fires the instant its component mounts — which happens while
// the opaque loader still covers the screen — so by the time the loader clears,
// the "arrival" has already finished off-screen and the page just appears static.
const SiteReadyContext = createContext(false);

export const useSiteReady = () => useContext(SiteReadyContext);

export default SiteReadyContext;
