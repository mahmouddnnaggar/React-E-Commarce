import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';

export default function Brands() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [brands, setBrands] = useState(null);

  async function getBrands() {
    try {
      const options = {
        url: `${BASE_URL}/api/v1/brands`,
        method: 'GET',
      };
      const {
        data: { data },
      } = await axios(options);
      setBrands(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (!brands) return <Loading />;

  return (
    <>
      <section className="brands container col-span-12 mb-10">
        <h2 className="text-3xl font-semibold text-center mt-10 mb-8">
          Brands
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {brands.map(brand => {
            return (
              <div
                key={brand.id}
                className="brand-card p-4 shadow bg-white rounded"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[200px] object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-4">{brand.name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
