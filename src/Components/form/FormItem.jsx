import React from "react";

function FormItem({ children }) {
  return (
    <div className="grid md:grid-cols-[1fr_4fr] items-center">{children}</div>
  );
}

export default FormItem;
