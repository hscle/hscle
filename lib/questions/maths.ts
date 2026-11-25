import type { Question } from "../types";

const r = String.raw;

export const mathsAdvanced: Question[] = [
  {
    id: "ma-001",
    subject: "ma",
    topic: "Calculus: differentiation",
    difficulty: 2,
    prompt: r`Differentiate $y = x^2 e^{3x}$ with respect to $x$.`,
    options: [r`$2x e^{3x}$`, r`$6x e^{3x}$`, r`$x e^{3x}(2 + 3x)$`, r`$x^2 e^{3x}(2 + 3x)$`],
    answer: 2,
    solution: r`This is a product of two functions, so use the **product rule**: $\dfrac{d}{dx}(uv) = u'v + uv'$.

- Let $u = x^2$, so $u' = 2x$.
- Let $v = e^{3x}$, so $v' = 3e^{3x}$ (chain rule).

$$\frac{dy}{dx} = 2x \cdot e^{3x} + x^2 \cdot 3e^{3x} = x e^{3x}(2 + 3x)$$

Factorising at the end is not required, but it makes the answer easier to use (for example, to find stationary points).`,
    commonMistake: r`Forgetting the chain rule on $e^{3x}$ (writing its derivative as $e^{3x}$ instead of $3e^{3x}$), or differentiating each factor separately and multiplying, which gives $6xe^{3x}$.`,
  },
  {
    id: "ma-002",
    subject: "ma",
    topic: "Calculus: integration",
    difficulty: 1,
    prompt: r`Evaluate $\displaystyle\int_0^{\frac{\pi}{4}} \sec^2 x \, dx$.`,
    options: [r`$0$`, r`$\dfrac{\pi}{4}$`, r`$\sqrt{2}$`, r`$1$`],
    answer: 3,
    solution: r`Recall the standard result $\dfrac{d}{dx}(\tan x) = \sec^2 x$, so a primitive of $\sec^2 x$ is $\tan x$.

$$\int_0^{\frac{\pi}{4}} \sec^2 x \, dx = \Big[\tan x\Big]_0^{\frac{\pi}{4}} = \tan\frac{\pi}{4} - \tan 0 = 1 - 0 = 1$$`,
    commonMistake: r`Using degrees instead of radians on the calculator. In calculus, angles are always in radians.`,
  },
  {
    id: "ma-003",
    subject: "ma",
    topic: "Financial mathematics: series",
    difficulty: 1,
    prompt: r`Find the limiting sum of the geometric series $12 + 8 + \dfrac{16}{3} + \dots$`,
    options: [r`$24$`, r`$30$`, r`$36$`, r`$48$`],
    answer: 2,
    solution: r`First find the common ratio: $r = \dfrac{8}{12} = \dfrac{2}{3}$. Check: $\dfrac{16/3}{8} = \dfrac{2}{3}$ ✓.

Since $|r| < 1$, the limiting sum exists:

$$S_\infty = \frac{a}{1 - r} = \frac{12}{1 - \frac{2}{3}} = \frac{12}{\frac{1}{3}} = 36$$`,
    commonMistake: r`Using $\dfrac{a}{1 + r}$ or dividing $12$ by $\frac{2}{3}$ instead of by $1 - \frac{2}{3}$. Always state $|r| < 1$ before using the formula in a written answer.`,
  },
  {
    id: "ma-004",
    subject: "ma",
    topic: "Statistical analysis: probability",
    difficulty: 2,
    prompt: r`A bag contains 5 red and 3 blue marbles. Two marbles are drawn at random **without replacement**. What is the probability that both marbles are the same colour?`,
    options: [r`$\dfrac{13}{28}$`, r`$\dfrac{17}{32}$`, r`$\dfrac{15}{28}$`, r`$\dfrac{5}{14}$`],
    answer: 0,
    solution: r`"Same colour" means both red **or** both blue. These are mutually exclusive, so add them.

- $P(\text{RR}) = \dfrac{5}{8} \times \dfrac{4}{7} = \dfrac{20}{56}$
- $P(\text{BB}) = \dfrac{3}{8} \times \dfrac{2}{7} = \dfrac{6}{56}$

$$P(\text{same}) = \frac{20}{56} + \frac{6}{56} = \frac{26}{56} = \frac{13}{28}$$

Notice that the second fraction in each product has denominator 7, because one marble has already been removed.`,
    commonMistake: r`Treating the draws as "with replacement" gives $\frac{25}{64} + \frac{9}{64} = \frac{17}{32}$. The answer $\frac{15}{28}$ is the probability of *different* colours, and $\frac{5}{14}$ counts only red–red.`,
  },
  {
    id: "ma-005",
    subject: "ma",
    topic: "Statistical analysis: normal distribution",
    difficulty: 2,
    prompt: r`The heights of a group of students are normally distributed with mean $170$ cm and standard deviation $8$ cm. Using the empirical rule (68–95–99.7), approximately what percentage of students are between $162$ cm and $186$ cm tall?`,
    options: [r`$81.5\%$`, r`$68\%$`, r`$95\%$`, r`$97.5\%$`],
    answer: 0,
    solution: r`Convert each height to a $z$-score using $z = \dfrac{x - \mu}{\sigma}$:

- $162$ cm: $z = \dfrac{162 - 170}{8} = -1$
- $186$ cm: $z = \dfrac{186 - 170}{8} = 2$

The normal curve is symmetric, so split the interval at the mean:

- Between $z = -1$ and $z = 0$: half of $68\%$, which is $34\%$.
- Between $z = 0$ and $z = 2$: half of $95\%$, which is $47.5\%$.

$$34\% + 47.5\% = 81.5\%$$`,
    commonMistake: r`Using 68% or 95% directly. Those only work when the interval is symmetric about the mean; here it is not.`,
  },
  {
    id: "ma-006",
    subject: "ma",
    topic: "Calculus: stationary points",
    difficulty: 2,
    prompt: r`Consider $f(x) = x^3 - 3x^2 + 4$. Which statement about its stationary points is correct?`,
    options: [
      r`Local maximum at $(2, 0)$ only`,
      r`Local minimum at $(0, 4)$ and local maximum at $(2, 0)$`,
      r`Horizontal point of inflection at $(0, 4)$ only`,
      r`Local maximum at $(0, 4)$ and local minimum at $(2, 0)$`,
    ],
    answer: 3,
    solution: r`**Step 1: find where $f'(x) = 0$.**

$$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \implies x = 0 \text{ or } x = 2$$

**Step 2: find the $y$-values.** $f(0) = 4$ and $f(2) = 8 - 12 + 4 = 0$.

**Step 3: determine the nature using $f''(x) = 6x - 6$.**

- $f''(0) = -6 < 0$, so $(0, 4)$ is a **local maximum** (concave down).
- $f''(2) = 6 > 0$, so $(2, 0)$ is a **local minimum** (concave up).`,
    commonMistake: r`Mixing up the sign rule. Remember: $f'' < 0$ means the curve is concave down, like the top of a hill, so it's a maximum.`,
  },
  {
    id: "ma-007",
    subject: "ma",
    topic: "Functions: logarithms",
    difficulty: 2,
    prompt: r`Solve $\log_2 x + \log_2 (x - 2) = 3$.`,
    options: [r`$x = -2$ or $x = 4$`, r`$x = 4$`, r`$x = -2$`, r`$x = 5$`],
    answer: 1,
    solution: r`Combine the logs using $\log_a m + \log_a n = \log_a(mn)$:

$$\log_2\big(x(x - 2)\big) = 3 \implies x(x - 2) = 2^3 = 8$$

$$x^2 - 2x - 8 = 0 \implies (x - 4)(x + 2) = 0 \implies x = 4 \text{ or } x = -2$$

**Check the domain.** Logarithms are only defined for positive arguments, so we need $x > 0$ and $x - 2 > 0$, i.e. $x > 2$. Reject $x = -2$.

$$x = 4$$`,
    commonMistake: r`Keeping $x = -2$. Always check solutions of log equations against the domain. Writing $\log_2 x + \log_2(x - 2) = \log_2(2x - 2)$ (adding instead of multiplying) gives the wrong answer $x = 5$.`,
  },
  {
    id: "ma-008",
    subject: "ma",
    topic: "Trigonometric functions: equations",
    difficulty: 1,
    prompt: r`Solve $2\sin x = 1$ for $0 \le x \le 2\pi$.`,
    options: [
      r`$x = \dfrac{\pi}{6}$ only`,
      r`$x = \dfrac{\pi}{6}, \dfrac{5\pi}{6}$`,
      r`$x = \dfrac{\pi}{6}, \dfrac{7\pi}{6}$`,
      r`$x = \dfrac{\pi}{3}, \dfrac{2\pi}{3}$`,
    ],
    answer: 1,
    solution: r`$\sin x = \dfrac{1}{2}$. The related (reference) angle is $\dfrac{\pi}{6}$, from the exact-value triangle.

Sine is **positive** in the first and second quadrants (ASTC), so:

- Quadrant 1: $x = \dfrac{\pi}{6}$
- Quadrant 2: $x = \pi - \dfrac{\pi}{6} = \dfrac{5\pi}{6}$`,
    commonMistake: r`Stopping at the calculator answer $\frac{\pi}{6}$. There are usually two solutions per full revolution, so always check every quadrant where the ratio has the right sign.`,
  },
];

