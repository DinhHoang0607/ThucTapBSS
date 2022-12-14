import {useRef, useEffect, useState} from 'react';
import {useScroll} from 'react-use';
import {
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty} from '~/components';
import axios from 'axios';

export function CartDetails({layout, onClose}) {
  const [dataTest, setDataTest] = useState([]);
  const {lines} = useCart();
  const [mapCart, setMapCart] = useState([]);
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);
  // let dataTest = [];

  useEffect(() => {
    axios
      .get('http://localhost:6767/listTable')
      .then((response) => {
        setDataTest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // setDataTest(res);
  }, []);
  console.log("test 0",dataTest[0]?.amountProductsConst);

  useEffect(() => {
    let temp = [];

    lines.forEach((cartItem) => {
      const item = dataTest.find(
        (dbItem) => dbItem.title === cartItem.merchandise.product.title,
      );
      if (item) temp.push(item);
    });
    if (temp.length < dataTest[0]?.amountProductsConst)
      setMapCart([]);
    else 
    setMapCart(temp);
  }, [dataTest]);

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} layout={layout} />;
  }

  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  const content = {
    drawer: 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
    page: 'flex-grow md:translate-y-4',
  };

  const summary = {
    drawer: 'grid gap-6 p-6 border-t md:px-12',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  return (
    <form className={container[layout]}>
      <section
        ref={scrollRef}
        aria-labelledby="cart-contents"
        className={`${content[layout]} ${y > 0 ? 'border-t' : ''}`}
      >
        <ul className="grid gap-6 md:gap-10">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem mapCart={mapCart} />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="summary-heading" className={summary[layout]}>
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  );
}

function CartCheckoutActions() {
  const {checkoutUrl} = useCart();
  return (
    <>
      <div className="grid gap-4">
        <Button to={checkoutUrl}>Continue to Checkout</Button>
        <CartShopPayButton />
      </div>
    </>
  );
}

function OrderSummary() {
  const {cost} = useCart();
  return (
    <>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          {/* <Text as="dt">Subtotal</Text>
          <Text as="dd">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text> */}
        </div>
      </dl>
    </>
  );
}
