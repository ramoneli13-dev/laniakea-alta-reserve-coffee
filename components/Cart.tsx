import type { CartItem } from "@/types";

type CartProps = {
  cartItems: CartItem[];
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  checkoutError?: string;
  checkoutLoading?: boolean;
};

export function Cart({
  cartItems,
  onRemove,
  onCheckout,
  checkoutError,
  checkoutLoading = false
}: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section id="cart" className="bg-coffee-parchment px-5 py-24 text-coffee-black md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
            Your Cart
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Reserve your coffee.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-coffee-roast">
            Checkout is intentionally prepared as a placeholder. Stripe can be connected
            here when the store is ready for real payments.
          </p>
        </div>

        <div className="border border-coffee-gold/40 bg-white p-6 shadow-luxury">
          {cartItems.length === 0 ? (
            <p className="leading-7 text-coffee-roast">
              Your cart is empty. Add a coffee product to start an order.
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 border-b border-coffee-gold/20 pb-4"
                >
                  <div>
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="mt-1 text-sm text-coffee-roast">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="h-10 border border-coffee-roast/20 px-3 text-sm font-semibold text-coffee-roast transition hover:border-coffee-gold hover:text-coffee-black"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-coffee-gold/30 pt-5">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-coffee-roast">
              Total
            </span>
            <strong className="text-3xl text-coffee-black">${total.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={cartItems.length === 0 || checkoutLoading}
            className="mt-6 min-h-12 w-full bg-coffee-black px-5 text-sm font-bold uppercase tracking-[0.18em] text-coffee-gold transition hover:bg-coffee-roast disabled:cursor-not-allowed disabled:opacity-45"
          >
            {checkoutLoading ? "Opening Checkout..." : "Checkout"}
          </button>
          {checkoutError ? (
            <p className="mt-4 text-sm leading-6 text-red-700">{checkoutError}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
