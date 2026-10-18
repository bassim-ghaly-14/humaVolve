import "./HumaVolveHero.css";

const HERO_BG_URL =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1792326385/IMG_4910_gblppr.jpg";

export function HumaVolveHero() {
  return (
    <section className="hv-hero" aria-labelledby="hv-hero-heading">
      <img
        className="hv-hero__bg"
        src={HERO_BG_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        width={2398}
        height={448}
        fetchPriority="high"
        decoding="async"
      />

      <div className="hv-hero__content">
        <h1 id="hv-hero-heading" className="hv-hero__heading">
          Explore Our Shop
        </h1>

        <p className="hv-hero__description">
          From skincare to makeup, our platform features a wide range of
          products that cater to all your beauty needs. We strive to provide our
          customers with a luxury shopping experience, browsing through our
          carefully selected products to receiving them in our signature
          packaging. Shop with us for the ultimate in beauty luxury.
        </p>
      </div>
    </section>
  );
}
