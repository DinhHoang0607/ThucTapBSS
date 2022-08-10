import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';
import axios from 'axios';
import {useEffect, useState} from 'react';

import {Heading, IconRemove, Text} from '~/components';

export function CartLineItem({mapCart}) {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise} = useCartLine();
  const item = mapCart?.find(
    (item) => item.title === merchandise.product.title,
  );
  // const [dataTest, setDataTest] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:6767/listTable')
  //     .then((response) => {
  //       setDataTest(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // setDataTest(res);
  // }, []);

  // console.log(dataTest);
  return (
    <li key={lineId} className="flex gap-4">
      <div className="flex-shrink">
        <Image
          width={112}
          height={112}
          widths={[112]}
          data={merchandise.image}
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
          className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
        />
      </div>

      <div className="flex justify-between flex-grow">
        <div className="grid gap-2">
          <Heading as="h3" size="copy">
            <Link to={`/products/${merchandise.product.handle}`}>
              {merchandise.product.title}
            </Link>
          </Heading>

          <div className="grid pb-2">
            {(merchandise?.selectedOptions || []).map((option) => (
              <Text color="subtle" key={option.name}>
                {option.name}: {option.value}
              </Text>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-start text-copy">
              <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
            </div>
            <button
              type="button"
              onClick={() => linesRemove([lineId])}
              className="flex items-center justify-center w-10 h-10 border rounded"
            >
              <span className="sr-only">Remove</span>
              <IconRemove aria-hidden="true" />
            </button>
          </div>
        </div>
        <Text>
          <CartLinePrice
            as="span"
            style={{textDecoration: item ? 'line-through' : 'none'}}
          />

          {item ? <p>{item.price}</p> : null}
        </Text>
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({lineId, quantity}) {
  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border rounded">
        <CartLineQuantityAdjustButton
          adjust="decrease"
          aria-label="Decrease quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#8722;
        </CartLineQuantityAdjustButton>
        <CartLineQuantity as="div" className="px-2 text-center" />
        <CartLineQuantityAdjustButton
          adjust="increase"
          aria-label="Increase quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#43;
        </CartLineQuantityAdjustButton>
      </div>
    </>
  );
}
