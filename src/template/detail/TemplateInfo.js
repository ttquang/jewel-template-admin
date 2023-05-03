export default function TemplateInfo({inName, handleChange}) {
  return (
    <>
      <input
        placeholder="Template Name"
        value={inName}
        onChange={handleChange}
      />
    </>
  );
}
