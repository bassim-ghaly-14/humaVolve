const HERO_BG_URL =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1792326385/IMG_4910_gblppr.jpg";

export function HumaVolveHero() {
  return (
    <section aria-labelledby="hv-hero-heading" className="hv-hero">
      <style>{`
        /* =========================================
           HumaVolve Shop Hero
           Desktop: original panoramic composition.
           Mobile: taller hero, right-side image focus,
           readable text overlay.
           ========================================= */

        .hv-hero {
          position: relative;
          isolation: isolate;
          display: block;
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          aspect-ratio: 2398 / 448;
          overflow: hidden;
          border: 0;
          border-radius: 24px;
          background: #f7f5f0;
          box-shadow: inset 0 0 0 1px #e5e3df;
          container-type: inline-size;
        }

        .hv-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          user-select: none;
        }

        .hv-hero::after {
          position: absolute;
          inset: 0;
          z-index: 1;
          content: "";
          pointer-events: none;
          background: linear-gradient(
            110deg,
            rgb(250 249 246 / 10%) 0%,
            rgb(250 249 246 / 4%) 60%,
            transparent 100%
          );
        }

        .hv-hero__content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4.48cqi 5.23cqi;
        }

        .hv-hero__heading {
          align-self: flex-start;
          width: fit-content;
          max-width: 60%;
          margin: 0;
          color: #25252a;
          font-family: inherit;
          font-size: clamp(28px, 5.97cqi, 64px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          text-align: left;
          text-wrap: balance;
        }

        .hv-hero__description {
          align-self: flex-end;
          width: 100%;
          max-width: 56.72cqi;
          margin: 0 11.2cqi 0 0;
          transform: translateY(1.12cqi);
          color: #3b3b3b;
          font-family: "Satoshi", sans-serif;
          font-size: clamp(10px, 1.12cqi, 12px);
          font-weight: 500;
          font-style: normal;
          line-height: 1.4;
          letter-spacing: -0.02em;
          text-align: left;
          overflow-wrap: break-word;
        }

        /* =========================================
           Tablet
           ========================================= */

        @media (min-width: 561px) and (max-width: 820px) {
          .hv-hero {
            border-radius: 20px;
          }

          .hv-hero__content {
            padding: 3cqi 4cqi;
          }

          .hv-hero__heading {
            max-width: 70%;
            font-size: clamp(22px, 5.4cqi, 38px);
            line-height: 1.08;
          }

          .hv-hero__description {
            max-width: 54cqi;
            margin-right: 6cqi;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
            font-size: clamp(10px, 1.55cqi, 11px);
            line-height: 1.45;
            transform: none;
          }
        }

        /* =========================================
           Mobile
           Taller portrait-like composition.
           Focus on the right-hand side of the image.
           ========================================= */

        @media (max-width: 560px) {
          .hv-hero {
            aspect-ratio: 4 / 3;
            min-height: 300px;
            max-height: 440px;
            border-radius: 18px;
          }

          .hv-hero__bg {
            object-fit: cover;
            object-position: 78% center;
          }

          .hv-hero::after {
            background: linear-gradient(
              90deg,
              rgb(247 245 240 / 94%) 0%,
              rgb(247 245 240 / 86%) 35%,
              rgb(247 245 240 / 54%) 58%,
              rgb(247 245 240 / 12%) 100%
            );
          }

          .hv-hero__content {
            justify-content: center;
            align-items: flex-start;
            gap: 16px;
            padding: clamp(22px, 6vw, 32px);
          }

          .hv-hero__heading {
            width: 100%;
            max-width: 92%;
            font-size: clamp(30px, 8vw, 42px);
            line-height: 1.08;
            letter-spacing: -0.04em;
            text-wrap: balance;
          }

          .hv-hero__description {
            align-self: flex-start;
            width: 100%;
            max-width: 82%;
            margin: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            line-clamp: 5;
            overflow: hidden;
            font-size: clamp(12px, 3.5vw, 14px);
            line-height: 1.65;
            letter-spacing: -0.015em;
            transform: none;
          }
        }

        /* Narrow phones */
        @media (max-width: 380px) {
          .hv-hero {
            aspect-ratio: 3 / 4;
            min-height: 320px;
            max-height: 390px;
          }

          .hv-hero__bg {
            object-position: 78% center;
          }

          .hv-hero::after {
            background: linear-gradient(
              90deg,
              rgb(247 245 240 / 96%) 0%,
              rgb(247 245 240 / 90%) 42%,
              rgb(247 245 240 / 60%) 68%,
              rgb(247 245 240 / 18%) 100%
            );
          }

          .hv-hero__content {
            gap: 14px;
            padding: 22px;
          }

          .hv-hero__heading {
            max-width: 100%;
            font-size: clamp(28px, 8.5vw, 34px);
          }

          .hv-hero__description {
            max-width: 95%;
            font-size: 12px;
            line-height: 1.6;
            -webkit-line-clamp: 6;
            line-clamp: 6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv-hero,
          .hv-hero * {
            scroll-behavior: auto;
            animation: none;
            transition: none;
          }
        }
      `}</style>

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
