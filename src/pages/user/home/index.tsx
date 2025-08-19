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

const Home: React.FC = () => {
  const [units, setUnits] = useState<Products[]>([]);

  useEffect(() => {
    const getUnits = async () => {
      try {
        const res = await fetchUnit();
        console.log(res.data.response);
        setUnits(res.data.response);
      } catch (err) {
        console.error("Error fetching units:", err);
        setUnits([]);
      }
    };
    getUnits();
  }, []);

  return (
    <>
      <NavbarComponents />
      <Beranda />
      <About />
      <Product units={units} />
      <Location />
      <Check />
      <Footer />
    </>
  );
};

export default Home;
