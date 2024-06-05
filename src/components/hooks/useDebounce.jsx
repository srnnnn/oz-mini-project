import { useEffect, useState } from "react";

//검색창에 입력이 멈춘 후(delay동안) 값 처리함
export const useDebounce = (value, delay) => {
  //value가 아마 q?로받아온 파라미터, delay는 얼마나 delay 시킬건지
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      //정리함수..
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
