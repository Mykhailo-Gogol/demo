import React from "react";
import Card from "./Card";

export default function AppComponent() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card />
    </div>
  );
}
