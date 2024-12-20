export default function Error({ msg, cstmSmall = false }) {
  return (
    <div
      style={cstmSmall ? { minHeight: '250px' } : {}}
      className="min-h-screen flex items-center justify-center"
    >
      <p className="text-4xl bg-white p-5 rounded border-2 border-gray-400 shadow-xl -mt-[250px]">
        {msg}
      </p>
    </div>
  );
}
