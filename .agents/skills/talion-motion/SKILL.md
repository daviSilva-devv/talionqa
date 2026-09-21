# Talion Motion Skill

Use when adding animation, transitions or state visualization.

## Principle

Motion explains state. It is not decoration.

Good Talion motion communicates:
- discovery;
- scanning;
- relationship/data flow;
- selected context;
- impact;
- change;
- resolution.

## Preference order

1. CSS transitions/animations for simple state changes.
2. Motion for coordinated layout/state animation.
3. Specialized primitives only when they materially improve the interaction.
4. WebGL/Three.js only when the product concept truly benefits from it.

Do not add a heavy dependency to animate one element.

## Timing character

Talion should feel:
- calm;
- precise;
- intelligent;
- responsive.

Avoid:
- constant pulsing everywhere;
- bouncy novelty motion;
- long blocking entrances;
- random staggered card animations;
- animations that delay access to information.

## X-Ray

Healthy topology should remain quiet.

Scanning may move through edges/nodes subtly.

A finding may create localized emphasis, but the entire graph must not become alarm-red or continuously animated.

Selection should clarify relationships/path, not merely scale a node.

## Accessibility

Always respect `prefers-reduced-motion`.

Critical information must remain understandable with animation disabled.