export const mathsExt1: Question[] = [
  {
    id: "me1-001",
    subject: "me1",
    topic: "Combinatorics: permutations",
    difficulty: 2,
    prompt: r`How many distinct arrangements are there of the letters of the word **PARALLEL**?`,
    options: [r`$40\,320$`, r`$20\,160$`, r`$6720$`, r`$3360$`],
    answer: 3,
    solution: r`PARALLEL has $8$ letters: P, A, R, A, L, L, E, L.

The repeated letters are **A** (twice) and **L** (three times). Divide by the factorial of each repeat count, because swapping identical letters doesn't create a new arrangement:

$$\frac{8!}{2!\,3!} = \frac{40\,320}{2 \times 6} = \frac{40\,320}{12} = 3360$$`,
    commonMistake: r`Missing one of the repeated letters. Dividing only by $3!$ gives $6720$; only by $2!$ gives $20\,160$.`,
  },
  {
    id: "me1-002",
    subject: "me1",
    topic: "Calculus: inverse trigonometric functions",
    difficulty: 2,
    prompt: r`Find $\displaystyle\int \frac{1}{\sqrt{9 - x^2}} \, dx$.`,
    options: [
      r`$\sin^{-1}(3x) + C$`,
      r`$\dfrac{1}{3}\sin^{-1}\!\left(\dfrac{x}{3}\right) + C$`,
      r`$\sin^{-1}\!\left(\dfrac{x}{3}\right) + C$`,
      r`$\dfrac{1}{3}\tan^{-1}\!\left(\dfrac{x}{3}\right) + C$`,
    ],
    answer: 2,
    solution: r`Use the standard integral from the HSC reference sheet:

$$\int \frac{1}{\sqrt{a^2 - x^2}} \, dx = \sin^{-1}\!\left(\frac{x}{a}\right) + C$$

Here $a^2 = 9$, so $a = 3$:

$$\int \frac{1}{\sqrt{9 - x^2}} \, dx = \sin^{-1}\!\left(\frac{x}{3}\right) + C$$`,
    commonMistake: r`Adding a factor of $\frac{1}{a}$. That factor belongs to the $\tan^{-1}$ result, $\int \frac{1}{a^2 + x^2}dx = \frac{1}{a}\tan^{-1}\frac{x}{a} + C$, not the $\sin^{-1}$ one.`,
  },
  {
    id: "me1-003",
    subject: "me1",
    topic: "Vectors: projections",
    difficulty: 3,
    prompt: r`Let $\underset{\sim}{a} = 2\underset{\sim}{i} - \underset{\sim}{j}$ and $\underset{\sim}{b} = 3\underset{\sim}{i} + 4\underset{\sim}{j}$. Find the projection of $\underset{\sim}{a}$ onto $\underset{\sim}{b}$.`,
    options: [
      r`$\dfrac{2}{25}(2\underset{\sim}{i} - \underset{\sim}{j})$`,
      r`$\dfrac{2}{5}(3\underset{\sim}{i} + 4\underset{\sim}{j})$`,
      r`$\dfrac{2}{5}(2\underset{\sim}{i} - \underset{\sim}{j})$`,
      r`$\dfrac{2}{25}(3\underset{\sim}{i} + 4\underset{\sim}{j})$`,
    ],
    answer: 3,
    solution: r`The projection of $\underset{\sim}{a}$ onto $\underset{\sim}{b}$ is

$$\text{proj}_{\underset{\sim}{b}}\underset{\sim}{a} = \frac{\underset{\sim}{a} \cdot \underset{\sim}{b}}{\underset{\sim}{b} \cdot \underset{\sim}{b}} \, \underset{\sim}{b}$$

- $\underset{\sim}{a} \cdot \underset{\sim}{b} = (2)(3) + (-1)(4) = 2$
- $\underset{\sim}{b} \cdot \underset{\sim}{b} = 3^2 + 4^2 = 25$

$$\text{proj}_{\underset{\sim}{b}}\underset{\sim}{a} = \frac{2}{25}(3\underset{\sim}{i} + 4\underset{\sim}{j})$$

The projection always points along the vector you are projecting **onto** (here $\underset{\sim}{b}$).`,
    commonMistake: r`Dividing by $|\underset{\sim}{b}| = 5$ instead of $|\underset{\sim}{b}|^2 = 25$. Dividing by $|\underset{\sim}{b}|$ gives the scalar projection, which is a length, not a vector.`,
  },
  {
    id: "me1-004",
    subject: "me1",
    topic: "Combinatorics: binomial expansion",
    difficulty: 1,
    prompt: r`What is the coefficient of $x^3$ in the expansion of $(2 + x)^5$?`,
    options: [r`$10$`, r`$40$`, r`$80$`, r`$20$`],
    answer: 1,
    solution: r`The general term of $(a + b)^n$ is $\binom{n}{k} a^{n-k} b^k$.

With $a = 2$, $b = x$, $n = 5$, the $x^3$ term has $k = 3$:

$$\binom{5}{3} \, 2^{2} \, x^3 = 10 \times 4 \times x^3 = 40x^3$$

So the coefficient is $40$.`,
    commonMistake: r`Forgetting to raise the 2 to a power gives $10$. Using $2^3$ instead of $2^2$ gives $80$, which is actually the coefficient of $x^2$.`,
  },
  {
    id: "me1-005",
    subject: "me1",
    topic: "Calculus: related rates",
    difficulty: 2,
    prompt: r`A spherical balloon is inflated so that its volume increases at $10 \text{ cm}^3/\text{s}$. At what rate is the radius increasing when the radius is $5$ cm?`,
    options: [
      r`$\dfrac{3}{50\pi}$ cm/s`,
      r`$\dfrac{1}{2\pi}$ cm/s`,
      r`$\dfrac{1}{10\pi}$ cm/s`,
      r`$10\pi$ cm/s`,
    ],
    answer: 2,
    solution: r`Write down what you know and what you want: $\dfrac{dV}{dt} = 10$, find $\dfrac{dr}{dt}$ when $r = 5$.

Link them with the chain rule: $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$.

Since $V = \dfrac{4}{3}\pi r^3$, we get $\dfrac{dV}{dr} = 4\pi r^2$. At $r = 5$, that is $100\pi$.

$$10 = 100\pi \times \frac{dr}{dt} \implies \frac{dr}{dt} = \frac{10}{100\pi} = \frac{1}{10\pi} \text{ cm/s}$$`,
    commonMistake: r`Substituting $r = 5$ into $V$ before differentiating. Differentiate first, then substitute.`,
  },
  {
    id: "me1-006",
    subject: "me1",
    topic: "Polynomials: sums and products of roots",
    difficulty: 3,
    prompt: r`The roots of $x^3 - 4x^2 + x + 6 = 0$ are $\alpha$, $\beta$ and $\gamma$. Find the value of $\alpha^2 + \beta^2 + \gamma^2$.`,
    options: [r`$14$`, r`$18$`, r`$16$`, r`$15$`],
    answer: 0,
    solution: r`For $ax^3 + bx^2 + cx + d = 0$:

- $\alpha + \beta + \gamma = -\dfrac{b}{a} = 4$
- $\alpha\beta + \beta\gamma + \gamma\alpha = \dfrac{c}{a} = 1$

Use the identity $(\alpha + \beta + \gamma)^2 = \alpha^2 + \beta^2 + \gamma^2 + 2(\alpha\beta + \beta\gamma + \gamma\alpha)$:

$$\alpha^2 + \beta^2 + \gamma^2 = 4^2 - 2(1) = 14$$

**Check:** the roots are actually $-1, 2, 3$, and $1 + 4 + 9 = 14$ ✓.`,
    commonMistake: r`Adding $2(\alpha\beta + \dots)$ instead of subtracting it, which gives $18$, or getting the sign of $-\frac{b}{a}$ wrong.`,
  },
  {
    id: "me1-007",
    subject: "me1",
    topic: "Functions: inverse trigonometric functions",
    difficulty: 1,
    prompt: r`What is the range of $y = 2\cos^{-1}\!\left(\dfrac{x}{2}\right)$?`,
    options: [r`$0 \le y \le 2\pi$`, r`$0 \le y \le \pi$`, r`$-\pi \le y \le \pi$`, r`$0 \le y \le 4\pi$`],
    answer: 0,
    solution: r`The range of $\cos^{-1}$ is always $0 \le \cos^{-1}(\cdot) \le \pi$, whatever is inside the brackets.

The $\frac{x}{2}$ inside only affects the **domain** (it becomes $-2 \le x \le 2$).

The $2$ outside multiplies every output by $2$, so the range is

$$0 \le y \le 2\pi$$`,
    commonMistake: r`Confusing the range of $\cos^{-1}$ ($[0, \pi]$) with the range of $\sin^{-1}$ ($[-\frac{\pi}{2}, \frac{\pi}{2}]$), or letting the inside $\frac{x}{2}$ change the range.`,
  },
  {
    id: "me1-008",
    subject: "me1",
    topic: "Vectors: projectile motion",
    difficulty: 2,
    prompt: r`A particle is projected from level ground with speed $20$ m/s at an angle of $30^\circ$ to the horizontal. Taking $g = 10 \text{ m/s}^2$ and ignoring air resistance, what is its maximum height?`,
    options: [r`$10$ m`, r`$5$ m`, r`$15$ m`, r`$20$ m`],
    answer: 1,
    solution: r`Resolve the initial velocity. The vertical component is $20\sin 30^\circ = 10$ m/s.

Vertically: $\ddot{y} = -10$, so $\dot{y} = 10 - 10t$ and $y = 10t - 5t^2$.

At maximum height the vertical velocity is zero: $10 - 10t = 0 \implies t = 1$ s.

$$y = 10(1) - 5(1)^2 = 5 \text{ m}$$`,
    commonMistake: r`Using the horizontal component ($20\cos 30^\circ \approx 17.3$ m/s) for the vertical motion gives $15$ m. Only the vertical component matters for height.`,
  },
];

