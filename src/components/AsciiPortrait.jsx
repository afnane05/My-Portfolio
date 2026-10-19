import React, { useRef, useEffect, useState } from "react";

const calculateSize = (width) => {
  if (width <= 480) {
    return Math.min(220, width - 40);
  } else if (width <= 768) {
    return Math.min(280, width - 60);
  } else {
    return 400;
  }
};

/* ---------- small 3x3 matrix helpers (row-major) ---------- */
const IDENTITY = [1, 0, 0, 0, 1, 0, 0, 0, 1];

const mul = (a, b) => {
  const r = new Array(9).fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) r[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j];
  return r;
};

const apply = (m, v) => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

const rot = (axis, a) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  if (axis === 0) return [1, 0, 0, 0, c, -s, 0, s, c];
  if (axis === 1) return [c, 0, s, 0, 1, 0, -s, 0, c];
  return [c, -s, 0, s, c, 0, 0, 0, 1];
};

/* ---------- cube definition ---------- */
const GRID = 4; // characters per sticker side
const CUBIE = 0.96; // cubie size (gap of 0.04 between cubies)
const STICKER = 0.8; // size of the area covered by characters
const INNER_COLOR = "#3b4a6b"; // dark plastic color (inside faces)

// normal, two tangents, Rubik color
const FACES = [
  { n: [1, 0, 0], u: [0, 0, 1], v: [0, 1, 0], color: "#ff3b30" }, // red
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0], color: "#ff8a00" }, // orange
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, 1], color: "#ffffff" }, // white
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1], color: "#ffd60a" }, // yellow
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0], color: "#1fd35f" }, // green
  { n: [0, 0, -1], u: [1, 0, 0], v: [0, 1, 0], color: "#2f7bff" }, // blue
];

const buildCube = () => {
  const cubies = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const faces = FACES.map((f) => {
          const outer = f.n[0] * x + f.n[1] * y + f.n[2] * z === 1;
          const pts = [];
          for (let i = 0; i < GRID; i++) {
            for (let j = 0; j < GRID; j++) {
              const a = ((i + 0.5) / GRID - 0.5) * STICKER;
              const b = ((j + 0.5) / GRID - 0.5) * STICKER;
              pts.push({
                p: [
                  f.n[0] * 0.5 * CUBIE + f.u[0] * a + f.v[0] * b,
                  f.n[1] * 0.5 * CUBIE + f.u[1] * a + f.v[1] * b,
                  f.n[2] * 0.5 * CUBIE + f.u[2] * a + f.v[2] * b,
                ],
                ch: Math.random() < 0.5 ? "0" : "1",
              });
            }
          }
          return {
            n: f.n,
            color: outer ? f.color : INNER_COLOR,
            outer,
            pts,
          };
        });
        cubies.push({ pos: [x, y, z], rot: IDENTITY, faces });
      }
    }
  }
  return cubies;
};

