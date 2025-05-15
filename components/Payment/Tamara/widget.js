import { useEffect } from "react";

const TamaraWidget = ({
  Lang,
  country,
  publicKey,
  customCss,
  fontSize,
  badgeRatio,
  amount,
}) => {
  useEffect(() => {
    // Define the widget configuration
    window.tamaraWidgetConfig = {
      lang: Lang,
      country: country || "AE",
      publicKey: "a916b2ef-bb66-4e5b-84d9-5bbae98db825",
      css: ".tamara-summary-widget__container .tamara-badge{width:95px;max-height:initial !important;display:inline-block;}",
      // style: {
      //   fontSize: "16px",
      //   margin: "10px",
      //   badgeRatio: 1.5,
      // },
    };

    // Load the widget script
    const script = document.createElement("script");
    script.src = "https://cdn.tamara.co/widget-v2/tamara-widget.js";
    script.defer = true;
    document.head.appendChild(script); // Append to head for better performance

    // Cleanup the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [Lang, country, publicKey, customCss, fontSize, badgeRatio]);

  return (
    <div>
      {/* <tamara-widget type="tamara-summary"></tamara-widget> */}
      <tamara-widget
        type="tamara-summary"
        amount={amount}
        inline-type="3"
        // inline-variant="outlined"
      ></tamara-widget>
    </div>
  );
};

export default TamaraWidget;
