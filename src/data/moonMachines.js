export const MOON_MACHINES = [
  {
    id: 'apollo-15-lrv',
    name: 'Apollo 15 Lunar Roving Vehicle',
    code: 'LRV-1 • "THE MOON BUGGY"',
    year: '1971',
    mission: 'Apollo 15 (July 26 – August 7, 1971)',
    landingSite: 'Hadley-Apennine Region (26.13° N, 3.63° E)',
    astronauts: 'David R. Scott (Commander) & James B. Irwin (Lunar Module Pilot)',
    distanceTravelled: '17.5 miles (27.9 km)',
    topSpeed: '8 miles per hour (13 km/h) — top burst: 11.2 mph (18 km/h)',
    powerSource: 'Two 36-volt silver-zinc non-rechargeable batteries (121 Amp-hours each)',
    totalSamplesCollected: '170 pounds (77 kg) of lunar soil and rock cores',
    heroImage: '/images/moon/apollo15-rover-hero.jpg',
    heroCaption: 'The Apollo 15 Lunar Roving Vehicle parked near Mount Hadley, standing silently on the grey lunar regolith.',
    heroCredit: 'NASA / Astronaut James Irwin (AS15-86-11603)',
    sourceUrl: 'https://www.nasa.gov/image-article/lunar-roving-vehicle-apollo-15-mission/',
    secondaryUrl: 'https://www.nasa.gov/image-article/apollo-15-lunar-roving-vehicle/',

    tagline: 'The first electric car ever driven by human hands across another celestial world.',

    studentSummary: {
      speedComparison: 'Drove about as fast as a student jogging or riding a bicycle, but felt like flying on the bumpy Moon!',
      weightComparison: 'Weighed 462 pounds (210 kg) on Earth, but only 77 pounds (35 kg) on the Moon — so light two astronauts could lift it with their hands!',
      batteryLife: 'Could travel for over 57 miles on a single charge — powered by batteries similar to giant electric bicycle packs.',
    },

    anatomy: [
      {
        id: 'wheels',
        title: 'Woven Piano-Wire Wheels',
        subtitle: 'Why no rubber tires?',
        icon: '🛞',
        description:
          'Rubber tires would freeze rock-solid, crack, and explode in the -250°F (-157°C) cold of space! Instead, Boeing and General Motors hand-wove each wheel out of 800 strands of zinc-coated steel piano wire. Riveted chevron treads made of titanium gave the rover super-grip in loose powdery Moon dust.',
      },
      {
        id: 'joystick',
        title: 'T-Bar Hand Controller',
        subtitle: 'No steering wheel or foot pedals!',
        icon: '🕹️',
        description:
          'Because astronauts wore thick, stiff space gloves and bulky boots, they couldn\'t use normal gas or brake pedals. A single T-shaped joystick between the two seats controlled everything: push forward to drive, pull back to brake and stop, and tilt left or right to steer all four wheels at once!',
      },
      {
        id: 'camera',
        title: 'Remote-Controlled TV Camera',
        subtitle: 'Broadcasted to Earth 240,000 miles away!',
        icon: '📹',
        description:
          'Mounted on the front bumper, this color television camera had its own radio dish. An engineer named Ed Fendell in Mission Control Houston used a joystick on Earth to tilt and zoom the camera, following the astronauts as they worked and filming their rocket liftoff!',
      },
      {
        id: 'origami',
        title: 'Origami Folded Chassis',
        subtitle: 'Packed into a 5-foot space triangle',
        icon: '📦',
        description:
          'The rover was too big to fit inside the spacecraft normally. Engineers designed it to fold up like origami into a tiny 5-foot by 5-foot triangular compartment on the outside of the Lunar Module "Falcon." When astronauts pulled two cloth ropes, spring-loaded latches unfolded the rover automatically in 15 minutes!',
      },
      {
        id: 'tools',
        title: 'Lunar Science Tool Pallet',
        subtitle: 'The ultimate space toolbox',
        icon: '⛏️',
        description:
          'The back of the rover carried tongs to pick up rocks, a rotary drill to dig 10 feet deep into Moon bedrock, special vacuum-sealed sample collection bags, and a rake to sift through pebbles looking for ancient crystals.',
      },
    ],

    sections: {
      meetTheMachine: {
        title: 'Meet the Machine',
        content:
          'Imagine packing a special electric car, folding it like origami onto the side of a lunar spaceship, and unfolding it on the Moon! That was the Apollo 15 Lunar Roving Vehicle, affectionately nicknamed the "Moon Buggy." Built by Boeing and General Motors, it had four mesh-wire wheels made of woven zinc-coated steel wire and titanium chevrons instead of rubber tires, so they would never pop in the extreme cold and sharp rocks of the Moon. Each wheel had its own tiny 0.25-horsepower electric motor, and the rover was steered with an aircraft-style T-shaped joystick between the two astronaut seats.',
      },
      itsMission: {
        title: 'Its Mission',
        content:
          'Before Apollo 15, astronauts had to walk on foot in their bulky, 200-pound pressurized spacesuits, which meant they could never safely travel more than about 1 kilometer from their lunar lander. The Lunar Roving Vehicle changed everything! It allowed Commander David Scott and Lunar Module Pilot James Irwin to explore vast distances across the Moon\'s surface over three separate spacewalks. Together, they drove 17.5 miles (28 km), climbing steep slopes, navigating deep craters, and carrying heavy drills, scientific cameras, and communications antennas.',
      },
      discoveries: {
        title: 'Discoveries',
        content:
          'Because the Moon Buggy could travel so far, the astronauts reached the rim of Hadley Rille—a massive canyon formed by collapsed ancient lava tubes—and drove up the foothills of the Apennine Mountains. There, Scott spotted a gleaming white rock perched atop a dark boulder: the famous "Genesis Rock" (sample 15415), an anorthosite crystal dated at over 4 billion years old from the earliest lunar crust. Without the rover, astronauts could never have reached these ancient mountains or transported the 170 pounds (77 kg) of pristine Moon samples back to Earth.',
      },
      whyLeftBehind: {
        title: 'Why It Was Left Behind',
        content:
          'Every single ounce of weight mattered for the Lunar Module\'s ascent rocket to launch David Scott and James Irwin back into lunar orbit and reunite with Command Module Pilot Al Worden. Rocket fuel is limited, so returning heavy equipment like the rover was impossible. Before lifting off, Commander Scott parked the LRV about 300 feet (90 meters) away from the lunar module so its color television camera could remotely broadcast the historic liftoff live to television sets across Earth. Today, LRV-1 still rests silently at Hadley Base, perfectly preserved in the vacuum of space.',
      },
      amazingFact: {
        title: 'Amazing Fact',
        content:
          'Because the Moon has only one-sixth of Earth\'s gravity, the rover only "weighed" about 77 pounds on the Moon even though it weighed 462 pounds on Earth! While driving over rolling terrain, the rover bounced gracefully like a lunar dune buggy, with all four wheels occasionally airborne. Even more incredible: Commander Scott fixed a cracked rear fender on the Moon using gray duct tape, four plastic geological maps, and two spring clamps!',
      },
    },

    gallery: [
      {
        url: '/images/moon/apollo15-rover-jim-irwin.jpg',
        title: 'Astronaut James Irwin with LRV-1',
        caption: 'Lunar Module Pilot James Irwin stands next to the Lunar Roving Vehicle at the Hadley-Apennine landing site. Mount Hadley dominates the background.',
        credit: 'NASA / Astronaut David Scott',
        source: 'https://www.nasa.gov/image-article/apollo-15-lunar-roving-vehicle/',
      },
      {
        url: '/images/moon/apollo15-gallery-3.jpg',
        title: 'Working at the Rover during Lunar EVA',
        caption: 'Astronaut James Irwin loads geological sampling gear onto the back of the rover during a lunar surface exploration traverse.',
        credit: 'NASA / Apollo 15 Crew',
        source: 'https://images.nasa.gov/details/as15-86-11603',
      },
      {
        url: '/images/moon/apollo15-gallery-2.jpg',
        title: 'Astronaut Crew Training with the Earth Rover',
        caption: 'David Scott and James Irwin test the 1-G Earth training rover in the desert, practicing deploying antennas and packing sample collection bags.',
        credit: 'NASA Kennedy Space Center',
        source: 'https://images.nasa.gov/',
      },
      {
        url: '/images/moon/apollo15-gallery-1.jpg',
        title: 'Simulating Lunar Surface Operations',
        caption: 'Apollo 15 astronauts simulate deployment of the rover alongside the full-scale Lunar Module mock-up at NASA.',
        credit: 'NASA Photographic Archive',
        source: 'https://images.nasa.gov/',
      },
    ],

    quiz: [
      {
        id: 1,
        question: 'Why were the wheels of the Lunar Roving Vehicle made of woven steel piano wire instead of rubber tires?',
        options: [
          'Rubber tires were too heavy to carry in the rocket',
          'Rubber tires would freeze, become brittle, and explode in space cold',
          'Steel wheels were much cheaper to manufacture',
          'Rubber leaves too much tire track dust on the Moon',
        ],
        correctIndex: 1,
        explanation:
          'Rubber tires rely on air pressure and rubber elasticity. In the extreme temperatures of the Moon (-250°F to +250°F), rubber becomes brittle like glass and bursts! Woven steel wire with titanium chevrons never punctured.',
        funFact: 'Each wheel had its own separate 0.25-horsepower electric motor!',
      },
      {
        id: 2,
        question: 'How did Commander David Scott steer and drive the Apollo 15 Moon Buggy?',
        options: [
          'Using pedals on the floor and a big steering wheel',
          'Using a single T-shaped joystick placed between the two astronaut seats',
          'Voice commands sent to an on-board computer',
          'Mission Control in Houston steered it with a radio controller',
        ],
        correctIndex: 1,
        explanation:
          'Because astronauts wore stiff pressurized space gloves and heavy boots, they could not use normal pedals or steering wheels. A single T-handle joystick controlled gas, brakes, and 4-wheel steering!',
        funFact: 'Pushing the stick forward sped up, pulling back braked, and tilting left or right turned the wheels.',
      },
      {
        id: 3,
        question: 'What famous, extremely ancient lunar rock did the astronauts discover thanks to the rover driving so far?',
        options: [
          'The Moon Diamond',
          'The Genesis Rock (over 4 billion years old)',
          'The Crater Meteorite',
          'The Apollo Pearl',
        ],
        correctIndex: 1,
        explanation:
          'Commander Scott spotted a bright white rock sample atop a dark boulder at Spur Crater: the "Genesis Rock." Laboratory tests showed it was over 4 billion years old, formed when the solar system was brand new!',
        funFact: 'The rover drove 17.5 miles (28 km), allowing astronauts to reach the distant Apennine Mountains.',
      },
      {
        id: 4,
        question: 'What did the astronauts use to repair a broken fender on the Moon after a hammer accidentally clipped it?',
        options: [
          'Super glue and metal foil',
          'Duct tape, plastic geological maps, and two spring clamps',
          'They welded it with a space laser',
          'They left it broken and drove backwards',
        ],
        correctIndex: 1,
        explanation:
          'Moon dust was showering over the astronauts when the fender broke. Commander Scott taped four laminated plastic geology maps together with gray duct tape and clamped it to the fender. It held for the entire rest of the mission!',
        funFact: 'That makeshift taped fender is currently displayed in the Smithsonian Air & Space Museum!',
      },
      {
        id: 5,
        question: 'Why was the Apollo 15 Lunar Roving Vehicle left behind on the Moon when the astronauts returned to Earth?',
        options: [
          'Its electric batteries caught fire during the drive',
          'It was too heavy for the small Lunar Module ascent rocket to carry back into orbit',
          'The astronauts forgot where they parked it',
          'NASA planned for alien visitors to drive it',
        ],
        correctIndex: 1,
        explanation:
          'Every ounce of weight counted to ensure the Lunar Module ascent engine had enough rocket fuel to reach lunar orbit. Leaving heavy gear behind allowed astronauts to bring home 170 pounds of precious Moon rocks!',
        funFact: 'Scott parked the rover 300 feet away so its color camera could film the Lunar Module blasting off into the black space sky!',
      },
    ],
  },
  {
    id: 'surveyor-3',
    name: 'Surveyor 3 Lunar Lander',
    code: 'SURVEYOR-III • "THE ROBOT SCOUT"',
    year: '1967 (Visited 1969)',
    mission: 'Surveyor 3 (April 17 – 20, 1967) & Apollo 12 (Nov 1969)',
    landingSite: 'Ocean of Storms (Oceanus Procellarum, 3.015° S, 23.418° W)',
    astronauts: 'Uncrewed Robotic Spacecraft (Later visited by Apollo 12 astronauts: Pete Conrad & Alan Bean)',
    distanceTravelled: 'Stationary Lander (Hopped twice during crater landing)',
    topSpeed: 'Landed at gentle 2.5 m/s after automated radar-guided descent',
    powerSource: 'Solar array delivering 89 Watts of electricity plus rechargeable silver-zinc batteries',
    totalSamplesCollected: 'Dug four lunar soil trenches; sent 6,326 television pictures',
    heroImage: '/images/moon/surveyor3-apollo12-hero.jpg',
    heroCaption: 'Apollo 12 astronaut Pete Conrad visits Surveyor 3 in November 1969, examining the robotic probe after 2.5 years on the Moon.',
    heroCredit: 'NASA / Astronaut Alan Bean (AS12-48-7134)',
    sourceUrl: 'https://science.nasa.gov/resource/apollo-12-and-surveyor-3/',
    secondaryUrl: 'https://science.nasa.gov/mission/surveyor-3/',

    tagline: 'The robotic scout that proved human footsteps on the Moon were possible.',

    studentSummary: {
      speedComparison: 'Descended from space at thousands of miles per hour, then gently slowed down using rocket thrusters to human walking speed!',
      weightComparison: 'Weighed 625 pounds (283 kg) on Earth, but felt like only 104 pounds in the Moon\'s gentle one-sixth gravity.',
      powerUsage: 'Ran its entire computer, cameras, and radio on just 89 watts of solar power — less energy than a standard kitchen refrigerator bulb!',
    },

    anatomy: [
      {
        id: 'legs',
        title: 'Tripod Shock-Absorbing Legs',
        subtitle: 'Cushioning the very first soft landings',
        icon: '🦶',
        description:
          'Three lightweight tubular aluminum legs formed a sturdy triangle. Each footpad was packed with crushable aluminum honeycomb blocks that squished like a safety helmet to absorb the shock of touchdown so the spacecraft would not tip over or crack.',
      },
      {
        id: 'scoop',
        title: 'Robotic Soil Sampler Arm',
        subtitle: 'The first mechanical scoop on another world',
        icon: '🦾',
        description:
          'An extendable scissors-like pantograph arm held a small motorized steel bucket with sharp teeth. Directed by radio commands from Earth, it dug four trenches up to 7 inches (18 cm) deep into the lunar dirt, proving the ground was firm and sturdy like damp beach sand.',
      },
      {
        id: 'camera',
        title: 'Steerable Mirror Television Camera',
        subtitle: 'Transmitted 6,326 photos through radio waves',
        icon: '📷',
        description:
          'Instead of moving the whole heavy camera, engineers placed a rotating mirror at the top! Motors tilted and spun the mirror 360 degrees, bouncing images into a television vidicon tube that beamed lines of light across 240,000 miles to Earth.',
      },
      {
        id: 'solar',
        title: 'Planar Solar Panel Array',
        subtitle: 'Harvesting energy from raw sunlight',
        icon: '☀️',
        description:
          'Perched high on the central mast, a swiveling solar panel rotated to face the sun continuously during the two-week-long lunar day, generating 89 watts of electricity to power the robotic arm and transmitters.',
      },
      {
        id: 'radar',
        title: 'Doppler Landing Radar',
        subtitle: 'Eyes for automated retro-rockets',
        icon: '📡',
        description:
          'Four radar beams measured the altitude and velocity of the spacecraft during descent, firing three small liquid-fuel vernier thrusters to slow it down from bullet speed to a feather-soft landing.',
      },
    ],

    sections: {
      meetTheMachine: {
        title: 'Meet the Machine',
        content:
          'Before NASA ever sent human astronauts to land on the Moon, scientists were worried about a terrifying question: Would a spacecraft sink into hundreds of feet of quicksand-like lunar dust? Surveyor 3 was sent to find out! Launched in April 1967, Surveyor 3 was an open-frame triangular robotic lander standing 10 feet (3.3 meters) tall, perched on three shock-absorbing aluminum legs with footpads. It carried an advanced steerable television camera and a robotic motorized surface-sampler scoop arm that could dig trenches and test the bearing strength of Moon soil.',
      },
      itsMission: {
        title: 'Its Mission',
        content:
          'Surveyor 3\'s mission was to demonstrate soft landings on the Moon, photograph the lunar terrain, and test whether the soil was sturdy enough to support Apollo astronauts and their heavy lunar modules. During landing in the Ocean of Storms, highly reflective lunar rocks tricked its radar, causing its retro-rocket engines to stay fired longer and making Surveyor 3 gently "hop" two times on the crater slope before safely settling down. Once settled, it powered up its solar panels and operated continuously for over two Earth weeks.',
      },
      discoveries: {
        title: 'Discoveries',
        content:
          'Surveyor 3 transmitted 6,326 crisp television pictures back to Earth, showing crater rims, pebbles, and the lunar sky. Its mechanical arm dug four trenches up to 7 inches (18 cm) deep, demonstrating that lunar soil had a consistency similar to wet beach sand and could easily support human bootprints and lunar lander footpads. It also captured the very first view of an eclipse of the Sun by the Earth as seen from the Moon\'s surface!',
      },
      whyLeftBehind: {
        title: 'Why It Was Left Behind',
        content:
          'Surveyor 3 was designed as a one-way robotic scientific probe with no return rocket. After the freezing two-week lunar night fell in May 1967, its batteries succumbed to the brutal -250°F (-157°C) temperature. But its story didn\'t end there! In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean executed a precision pinpoint landing just 600 feet (180 meters) away. The astronauts walked down into the crater, photographed Surveyor 3, and used tools to unbolt its television camera and scoop to bring them back to Earth. The main tripod body remains permanently anchored in the Ocean of Storms.',
      },
      amazingFact: {
        title: 'Amazing Fact',
        content:
          'Surveyor 3 is the only uncrewed robotic spacecraft on any celestial world to ever be visited, photographed, and partially disassembled by human astronauts from a later mission! When scientists at NASA\'s Lunar Receiving Laboratory tested the returned camera back on Earth, they made a shocking discovery: common Streptococcus mitis bacteria inside the camera foam had potentially survived 2.5 years of harsh vacuum, radiation, and extreme temperatures on the Moon!',
      },
    },

    gallery: [
      {
        url: '/images/moon/surveyor3-lunar-surface.jpg',
        title: 'Surveyor 3 Resting on the Crater Slope',
        caption: 'Full view of Surveyor 3 on the gentle slope of Surveyor Crater in the Ocean of Storms, photographed during Apollo 12 extravehicular activity.',
        credit: 'NASA / Apollo 12 Crew',
        source: 'https://science.nasa.gov/mission/surveyor-3/',
      },
      {
        url: '/images/moon/surveyor3-gallery-1.jpg',
        title: 'Surveyor 3 Robot Pre-Flight Testing',
        caption: 'Engineers test the tripod landing legs, television optics, and robotic surface sampler arm at Kennedy Space Center prior to launch.',
        credit: 'NASA Kennedy Space Center Archive (KSC-2011-7762)',
        source: 'https://images.nasa.gov/',
      },
      {
        url: '/images/moon/surveyor3-gallery-2.jpg',
        title: 'Surveyor Robotic Soil Sampling Scoop',
        caption: 'Close-up of Surveyor 3\'s pantograph-mounted scoop arm and trenching teeth that scooped the first regolith samples on the Moon.',
        credit: 'NASA / JPL-Caltech (KSC-2011-7763)',
        source: 'https://images.nasa.gov/',
      },
      {
        url: '/images/moon/surveyor3-gallery-3.jpg',
        title: 'Apollo 12 Astronaut Examining Surveyor 3',
        caption: 'High-contrast historical photograph of Apollo 12 examining the lunar dust coating on Surveyor 3 after 31 months of exposure to space.',
        credit: 'NASA Johnson Space Center (KSC-2011-7761)',
        source: 'https://images.nasa.gov/',
      },
    ],

    quiz: [
      {
        id: 1,
        question: 'What major fear did NASA scientists have before Surveyor 3 landed that could have canceled human Apollo landings?',
        options: [
          'That the Moon had angry space monsters',
          'That the lunar dust was hundreds of feet deep and spacecraft would sink like quicksand',
          'That the Moon would drift away into deep space',
          'That the Moon had poisonous radioactive oceans',
        ],
        correctIndex: 1,
        explanation:
          'Some scientists worried that billions of years of meteorite impacts had ground the lunar surface into deep, fluffy quicksand. Surveyor 3\'s landing and trenching proved the ground was firm and sturdy!',
        funFact: 'Surveyor 3 dug four trenches up to 7 inches deep and dropped rocks on its footpads to test soil resistance.',
      },
      {
        id: 2,
        question: 'How many television pictures did Surveyor 3 beam back to Earth through radio waves?',
        options: [
          'Only 12 photos',
          '150 pictures',
          '6,326 pictures',
          'Over 1 million pictures',
        ],
        correctIndex: 2,
        explanation:
          'Surveyor 3 used a steerable mirror to scan the horizon and beamed 6,326 high-clarity television images across 240,000 miles to Earth!',
        funFact: 'It even photographed the Earth blocking out the Sun, creating the first solar eclipse seen from the Moon.',
      },
      {
        id: 3,
        question: 'What surprising thing happened when Surveyor 3 first touched down in the Ocean of Storms?',
        options: [
          'It landed upside down',
          'It gently hopped two times down the crater slope because its engines stayed fired',
          'It slid into a frozen ice cave',
          'It ran out of fuel 50 miles above the ground',
        ],
        correctIndex: 1,
        explanation:
          'Highly reflective lunar boulders fooled the landing radar into thinking the spacecraft was higher than it actually was. Its thrusters stayed on, making Surveyor 3 bounce twice before settling down safely on a 12-degree slope!',
        funFact: 'The first bounce was about 35 feet high, and the second bounce was about 11 feet high.',
      },
      {
        id: 4,
        question: 'Which Apollo mission executed a pinpoint landing right next to Surveyor 3 in November 1969?',
        options: [
          'Apollo 11 (Neil Armstrong & Buzz Aldrin)',
          'Apollo 12 (Pete Conrad & Alan Bean)',
          'Apollo 13 (Jim Lovell & Fred Haise)',
          'Apollo 17 (Gene Cernan & Harrison Schmitt)',
        ],
        correctIndex: 1,
        explanation:
          'Apollo 12 Commander Pete Conrad piloted the Lunar Module "Intrepid" to land just 600 feet (180 meters) from Surveyor 3. The astronauts walked down into the crater and inspected the robotic craft!',
        funFact: 'Conrad and Bean unbolted Surveyor 3\'s camera and scoop with bolt cutters and brought them back to Earth.',
      },
      {
        id: 5,
        question: 'What astonishing biological discovery did scientists make inside Surveyor 3\'s camera back in Earth laboratories?',
        options: [
          'A tiny lunar insect',
          'Harmless Streptococcus mitis bacteria that had potentially survived 2.5 years in the harsh lunar vacuum',
          'Fossilized alien plant seeds',
          'Alien water molecules',
        ],
        correctIndex: 1,
        explanation:
          'Harmless human skin bacteria inside the camera\'s polyurethane insulation foam had endured freezing vacuum, solar radiation, and extreme temperature swings for 31 months, proving microscopic life is amazingly resilient!',
        funFact: 'This discovery inspired strict planetary protection protocols for all future Mars and interplanetary probes.',
      },
    ],
  },
]