const BinaryRubikCube = () => {
  const canvasRef = useRef(null);
  const cubiesRef = useRef(null);
  const stateRef = useRef({ move: null, last: null, nextAt: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const [size, setSize] = useState(() => calculateSize(window.innerWidth));

  if (!cubiesRef.current) cubiesRef.current = buildCube();

  useEffect(() => {
    const updateSize = () => setSize(calculateSize(window.innerWidth));
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cubies = cubiesRef.current;
    const s = stateRef.current;
    const t0 = performance.now();

    const unit = size * 0.115; // size of one cubie in pixels
    const CAMERA = 12; // camera distance (perspective strength)
    const baseFont = unit * 0.27;
    const cx = size / 2;
    const cy = size / 2;
    let animationId;

    const startMove = (t) => {
      let axis, layer, dir;
      do {
        axis = Math.floor(Math.random() * 3);
        layer = Math.floor(Math.random() * 3) - 1;
        dir = Math.random() < 0.5 ? 1 : -1;
      } while (s.last && s.last.axis === axis && s.last.layer === layer);
      s.move = { axis, layer, dir, start: t, dur: 0.5 };
    };

    const commitMove = (m) => {
      const R = rot(m.axis, m.dir * Math.PI / 2);
      cubies.forEach((c) => {
        if (c.pos[m.axis] === m.layer) {
          c.pos = apply(R, c.pos).map(Math.round);
          c.rot = mul(R, c.rot).map(Math.round);
        }
      });
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, size, size);

      const t = (performance.now() - t0) / 1000;
      const mouse = mouseRef.current;
      const target = mouseTargetRef.current;

      // smooth cursor follow (used for a slight tilt)
      const tx = mouse.active ? target.x : 0;
      const ty = mouse.active ? target.y : 0;
      mouse.x += (tx - mouse.x) * 0.06;
      mouse.y += (ty - mouse.y) * 0.06;

      /* ----- layer turns: only while the cursor is on the cube ----- */
      if (!s.move && mouse.active && t >= s.nextAt) startMove(t);

      let animMatrix = IDENTITY;
      if (s.move) {
        const p = Math.min((t - s.move.start) / s.move.dur, 1);
        if (p >= 1) {
          commitMove(s.move);
          s.last = s.move;
          s.move = null;
          s.nextAt = t + 0.1;
        } else {
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          animMatrix = rot(s.move.axis, s.move.dir * e * (Math.PI / 2));
        }
      }
      const moving = !!s.move;
      const flipRate = moving ? 0.03 : 0.004;

      /* ----- view: slow spin + float + cursor tilt ----- */
      const yaw = t * 0.4 + mouse.x * 0.5;
      const pitch = 0.45 + Math.sin(t * 0.6) * 0.08 - mouse.y * 0.3;
      const view = mul(rot(0, pitch), rot(1, yaw));
      const bob = Math.sin(t * 1.3) * 0.2;

      /* ----- collect visible characters ----- */
      const items = [];
      cubies.forEach((c) => {
        const inLayer = moving && c.pos[s.move.axis] === s.move.layer;
        const world = inLayer ? mul(view, animMatrix) : view;
        const A = mul(world, c.rot);
        const T = apply(world, c.pos);
        T[1] += bob;

        c.faces.forEach((face) => {
          const nv = apply(A, face.n);
          const center = apply(A, [
            face.n[0] * 0.5 * CUBIE,
            face.n[1] * 0.5 * CUBIE,
            face.n[2] * 0.5 * CUBIE,
          ]);
          const cxv = center[0] + T[0];
          const cyv = center[1] + T[1];
          const czv = center[2] + T[2];

          // back-face culling: is the face turned toward the camera?
          const facing = nv[0] * -cxv + nv[1] * -cyv + nv[2] * (CAMERA - czv);
          if (facing <= 0) return;

          const alpha = face.outer
            ? 0.55 + 0.45 * Math.max(0, nv[2])
            : 0.28;

          face.pts.forEach((pt) => {
            if (Math.random() < flipRate) pt.ch = pt.ch === "0" ? "1" : "0";
            const q = apply(A, pt.p);
            const x = q[0] + T[0];
            const y = q[1] + T[1];
            const z = q[2] + T[2];
            const sc = CAMERA / (CAMERA - z);
            items.push({
              x: cx + x * unit * sc,
              y: cy - y * unit * sc,
              z,
              sc,
              ch: pt.ch,
              color: face.color,
              alpha,
            });
          });
        });
      });

      // painter's algorithm: far to near
      items.sort((a, b) => a.z - b.z);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let lastFont = 0;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const fs = Math.max(4, Math.round(baseFont * it.sc));
        if (fs !== lastFont) {
          ctx.font = `bold ${fs}px monospace`;
          lastFont = fs;
        }
        ctx.globalAlpha = it.alpha;
        ctx.fillStyle = it.color;
        ctx.fillText(it.ch, it.x, it.y);
      }
      ctx.globalAlpha = 1;
    };

    const setTarget = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouseTargetRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseTargetRef.current.y = ((clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.active = true;
    };

    const handleMouseMove = (e) => setTarget(e.clientX, e.clientY);
    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (touch) setTarget(touch.clientX, touch.clientY);
      if (e.cancelable) e.preventDefault();
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mouseenter", handleMouseMove);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchstart", handleTouch, { passive: false });
    canvas.addEventListener("touchmove", handleTouch, { passive: false });
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mouseenter", handleMouseMove);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
        touchAction: "none",
      }}
    />
  );
};

export default BinaryRubikCube;