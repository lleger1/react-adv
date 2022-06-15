import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product, InitialValues } from "../interfaces/interfaces";

interface useProductsArgs {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: useProductsArgs) => {
  const [counter, setCounter] = useState(initialValues?.count || value);
  const isMounted = useRef(false);
  // const inV= initialValues?.maxCount;

  console.log(initialValues?.count);

  const increaseBy = (value: number) => {
    const newValue =
      Math.max(counter + value, 0) &&
      Math.min(counter + value, initialValues?.maxCount || Infinity);
    setCounter(newValue);

    onChange && onChange({ count: newValue, product });
  };

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const reset = () => {
    setCounter(initialValues?.count || value);
  };
  useEffect(() => {
    if (isMounted.current) return;
    setCounter(value);
  }, [value]);

  return {
    counter,
    isMaxCountReached:
      !!initialValues?.count && initialValues.maxCount === counter,
    maxCount: initialValues?.maxCount,

    increaseBy,
    reset,
  };
};