export const mathsStandard2: Question[] = [
  {
    id: "ms2-001",
    subject: "ms2",
    topic: "Financial mathematics: compound interest",
    difficulty: 2,
    prompt: r`\$5000 is invested at $4\%$ p.a., compounded **monthly**, for 3 years. What is the value of the investment at the end (to the nearest cent)?`,
    options: [r`\$5600.00`, r`\$5624.32`, r`\$5652.00`, r`\$5636.36`],
    answer: 3,
    solution: r`Use the compound interest formula $FV = PV(1 + r)^n$, where $r$ is the rate **per period** and $n$ is the number of periods.

- Monthly rate: $r = \dfrac{0.04}{12}$
- Number of months: $n = 3 \times 12 = 36$

$$FV = 5000\left(1 + \frac{0.04}{12}\right)^{36} = 5636.359\ldots \approx \$5636.36$$`,
    commonMistake: r`Using the annual rate with $n = 3$ gives \$5624.32 (that's annual compounding). \$5600 is simple interest.`,
  },
  {
    id: "ms2-002",
    subject: "ms2",
    topic: "Measurement: right-angled triangles",
    difficulty: 1,
    prompt: r`A ladder $6$ m long leans against a vertical wall and makes an angle of $70^\circ$ with the level ground. How high up the wall does the ladder reach (to 2 decimal places)?`,
    options: [r`$5.64$ m`, r`$2.05$ m`, r`$6.39$ m`, r`$16.48$ m`],
    answer: 0,
    solution: r`Draw the triangle. The ladder is the **hypotenuse** ($6$ m). The height up the wall is **opposite** the $70^\circ$ angle.

Opposite and hypotenuse means sine (SOH):

$$\sin 70^\circ = \frac{h}{6} \implies h = 6\sin 70^\circ \approx 5.64 \text{ m}$$

**Sense check:** the height must be less than the ladder's length, which rules out $6.39$ m and $16.48$ m.`,
    commonMistake: r`Using cosine gives $2.05$ m, which is the distance from the wall to the foot of the ladder. Make sure your calculator is in degrees.`,
  },
  {
    id: "ms2-003",
    subject: "ms2",
    topic: "Algebra: linear relationships",
    difficulty: 1,
    prompt: r`A phone plan costs \$15 per month plus \$0.10 per text message. Last month's bill was \$27.50. How many texts were sent?`,
    options: [r`$275$`, r`$150$`, r`$125$`, r`$12$`],
    answer: 2,
    solution: r`Write the model as $C = 15 + 0.10n$, where $n$ is the number of texts.

$$27.50 = 15 + 0.10n$$
$$12.50 = 0.10n$$
$$n = \frac{12.50}{0.10} = 125$$`,
    commonMistake: r`Forgetting to subtract the fixed \$15 first gives $275$.`,
  },
  {
    id: "ms2-004",
    subject: "ms2",
    topic: "Statistical analysis: interquartile range",
    difficulty: 2,
    prompt: r`Find the interquartile range of the data set: $3, 5, 7, 8, 10, 12, 15$.`,
    options: [r`$5$`, r`$7$`, r`$9$`, r`$12$`],
    answer: 1,
    solution: r`The data is already in order and there are $7$ values.

- The median is the 4th value: $8$.
- $Q_1$ is the median of the lower half $3, 5, 7$: $Q_1 = 5$.
- $Q_3$ is the median of the upper half $10, 12, 15$: $Q_3 = 12$.

$$\text{IQR} = Q_3 - Q_1 = 12 - 5 = 7$$`,
    commonMistake: r`Giving the range ($15 - 3 = 12$) instead of the interquartile range.`,
  },
  {
    id: "ms2-005",
    subject: "ms2",
    topic: "Measurement: energy and mass",
    difficulty: 2,
    prompt: r`A $2400$ W heater runs for $45$ minutes. Electricity costs $30$ cents per kWh. What does it cost to run?`,
    options: [r`$18$ cents`, r`$54$ cents`, r`$72$ cents`, r`\$5.40`],
    answer: 1,
    solution: r`Convert to kilowatts and hours first.

- Power: $2400 \text{ W} = 2.4 \text{ kW}$
- Time: $45 \text{ min} = 0.75 \text{ h}$

$$\text{Energy} = 2.4 \times 0.75 = 1.8 \text{ kWh}$$

$$\text{Cost} = 1.8 \times 30 = 54 \text{ cents}$$`,
    commonMistake: r`Forgetting to convert minutes to hours. $72$ cents is the cost for a full hour.`,
  },
  {
    id: "ms2-006",
    subject: "ms2",
    topic: "Financial mathematics: depreciation",
    difficulty: 2,
    prompt: r`A car bought for \$30 000 depreciates at $15\%$ p.a. using the **declining-balance** method. What is its value after 2 years?`,
    options: [r`\$21 675`, r`\$21 000`, r`\$22 500`, r`\$25 500`],
    answer: 0,
    solution: r`Declining-balance depreciation uses $S = V_0(1 - r)^n$.

$$S = 30\,000 \times (1 - 0.15)^2 = 30\,000 \times 0.7225 = \$21\,675$$

Each year the car loses $15\%$ of its **current** value, not of the original price.`,
    commonMistake: r`\$21 000 comes from straight-line depreciation (taking \$4500 off each year). \$25 500 is the value after only one year.`,
  },
  {
    id: "ms2-007",
    subject: "ms2",
    topic: "Statistical analysis: bivariate data",
    difficulty: 1,
    prompt: r`A data set has Pearson's correlation coefficient $r = -0.92$. Which description best fits the relationship?`,
    options: [
      r`Weak negative linear relationship`,
      r`Strong positive linear relationship`,
      r`No relationship, because $r$ is negative`,
      r`Strong negative linear relationship`,
    ],
    answer: 3,
    solution: r`Read $r$ in two parts.

- **Sign** gives the direction. Negative means that as one variable increases, the other tends to decrease.
- **Size** gives the strength. $|r| = 0.92$ is close to $1$, so the relationship is **strong**.

So $r = -0.92$ is a strong negative linear relationship.`,
    commonMistake: r`Thinking a negative $r$ is "weak" or "no relationship". The sign only tells you direction.`,
  },
  {
    id: "ms2-008",
    subject: "ms2",
    topic: "Measurement: Pythagoras' theorem",
    difficulty: 1,
    prompt: r`A ship sails $12$ km due east and then $5$ km due north. How far is it from its starting point?`,
    options: [r`$7$ km`, r`$17$ km`, r`$13$ km`, r`$10.9$ km`],
    answer: 2,
    solution: r`The two legs of the journey are at right angles, so the direct distance is the hypotenuse.

$$d = \sqrt{12^2 + 5^2} = \sqrt{144 + 25} = \sqrt{169} = 13 \text{ km}$$`,
    commonMistake: r`Adding the distances ($17$ km) gives the distance travelled, not how far the ship is from its start.`,
  },
];
