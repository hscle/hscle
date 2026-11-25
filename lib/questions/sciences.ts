import type { Question } from "../types";

const r = String.raw;

export const physics: Question[] = [
  {
    id: "phys-001",
    subject: "phys",
    topic: "Module 5: Advanced Mechanics (projectile motion)",
    difficulty: 2,
    prompt: r`A ball is thrown horizontally at $15 \text{ m s}^{-1}$ from the top of a cliff $20$ m high. Ignoring air resistance and taking $g = 9.8 \text{ m s}^{-2}$, how far from the base of the cliff does it land?`,
    options: [r`$2.02$ m`, r`$15.0$ m`, r`$21.4$ m`, r`$30.3$ m`],
    answer: 3,
    solution: r`Treat horizontal and vertical motion separately. They share only the time of flight.

**Vertical** (initial vertical velocity is $0$):

$$s_y = \tfrac{1}{2}gt^2 \implies 20 = 4.9t^2 \implies t = \sqrt{\frac{20}{4.9}} \approx 2.02 \text{ s}$$

**Horizontal** (constant velocity, no acceleration):

$$s_x = u_x t = 15 \times 2.02 \approx 30.3 \text{ m}$$`,
    commonMistake: r`Forgetting the $\frac{1}{2}$ in $s = ut + \frac{1}{2}at^2$ gives $t \approx 1.43$ s and a distance of $21.4$ m. Also, don't use $u = 15$ for the vertical motion: the $15 \text{ m s}^{-1}$ is entirely horizontal. $2.02$ is the time of flight in seconds, not a distance.`,
  },
  {
    id: "phys-002",
    subject: "phys",
    topic: "Module 5: Advanced Mechanics (circular motion)",
    difficulty: 1,
    prompt: r`A $1200$ kg car travels around a flat curve of radius $50$ m at a constant $15 \text{ m s}^{-1}$. What is the magnitude of the centripetal force on the car?`,
    options: [r`$360$ N`, r`$5400$ N`, r`$4.5$ N`, r`$270\,000$ N`],
    answer: 1,
    solution: r`$$F_c = \frac{mv^2}{r} = \frac{1200 \times 15^2}{50} = \frac{1200 \times 225}{50} = 5400 \text{ N}$$

On a flat (unbanked) road this force is provided by **friction** between the tyres and the road, directed towards the centre of the curve.`,
    commonMistake: r`Forgetting to square $v$ gives $360$ N. Forgetting to divide by $r$ gives $270\,000$ N. $4.5$ is the centripetal acceleration in $\text{m s}^{-2}$, not the force.`,
  },
  {
    id: "phys-003",
    subject: "phys",
    topic: "Module 6: Electromagnetism (force on a conductor)",
    difficulty: 1,
    prompt: r`A straight wire of length $0.50$ m carries a current of $3.0$ A at right angles to a uniform magnetic field of $0.20$ T. What is the magnitude of the force on the wire?`,
    options: [r`$0.03$ N`, r`$0.15$ N`, r`$0.30$ N`, r`$3.0$ N`],
    answer: 2,
    solution: r`Use $F = lIB\sin\theta$, with $\theta = 90^\circ$ so $\sin\theta = 1$:

$$F = 0.50 \times 3.0 \times 0.20 \times 1 = 0.30 \text{ N}$$

The direction is given by the right-hand palm rule, and is perpendicular to both the wire and the field.`,
    commonMistake: r`Using $\sin 30^\circ$ or another angle out of habit. "At right angles" means $\theta = 90^\circ$, which gives the maximum force.`,
  },
  {
    id: "phys-004",
    subject: "phys",
    topic: "Module 5: Advanced Mechanics (Kepler's laws)",
    difficulty: 2,
    prompt: r`A satellite's circular orbital radius is increased to **four times** its original value. By what factor does its orbital period change?`,
    options: [r`$2$`, r`$8$`, r`$4$`, r`$16$`],
    answer: 1,
    solution: r`Kepler's third law: $\dfrac{r^3}{T^2} = \dfrac{GM}{4\pi^2}$, which is constant for objects orbiting the same central mass. So $T^2 \propto r^3$, i.e. $T \propto r^{3/2}$.

$$\frac{T_2}{T_1} = \left(\frac{r_2}{r_1}\right)^{3/2} = 4^{3/2} = \left(\sqrt{4}\right)^3 = 2^3 = 8$$`,
    commonMistake: r`Assuming $T \propto r$ (answer $4$) or $T^2 \propto r^4$ (answer $16$). Write the relationship down before substituting.`,
  },
  {
    id: "phys-005",
    subject: "phys",
    topic: "Module 7: The Nature of Light (photons)",
    difficulty: 2,
    prompt: r`What is the energy of a single photon of light with wavelength $400$ nm? (Use $h = 6.626 \times 10^{-34}$ J s and $c = 3.00 \times 10^8 \text{ m s}^{-1}$.)`,
    options: [
      r`$1.66 \times 10^{-27}$ J`,
      r`$2.65 \times 10^{-40}$ J`,
      r`$7.50 \times 10^{14}$ J`,
      r`$4.97 \times 10^{-19}$ J`,
    ],
    answer: 3,
    solution: r`Combine $E = hf$ with $c = f\lambda$ to get $E = \dfrac{hc}{\lambda}$. Convert the wavelength to metres: $400 \text{ nm} = 400 \times 10^{-9}$ m.

$$E = \frac{(6.626 \times 10^{-34})(3.00 \times 10^8)}{400 \times 10^{-9}} \approx 4.97 \times 10^{-19} \text{ J}$$

That's about $3.1$ eV, which is typical for visible (violet) light.`,
    commonMistake: r`$7.50 \times 10^{14}$ is the **frequency** in Hz, not the energy. $1.66 \times 10^{-27}$ is $h/\lambda$, the photon's momentum in kg m s⁻¹.`,
  },
  {
    id: "phys-006",
    subject: "phys",
    topic: "Module 7: The Nature of Light (special relativity)",
    difficulty: 2,
    prompt: r`A spacecraft travels at $0.80c$ relative to Earth. An astronaut on board measures a journey to take $3.0$ years. How long does the journey take according to an observer on Earth?`,
    options: [r`$5.0$ years`, r`$3.75$ years`, r`$4.0$ years`, r`$1.8$ years`],
    answer: 0,
    solution: r`The astronaut's clock measures the **proper time** $t_0 = 3.0$ years, because the start and end of the journey happen at the same place in the spacecraft's frame.

$$t = \frac{t_0}{\sqrt{1 - \frac{v^2}{c^2}}} = \frac{3.0}{\sqrt{1 - 0.64}} = \frac{3.0}{0.6} = 5.0 \text{ years}$$

Moving clocks run slow, so the Earth observer measures a **longer** time.`,
    commonMistake: r`Multiplying by $0.6$ instead of dividing gives $1.8$ years, which is shorter. Ask yourself: should the Earth time be longer or shorter than the proper time?`,
  },
  {
    id: "phys-007",
    subject: "phys",
    topic: "Module 8: From the Universe to the Atom (radioactive decay)",
    difficulty: 1,
    prompt: r`A radioactive isotope has a half-life of $6$ hours. How much of an $80$ g sample remains undecayed after $18$ hours?`,
    options: [r`$0$ g`, r`$20$ g`, r`$10$ g`, r`$26.7$ g`],
    answer: 2,
    solution: r`$18$ hours is $\dfrac{18}{6} = 3$ half-lives. Halve the mass three times:

$$80 \to 40 \to 20 \to 10 \text{ g}$$

Or, using $N = N_0\left(\tfrac{1}{2}\right)^n$: $N = 80 \times \left(\tfrac{1}{2}\right)^3 = 10$ g.`,
    commonMistake: r`Dividing by $3$ ($26.7$ g) treats decay as linear. Radioactive decay is exponential, so the sample never quite reaches $0$.`,
  },
  {
    id: "phys-008",
    subject: "phys",
    topic: "Module 6: Electromagnetism (DC motors)",
    difficulty: 2,
    prompt: r`When a DC motor is switched on, the current through its coil is large at first and then decreases as the motor speeds up. Which statement best explains this?`,
    options: [
      r`A back emf, induced in the rotating coil, opposes the supply voltage`,
      r`The coil's resistance increases as it heats up`,
      r`The magnetic field of the permanent magnets weakens`,
      r`The split-ring commutator disconnects the coil for part of each turn`,
    ],
    answer: 0,
    solution: r`As the coil rotates in the magnetic field, the magnetic flux through it changes, so an emf is induced in it (Faraday's law).

By **Lenz's law**, this induced emf opposes the change that produces it, so it acts against the supply voltage. It is called the **back emf**.

The faster the motor spins, the larger the back emf, so the net voltage across the coil, and therefore the current, decreases:

$$I = \frac{V_{\text{supply}} - \varepsilon_{\text{back}}}{R}$$`,
    commonMistake: r`Heating does raise resistance slightly, but it's a minor effect and doesn't explain why the current depends on speed. In an exam, link back emf to Faraday's and Lenz's laws explicitly.`,
  },
];

