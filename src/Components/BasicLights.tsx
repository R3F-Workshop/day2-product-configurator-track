export function BasicLights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight castShadow intensity={2} position={[4, 6, 2]} />
    </>
  );
}
