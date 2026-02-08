import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div>
      <p>Custom error page</p>
      <Link to="/">
        <Button className="cursor-pointer">Back to home</Button>
      </Link>
    </div>
  );
}
