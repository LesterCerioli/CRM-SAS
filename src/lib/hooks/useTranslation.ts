"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const useTranslation = () => {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        if (response.data.country_code !== "BR") {
          setLanguage("en");
        }
      } catch (error) {
        console.error("Error detecting location:", error);
      }
    };
    detectLocation();
  }, []);

  return language;
};

export default useTranslation;
