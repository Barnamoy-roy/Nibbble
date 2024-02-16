import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const Category = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="following">Following</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
          <SelectItem value="new">New & Noteworthy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Category;
