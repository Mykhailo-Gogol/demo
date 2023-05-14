import React from "react";
import Card from "./Card";

import { features } from "@/utils";

export default function AppComponent() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((item, i) => (
        <Card
          key={[i, item.slug].join("-")}
          src={item.src}
          title={item.title}
          subtitle={item.subtitle}
          callToActionText={item.callToActionText}
          slug={item.slug}
          tags={item.tags}
          settings={item.settings}
          label={item.label}
        />
      ))}
    </div>
  );
}
