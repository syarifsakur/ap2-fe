import React, { useState, useEffect } from "react";
import {
  About,
  Beranda,
  Check,
  Location,
  NavbarComponents,
  Product,
} from "../../../components";
import Footer from "../../../components/footer";
import { fetchUnit } from "../../../utils/apis";
import type { Products } from "../../../types/produk";
import { Loading } from "../../../components"; 

const Home: React.FC = () => {
  const [units, setUnits] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUnits = async () => {
      try {
        setLoading(true);
        const res = await fetchUnit();
        setUnits(res.data.response);
      } catch (err) {
        console.error("Error fetching units:", err);
        setUnits([]);
      } finally {
        setTimeout(() => setLoading(false), 300); 
      }
    };
    getUnits();
  }, []);

  return (
    <>
      {loading ? (
        <Loading setIsLoading={setLoading} />
      ) : (
        <>
          <NavbarComponents />
          <Beranda />
          <About />
          <Product units={units} />
          <Location />
          <Check />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
