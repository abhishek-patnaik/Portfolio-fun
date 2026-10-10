import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export function mat4(
  p: [number, number, number],
  r: [number, number, number] = [0, 0, 0],
  s: [number, number, number] = [1, 1, 1],
): THREE.Matrix4 {
  return new THREE.Matrix4().compose(
    new THREE.Vector3(...p),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)),
    new THREE.Vector3(...s),
  );
}

/**
 * Collects geometries per material and merges each set into a single mesh.
 * Building a landmark from thirty boxes then costs a handful of draw calls.
 */
export class Merger {
  private readonly sets = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(geometry: THREE.BufferGeometry, material: THREE.Material, matrix?: THREE.Matrix4): void {
    let g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    geometry.dispose();
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    if (!g.getAttribute("uv")) {
      g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(g.getAttribute("position").count * 2), 2));
    }
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
    }
    g.clearGroups();
    if (matrix) g = g.applyMatrix4(matrix);
    const list = this.sets.get(material);
    if (list) list.push(g);
    else this.sets.set(material, [g]);
  }

  box(material: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, rotY = 0): void {
    this.add(new THREE.BoxGeometry(w, h, d), material, mat4([x, y + h / 2, z], [0, rotY, 0]));
  }

  build(parent: THREE.Object3D, options: { castShadow?: boolean; receiveShadow?: boolean } = {}): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    for (const [material, list] of this.sets) {
      const merged = mergeGeometries(list, false);
      list.forEach((g) => g.dispose());
      if (!merged) continue;
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = options.castShadow ?? false;
      mesh.receiveShadow = options.receiveShadow ?? false;
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.sets.clear();
    return meshes;
  }
}

/** Frees the geometries, materials and textures of everything under `root`. */
export function disposeObject(root: THREE.Object3D): void {
  const materials = new Set<THREE.Material>();
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    const m = mesh.material;
    if (Array.isArray(m)) m.forEach((x) => materials.add(x));
    else if (m) materials.add(m);
  });
  materials.forEach((m) => {
    // Textures flagged as shared belong to the world texture set and are freed there.
    if (!m.userData.sharedMap) (m as THREE.MeshBasicMaterial).map?.dispose();
    m.dispose();
  });
}
