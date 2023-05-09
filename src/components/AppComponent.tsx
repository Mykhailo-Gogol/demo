import React from "react";
import Card from "./Card";
import fourth from "@/static/carousel/fourth.jpg";
import third from "@/static/carousel/third.jpg";

export default function AppComponent() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card
        src={third}
        title="Text Completion!"
        subtitle="If a dog chews shoes whose shoes does he choose?"
        callToActionText="Let`s go"
        href="/text-completion"
      />

      <Card
        src={fourth}
        title="Image Generation!"
        subtitle="A white siamese cat"
        callToActionText="Let`s go"
        href="/image-generation"
      />
    </div>
  );
}
