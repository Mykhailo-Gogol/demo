import React from "react";
import Card from "./Card";

import { features } from "@/utils";

export default function AppComponent() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map(({ src, title, subtitle, callToActionText, slug }, i) => (
        <Card
          key={[i, slug].join("-")}
          src={src}
          title={title}
          subtitle={subtitle}
          callToActionText={callToActionText}
          slug={slug}
        />
      ))}
    </div>
  );
}
