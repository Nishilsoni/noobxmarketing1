import {
  Search,
  Target,
  Share2,
  PenTool,
  Mail,
  LayoutDashboard,
  Palette,
  Clapperboard,
  Rocket,
  Sparkles,
  Compass,
  LineChart,
  ShieldCheck,
  Users,
  Globe,
  Zap,
  Trophy,
  Telescope,
  Orbit,
  Gauge,
  TrendingUp,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

/** Registry mapping serializable icon names → Lucide components.
 *  Lets us keep data files free of non-serializable component refs. */
export const iconRegistry: Record<IconName, LucideIcon> = {
  search: Search,
  target: Target,
  share: Share2,
  pen: PenTool,
  mail: Mail,
  layout: LayoutDashboard,
  palette: Palette,
  clapperboard: Clapperboard,
  rocket: Rocket,
  sparkles: Sparkles,
  compass: Compass,
  lineChart: LineChart,
  shieldCheck: ShieldCheck,
  users: Users,
  globe: Globe,
  zap: Zap,
  trophy: Trophy,
  telescope: Telescope,
  orbit: Orbit,
  gauge: Gauge,
  trendingUp: TrendingUp,
  messageSquare: MessageSquare,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
  "aria-hidden": ariaHidden = true,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}) {
  const Cmp = iconRegistry[name];
  if (!Cmp) return null;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden={ariaHidden} />;
}
