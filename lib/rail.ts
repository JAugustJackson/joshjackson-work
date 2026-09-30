export type RailState = "collapsed" | "expanded";

export const RAIL_STORAGE_KEY = "rail";

export function defaultRail(pathname: string): RailState {
  return pathname === "/" ? "collapsed" : "expanded";
}

export function isRailState(value: unknown): value is RailState {
  return value === "collapsed" || value === "expanded";
}

/** Runs in <head> before paint so the rail never flashes the wrong width. */
export const railScript = `(function(){var d=document.documentElement;var r=location.pathname==="/"?"collapsed":"expanded";try{var o=localStorage.getItem("${RAIL_STORAGE_KEY}");if(o==="collapsed"||o==="expanded")r=o;}catch(e){}d.dataset.rail=r;})();`;
