# MoMath Hackathon 2018: MengAR Sponge (and Friends)

**Project Category**: Augmented Reality
**Team**: [LINK][8]

Watch a demo (YouTube video):

[![Watch a demo][0.1]][0]


---

### The Submission
Head over to [https://mengar.github.io][1] ([GitHub][2]) on a camera equippeed device, and point the camera at one of these markers ([here][4] and [here][5]) (or both!) to see the fractals in AR.

The program looks for images in the real world ("markers") and creates a fractal on top of it. Currently supported fractals are:

- The Menger Sponge (by recursive methods)
- The Sierpinski Gasket (generated via the Chaos Game)

---

### The Math
Fractals are abstract mathematical representation of self-symmetric shapes. They are commonly found in nature, are aesthetically pleasing, and have many technological applications, from cell phone antannae to topological generation in computer graphics. Even fractals commonly used for teaching purposes, such as the very well-known Julia and Mendelbrot sets, are being applied to other fields such as cryptography ([source][3]).

---

### Additional Notes / Specifications
- MengAR uses [AR.js][6] for a simple and performant way to implement AR.
- MengAR uses [THREE.js][7] for 3D rendering.

[0.1]: https://i.ytimg.com/vi/3pRAFkfASDU/hqdefault.jpg
[0]: https://youtu.be/3pRAFkfASDU
[1]: https://mengar.github.io
[2]: https://github.com/mengar/mengar.github.io
[3]: https://www.quora.com/How-is-the-Mandelbrot-Set-used-in-real-life
[4]: https://github.com/mengar/mengar.github.io/raw/master/img/menger-marker.png
[5]: https://github.com/mengar/mengar.github.io/raw/master/img/sierpinski-marker.png
[6]: https://github.com/jeromeetienne/AR.js/blob/master/README.md
[7]: https://threejs.org/
[8]: ../../../
