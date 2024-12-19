import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative flex-1">
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10"
      />
      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
    </div>
  );
};