export const chemistry: Question[] = [
  {
    id: "chem-001",
    subject: "chem",
    topic: "Module 6: Acid/Base Reactions (pH calculations)",
    difficulty: 2,
    prompt: r`What is the pH of a $0.0050 \text{ mol L}^{-1}$ solution of barium hydroxide, $\text{Ba(OH)}_2$, at $25^\circ$C?`,
    options: [r`$12.0$`, r`$2.3$`, r`$11.7$`, r`$2.0$`],
    answer: 0,
    solution: r`Barium hydroxide is a strong base that releases **two** hydroxide ions per formula unit:

$$\text{Ba(OH)}_2 \rightarrow \text{Ba}^{2+} + 2\text{OH}^-$$

- $[\text{OH}^-] = 2 \times 0.0050 = 0.010 \text{ mol L}^{-1}$
- $\text{pOH} = -\log_{10}(0.010) = 2.0$
- $\text{pH} = 14.0 - 2.0 = 12.0$`,
    commonMistake: r`Ignoring the 2 in $\text{Ba(OH)}_2$ gives pOH $= 2.3$ and pH $= 11.7$. Answers of $2.0$ or $2.3$ come from stopping at pOH, and a basic solution can't have a pH below 7.`,
  },
  {
    id: "chem-002",
    subject: "chem",
    topic: "Module 5: Equilibrium and Acid Reactions (Le Chatelier's principle)",
    difficulty: 2,
    prompt: r`Consider the equilibrium $\text{N}_2(g) + 3\text{H}_2(g) \rightleftharpoons 2\text{NH}_3(g)$, with $\Delta H = -92 \text{ kJ mol}^{-1}$. What happens when the temperature of the system is **increased**?`,
    options: [
      r`The equilibrium shifts right and $K$ increases`,
      r`The equilibrium shifts left and $K$ is unchanged`,
      r`The equilibrium shifts left and $K$ decreases`,
      r`The rate increases but the position of equilibrium is unchanged`,
    ],
    answer: 2,
    solution: r`The forward reaction is **exothermic** ($\Delta H < 0$), so the reverse reaction is endothermic.

By Le Chatelier's principle, raising the temperature favours the reaction that **absorbs** heat, which is the reverse reaction. The equilibrium shifts **left** and the yield of $\text{NH}_3$ falls.

Temperature is the only change that alters the value of $K$. Here, fewer products and more reactants at the new equilibrium means $K = \dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3}$ **decreases**.`,
    commonMistake: r`Saying $K$ is unchanged. That's true for changes in concentration, pressure or adding a catalyst, but **not** for temperature.`,
  },
  {
    id: "chem-003",
    subject: "chem",
    topic: "Module 5: Equilibrium and Acid Reactions (equilibrium expressions)",
    difficulty: 1,
    prompt: r`Which is the correct equilibrium expression for $2\text{SO}_2(g) + \text{O}_2(g) \rightleftharpoons 2\text{SO}_3(g)$?`,
    options: [
      r`$K = \dfrac{[\text{SO}_3]^2}{[\text{SO}_2]^2 + [\text{O}_2]}$`,
      r`$K = \dfrac{2[\text{SO}_3]}{2[\text{SO}_2][\text{O}_2]}$`,
      r`$K = \dfrac{[\text{SO}_2]^2[\text{O}_2]}{[\text{SO}_3]^2}$`,
      r`$K = \dfrac{[\text{SO}_3]^2}{[\text{SO}_2]^2[\text{O}_2]}$`,
    ],
    answer: 3,
    solution: r`For $aA + bB \rightleftharpoons cC$, the expression is $K = \dfrac{[C]^c}{[A]^a[B]^b}$:

- products on top, reactants on the bottom
- each concentration raised to the power of its coefficient
- concentrations **multiplied**, never added

$$K = \frac{[\text{SO}_3]^2}{[\text{SO}_2]^2[\text{O}_2]}$$`,
    commonMistake: r`Writing the coefficients as multipliers ($2[\text{SO}_3]$) instead of powers, or flipping the fraction.`,
  },
  {
    id: "chem-004",
    subject: "chem",
    topic: "Module 6: Acid/Base Reactions (titration)",
    difficulty: 3,
    prompt: r`In a titration, $20.00$ mL of $0.100 \text{ mol L}^{-1}$ sulfuric acid, $\text{H}_2\text{SO}_4$, exactly neutralises $25.00$ mL of a sodium hydroxide solution. What is the concentration of the sodium hydroxide?`,
    options: [
      r`$0.0400 \text{ mol L}^{-1}$`,
      r`$0.160 \text{ mol L}^{-1}$`,
      r`$0.125 \text{ mol L}^{-1}$`,
      r`$0.0800 \text{ mol L}^{-1}$`,
    ],
    answer: 1,
    solution: r`**Step 1: balanced equation.**

$$\text{H}_2\text{SO}_4 + 2\text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + 2\text{H}_2\text{O}$$

**Step 2: moles of acid.** $n = cV = 0.100 \times 0.02000 = 2.00 \times 10^{-3}$ mol.

**Step 3: mole ratio.** $1$ mol $\text{H}_2\text{SO}_4$ reacts with $2$ mol NaOH, so $n(\text{NaOH}) = 4.00 \times 10^{-3}$ mol.

**Step 4: concentration.**

$$c = \frac{n}{V} = \frac{4.00 \times 10^{-3}}{0.02500} = 0.160 \text{ mol L}^{-1}$$`,
    commonMistake: r`Using a 1 : 1 ratio gives $0.0800 \text{ mol L}^{-1}$. Sulfuric acid is diprotic, so always write the balanced equation first.`,
  },
  {
    id: "chem-005",
    subject: "chem",
    topic: "Module 7: Organic Chemistry (nomenclature)",
    difficulty: 1,
    prompt: r`What is the IUPAC name of $\text{CH}_3\text{CH}_2\text{CH(OH)CH}_3$?`,
    options: [r`butan-1-ol`, r`2-methylpropan-1-ol`, r`butan-3-ol`, r`butan-2-ol`],
    answer: 3,
    solution: r`- The longest carbon chain has **4** carbons, so the parent is **butane**.
- The $-\text{OH}$ group makes it an alcohol, so the suffix is **-ol**.
- Number the chain from the end that gives the $-\text{OH}$ the **lowest** number. From the right, the $-\text{OH}$ is on carbon 2.

The name is **butan-2-ol**.`,
    commonMistake: r`Numbering from the wrong end gives "butan-3-ol", which is not a valid name. Always choose the numbering that gives the functional group the lowest locant.`,
  },
  {
    id: "chem-006",
    subject: "chem",
    topic: "Module 7: Organic Chemistry (esterification)",
    difficulty: 2,
    prompt: r`Ethanol is heated under reflux with propanoic acid and a few drops of concentrated sulfuric acid. What is the organic product?`,
    options: [r`Propyl ethanoate`, r`Ethyl propanoate`, r`Ethyl ethanoate`, r`Pentanoic acid`],
    answer: 1,
    solution: r`An alcohol and a carboxylic acid react to form an **ester** and water (esterification). Concentrated $\text{H}_2\text{SO}_4$ is the catalyst.

$$\text{CH}_3\text{CH}_2\text{COOH} + \text{CH}_3\text{CH}_2\text{OH} \rightleftharpoons \text{CH}_3\text{CH}_2\text{COOCH}_2\text{CH}_3 + \text{H}_2\text{O}$$

To name the ester:

- the **alcohol** gives the first word: ethanol → **ethyl**
- the **acid** gives the second word: propanoic acid → **propanoate**

So the product is **ethyl propanoate**.`,
    commonMistake: r`Swapping the two parts ("propyl ethanoate"). Remember: alcohol first (-yl), acid second (-oate).`,
  },
  {
    id: "chem-007",
    subject: "chem",
    topic: "Module 5: Equilibrium and Acid Reactions (solubility)",
    difficulty: 3,
    prompt: r`The solubility product of silver chloride, AgCl, is $K_{sp} = 1.8 \times 10^{-10}$ at $25^\circ$C. What is the molar solubility of AgCl in pure water?`,
    options: [
      r`$1.3 \times 10^{-5} \text{ mol L}^{-1}$`,
      r`$1.8 \times 10^{-10} \text{ mol L}^{-1}$`,
      r`$9.0 \times 10^{-11} \text{ mol L}^{-1}$`,
      r`$3.6 \times 10^{-10} \text{ mol L}^{-1}$`,
    ],
    answer: 0,
    solution: r`$$\text{AgCl}(s) \rightleftharpoons \text{Ag}^+(aq) + \text{Cl}^-(aq)$$

If $s$ mol L⁻¹ dissolves, then $[\text{Ag}^+] = [\text{Cl}^-] = s$.

$$K_{sp} = [\text{Ag}^+][\text{Cl}^-] = s^2$$

$$s = \sqrt{1.8 \times 10^{-10}} \approx 1.3 \times 10^{-5} \text{ mol L}^{-1}$$`,
    commonMistake: r`Giving $K_{sp}$ itself as the solubility, or halving or doubling it. Set up the ICE-style relationship $K_{sp} = s^2$ first.`,
  },
  {
    id: "chem-008",
    subject: "chem",
    topic: "Module 7: Organic Chemistry (alkenes)",
    difficulty: 1,
    prompt: r`Which test distinguishes hex-1-ene from hexane?`,
    options: [
      r`Both rapidly decolourise bromine water`,
      r`Hexane rapidly decolourises bromine water; hex-1-ene does not`,
      r`Hex-1-ene rapidly decolourises bromine water; hexane does not`,
      r`Hex-1-ene turns blue litmus red; hexane does not`,
    ],
    answer: 2,
    solution: r`Alkenes contain a reactive $\text{C}=\text{C}$ double bond and undergo **addition** reactions with bromine at room temperature:

$$\text{CH}_2{=}\text{CH(CH}_2)_3\text{CH}_3 + \text{Br}_2 \rightarrow \text{CH}_2\text{BrCHBr(CH}_2)_3\text{CH}_3$$

The orange-brown bromine water turns **colourless** quickly.

Alkanes like hexane are saturated. They react with bromine only slowly, by substitution, and only in UV light, so in the dark the colour stays.`,
    commonMistake: r`Choosing litmus. Neither compound is acidic, so litmus does not tell them apart.`,
  },
];

