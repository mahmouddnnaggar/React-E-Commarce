import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';

export default function Categories() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const options = {
        url: `${BASE_URL}/api/v1/categories`,
        method: 'GET',
      };
      const {
        data: { data },
      } = await axios(options);
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (!categories) return <Loading />;

  return (
    <>
      <section className="categories container col-span-12 mb-10">
        <h2 className="text-3xl font-semibold text-center mt-10 mb-8">
          Categories
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(category => {
            return (
              <div
                key={category.id}
                className="category-card p-4 shadow bg-white rounded"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[200px] object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-4">{category.name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
