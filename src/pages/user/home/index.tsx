import React, { useState, useEffect } from "react";
import {
  About,
  Beranda,
  BookingService,
  Check,
  ListPart,
  Location,
  NavbarComponents,
  Product,
  Loading,
} from "../../../components";
import Footer from "../../../components/footer";
import { fetchUnit } from "../../../utils/apis";
import type { Products } from "../../../types/produk";

const Home: React.FC = () => {
  const [units, setUnits] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const resUnit = await fetchUnit();
        setUnits(resUnit.data.response);
      } catch (err) {
        console.error("Error fetching data:", err);
        setUnits([]);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    getData();
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
          <ListPart /> 
          <BookingService />
          <Location />
          <Check />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