export const biology: Question[] = [
  {
    id: "bio-001",
    subject: "bio",
    topic: "Module 5: Heredity (DNA replication)",
    difficulty: 1,
    prompt: r`DNA replication is described as **semi-conservative**. What does this mean?`,
    options: [
      r`Half of the original DNA molecules are kept unchanged and half are destroyed`,
      r`Each new DNA molecule has one original strand and one newly made strand`,
      r`Each new molecule is made of fragments of old and new DNA mixed along both strands`,
      r`Only half of the genome is copied in each cell division`,
    ],
    answer: 1,
    solution: r`During replication, helicase unwinds the double helix and the two strands separate. Each original strand acts as a **template**, and DNA polymerase builds a new complementary strand along it.

The result is two DNA molecules, each made of **one original (parental) strand and one new strand**. Half of each molecule is "conserved", hence semi-conservative.

This was demonstrated by Meselson and Stahl (1958) using heavy nitrogen ($^{15}$N).`,
    commonMistake: r`The "mixed fragments" option describes the dispersive model, which Meselson and Stahl's experiment ruled out.`,
  },
  {
    id: "bio-002",
    subject: "bio",
    topic: "Module 5: Heredity (sex-linked inheritance)",
    difficulty: 2,
    prompt: r`Red–green colour blindness is an X-linked recessive trait. A colour-blind man ($X^bY$) and a woman who is a carrier ($X^BX^b$) have a **son**. What is the probability that the son is colour blind?`,
    options: [r`$0$`, r`$\dfrac{1}{2}$`, r`$\dfrac{1}{4}$`, r`$1$`],
    answer: 1,
    solution: r`A son gets his **Y** from his father and his **X** from his mother, so only the mother's X matters.

The mother ($X^BX^b$) passes on $X^B$ or $X^b$ with equal probability.

- $X^BY$: normal vision
- $X^bY$: colour blind

So, given that the child is a son, the probability is $\dfrac{1}{2}$.`,
    commonMistake: r`Answering $\frac{1}{4}$. That is the probability that a child of *unknown* sex is a colour-blind son. The question tells you the child is a son, so you only look at the sons in the Punnett square.`,
  },
  {
    id: "bio-003",
    subject: "bio",
    topic: "Module 6: Genetic Change (mutation)",
    difficulty: 2,
    prompt: r`A single base substitution changes the codon UAC to UAA, which is a stop codon. What type of mutation is this?`,
    options: [r`Silent mutation`, r`Missense mutation`, r`Frameshift mutation`, r`Nonsense mutation`],
    answer: 3,
    solution: r`A **nonsense** mutation is a point mutation that turns a codon for an amino acid into a **stop codon**. Translation ends early and the polypeptide is shortened (truncated), which usually makes the protein non-functional.

The other types:

- **Silent:** the new codon codes for the same amino acid.
- **Missense:** the new codon codes for a different amino acid.
- **Frameshift:** an insertion or deletion (not a substitution) shifts the reading frame.`,
    commonMistake: r`Calling it frameshift. A substitution swaps one base for another and never changes the reading frame.`,
  },
  {
    id: "bio-004",
    subject: "bio",
    topic: "Module 7: Infectious Disease (pathogens)",
    difficulty: 1,
    prompt: r`Malaria is caused by *Plasmodium*. Which type of pathogen is this?`,
    options: [r`Virus`, r`Bacterium`, r`Fungus`, r`Protozoan`],
    answer: 3,
    solution: r`*Plasmodium* is a single-celled **eukaryote**, a **protozoan**. It is transmitted to humans by the bite of an infected female *Anopheles* mosquito, which acts as the **vector**.

It reproduces in the liver and then in red blood cells, and their bursting causes the cycles of fever typical of malaria.`,
    commonMistake: r`Choosing "bacterium" because it's single-celled. Bacteria are prokaryotes; *Plasmodium* has a nucleus.`,
  },
  {
    id: "bio-005",
    subject: "bio",
    topic: "Module 7: Infectious Disease (adaptive immunity)",
    difficulty: 1,
    prompt: r`Which cells secrete antibodies during an immune response?`,
    options: [r`Cytotoxic T cells`, r`Helper T cells`, r`Plasma cells`, r`Macrophages`],
    answer: 2,
    solution: r`When a B cell recognises its specific antigen (and is activated with help from helper T cells), it divides and differentiates into:

- **plasma cells**, which secrete large amounts of antibody, and
- **memory B cells**, which allow a faster secondary response.

Antibodies are part of the **humoral** (antibody-mediated) response.`,
    commonMistake: r`Choosing cytotoxic T cells. They kill infected cells directly (cell-mediated response) and do not make antibodies.`,
  },
  {
    id: "bio-006",
    subject: "bio",
    topic: "Module 7: Infectious Disease (vaccination)",
    difficulty: 2,
    prompt: r`Which statement best explains how **herd immunity** protects people who cannot be vaccinated?`,
    options: [
      r`When enough of the population is immune, the pathogen cannot spread easily, so unvaccinated people are less likely to be exposed`,
      r`Vaccinated people pass antibodies to unvaccinated people nearby`,
      r`The pathogen mutates into a harmless form when most people are vaccinated`,
      r`Unvaccinated people develop memory cells by living near vaccinated people`,
    ],
    answer: 0,
    solution: r`Immunity is not transferred between people. Instead, herd immunity works by **breaking chains of transmission**.

If a high enough proportion of a population is immune, an infected person is unlikely to meet a susceptible person, so the disease cannot spread widely. This indirectly protects people who can't be vaccinated, such as newborns or people who are immunocompromised.

The threshold depends on how contagious the disease is. For measles it is about $95\%$.`,
    commonMistake: r`Describing herd immunity as something that happens inside the unvaccinated person's body. It is a population-level effect.`,
  },
  {
    id: "bio-007",
    subject: "bio",
    topic: "Module 5: Heredity (meiosis)",
    difficulty: 1,
    prompt: r`At which stage of cell division does **crossing over** occur?`,
    options: [r`Prophase I of meiosis`, r`Metaphase I of meiosis`, r`Anaphase II of meiosis`, r`Prophase of mitosis`],
    answer: 0,
    solution: r`In **prophase I**, homologous chromosomes pair up (synapsis). Non-sister chromatids exchange sections at points called chiasmata. This is crossing over.

It produces new combinations of alleles on each chromosome, which increases genetic variation in the gametes. Together with independent assortment in metaphase I, this explains why siblings differ.`,
    commonMistake: r`Confusing crossing over with independent assortment, which happens at metaphase I when the homologous pairs line up randomly.`,
  },
  {
    id: "bio-008",
    subject: "bio",
    topic: "Module 8: Non-infectious Disease and Disorders (homeostasis)",
    difficulty: 2,
    prompt: r`A student's core body temperature rises during exercise. Which response helps return it to normal?`,
    options: [
      r`Vasoconstriction of skin arterioles and shivering`,
      r`Vasoconstriction of skin arterioles and increased sweating`,
      r`Vasodilation of skin arterioles and increased sweating`,
      r`Erection of body hairs and increased metabolic rate`,
    ],
    answer: 2,
    solution: r`This is a **negative feedback** loop.

- **Stimulus:** temperature rises.
- **Receptors:** thermoreceptors detect the change.
- **Control centre:** the hypothalamus processes the signal.
- **Effectors:** the body responds to lose heat.

**Vasodilation** widens skin arterioles, so more blood flows near the surface and heat is lost by radiation. **Sweating** cools the skin as the sweat evaporates.

The other options are all responses that conserve or generate heat, which the body uses when it is too cold.`,
    commonMistake: r`Mixing up vasodilation (wider vessels, heat lost) and vasoconstriction (narrower vessels, heat kept).`,
  },
];
