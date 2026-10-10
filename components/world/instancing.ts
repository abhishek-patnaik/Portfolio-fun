import * as THREE from "three";
import type { BuildingBox } from "@/types/world";

/**
 * Turns a list of boxes into one instanced mesh. With `facade` set, the
 * per-instance attributes read by the procedural facade shader are attached.
 */
export function instancedBoxes(boxes: readonly BuildingBox[], material: THREE.Material, facade: boolean): THREE.InstancedMesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, boxes.length));
  mesh.count = boxes.length;
  const m = new THREE.Matrix4();
  const c = new THREE.Color();
  const style = new Float32Array(Math.max(1, boxes.length) * 4);
  const accent = new Float32Array(Math.max(1, boxes.length) * 3);
  boxes.forEach((b, i) => {
    m.makeScale(b.w, b.h, b.d).setPosition(b.x, b.y, b.z);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, c.setRGB(b.tint[0], b.tint[1], b.tint[2]));
    style.set([b.style, b.seed, b.lit, 0], i * 4);
    accent.set(b.accent, i * 3);
  });
  if (facade) {
    geometry.setAttribute("aStyle", new THREE.InstancedBufferAttribute(style, 4));
    geometry.setAttribute("aAccent", new THREE.InstancedBufferAttribute(accent, 3));
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  if (boxes.length > 0) mesh.computeBoundingSphere();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
