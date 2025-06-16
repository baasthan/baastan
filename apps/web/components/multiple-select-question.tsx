"use client";

import React, { useState } from "react";
import { Card, CardAction } from "../../../packages/ui/src/components/card";
import { Checkbox } from "../../../packages/ui/src/components/checkbox";
import { Button } from "../../../packages/ui/src/components/button";

interface MultipleSelectQuestionProps {
  question: string;
  options: string[];
}

export default function MultipleSelectQuestion({ question, options }: MultipleSelectQuestionProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <Card className="p-6 border border-gray-300 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="flex flex-col gap-3 mb-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50">
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => handleChange(option)}
              className="border-gray-400"
            />
            <span className="text-base">{option}</span>
          </label>
        ))}
      </div>
      <CardAction>
      <Button className="w-fit float-right"  type="button" variant="default" onClick={() => alert(`Selected: ${selected.join(", ")}`)}>
        Submit
      </Button>
      </CardAction>
    </Card>
  );
}
