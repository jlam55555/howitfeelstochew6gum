# MoMath Hackathon 2018: Slope Fields

**Project Category**: Math Square
**Team**: [LINK][3]

Mode 0 ("Mathy"):

![mode 0][0]

Math 1 ("Lava Lampy"):

![mode 1][1]

---

### The Submission
AP Calculus BC! We all took the class and felt that we should do something directly from it. It's something in calculus that are very visual, which would make it very eye-grabbing for kids, while also easily translate easily to theoretical mathematical methods (solving differential equations via Euler's method).

This idea directly correlated to two different general visualizations of slope fields, illustrated in the images above. The first is colorful and fun and and hides away the inner workings of the underlying curves. The second mode makes it very easy to see the slope linesat different points and see where the differential equation comes from, without extra colors to distract. The two modes can easily be toggled by changing the value of the `mode` variable:

    const mode = <0 for Mathy mode | 1 for Lava Lampy mode>;

As suggested by the two modes, this game is targeted towards a wide audience of ages.

---

### The Math
We generated a slope field from a selection of differential equations. When a point is selected, Euler's method is used to accurately approximate the equation that satisfies the differential equation and passes through the point. In the "Lava Lampy" mode, heuristics are used to determine which side of the equation to fill.

---

### Additional Notes
- Colors courtesy of [HTML Color Codes][2].

[0]: ./img/mode-0.png
[1]: ./img/mode-1.png
[2]: https://htmlcolorcodes.com/color-chart/material-design-color-chart/
[3]: ../../../
