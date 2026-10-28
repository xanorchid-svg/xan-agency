import type { ComponentType } from 'react';
import Xanadu from './Xanadu';
import TouchstoneBernays from './TouchstoneBernays';
import BroncoBuckles from './BroncoBuckles';
import TapSponsor from './TapSponsor';
import Sapateiro from './Sapateiro';
import WildChildNosara from './WildChildNosara';
import PowerBagels from './PowerBagels';
import PerfeqtionImaging from './PerfeqtionImaging';
import DiamondVitalityCenter from './DiamondVitalityCenter';
import UnicornAlliance from './UnicornAlliance';
import PosadaNatura from './PosadaNatura';
import AgeThoughtfully from './AgeThoughtfully';
import Seekr from './Seekr';
import Simple from './Simple';
import Abrago from './Abrago';
import Gogal from './Gogal';
import OneLocal from './OneLocal';
import GoddessActivations from './GoddessActivations';
import Hypnositea from './Hypnositea';
import AstroTrips from './AstroTrips';
import Flyers from './Flyers';
import Artwork from './Artwork';
export const CASES: Record<string, { title: string; Component: ComponentType }> = {
  "xanadu": { title: "Xanadu", Component: Xanadu },
  "touchstone-bernays": { title: "Touchstone Bernays", Component: TouchstoneBernays },
  "bronco-buckles": { title: "Bronco Buckle Company", Component: BroncoBuckles },
  "tap-sponsor": { title: "Tap Sponsor", Component: TapSponsor },
  "sapateiro": { title: "Sapateiro Winery", Component: Sapateiro },
  "wild-child-nosara": { title: "Wild Child Nosara", Component: WildChildNosara },
  "power-bagels": { title: "Power Bagels", Component: PowerBagels },
  "perfeqtion-imaging": { title: "Perfeqtion Imaging & Real Health MD", Component: PerfeqtionImaging },
  "diamond-vitality-center": { title: "Diamond Vitality Center", Component: DiamondVitalityCenter },
  "unicorn-alliance": { title: "Unicorn Alliance", Component: UnicornAlliance },
  "posada-natura": { title: "Posada Natura", Component: PosadaNatura },
  "age-thoughtfully": { title: "Age Thoughtfully", Component: AgeThoughtfully },
  "seekr": { title: "Seekr", Component: Seekr },
  "simple": { title: "Simple", Component: Simple },
  "abrago": { title: "Abrago", Component: Abrago },
  "gogal": { title: "GoGal", Component: Gogal },
  "one-local": { title: "ONE Local", Component: OneLocal },
  "goddess-activations": { title: "Goddess Activations", Component: GoddessActivations },
  "hypnositea": { title: "Hypnositea", Component: Hypnositea },
  "astro-trips": { title: "Astro Trips", Component: AstroTrips },
  "flyers": { title: "Flyers & Print", Component: Flyers },
  "artwork": { title: "Artwork", Component: Artwork },
};
