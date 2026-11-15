export const MARS_MACHINES = [
  {
    id: 'sojourner',
    name: 'Sojourner Rover',
    code: 'MARS PATHFINDER • "MICROWAVE EXPLORER"',
    year: '1997',
    mission: 'Mars Pathfinder (Landed July 4, 1997)',
    landingSite: 'Ares Vallis (19.13° N, 33.22° W)',
    distanceTravelled: 'About 100 meters (330 feet) around the lander',
    topSpeed: '1 centimeter per second (0.02 mph / 0.036 km/h)',
    powerSource: '0.22 m² Gallium Arsenide solar array (16 Watts max) + non-rechargeable D-cell lithium battery',
    missionDuration: '83 Martian sols (Planned: 7 days — 12x longer!)',
    imagesSent: 'Over 550 authentic Martian surface photographs',
    heroImage: '/images/mars/sojourner/sojourner-hero-yogi.jpg',
    heroCaption: 'Sojourner deploying its APXS spectrometer against the famous Martian boulder named "Yogi" in Ares Vallis.',
    heroCredit: 'NASA / JPL-Caltech (PIA01551)',
    sourceUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
    secondaryUrl: 'https://science.nasa.gov/resource/sojourner-rover/',

    tagline: 'The brave little pioneer that proved robotic wheels could roll and explore another planet.',

    studentSummary: {
      speedComparison: 'Moved at a calm turtle pace of 1 cm per second, taking its time so it would never tumble into Martian crevasses.',
      weightComparison: 'Weighed 23 pounds (10.6 kg) on Earth—about the size of a microwave oven—but felt like just 9 pounds (4 kg) on Mars!',
      powerUsage: 'Operated on only 16 Watts of solar power—less electricity than a single small bedroom nightlight bulb!',
    },

    anatomy: [
      {
        id: 'rocker-bogie',
        title: 'Rocker-Bogie 6-Wheel Suspension',
        subtitle: 'Can climb rocks taller than its own wheels!',
        icon: '🛞',
        description:
          'Engineers invented a special 6-wheeled suspension with no springs. Each side has a rocker arm connected by a differential pivot. This keeps all 6 cleated aluminium wheels firmly on the ground even when climbing rocks bigger than the wheel itself!',
      },
      {
        id: 'solar-roof',
        title: 'Flat Solar Array Roof',
        subtitle: 'Powered by sunlight 140 million miles from Earth',
        icon: '☀️',
        description:
          'The entire top deck of Sojourner was covered in dark gallium arsenide solar cells. At noon on Mars, it generated about 16 Watts of clean electricity, charging the computers and driving the electric wheel motors.',
      },
      {
        id: 'apxs',
        title: 'Alpha Proton X-Ray Spectrometer (APXS)',
        subtitle: 'Sniffing out the chemical recipe of alien rocks',
        icon: '🔬',
        description:
          'Mounted on a motorized deployment arm on the back of the rover, this scientific sensor shot alpha particles and X-rays into Martian rocks to figure out exactly what minerals and elements they were made of.',
      },
      {
        id: 'eyes',
        title: 'Stereo Navigation Eye Cameras',
        subtitle: '3D vision to detect rocks and ditches',
        icon: '👀',
        description:
          'Two black-and-white forward cameras mounted 15 cm apart gave Sojourner 3D stereoscopic vision. The rover onboard computer scanned laser beams ahead to detect obstacles and map safe paths automatically.',
      },
      {
        id: 'web',
        title: 'Warm Electronics Box (WEB)',
        subtitle: 'A high-tech thermos flask in deep freeze',
        icon: '🛡️',
        description:
          'Martian nights plunge to -110°F (-79°C). Sojourner protected its 8-bit Intel 80C85 computer inside an insulated gold-coated enclosure warmed by tiny radioactive heater pellets (RHUs).',
      },
    ],

    sections: {
      meetTheMachine: {
        title: 'Meet the Rover',
        content:
          'Meet Sojourner, the tiny space explorer that made history in 1997 as the very first wheeled rover ever driven on another planet! Built by NASA\'s Jet Propulsion Laboratory (JPL), Sojourner was about the size of a kitchen microwave oven—just 65 cm (2 feet) long and weighing only 10.6 kg (23 pounds). It was named in honor of Sojourner Truth, an African-American abolitionist and women\'s rights champion, after a 12-year-old student from Missouri won a nationwide essay contest. Folded flat like a lunchbox, Sojourner hitchhiked to Mars inside the pyramid-shaped Mars Pathfinder lander.',
      },
      itsMission: {
        title: 'Its Mission',
        content:
          'On July 4, 1997, Mars Pathfinder bounced to a landing inside giant protective airbags on the plains of Ares Vallis—an ancient Martian floodplain carved billions of years ago by rushing water. Once the airbags deflated and the lander opened its three petals, Sojourner rolled down a metal ramp onto the red Martian soil. Its mission was a high-stakes technology demonstration: could a lightweight robot survive the harsh Martian cold, navigate rocky terrain safely without getting stuck, and analyze real alien rocks using science instruments? It succeeded beyond anyone\'s wild dreams.',
      },
      technology: {
        title: 'Technology & Rocker-Bogie Suspension',
        content:
          'Because Mars is tens of millions of miles away, radio signals take up to 20 minutes to travel each way—meaning nobody on Earth could drive Sojourner with a live joystick! Instead, NASA gave Sojourner autonomous driving computers and a revolutionary "Rocker-Bogie" 6-wheel suspension. This mechanical suspension allowed the rover to drive over rocks twice the diameter of its wheels without tipping over. Every modern Mars rover—from Spirit and Opportunity to Curiosity and Perseverance—uses this exact same suspension invented for Sojourner!',
      },
      discoveries: {
        title: 'Discoveries',
        content:
          'Sojourner was like a miniature robotic geologist. It rolled up to a football-sized rock nicknamed "Barnacle Bill" and pressed its APXS sensor against it, discovering it was made of volcanic andesite rich in silica—very similar to volcanic rocks found on Earth in the Andes mountains. Next, it visited a giant boulder shaped like a resting bear named "Yogi", revealing volcanic basalt. It also measured rounded Martian pebbles and rocks tilted in the same direction, proving that immense floods of rushing liquid water once flowed through Ares Vallis in Mars\' deep past!',
      },
      whyStopped: {
        title: 'Why It Stopped',
        content:
          'Sojourner was designed to last just 7 Martian days (sols). Incredibly, it kept driving and doing science for 83 Martian days—almost 12 times longer than expected! Because Sojourner was so small, it did not have a big radio to talk directly to Earth; all its data was sent through the Pathfinder base station. On September 27, 1997, the Pathfinder lander\'s main battery finally failed after enduring hundreds of deep-freeze cycles in the -110°F Martian nights. Without the lander to relay communications, NASA could no longer send commands or receive pictures from Sojourner.',
      },
      amazingFact: {
        title: 'Amazing Fact',
        content:
          'Engineers programmed Sojourner so that if it ever lost contact with the lander station, it would automatically circle back toward the lander and wait patiently for instructions. Planetary scientists believe that when communications ended, Sojourner dutifully drove back to the Pathfinder lander and parked nearby, where it still sits today in the quiet red dust of Ares Vallis!',
      },
    },

    gallery: [
      {
        url: '/images/mars/sojourner/sojourner-hero-yogi.jpg',
        title: 'Sojourner at the Rock "Yogi"',
        caption: 'Sojourner placing its Alpha Proton X-ray Spectrometer against Yogi rock on Mars. The red Martian soil and distant ridges are visible.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://science.nasa.gov/resource/sojourner-rover/',
      },
      {
        url: '/images/mars/sojourner/sojourner-pathfinder-lander.jpg',
        title: 'Pathfinder Lander with Deflated Airbags',
        caption: 'The Mars Pathfinder lander unfolded on Mars with its deflated landing airbags and the ramp Sojourner rolled down.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://science.nasa.gov/mission/mars-pathfinder/',
      },
      {
        url: '/images/mars/sojourner/sojourner-barnacle-bill.jpg',
        title: 'Investigating Rock "Barnacle Bill"',
        caption: 'High-resolution image of the very first rock ever chemically analyzed on Mars by Sojourner\'s APXS instrument.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://images.nasa.gov/details/PIA01408',
      },
      {
        url: '/images/mars/sojourner/sojourner-tracks-mars.jpg',
        title: 'Wheel Tracks in the Martian Regolith',
        caption: 'Crisp tracks left in the reddish-brown Martian dust by Sojourner’s six cleated wheels as it explored the landing site.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://images.nasa.gov/details/PIA00633',
      },
      {
        url: '/images/mars/sojourner/sojourner-rover-view-yogi.jpg',
        title: 'Sojourner\'s Own View of Yogi Rock',
        caption: 'A view captured directly from Sojourner\'s forward onboard camera looking straight ahead at the boulder Yogi.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://images.nasa.gov/details/PIA00998',
      },
    ],

    quiz: [
      {
        id: 1,
        question: 'What everyday household item was the Sojourner rover approximately the same size as?',
        options: [
          'A school bus',
          'A microwave oven',
          'A large refrigerator',
          'A bicycle',
        ],
        correctIndex: 1,
        explanation: 'Sojourner was tiny! It was only 65 cm (2 feet) long and weighed 23 pounds (10.6 kg), roughly the size of a kitchen microwave oven.',
        funFact: 'Because Mars has only 38% of Earth\'s gravity, Sojourner felt like it weighed just 9 pounds (4 kg) on the red planet!',
      },
      {
        id: 2,
        question: 'How long was Sojourner originally planned to work on Mars, and how long did it actually last?',
        options: [
          'Planned for 1 day, lasted 3 days',
          'Planned for 7 days, lasted 83 Martian days (12x longer!)',
          'Planned for 1 year, lasted 5 years',
          'Planned for 30 days, lasted exactly 30 days',
        ],
        correctIndex: 1,
        explanation: 'NASA originally designed Sojourner for a 7-day technology demonstration, but the resilient rover kept rolling and taking science data for 83 Martian sols!',
        funFact: 'Sojourner sent back over 550 photographs and completed 15 chemical analyses of rocks and soil before its lander lost battery power.',
      },
      {
        id: 3,
        question: 'What is the special name of the 6-wheel suspension system invented for Sojourner that is still used on Curiosity and Perseverance?',
        options: [
          'Hydraulic bouncy springs',
          'Rocker-Bogie suspension',
          'Four-wheel drive axle',
          'Caterpillar tank tracks',
        ],
        correctIndex: 1,
        explanation: 'The Rocker-Bogie suspension has no springs; it uses articulated rocker arms and a differential pivot to keep all 6 wheels touching the ground over tall obstacles.',
        funFact: 'This system allows rovers to climb over rocks larger than their own wheel diameter without rolling over or tipping!',
      },
      {
        id: 4,
        question: 'Who was the Sojourner rover named after by a 12-year-old student who won a nationwide essay contest?',
        options: [
          'Sojourner Truth, the famous abolitionist and civil rights champion',
          'A famous NASA astronaut from Apollo 11',
          'An ancient Roman astronomer',
          'A science-fiction superhero',
        ],
        correctIndex: 0,
        explanation: '12-year-old Valerie Ambroise of Missouri won the contest by proposing the name Sojourner Truth, honoring the brave abolitionist who journeyed across America for freedom.',
        funFact: 'The word "sojourner" also means a traveler or explorer who stays in a place for a short time.',
      },
      {
        id: 5,
        question: 'Why did the Sojourner mission finally come to an end on September 27, 1997?',
        options: [
          'Sojourner fell into a deep crater and broke in half',
          'A giant dust storm blew the rover away',
          'The Pathfinder base station battery failed after months of freezing nights, cutting off communication',
          'Sojourner ran completely out of wheel grease',
        ],
        correctIndex: 2,
        explanation: 'Sojourner relied on the Pathfinder lander station to beam messages to Earth. When the lander\'s battery died from the harsh Martian winter cold, communication was permanently lost.',
        funFact: 'Sojourner is still sitting peacefully in Ares Vallis, waiting like a tiny time capsule from the dawn of Mars exploration!',
      },
    ],
  },

  {
    id: 'opportunity',
    name: 'Opportunity Rover',
    code: 'MER-B • "THE 15-YEAR MARATHON ROVER"',
    year: '2004–2019',
    mission: 'Mars Exploration Rover Mission (Landed Jan 25, 2004 – Ended Feb 13, 2019)',
    landingSite: 'Eagle Crater, Meridiani Planum (1.95° S, 354.47° E)',
    distanceTravelled: '45.16 kilometers (28.06 miles) — all-time off-world record!',
    topSpeed: '5 centimeters per second (0.11 mph / 0.18 km/h)',
    powerSource: 'Deployable triple-junction Gallium Arsenide solar array (140 Watts peak) + two rechargeable lithium-ion batteries',
    missionDuration: '14 years, 11 months / 5,352 Martian sols (Planned: 90 days — 55x longer!)',
    imagesSent: '217,594 raw photographs sent to Earth',
    heroImage: '/images/mars/opportunity/opportunity-hero-mars.jpg',
    heroCaption: 'Opportunity Mars Exploration Rover standing on the rolling red plains of Meridiani Planum.',
    heroCredit: 'NASA / JPL-Caltech / Cornell',
    sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
    secondaryUrl: 'https://science.nasa.gov/resource/opportunity-rovers-final-mars-images/',

    tagline: 'The legendary robotic geologist that spent 15 years discovering Mars\' ancient watery past.',

    studentSummary: {
      speedComparison: 'Cruised at about 5 cm per second—slower than a walking toddler—yet drove over 28 miles across rugged Martian deserts!',
      weightComparison: 'Weighed 408 pounds (185 kg) on Earth—about the size of a golf cart—with broad solar wings spanning 4.3 feet (1.3 m).',
      enduranceFact: 'Designed for a 90-day mission, Opportunity survived almost 15 years—surpassing its planned lifespan by over 55 times!',
    },

    anatomy: [
      {
        id: 'pancam-mast',
        title: 'Panoramic Camera Mast (Pancam)',
        subtitle: 'Stereoscopic human-height camera head',
        icon: '📷',
        description:
          'Mounted on a 1.5-meter (5-foot) tall mast, two high-resolution digital color cameras gave Opportunity a human-eye view of Mars in glorious 3D, spotting rock layers, dust dunes, and crater cliffs.',
      },
      {
        id: 'solar-wings',
        title: 'Deployable Solar Array Wings',
        subtitle: 'Bat-wing panels generating clean solar power',
        icon: '☀️',
        description:
          'Shaped like outstretched wings, the solar panels generated up to 140 Watts of power. Martian dust devils occasionally swept across the rover, blowing off accumulated dust and giving Opportunity "cleaning events" that kept it alive for years!',
      },
      {
        id: 'robotic-arm',
        title: 'Instrument Deployment Device (Arm)',
        subtitle: 'A robotic arm with a diamond-grit drill',
        icon: '🦾',
        description:
          'Opportunity had a 5-jointed robotic arm with a turret carrying four tools: the Rock Abrasion Tool (RAT) to grind away weathering crust, a Microscopic Imager, and two spectrometers to analyze iron minerals.',
      },
      {
        id: 'wheels',
        title: 'Six Independently Driven Cleated Wheels',
        subtitle: 'Tackled soft sand dunes and 30-degree slopes',
        icon: '🛞',
        description:
          'Each of Opportunity’s 6 aluminium wheels had its own internal electric motor and spiral cleats for grip in powdery Martian sand, steered by independent motors on the front and rear wheels.',
      },
      {
        id: 'dish-antenna',
        title: 'High-Gain Steerable Dish Antenna',
        subtitle: 'Beaming science directly to NASA’s Deep Space Network',
        icon: '📡',
        description:
          'Opportunity could steer this parabolic dish antenna directly at Earth to send high-speed scientific data, or use its UHF antenna to bounce signals to NASA orbiters flying overhead like Mars Odyssey.',
      },
    ],

    sections: {
      meetTheMachine: {
        title: 'Meet the Rover',
        content:
          'Opportunity, lovingly nicknamed "Oppy", was one of the greatest robotic explorers in human history! Built by NASA and JPL, Opportunity and its twin rover Spirit were robotic geologists launched to investigate whether Mars was ever warm and wet enough to support life. About the size of a golf cart—standing 1.5 meters (5 feet) tall and weighing 185 kg (408 pounds)—Opportunity landed on Mars on January 25, 2004. Instead of firing braking thrusters to land gently, Opportunity bounced onto Mars inside a bundle of giant bouncy airbags, rolling to a stop in an incredible cosmic "hole-in-one" directly inside a small crater called Eagle Crater!',
      },
      itsMission: {
        title: 'Its Mission',
        content:
          'Opportunity\'s mission was to "follow the water." Scientists knew Mars today is a dry, freezing desert, but satellite photos showed dry river valleys and ancient lake basins. Opportunity was dispatched to Meridiani Planum, a smooth plain rich in grey hematite—a mineral that usually forms in liquid water on Earth. Opportunity was equipped with a mast of stereo cameras, a robotic arm with a microscopic camera, and a diamond-tipped Rock Abrasion Tool (RAT) to drill into rock interiors and examine their chemical fingerprints.',
      },
      technology: {
        title: 'Technology & Clean-Energy Solar Power',
        content:
          'Opportunity was powered completely by the Sun! Its wide solar array generated up to 140 Watts of electricity during clear Martian days, storing energy in two rechargeable lithium-ion batteries. NASA engineers designed the rover with automated hazard-avoidance computers, allowing it to navigate around dangerous boulders and treacherous sand dunes on its own. Whenever the rover drove into deep sand traps—like the "Purgatory Dune" where Opportunity was bogged down for five weeks in 2005—engineers on Earth created full-scale sandboxes in California to test driving maneuvers until they freed the rover!',
      },
      discoveries: {
        title: 'Discoveries',
        content:
          'Almost immediately after landing, Opportunity made one of the most celebrated discoveries in space history! Inspecting the bedrock inside Eagle Crater, its microscopic camera revealed millions of tiny, spherical grey balls embedded in the rock. Scientists named them "Martian Blueberries." Chemical analysis proved these blueberries were hematite concretions that formed only when minerals precipitated out of standing liquid, acidic water! Over its 15-year odyssey, Opportunity explored four giant impact craters—Eagle, Endurance, Victoria, and Endeavour—finding clay minerals, ancient shoreline layers, and gypsum veins that proved ancient Mars was once a dynamic, water-rich world!',
      },
      whyStopped: {
        title: 'Why It Stopped',
        content:
          'In June 2018, a monstrous planet-encircling dust storm erupted on Mars. The storm grew so thick that the Martian sky turned into pitch-black twilight at noon, blotting out over 99% of sunlight. Without sunlight to illuminate its solar panels, Opportunity could no longer recharge its batteries to run its internal heaters. The rover sent its final telemetry to Earth on June 10, 2018, from Perseverance Valley. For eight months, NASA engineers beamed more than a thousand recovery commands, hoping seasonal winds might sweep the panels clean. On February 13, 2019, NASA officially brought the historic mission to a close.',
      },
      amazingFact: {
        title: 'Amazing Fact',
        content:
          'Opportunity was originally built for a mission of just 90 Martian days (about 3 months). Instead, it survived and drove on Mars for 14 years and 11 months—over 55 times its planned lifetime! Along the way, it drove 45.16 kilometers (28.06 miles), officially completing the first off-world marathon in history and holding the all-time world record for the farthest distance driven by any wheeled vehicle on another celestial body!',
      },
    },

    gallery: [
      {
        url: '/images/mars/opportunity/opportunity-hero-mars.jpg',
        title: 'Opportunity Rover on Mars Surface',
        caption: 'Full view of the Mars Exploration Rover on Mars with solar panels extended, Pancam mast raised, and robotic arm ready.',
        credit: 'NASA / JPL-Caltech / Cornell',
        source: 'https://science.nasa.gov/mission/mer-opportunity/',
      },
      {
        url: '/images/mars/opportunity/opportunity-shadow-dunes.jpg',
        title: 'Opportunity Catches its Shadow on Sol 180',
        caption: 'Opportunity looks toward the horizon across ripples of Martian sand, capturing the shadow of its camera mast and chassis.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://images.nasa.gov/details/PIA06739',
      },
      {
        url: '/images/mars/opportunity/opportunity-solar-panels-dust.jpg',
        title: 'Dust Accumulation on Solar Panels',
        caption: 'Opportunity looked back with its Pancam to inspect the heavy coating of red Martian dust settling on its solar cells.',
        credit: 'NASA / JPL-Caltech / Cornell',
        source: 'https://science.nasa.gov/mission/mer-opportunity/',
      },
      {
        url: '/images/mars/opportunity/opportunity-tracks-dust-devil.jpg',
        title: 'Rover Tracks & Distant Martian Dust Devil',
        caption: 'Opportunity’s tracks winding across a hillside with an active swirling Martian dust devil spinning in the far distance.',
        credit: 'NASA / JPL-Caltech',
        source: 'https://science.nasa.gov/mission/mer-opportunity/',
      },
      {
        url: '/images/mars/opportunity/opportunity-victoria-crater.jpg',
        title: 'Perched on the Rim of Victoria Crater',
        caption: 'The Cape Verde promontory at Victoria Crater, showing layered dramatic cliffs explored by Opportunity.',
        credit: 'NASA / JPL-Caltech / Univ. of Arizona',
        source: 'https://images.nasa.gov/details/PIA08812',
      },
      {
        url: '/images/mars/opportunity/opportunity-final-panorama.jpg',
        title: 'Opportunity\'s Final 360° Panorama (Legacy Pan)',
        caption: 'The last 360-degree panorama Opportunity ever assembled in Perseverance Valley before the catastrophic 2018 dust storm.',
        credit: 'NASA / JPL-Caltech / Cornell / ASU',
        source: 'https://science.nasa.gov/resource/opportunity-rovers-final-mars-images/',
      },
    ],

    quiz: [
      {
        id: 1,
        question: 'Opportunity was designed to explore Mars for 90 Martian days. How long did it actually survive and explore?',
        options: [
          'About 1 year',
          'Nearly 15 years (over 5,350 Martian days!)',
          'Exactly 90 days',
          'Only 6 months',
        ],
        correctIndex: 1,
        explanation: 'Opportunity lasted an astonishing 14 years and 11 months on Mars, exceeding its planned 90-day mission lifetime by more than 55 times!',
        funFact: 'Opportunity transmitted 217,594 raw photographs back to Earth over its almost 15 years on Mars.',
      },
      {
        id: 2,
        question: 'What famous tiny spherical mineral formations did Opportunity discover inside Eagle Crater that proved water once flowed on Mars?',
        options: [
          'Martian diamonds',
          'Hematite "Blueberries"',
          'Volcanic pearls',
          'Frozen ice cubes',
        ],
        correctIndex: 1,
        explanation: 'The tiny grey spheres nicknamed "Martian Blueberries" are hematite concretions that formed only when minerals soaked in ancient liquid water!',
        funFact: 'Opportunity used its microscopic camera and spectrometers to prove these spheres had soaked in ancient acidic groundwater billions of years ago.',
      },
      {
        id: 3,
        question: 'Opportunity drove 45.16 kilometers (28.06 miles) on Mars. What athletic milestone does that distance represent?',
        options: [
          'A 100-meter dash',
          'A full Olympic Marathon (26.2 miles)',
          'Climbing Mount Everest',
          'A short bike ride around a track',
        ],
        correctIndex: 1,
        explanation: 'In March 2015, Opportunity surpassed 42.195 km (26.219 miles), officially running a full Olympic marathon on another planet!',
        funFact: 'Opportunity holds the all-time Guinness World Record for the farthest distance ever driven by any wheeled vehicle on an off-world body.',
      },
      {
        id: 4,
        question: 'What natural Martian weather phenomenon occasionally blew dust off Opportunity\'s solar panels and boosted its power?',
        options: [
          'Alien rain showers',
          'Martian dust devils (mini tornadoes)',
          'Heavy snowstorms',
          'Lightning strikes',
        ],
        correctIndex: 1,
        explanation: 'Whirling vortexes of wind called dust devils frequently passed over Opportunity, vacuuming the solar panels clean and giving the rover sudden bursts of power!',
        funFact: 'Before the first cleaning event, NASA scientists worried dust would suffocate the solar panels in less than a year.',
      },
      {
        id: 5,
        question: 'What catastrophic event in June 2018 finally caused Opportunity to stop communicating?',
        options: [
          'A colossal planet-wide dust storm that blocked out all sunlight',
          'It ran out of gasoline for its engine',
          'It drove off a cliff into Victoria crater',
          'Its wheels melted in Martian volcanic lava',
        ],
        correctIndex: 0,
        explanation: 'A historic planet-encircling dust storm blotted out over 99% of sunlight, preventing Opportunity\'s solar panels from recharging its batteries.',
        funFact: 'Opportunity’s last message essentially translated to: "My battery is low and it is getting dark." Its legacy lives on as one of NASA\'s greatest achievements!',
      },
    ],
  },
]
