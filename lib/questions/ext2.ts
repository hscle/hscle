import type { Question } from "../types";

const r = String.raw;

// Vector notation as written in NSW exams: a letter with a tilde underneath.
const va = r`\underset{\sim}{a}`;
const vb = r`\underset{\sim}{b}`;
const vc = r`\underset{\sim}{c}`;
const vu = r`\underset{\sim}{u}`;
const vv = r`\underset{\sim}{v}`;
const vi = r`\underset{\sim}{i}`;
const vj = r`\underset{\sim}{j}`;
const vk = r`\underset{\sim}{k}`;
const v0 = r`\underset{\sim}{0}`;

export const mathsExt2: Question[] = [
  // ---------- Complex numbers ----------
  {
    id: "me2-001",
    subject: "me2",
    topic: "Complex numbers: roots of unity",
    difficulty: 3,
    prompt: r`Suppose that $z + \dfrac{1}{z} = 1$. What is the value of $z^{2025} + \dfrac{1}{z^{2025}}$?`,
    options: [r`$2$`, r`$1$`, r`$-1$`, r`$-2$`],
    answer: 3,
    solution: r`Multiply both sides by $z$ and rearrange:

$$z^2 - z + 1 = 0$$

Multiply by $(z + 1)$ to make a sum of cubes:

$$(z + 1)(z^2 - z + 1) = z^3 + 1 = 0 \quad\Rightarrow\quad z^3 = -1$$

Since $2025 = 3 \times 675$ and $675$ is odd:

$$z^{2025} = \left(z^3\right)^{675} = (-1)^{675} = -1$$

$$z^{2025} + \frac{1}{z^{2025}} = -1 + \frac{1}{-1} = -2$$

Check with De Moivre's theorem: the roots of $z^2 - z + 1 = 0$ are $z = \cos\frac{\pi}{3} \pm i\sin\frac{\pi}{3}$, so $z^n + z^{-n} = 2\cos\frac{n\pi}{3}$, and $2\cos(675\pi) = -2$.`,
    commonMistake: r`Assuming $z^3 = 1$. That's true when $z + \frac{1}{z} = -1$ (the cube roots of unity) and would give $2$. Here the sign is different, so $z^3 = -1$.`,
  },
  {
    id: "me2-002",
    subject: "me2",
    topic: "Complex numbers: arithmetic",
    difficulty: 1,
    prompt: r`Express $\dfrac{3 + 4i}{1 - 2i}$ in the form $x + iy$, where $x$ and $y$ are real.`,
    options: [r`$\dfrac{11}{5} + 2i$`, r`$-5 + 10i$`, r`$-1 + 2i$`, r`$\dfrac{5}{3} - \dfrac{10}{3}i$`],
    answer: 2,
    solution: r`Multiply the numerator and denominator by the conjugate of the denominator, $1 + 2i$:

$$\frac{3 + 4i}{1 - 2i} \times \frac{1 + 2i}{1 + 2i} = \frac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)}$$

- Numerator: $3 + 6i + 4i + 8i^2 = 3 + 10i - 8 = -5 + 10i$
- Denominator: $1^2 + 2^2 = 5$

$$\frac{-5 + 10i}{5} = -1 + 2i$$`,
    commonMistake: r`Writing $8i^2$ as $+8$ (giving $\frac{11}{5} + 2i$), or working out $(1 - 2i)(1 + 2i)$ as $1 - 4 = -3$. A number times its conjugate is always $a^2 + b^2$, which is positive.`,
  },
  {
    id: "me2-003",
    subject: "me2",
    topic: "Complex numbers: conjugate and modulus",
    difficulty: 1,
    prompt: r`Let $w = 3 - 2i$ and $z = 1 + 4i$. What is $|\overline{w} + z|$?`,
    options: [r`$2\sqrt{13}$`, r`$2\sqrt{5}$`, r`$\sqrt{13} + \sqrt{17}$`, r`$52$`],
    answer: 0,
    solution: r`First find the conjugate by changing the sign of the imaginary part: $\overline{w} = 3 + 2i$.

$$\overline{w} + z = (3 + 2i) + (1 + 4i) = 4 + 6i$$

Then take the modulus:

$$|4 + 6i| = \sqrt{4^2 + 6^2} = \sqrt{52} = 2\sqrt{13}$$`,
    commonMistake: r`Using $w$ instead of $\overline{w}$, which gives $|4 + 2i| = 2\sqrt{5}$. Also, $|\overline{w} + z|$ is not $|\overline{w}| + |z|$: moduli don't simply add.`,
  },
  {
    id: "me2-004",
    subject: "me2",
    topic: "Complex numbers: De Moivre's theorem",
    difficulty: 2,
    prompt: r`Let $w = \sqrt{3} - i$. What is $w^9$?`,
    options: [r`$-512$`, r`$512i$`, r`$-512i$`, r`$262\,144\,i$`],
    answer: 1,
    solution: r`Write $w$ in modulus–argument form.

- $|w| = \sqrt{\left(\sqrt{3}\right)^2 + (-1)^2} = \sqrt{4} = 2$
- $w$ is in the fourth quadrant with $\tan\theta = -\frac{1}{\sqrt{3}}$, so $\arg w = -\frac{\pi}{6}$

$$w = 2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right)$$

By De Moivre's theorem:

$$w^9 = 2^9\left(\cos\left(-\frac{9\pi}{6}\right) + i\sin\left(-\frac{9\pi}{6}\right)\right) = 512\left(\cos\left(-\frac{3\pi}{2}\right) + i\sin\left(-\frac{3\pi}{2}\right)\right)$$

Since $\cos\left(-\frac{3\pi}{2}\right) = 0$ and $\sin\left(-\frac{3\pi}{2}\right) = 1$:

$$w^9 = 512i$$`,
    commonMistake: r`Getting the argument wrong. Using $+\frac{\pi}{6}$ (forgetting that $w$ is below the real axis) gives $-512i$, and using $-\frac{\pi}{3}$ gives $-512$. Remember to raise the modulus to the power too: $2^9 = 512$.`,
  },
  {
    id: "me2-005",
    subject: "me2",
    topic: "Complex numbers: arithmetic",
    difficulty: 2,
    prompt: r`Let $z = 3 - i$ and $w = 1 + i$. Express $\overline{z} - \dfrac{4}{w}$ in the form $x + iy$, where $x$ and $y$ are real.`,
    options: [r`$1 + i$`, r`$1 - i$`, r`$-1 + 5i$`, r`$1 + 3i$`],
    answer: 3,
    solution: r`Work out each part separately.

- $\overline{z} = 3 + i$
- $\dfrac{4}{w} = \dfrac{4}{1 + i} \times \dfrac{1 - i}{1 - i} = \dfrac{4(1 - i)}{1^2 + 1^2} = \dfrac{4 - 4i}{2} = 2 - 2i$

$$\overline{z} - \frac{4}{w} = (3 + i) - (2 - 2i) = 1 + 3i$$`,
    commonMistake: r`Subtracting only the real part. Subtracting $2 - 2i$ means subtracting $2$ **and adding** $2i$, so $(3 + i) - (2 - 2i) = 1 + 3i$. Also check you used $\overline{z} = 3 + i$, not $z$.`,
  },
  {
    id: "me2-006",
    subject: "me2",
    topic: "Complex numbers: conjugates",
    difficulty: 1,
    prompt: r`Let $z = 3 + 2i$ and $w = \overline{z}$. Express $\dfrac{z}{w}$ in the form $x + iy$, where $x$ and $y$ are real.`,
    options: [r`$\dfrac{5}{13} + \dfrac{12}{13}i$`, r`$1 + \dfrac{12}{13}i$`, r`$\dfrac{5}{13} - \dfrac{12}{13}i$`, r`$1 + \dfrac{12}{5}i$`],
    answer: 0,
    solution: r`Here $w = \overline{z} = 3 - 2i$. Multiply the top and bottom by the conjugate of the denominator, which is $z$ itself:

$$\frac{z}{w} = \frac{3 + 2i}{3 - 2i} \times \frac{3 + 2i}{3 + 2i} = \frac{(3 + 2i)^2}{3^2 + 2^2}$$

- Numerator: $(3 + 2i)^2 = 9 + 12i + 4i^2 = 5 + 12i$
- Denominator: $9 + 4 = 13$

$$\frac{z}{w} = \frac{5}{13} + \frac{12}{13}i$$

Check: $|z| = |w|$, so $\left|\frac{z}{w}\right|$ must be $1$. Indeed $\left(\frac{5}{13}\right)^2 + \left(\frac{12}{13}\right)^2 = \frac{25 + 144}{169} = 1$.`,
    commonMistake: r`Treating $4i^2$ as $+4$, which gives $1 + \frac{12}{13}i$. The modulus check catches it: that number's modulus isn't $1$.`,
  },
  {
    id: "me2-007",
    subject: "me2",
    topic: "Complex numbers: powers of i",
    difficulty: 1,
    prompt: r`Write $i^{27} + i^{14}$ in the form $a + ib$, where $a$ and $b$ are real.`,
    options: [r`$1 - i$`, r`$-1 - i$`, r`$-1 + i$`, r`$1 + i$`],
    answer: 1,
    solution: r`Powers of $i$ repeat every $4$: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$.

So divide each power by $4$ and use the remainder.

- $27 = 4 \times 6 + 3$, so $i^{27} = i^3 = -i$
- $14 = 4 \times 3 + 2$, so $i^{14} = i^2 = -1$

$$i^{27} + i^{14} = -1 - i$$`,
    commonMistake: r`Getting $i^3$ wrong. It's $i^2 \times i = -1 \times i = -i$, not $+i$.`,
  },
  {
    id: "me2-008",
    subject: "me2",
    topic: "Complex numbers: equating real and imaginary parts",
    difficulty: 2,
    prompt: r`The real numbers $a$ and $b$ satisfy $(a + ib)(2 + i) = 1 + 8i$. What are the values of $a$ and $b$?`,
    options: [r`$a = 3,\ b = 2$`, r`$a = -\dfrac{6}{5},\ b = 3$`, r`$a = 2,\ b = 3$`, r`$a = \dfrac{10}{3},\ b = 5$`],
    answer: 2,
    solution: r`Divide both sides by $2 + i$, multiplying the top and bottom by its conjugate $2 - i$:

$$a + ib = \frac{1 + 8i}{2 + i} \times \frac{2 - i}{2 - i} = \frac{(1 + 8i)(2 - i)}{2^2 + 1^2}$$

- Numerator: $2 - i + 16i - 8i^2 = 2 + 15i + 8 = 10 + 15i$
- Denominator: $5$

$$a + ib = \frac{10 + 15i}{5} = 2 + 3i$$

So $a = 2$ and $b = 3$.

Another way: expand the left side, $(a + ib)(2 + i) = (2a - b) + i(a + 2b)$, and equate parts: $2a - b = 1$ and $a + 2b = 8$. Solving gives $a = 2$, $b = 3$.`,
    commonMistake: r`Dividing by $2^2 - 1^2 = 3$ instead of $2^2 + 1^2 = 5$. Multiplying your answer back out, $(2 + 3i)(2 + i) = 1 + 8i$, is a quick way to catch slips like this.`,
  },
  {
    id: "me2-009",
    subject: "me2",
    topic: "Complex numbers: arithmetic",
    difficulty: 1,
    prompt: r`Let $z = 4 - 3i$. Express $z^2 + 2\overline{z}$ in the form $x + iy$, where $x$ and $y$ are real.`,
    options: [r`$15 - 30i$`, r`$33 - 18i$`, r`$33 + 6i$`, r`$15 - 18i$`],
    answer: 3,
    solution: r`Work out each part separately.

- $z^2 = (4 - 3i)^2 = 16 - 24i + 9i^2 = 16 - 24i - 9 = 7 - 24i$
- $\overline{z} = 4 + 3i$, so $2\overline{z} = 8 + 6i$

$$z^2 + 2\overline{z} = (7 - 24i) + (8 + 6i) = 15 - 18i$$`,
    commonMistake: r`Writing $9i^2$ as $+9$, which makes $z^2 = 25 - 24i$. Since $i^2 = -1$, $9i^2 = -9$. Also check you doubled $\overline{z}$, not $z$.`,
  },

  // ---------- Further integration ----------
  {
    id: "me2-010",
    subject: "me2",
    topic: "Further integration: substitution",
    difficulty: 2,
    prompt: r`Using the substitution $u = 1 + e^x$, the integral $\displaystyle\int_0^{\ln 3} \frac{1}{1 + e^x}\,dx$ can be written as which of the following?`,
    options: [
      r`$\displaystyle\int_0^{\ln 3} \left(\frac{1}{u - 1} - \frac{1}{u}\right) du$`,
      r`$\displaystyle\int_2^{4} \left(\frac{1}{u - 1} - \frac{1}{u}\right) du$`,
      r`$\displaystyle\int_2^{4} \left(\frac{1}{u} - \frac{1}{u - 1}\right) du$`,
      r`$\displaystyle\int_1^{3} \left(\frac{1}{u - 1} - \frac{1}{u}\right) du$`,
    ],
    answer: 1,
    solution: r`With $u = 1 + e^x$:

- $\dfrac{du}{dx} = e^x = u - 1$, so $dx = \dfrac{du}{u - 1}$
- Limits: $x = 0$ gives $u = 1 + 1 = 2$, and $x = \ln 3$ gives $u = 1 + 3 = 4$

$$\int_0^{\ln 3} \frac{1}{1 + e^x}\,dx = \int_2^4 \frac{1}{u} \cdot \frac{1}{u - 1}\,du = \int_2^4 \frac{1}{u(u - 1)}\,du$$

Split into partial fractions: $\dfrac{1}{u(u - 1)} = \dfrac{A}{u - 1} + \dfrac{B}{u}$, so $1 = Au + B(u - 1)$.

- $u = 1$ gives $A = 1$
- $u = 0$ gives $B = -1$

$$\int_2^4 \left(\frac{1}{u - 1} - \frac{1}{u}\right) du$$`,
    commonMistake: r`Keeping the $x$-limits after substituting. Once everything is in terms of $u$, the limits must be $u$-values too: $u = 1 + e^0 = 2$ and $u = 1 + e^{\ln 3} = 4$.`,
  },
  {
    id: "me2-011",
    subject: "me2",
    topic: "Further integration: partial fractions",
    difficulty: 3,
    prompt: r`Using a suitable substitution, $\displaystyle\int_0^{\frac{\pi}{4}} \frac{\sec^2 x}{\sec^2 x + 5\tan x + 5}\,dx$ can be written as which of the following?`,
    options: [
      r`$\displaystyle\int_0^{1} \left(\frac{1}{u + 3} - \frac{1}{u + 2}\right) du$`,
      r`$\displaystyle\int_0^{\frac{\pi}{4}} \left(\frac{1}{u + 2} - \frac{1}{u + 3}\right) du$`,
      r`$\displaystyle\int_0^{1} \left(\frac{1}{u + 2} - \frac{1}{u + 3}\right) du$`,
      r`$\displaystyle\int_0^{1} \left(\frac{1}{u + 2} + \frac{1}{u + 3}\right) du$`,
    ],
    answer: 2,
    solution: r`Rewrite the denominator using $\sec^2 x = 1 + \tan^2 x$:

$$\sec^2 x + 5\tan x + 5 = \tan^2 x + 5\tan x + 6 = (\tan x + 2)(\tan x + 3)$$

Now let $u = \tan x$, so $du = \sec^2 x\,dx$.

- Limits: $x = 0$ gives $u = 0$, and $x = \frac{\pi}{4}$ gives $u = 1$

$$\int_0^1 \frac{1}{(u + 2)(u + 3)}\,du$$

Partial fractions: $\dfrac{1}{(u + 2)(u + 3)} = \dfrac{A}{u + 2} + \dfrac{B}{u + 3}$, so $1 = A(u + 3) + B(u + 2)$.

- $u = -2$ gives $A = 1$
- $u = -3$ gives $B = -1$

$$\int_0^1 \left(\frac{1}{u + 2} - \frac{1}{u + 3}\right) du$$`,
    commonMistake: r`Not spotting the identity. The $\sec^2 x$ in the denominator has to become $1 + \tan^2 x$ before the substitution $u = \tan x$ works. After that, check the partial fraction signs by recombining: $\frac{1}{u + 2} - \frac{1}{u + 3} = \frac{1}{(u + 2)(u + 3)}$.`,
  },
  {
    id: "me2-012",
    subject: "me2",
    topic: "Further integration: substitution",
    difficulty: 2,
    prompt: r`Find $\displaystyle\int \frac{x}{\sqrt{16 - 9x^2}}\,dx$.`,
    options: [
      r`$\dfrac{1}{9}\sqrt{16 - 9x^2} + C$`,
      r`$-\dfrac{1}{18}\sqrt{16 - 9x^2} + C$`,
      r`$\dfrac{1}{3}\sin^{-1}\!\left(\dfrac{3x}{4}\right) + C$`,
      r`$-\dfrac{1}{9}\sqrt{16 - 9x^2} + C$`,
    ],
    answer: 3,
    solution: r`Let $u = 16 - 9x^2$. Then $\dfrac{du}{dx} = -18x$, so $x\,dx = -\dfrac{1}{18}\,du$.

$$\int \frac{x}{\sqrt{16 - 9x^2}}\,dx = -\frac{1}{18}\int u^{-\frac{1}{2}}\,du = -\frac{1}{18} \times 2u^{\frac{1}{2}} + C = -\frac{1}{9}\sqrt{16 - 9x^2} + C$$

Check by differentiating:

$$\frac{d}{dx}\left(-\frac{1}{9}\left(16 - 9x^2\right)^{\frac{1}{2}}\right) = -\frac{1}{9} \times \frac{1}{2}\left(16 - 9x^2\right)^{-\frac{1}{2}} \times (-18x) = \frac{x}{\sqrt{16 - 9x^2}}$$`,
    commonMistake: r`Reaching for $\sin^{-1}$ because of the square root. The $x$ on top is a multiple of the derivative of $16 - 9x^2$, so this is a substitution, not an inverse sine integral.`,
  },
  {
    id: "me2-013",
    subject: "me2",
    topic: "Further integration: substitution",
    difficulty: 2,
    prompt: r`Evaluate $\displaystyle\int_1^5 x\sqrt{x - 1}\,dx$.`,
    options: [r`$\dfrac{272}{15}$`, r`$\dfrac{112}{15}$`, r`$\dfrac{16}{3}$`, r`$\dfrac{40\sqrt{5}}{3} - \dfrac{16}{15}$`],
    answer: 0,
    solution: r`Let $u = x - 1$, so $x = u + 1$ and $du = dx$.

- Limits: $x = 1$ gives $u = 0$, and $x = 5$ gives $u = 4$

$$\int_1^5 x\sqrt{x - 1}\,dx = \int_0^4 (u + 1)\,u^{\frac{1}{2}}\,du = \int_0^4 \left(u^{\frac{3}{2}} + u^{\frac{1}{2}}\right) du$$

$$= \left[\frac{2}{5}u^{\frac{5}{2}} + \frac{2}{3}u^{\frac{3}{2}}\right]_0^4 = \frac{2}{5}(32) + \frac{2}{3}(8) = \frac{64}{5} + \frac{16}{3} = \frac{192 + 80}{15} = \frac{272}{15}$$`,
    commonMistake: r`Writing $x = u - 1$ instead of $u + 1$, which gives $\frac{112}{15}$. If $u = x - 1$, then $x = u + 1$. Forgetting to change the limits to $0$ and $4$ gives the messy $\frac{40\sqrt{5}}{3} - \frac{16}{15}$.`,
  },
  {
    id: "me2-014",
    subject: "me2",
    topic: "Further integration: substitution",
    difficulty: 2,
    prompt: r`Find $\displaystyle\int \frac{\sin\theta}{\cos^4\theta}\,d\theta$.`,
    options: [
      r`$-\dfrac{1}{3\cos^3\theta} + C$`,
      r`$\dfrac{1}{3\cos^3\theta} + C$`,
      r`$\dfrac{1}{5\cos^5\theta} + C$`,
      r`$\dfrac{\sin^2\theta}{2\cos^4\theta} + C$`,
    ],
    answer: 1,
    solution: r`Let $u = \cos\theta$, so $du = -\sin\theta\,d\theta$, which means $\sin\theta\,d\theta = -du$.

$$\int \frac{\sin\theta}{\cos^4\theta}\,d\theta = -\int u^{-4}\,du = -\frac{u^{-3}}{-3} + C = \frac{1}{3u^3} + C = \frac{1}{3\cos^3\theta} + C$$

Check by differentiating:

$$\frac{d}{d\theta}\left(\frac{1}{3}(\cos\theta)^{-3}\right) = \frac{1}{3} \times (-3)(\cos\theta)^{-4} \times (-\sin\theta) = \frac{\sin\theta}{\cos^4\theta}$$`,
    commonMistake: r`Losing a minus sign. There are two: one from $du = -\sin\theta\,d\theta$ and one from integrating $u^{-4}$ to get $\frac{u^{-3}}{-3}$. They cancel, so the answer is positive.`,
  },
  {
    id: "me2-015",
    subject: "me2",
    topic: "Further integration: substitution",
    difficulty: 2,
    prompt: r`Evaluate $\displaystyle\int_{e^2}^{e^6} \frac{1}{x\ln x}\,dx$.`,
    options: [r`$4$`, r`$16$`, r`$\ln 4$`, r`$\ln 3$`],
    answer: 3,
    solution: r`Let $u = \ln x$, so $du = \dfrac{1}{x}\,dx$.

- Limits: $x = e^2$ gives $u = 2$, and $x = e^6$ gives $u = 6$

$$\int_{e^2}^{e^6} \frac{1}{x\ln x}\,dx = \int_2^6 \frac{1}{u}\,du = \Big[\ln u\Big]_2^6 = \ln 6 - \ln 2 = \ln 3$$`,
    commonMistake: r`Writing $\ln 6 - \ln 2$ as $\ln 4$. Subtracting logs divides what's inside: $\ln 6 - \ln 2 = \ln\frac{6}{2} = \ln 3$.`,
  },

  // ---------- Vectors ----------
  {
    id: "me2-016",
    subject: "me2",
    topic: "Vectors: dot product",
    difficulty: 3,
    prompt: r`Non-zero vectors $${va}$, $${vb}$ and $${vc}$ in three dimensions satisfy

$$${va} \cdot ${vb} = 2, \quad ${vb} \cdot ${vc} = 3, \quad ${vc} \cdot ${va} = 4$$

Which of the following statements is true?`,
    options: [
      r`$${va}$ could be a unit vector.`,
      r`$${va}$, $${vb}$ and $${vc}$ could all be unit vectors.`,
      r`The angle between $${va}$ and $${vb}$ must be obtuse.`,
      r`There are positive real numbers $r$, $s$ and $t$ such that $r${va} + s${vb} + t${vc} = ${v0}$.`,
    ],
    answer: 0,
    solution: r`Test each statement.

- **B is false.** For unit vectors, $${va} \cdot ${vb} = \cos\theta \le 1$, but here $${va} \cdot ${vb} = 2$.
- **C is false.** $${va} \cdot ${vb} = |${va}||${vb}|\cos\theta = 2 > 0$, so $\cos\theta > 0$ and the angle is acute.
- **D is false.** Dot both sides with $${va}$: $r|${va}|^2 + s(${va} \cdot ${vb}) + t(${vc} \cdot ${va}) = 0$, that is $r|${va}|^2 + 2s + 4t = 0$. Every term on the left is positive, so this can't happen.
- **A is true.** For example, take $${va} = ${vi}$, $${vb} = 2${vi} + ${vj}$ and $${vc} = 4${vi} - 5${vj}$.

Check the example: $${va} \cdot ${vb} = 2$, $${vb} \cdot ${vc} = 8 - 5 = 3$ and $${vc} \cdot ${va} = 4$, with $|${va}| = 1$.`,
    commonMistake: r`Deciding that if all three can't be unit vectors then none of them can. One unit vector is fine, as long as the other two are long enough to make the dot products work.`,
  },
  {
    id: "me2-017",
    subject: "me2",
    topic: "Vectors: dividing an interval",
    difficulty: 1,
    prompt: r`The point $P$ divides the interval from $A(4, -1, 6)$ to $B(-6, 4, 1)$ internally in the ratio $3 : 2$. Find the coordinates of $P$.`,
    options: [r`$(0, 1, 4)$`, r`$(-2, 2, 3)$`, r`$\left(-1, \tfrac{3}{2}, \tfrac{7}{2}\right)$`, r`$(-10, 10, 15)$`],
    answer: 1,
    solution: r`The ratio $3 : 2$ splits $\overrightarrow{AB}$ into $5$ equal parts, and $P$ is $3$ of them from $A$. So $P$ is $\frac{3}{5}$ of the way from $A$ to $B$.

$$\overrightarrow{AB} = \begin{pmatrix} -6 - 4 \\ 4 - (-1) \\ 1 - 6 \end{pmatrix} = \begin{pmatrix} -10 \\ 5 \\ -5 \end{pmatrix}$$

$$\overrightarrow{OP} = \overrightarrow{OA} + \frac{3}{5}\overrightarrow{AB} = \begin{pmatrix} 4 \\ -1 \\ 6 \end{pmatrix} + \begin{pmatrix} -6 \\ 3 \\ -3 \end{pmatrix} = \begin{pmatrix} -2 \\ 2 \\ 3 \end{pmatrix}$$

So $P$ is $(-2, 2, 3)$.`,
    commonMistake: r`Going $\frac{2}{5}$ of the way instead of $\frac{3}{5}$, which gives $(0, 1, 4)$. For the ratio $m : n$ from $A$ to $B$, the point is $\frac{m}{m + n}$ of the way from $A$.`,
  },
  {
    id: "me2-018",
    subject: "me2",
    topic: "Vectors: midpoints",
    difficulty: 1,
    prompt: r`Find the midpoint $M$ of the interval joining $A(-3, 5, 2)$ and $B(7, -1, -6)$.`,
    options: [r`$(2, 2, -2)$`, r`$(5, -3, -4)$`, r`$(4, 4, -4)$`, r`$(10, -6, -8)$`],
    answer: 0,
    solution: r`**Method 1.** The position vector of the midpoint is the average of the position vectors:

$$\overrightarrow{OM} = \frac{1}{2}\left(\overrightarrow{OA} + \overrightarrow{OB}\right) = \frac{1}{2}\begin{pmatrix} -3 + 7 \\ 5 + (-1) \\ 2 + (-6) \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 4 \\ 4 \\ -4 \end{pmatrix} = \begin{pmatrix} 2 \\ 2 \\ -2 \end{pmatrix}$$

**Method 2.** Start at $A$ and add half of $\overrightarrow{AB}$:

$$\overrightarrow{OM} = \overrightarrow{OA} + \frac{1}{2}\overrightarrow{AB} = \begin{pmatrix} -3 \\ 5 \\ 2 \end{pmatrix} + \frac{1}{2}\begin{pmatrix} 10 \\ -6 \\ -8 \end{pmatrix} = \begin{pmatrix} 2 \\ 2 \\ -2 \end{pmatrix}$$

So $M$ is $(2, 2, -2)$.`,
    commonMistake: r`Stopping at $\frac{1}{2}\overrightarrow{AB} = (5, -3, -4)$. That's the step from $A$ to $M$, not the position of $M$: you still need to add $\overrightarrow{OA}$.`,
  },
  {
    id: "me2-019",
    subject: "me2",
    topic: "Vectors: geometry in three dimensions",
    difficulty: 2,
    prompt: r`The points $P(1, -2, 3)$, $Q(4, 0, 5)$, $R(3, 5, -1)$ and $S(a, b, c)$ are the vertices of the parallelogram $PQRS$, in that order. Find $a$, $b$ and $c$.`,
    options: [r`$a = 6,\ b = 7,\ c = 1$`, r`$a = 2,\ b = -7,\ c = 9$`, r`$a = 0,\ b = 3,\ c = -3$`, r`$a = 0,\ b = -3,\ c = 3$`],
    answer: 2,
    solution: r`In the parallelogram $PQRS$, opposite sides are equal and parallel, so $\overrightarrow{PS} = \overrightarrow{QR}$.

$$\overrightarrow{QR} = \begin{pmatrix} 3 - 4 \\ 5 - 0 \\ -1 - 5 \end{pmatrix} = \begin{pmatrix} -1 \\ 5 \\ -6 \end{pmatrix}$$

$$\overrightarrow{OS} = \overrightarrow{OP} + \overrightarrow{QR} = \begin{pmatrix} 1 \\ -2 \\ 3 \end{pmatrix} + \begin{pmatrix} -1 \\ 5 \\ -6 \end{pmatrix} = \begin{pmatrix} 0 \\ 3 \\ -3 \end{pmatrix}$$

So $a = 0$, $b = 3$ and $c = -3$.

Check with the other pair of sides: $\overrightarrow{PQ} = 3${vi} + 2${vj} + 2${vk}$ and $\overrightarrow{SR} = (3 - 0)${vi} + (5 - 3)${vj} + (-1 + 3)${vk} = 3${vi} + 2${vj} + 2${vk}$. They match.`,
    commonMistake: r`Treating $S$ as the vertex opposite $P$, which gives $(6, 7, 1)$. The name $PQRS$ means you go $P \to Q \to R \to S$ around the shape, so $S$ is opposite $Q$.`,
  },
  {
    id: "me2-020",
    subject: "me2",
    topic: "Vectors: angle between vectors",
    difficulty: 2,
    prompt: r`A cube has side length $4$. Two of its space diagonals (lines joining opposite corners) are represented by

$$${vu} = 4${vi} + 4${vj} + 4${vk} \quad\text{and}\quad ${vv} = -4${vi} + 4${vj} + 4${vk}$$

Find the length of a space diagonal and the acute angle between the two diagonals, to the nearest degree.`,
    options: [
      r`Length $4\sqrt{2}$, angle $71^\circ$`,
      r`Length $4\sqrt{3}$, angle $109^\circ$`,
      r`Length $4\sqrt{3}$, angle $71^\circ$`,
      r`Length $12$, angle $55^\circ$`,
    ],
    answer: 2,
    solution: r`**Length.**

$$|${vu}| = \sqrt{4^2 + 4^2 + 4^2} = \sqrt{48} = 4\sqrt{3}$$

**Angle.** Use $${vu} \cdot ${vv} = |${vu}||${vv}|\cos\theta$.

- $${vu} \cdot ${vv} = (4)(-4) + (4)(4) + (4)(4) = 16$
- $|${vv}| = 4\sqrt{3}$ as well

$$\cos\theta = \frac{16}{4\sqrt{3} \times 4\sqrt{3}} = \frac{16}{48} = \frac{1}{3}$$

$$\theta = \cos^{-1}\left(\frac{1}{3}\right) \approx 70.5^\circ$$

So the acute angle is $71^\circ$ to the nearest degree. This is the angle between any two space diagonals of any cube.`,
    commonMistake: r`Mixing up diagonals. $4\sqrt{2}$ is the diagonal of one face, not of the cube. And $55^\circ$ is the angle between a space diagonal and an edge, not between two space diagonals.`,
  },
];
