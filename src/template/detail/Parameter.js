export default function Parameter({parameter, handleChange}) {
  return (
    <>
      {parameter.name}
      <input
        value={parameter.value}
        onChange={handleChange}
        size={100}
      />
    </>
  );
}