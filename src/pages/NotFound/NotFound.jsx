import notFoundImg from '../../assets/images/Not Found.png';

export default function NotFound() {
  return (
    <section className="relative">
      <img
        className="w-[800px] block m-auto"
        src={notFoundImg}
        alt="notFoundImg"
      />
      <p className="absolute top-24 left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg text-4xl bg-opacity-60">
        احنا هنعتبرها صورة مبهرة
      </p>
    </section>
  );
}
